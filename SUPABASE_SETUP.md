# SMD Supabase setup — Phase 1

This phase connects account registration, sign-in, sign-out, and profile updates to Supabase Auth/PostgreSQL and creates the initial database schema. The Students, Courses, Assignments, Results, Calendar, and dashboard data hooks still use localStorage in this phase; those will be migrated next, module by module.

## 1. Create the Supabase project

1. Create a project at https://supabase.com/dashboard.
2. In **Project Settings → API** (or **Connect**), copy the Project URL and the publishable key (or legacy anon key).
3. In the project SQL Editor, run `supabase/migrations/202610220001_initial_schema.sql` in full.
4. Create an account in SMD after adding the environment variables below.
5. In SQL Editor, promote the intended administrator. Replace the email with the account you own:

```sql
update public.profiles
set role = 'administrator'
where email = 'admin@your-school.edu';
```

Only promote a trusted account. Public sign-up always creates the `student` role; the browser cannot choose its role.

## 2. Configure local environment

Copy `.env.example` to `.env.local` and fill in the values from your Supabase project:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Restart the Vite dev server after changing environment variables. Never put a Supabase `service_role` key in a `VITE_` variable or in frontend code.

## 3. Install and run

```bash
npm install
npm run dev
```

`@supabase/supabase-js` is added to `package.json`; `npm install` will update `package-lock.json` in your local working copy.

## 4. Important current boundary

- Supabase Auth replaces the old localStorage account/password implementation.
- The profile row is created by a database trigger and defaults to `student`.
- The initial RLS policies protect role assignment and limit write operations by role.
- Existing module records are **not automatically migrated** from browser localStorage. Do not clear your old browser data until the data migration/import phase is complete.
- Existing module hooks still read/write localStorage until the next phase connects them to these tables.
- Demo accounts from the old localStorage auth do not become Supabase users; register again through Supabase after configuration.
