-- Studio-wide settings the admin edits in the app (e.g. the Higgsfield price
-- book used for cost and time estimates). Server-only, like every other table.
create table if not exists app_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table app_settings enable row level security;
