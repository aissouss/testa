create extension if not exists "uuid-ossp";

create table if not exists surahs (
  id bigint primary key,
  number int unique not null,
  arabic_name text not null,
  transliteration text not null,
  french_name text not null,
  ayah_count int not null,
  juz_numbers int[] not null default '{}',
  hizb_numbers int[] not null default '{}'
);

create table if not exists user_surah_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  surah_number int not null references surahs(number) on delete cascade,
  status text not null default 'TO_MEMORIZE',
  current_ayah int not null default 0,
  last_revision_at timestamptz,
  tafsir_studied boolean not null default false,
  vocabulary_studied boolean not null default false,
  tajwid_studied boolean not null default false,
  mastery_level text not null default 'LOW',
  priority int not null default 1,
  deadline date,
  notes text not null default '',
  revision_frequency_days int not null default 7,
  updated_at timestamptz not null default now(),
  unique(user_id, surah_number)
);

create table if not exists revision_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  surah_number int not null references surahs(number),
  revised_at timestamptz not null default now(),
  notes text default ''
);

create table if not exists study_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  surah_number int not null references surahs(number),
  tafsir_source text not null default '',
  summary text not null default '',
  tajwid_rules text not null default '',
  themes text not null default '',
  benefits text not null default '',
  reflections text not null default '',
  updated_at timestamptz not null default now(),
  unique(user_id, surah_number)
);

create table if not exists notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  surah_number int references surahs(number),
  title text not null,
  content text not null,
  category text not null default 'GENERAL',
  updated_at timestamptz not null default now()
);

alter table user_surah_progress enable row level security;
alter table revision_entries enable row level security;
alter table study_entries enable row level security;
alter table notes enable row level security;

create policy "users read own progress" on user_surah_progress for select using (auth.uid() = user_id);
create policy "users write own progress" on user_surah_progress for all using (auth.uid() = user_id);
create policy "users read own revisions" on revision_entries for select using (auth.uid() = user_id);
create policy "users write own revisions" on revision_entries for all using (auth.uid() = user_id);
create policy "users read own study" on study_entries for select using (auth.uid() = user_id);
create policy "users write own study" on study_entries for all using (auth.uid() = user_id);
create policy "users read own notes" on notes for select using (auth.uid() = user_id);
create policy "users write own notes" on notes for all using (auth.uid() = user_id);
