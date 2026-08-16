# ImplantCost CMS

This repository now includes a Supabase-backed CMS foundation inside the existing React application.

## Admin access

Open `/admin`. Authentication uses Supabase Auth. A user must have at least one role in `public.user_roles` to access the CMS. The supported roles are `super_admin`, `admin`, `content_editor`, and `seo_manager`.

The application enforces access in the UI and the Supabase RLS policies. The service-role key must never be exposed to browser code.

## Modules

| Module | Route | Coverage |
|---|---|---|
| Dashboard | `/admin` | Pages, posts, drafts, published posts, leads, users, media, and recent activity counts. |
| Pages | `/admin/pages` | Search, create, edit, CKEditor content, slug, excerpt, status, scheduling, SEO fields, preview, duplicate, and delete. |
| Blog | `/admin/blog` | Search, status filters, CKEditor content, slug, excerpt, categories, tags, SEO fields, scheduling, duplicate, and delete. |
| Leads | `/admin/leads` | Existing lead review, search, status updates, notes, export, and admin deletion. |
| Media | `/admin/media` | Existing Supabase Storage-backed media library. |
| SEO | `/admin/seo` | Existing page-level metadata editor. |
| Authors | `/admin/authors` | Existing author profiles and reviewer metadata. |
| Users | `/admin/users` | Existing role assignment controls for super admins. |
| Settings | `/admin/settings` | Existing public site, analytics, robots, and custom-code settings. |
| Activity | `/admin/activity` | Existing administrative audit log. |
| Notifications | `/admin/notifications` | Notifications list and mark-as-read flow. |

## Database migrations

Apply these migrations to the connected Supabase project in order with the existing migrations:

- `supabase/migrations/20260816090000_cms_pages_and_scheduling.sql`
- `supabase/migrations/20260816093000_cms_notifications.sql`

The first migration adds `cms_pages`, page status policies, indexes, and the restricted `publish_scheduled_content()` server-side function. The second adds recipient-scoped notifications with RLS.

Scheduling requires a server-side trigger. Configure a Supabase scheduled function, Vercel Cron, or another trusted server-side job to call `publish_scheduled_content()` periodically. Do not run publishing from a browser timer.

## CKEditor

Pages and blog posts use the reusable `RichTextEditor` component at `src/components/site/RichTextEditor.tsx`. Content is returned as HTML. Before production publication, add server-side HTML sanitization with an allowlist for tags, attributes, links, and images. The existing image-upload toolbar remains a placeholder until a trusted upload endpoint is connected.

## Local development

```bash
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:4173/admin
```

The application also builds with:

```bash
pnpm build
```

## Required environment variables

The existing Supabase client expects these values at runtime:

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Keep service-role credentials, SMTP credentials, and any deployment secrets server-side. Do not commit `.env` files.

## Production checklist

Before production release, apply and verify the migrations, confirm all RLS policies with an authenticated and unauthorized test account, configure scheduled publishing, add HTML sanitization, connect the media upload adapter, configure email/password-reset settings in Supabase, and confirm the chosen deployment target. The current project contains Cloudflare/TanStack Start configuration, so deployment should be validated against the actual target rather than assuming Vercel-specific server behavior.
