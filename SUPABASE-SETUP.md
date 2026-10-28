# Supabase setup for SMD

1. In the project root, copy `.env.example` to `.env.local`.
2. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the project's URL and publishable/anon key. Do not use a service-role or secret key in the browser.
3. Run `npm install` to install `@supabase/supabase-js` and refresh `package-lock.json`.
4. Restart the dev server with `npm run dev` after changing environment variables.
5. Apply `supabase/migrations/202610220001_initial_schema.sql` in Supabase SQL Editor if you have not already applied the schema.
6. In Supabase Authentication settings, check whether email confirmation is enabled. If it is enabled, signup sends a confirmation email and login will not work until the address is confirmed. Check Spam/Junk too.

New signups are assigned the `student` role by the database trigger. Promote an administrator manually in Supabase SQL Editor only after confirming the correct account:

```sql
update public.profiles
set role = 'administrator'
where email = 'YOUR_ACCOUNT_EMAIL';
```

Do not place service-role keys in `.env.local` for this frontend. Never commit `.env.local` to source control.
