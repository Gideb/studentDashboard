-- School Management Dashboard: initial Supabase schema.
-- Apply this file in Supabase SQL Editor before enabling the frontend.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  role text not null default 'student' check (role in ('administrator', 'lecturer', 'student')),
  department text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    'student'
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.role from public.profiles p where p.id = (select auth.uid())
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() = 'administrator', false)
$$;

-- Users can update their own profile details but cannot promote themselves.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
     and not public.is_admin()
     and auth.role() <> 'service_role' then
    raise exception 'Only an administrator can change account roles';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role before update on public.profiles
for each row execute function public.protect_profile_role();

create table if not exists public.students (
  id text primary key,
  student_id text not null unique,
  name text not null,
  email text not null default '',
  gender text not null default '',
  department text not null default '',
  level text not null default '',
  phone text not null default '',
  status text not null default 'Active',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id text primary key,
  name text not null,
  code text not null unique,
  department text not null default '',
  lecturer text not null default '',
  students integer not null default 0 check (students >= 0),
  status text not null default 'Active',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id text primary key,
  assignment_id text not null unique,
  title text not null,
  course text not null default '',
  lecturer text not null default '',
  due_date date,
  submissions integer not null default 0 check (submissions >= 0),
  total_students integer not null default 0 check (total_students >= 0),
  status text not null default 'Pending',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.results (
  id text primary key,
  result_id text not null unique,
  student_id text not null default '',
  student_name text not null default '',
  course_code text not null default '',
  course text not null default '',
  assessment text not null default '',
  score numeric(5,2) not null default 0 check (score >= 0 and score <= 100),
  semester text not null default '',
  academic_year text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calendar_events (
  id text primary key,
  event_id text not null unique,
  title text not null,
  type text not null default 'Event',
  course text not null default '',
  lecturer text not null default '',
  event_date date not null,
  start_time time,
  end_time time,
  location text not null default '',
  description text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep update timestamps consistent.
do $$
declare tbl text;
begin
  foreach tbl in array array['students', 'courses', 'assignments', 'results', 'calendar_events']
  loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I', tbl, tbl);
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at()', tbl, tbl);
  end loop;
end;
$$;

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.courses enable row level security;
alter table public.assignments enable row level security;
alter table public.results enable row level security;
alter table public.calendar_events enable row level security;

-- Profiles: signed-in users can read their own profile; admins can read/manage all.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
for select to authenticated
using (id = (select auth.uid()) or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
for update to authenticated
using (id = (select auth.uid()) or public.is_admin())
with check (id = (select auth.uid()) or public.is_admin());

drop policy if exists "profiles_admin_insert" on public.profiles;
create policy "profiles_admin_insert" on public.profiles
for insert to authenticated with check (public.is_admin());

-- Students: administrators manage; authenticated lecturers may read; students cannot browse directory.
drop policy if exists "students_select_admin_lecturer" on public.students;
create policy "students_select_admin_lecturer" on public.students
for select to authenticated
using (public.current_app_role() in ('administrator', 'lecturer'));

drop policy if exists "students_admin_manage" on public.students;
create policy "students_admin_manage" on public.students
for all to authenticated
using (public.is_admin()) with check (public.is_admin());

-- Courses: all signed-in roles can read; only administrators write.
drop policy if exists "courses_select_authenticated" on public.courses;
create policy "courses_select_authenticated" on public.courses
for select to authenticated using (true);
drop policy if exists "courses_admin_manage" on public.courses;
create policy "courses_admin_manage" on public.courses
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Assignments: all roles can read; admin and lecturer can write.
drop policy if exists "assignments_select_authenticated" on public.assignments;
create policy "assignments_select_authenticated" on public.assignments
for select to authenticated using (true);
drop policy if exists "assignments_staff_manage" on public.assignments;
create policy "assignments_staff_manage" on public.assignments
for all to authenticated
using (public.current_app_role() in ('administrator', 'lecturer'))
with check (public.current_app_role() in ('administrator', 'lecturer'));

-- Results: all roles can read in the current app; admin and lecturer can write.
drop policy if exists "results_select_authenticated" on public.results;
create policy "results_select_authenticated" on public.results
for select to authenticated using (true);
drop policy if exists "results_staff_manage" on public.results;
create policy "results_staff_manage" on public.results
for all to authenticated
using (public.current_app_role() in ('administrator', 'lecturer'))
with check (public.current_app_role() in ('administrator', 'lecturer'));

-- Calendar: all roles can read; admin and lecturer can write.
drop policy if exists "calendar_select_authenticated" on public.calendar_events;
create policy "calendar_select_authenticated" on public.calendar_events
for select to authenticated using (true);
drop policy if exists "calendar_staff_manage" on public.calendar_events;
create policy "calendar_staff_manage" on public.calendar_events
for all to authenticated
using (public.current_app_role() in ('administrator', 'lecturer'))
with check (public.current_app_role() in ('administrator', 'lecturer'));

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant insert on public.profiles to authenticated;
grant select, insert, update, delete on public.students, public.courses,
  public.assignments, public.results, public.calendar_events to authenticated;

create index if not exists students_department_idx on public.students(department);
create index if not exists courses_department_idx on public.courses(department);
create index if not exists assignments_due_date_idx on public.assignments(due_date);
create index if not exists results_student_id_idx on public.results(student_id);
create index if not exists calendar_events_date_idx on public.calendar_events(event_date);

-- After creating your own account, promote the intended first administrator manually
-- in Supabase SQL Editor. Replace the email before running:
-- update public.profiles set role = 'administrator' where email = 'admin@your-school.edu';
