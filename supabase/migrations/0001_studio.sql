-- Muse Studio schema. Run once in the Supabase SQL editor (or `supabase db push`).
--
-- All reads and writes go through the app's server, which connects with
-- DATABASE_URL and scopes every query to the signed-in member. Row level
-- security is enabled with no policies, so the public Supabase API
-- (anon/publishable key) cannot read or write these tables at all.

create table if not exists profiles (
  user_id        text primary key,           -- Supabase auth user id
  email          text not null,
  is_member      boolean not null default false,
  has_performance boolean not null default false,
  share_winners  boolean not null default true,  -- opt-in to the community winners pool
  created_at     timestamptz not null default now()
);

-- One row per member: their library. JSON because it's always loaded and saved whole.
create table if not exists studios (
  user_id     text primary key references profiles(user_id) on delete cascade,
  bible       jsonb,
  characters  jsonb not null default '[]',
  locations   jsonb not null default '[]',
  products    jsonb not null default '[]',
  updated_at  timestamptz not null default now()
);

-- Episodes, ads and transitions. `data` is the whole project; the other
-- columns are copies used for search, stats and the winners pool.
create table if not exists projects (
  id          text primary key,
  user_id     text not null references profiles(user_id) on delete cascade,
  kind        text not null,
  title       text not null default '',
  hook_style  text not null default '',
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists projects_user_idx on projects(user_id, updated_at desc);

-- A published video. Linked to the studio project it came from, when there is one.
create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null references profiles(user_id) on delete cascade,
  project_id  text references projects(id) on delete set null,
  platform    text not null check (platform in ('tiktok', 'instagram', 'youtube')),
  url         text not null,
  hook_used   text not null default '',     -- the opening line actually posted
  posted_on   date,
  created_at  timestamptz not null default now(),
  unique (user_id, url)
);
create index if not exists posts_user_idx on posts(user_id);

-- Performance snapshots. Members add one a week; connected accounts add them automatically.
create table if not exists checkins (
  id                uuid primary key default gen_random_uuid(),
  post_id           uuid not null references posts(id) on delete cascade,
  user_id           text not null references profiles(user_id) on delete cascade,
  recorded_on       date not null default current_date,
  views             integer not null check (views >= 0),
  likes             integer not null default 0 check (likes >= 0),
  comments          integer not null default 0 check (comments >= 0),
  shares            integer not null default 0 check (shares >= 0),
  saves             integer not null default 0 check (saves >= 0),
  follows           integer not null default 0 check (follows >= 0),
  sales             integer not null default 0 check (sales >= 0),
  source            text not null default 'self' check (source in ('self', 'api')),
  created_at        timestamptz not null default now(),
  unique (post_id, recorded_on)
);
create index if not exists checkins_post_idx on checkins(post_id, recorded_on desc);

-- Candidate and approved winners. A snapshot, so it survives edits to the project.
create table if not exists winners (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null unique references posts(id) on delete cascade,
  user_id     text not null references profiles(user_id) on delete cascade,
  kind        text not null,
  niche       text not null default '',
  hook_style  text not null default '',
  hook        text not null default '',
  excerpt     text not null default '',      -- the opening beats, for use as an example
  score       real not null,                 -- views relative to the member's own median
  views       integer not null,
  status      text not null default 'candidate' check (status in ('candidate', 'approved', 'rejected')),
  admin_note  text not null default '',
  reviewed_at timestamptz,
  created_at  timestamptz not null default now()
);
create index if not exists winners_status_idx on winners(status, kind, score desc);

alter table profiles enable row level security;
alter table studios  enable row level security;
alter table projects enable row level security;
alter table posts    enable row level security;
alter table checkins enable row level security;
alter table winners  enable row level security;
