# Abhay Soni — Personal Portfolio & Journal

An independent portfolio, blog, and private content studio for Abhay Soni.
It runs on Cloudflare Workers with a Cloudflare D1 database and does not
depend on ChatGPT hosting or ChatGPT sign-in.

## Features

- Portfolio sections for projects, skills, certificates, and education
- Blog and project detail pages
- Private owner login at `/studio`
- In-browser editors for blogs and portfolio content
- Responsive design and dark mode
- Cloudflare D1 persistence

## Requirements

- Node.js 22.13 or newer
- A Cloudflare account
- A Cloudflare D1 database named `abhay-soni-portfolio-db`

## Local development

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Copy `.dev.vars.example` to `.dev.vars` and set private values:

   ```text
   ADMIN_PASSWORD=<a strong private password>
   SESSION_SECRET=<a long random secret>
   ```

3. Replace the placeholder D1 `database_id` in `wrangler.jsonc` with the real
   database ID.

4. Apply the database migrations:

   ```bash
   npm run db:migrate:local
   ```

5. Start the site:

   ```bash
   npm run dev
   ```

## Cloudflare deployment

1. Create the D1 database and place its ID in `wrangler.jsonc`.
2. Apply production migrations with `npm run db:migrate:remote`.
3. Add `ADMIN_PASSWORD` and `SESSION_SECRET` as encrypted Cloudflare Worker
   secrets. Never commit them to GitHub.
4. Deploy with:

   ```bash
   npm run deploy
   ```

The configured admin email is `abhispacesoni@gmail.com`. It can be changed in
the `vars` section of `wrangler.jsonc`.

## Important security note

Do not put passwords, session secrets, API tokens, or `.dev.vars` in GitHub.
The repository is safe to keep public as long as those values remain in
Cloudflare encrypted secrets.
