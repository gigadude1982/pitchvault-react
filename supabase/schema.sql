-- ============================================================
-- PitchVault — Supabase Schema
-- Run this in the Supabase SQL editor before seeding
-- ============================================================

create table creators (
  id serial primary key,
  name text not null,
  handle text not null,
  niche text,
  tags text[] default '{}',
  emoji text,
  bg text,
  saved boolean default false,
  badges text[] default '{}',
  reach text,
  engagement text,
  completed integer default 0,
  rate text,
  rate_num integer,
  bio text,
  portfolio text[] default '{}',
  brands text[] default '{}',
  rating numeric(3,1) default 0,
  created_at timestamptz default now()
);

create table creator_reviews (
  id serial primary key,
  creator_id integer references creators(id) on delete cascade,
  brand text,
  rating numeric(3,1),
  review_text text,
  review_date text,
  created_at timestamptz default now()
);

create table payments (
  id serial primary key,
  creator text,
  campaign text,
  amount numeric(10,2),
  status text default 'pending',
  status_label text,
  created_at timestamptz default now()
);

create table deals (
  id serial primary key,
  brand text,
  campaign text,
  deliverable text,
  budget numeric(10,2),
  deadline text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table campaigns (
  id serial primary key,
  title text,
  budget text,
  status text default 'Active',
  applied integer default 0,
  selected integer default 0,
  deadline text,
  created_at timestamptz default now()
);

create table products (
  id serial primary key,
  title text,
  creator text,
  handle text,
  category text,
  tags text[] default '{}',
  emoji text,
  bg text,
  price numeric(10,2),
  sales integer default 0,
  commission integer default 30,
  created_at timestamptz default now()
);

create table chats (
  id serial primary key,
  name text,
  init text,
  campaign text,
  status text,
  status_class text,
  unread boolean default false,
  revisions integer default 0,
  max_revisions integer default 3,
  preview text,
  created_at timestamptz default now()
);

create table messages (
  id serial primary key,
  chat_id integer references chats(id) on delete cascade,
  from_role text,
  message_text text,
  file_name text,
  file_type text,
  delivery boolean default false,
  sent_time text,
  created_at timestamptz default now()
);

create table analytics_stats (
  id serial primary key,
  label text,
  value text,
  delta text
);

create table analytics_monthly (
  id serial primary key,
  month text,
  gmv numeric(12,2)
);

create table analytics_niches (
  id serial primary key,
  label text,
  pct integer
);

create table subscription_features (
  id serial primary key,
  label text,
  monthly boolean default false,
  annual boolean default false
);

create table creator_profile (
  id serial primary key,
  name text,
  handle text,
  niche text,
  tags text[] default '{}',
  emoji text,
  reach text,
  engagement text,
  completed integer default 0,
  streak integer default 0,
  milestone integer default 0,
  milestone_target integer default 25,
  leaderboard_rank integer default 0
);

create table creator_earnings (
  id serial primary key,
  month text,
  amount numeric(10,2)
);
