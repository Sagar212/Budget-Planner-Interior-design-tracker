create table public.users (
  id uuid not null default gen_random_uuid (),
  username text not null,
  email text not null,
  password_hash text not null,
  role text not null default 'user'::text,
  created_at timestamp with time zone null default now(),
  permissions jsonb null default '{"canEdit": true, "canDelete": true}'::jsonb,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_username_key unique (username),
  constraint users_role_check check ((role = any (array['admin'::text, 'user'::text])))
) TABLESPACE pg_default;

create index IF not exists idx_users_username on public.users using btree (username) TABLESPACE pg_default;

create index IF not exists idx_users_email on public.users using btree (email) TABLESPACE pg_default;

create index IF not exists idx_users_role on public.users using btree (role) TABLESPACE pg_default;

create index IF not exists idx_users_permissions on public.users using gin (permissions) TABLESPACE pg_default;

create table public.projects (
  project_id uuid not null default gen_random_uuid (),
  project_name text not null,
  user_id uuid null,
  shared_unique_key text null,
  created_at timestamp with time zone null default now(),
  constraint projects_pkey primary key (project_id),
  constraint projects_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_projects_user_id on public.projects using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_projects_shared_key on public.projects using btree (shared_unique_key) TABLESPACE pg_default;

create table public.backups (
  id bigserial not null,
  created_at timestamp with time zone null default now(),
  project_name text null,
  backup_data jsonb null,
  backup_size integer null,
  version text null,
  created_by_name text null,
  created_by_user_id uuid null,
  project_id uuid null,
  constraint backups_pkey primary key (id),
  constraint backups_project_id_fkey foreign KEY (project_id) references projects (project_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_backups_project_created on public.backups using btree (project_name, created_at desc) TABLESPACE pg_default;

create index IF not exists idx_backups_data on public.backups using gin (backup_data) TABLESPACE pg_default;

create index IF not exists idx_backups_project_id on public.backups using btree (project_id) TABLESPACE pg_default;

create index IF not exists idx_backups_user_id on public.backups using btree (created_by_user_id) TABLESPACE pg_default;