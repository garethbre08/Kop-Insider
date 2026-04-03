create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  source_journalist text not null,
  source_outlet text not null,
  source_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_opinion boolean default false,
  is_featured boolean default false,
  image_url text,
  match_related boolean default false
);

alter table articles enable row level security;

create policy "Articles are viewable by everyone"
  on articles for select
  using (true);

create policy "Articles can be inserted by service"
  on articles for insert
  with check (true);
