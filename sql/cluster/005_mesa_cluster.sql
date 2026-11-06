-- MESA DEL CLUSTER — agente para que el cluster minero envíe información
-- (avances por minera, iniciativas, noticias, eventos, documentos…) y el
-- equipo EMRA la reciba ordenada en una bandeja con reporte semanal.
--
-- Roles (auth.users.raw_app_meta_data ->> 'rol'):
--   admin / editor  → equipo EMRA: ve y gestiona todo.
--   cluster         → persona del cluster: solo sus conversaciones, aportes
--                     y archivos. No puede escribir nada más del portal.
--
-- Ejecutar DESPUÉS de 004_paso1_revisar_usuarios.sql. Se puede re-ejecutar.

-- ─────────────────────────── 1. Funciones de rol ───────────────────────────
create or replace function public.mi_rol() returns text
  language sql stable as $$ select coalesce(auth.jwt() -> 'app_metadata' ->> 'rol', '') $$;

create or replace function public.es_equipo_emra() returns boolean
  language sql stable as $$ select public.mi_rol() in ('admin','editor') $$;

create or replace function public.es_cluster() returns boolean
  language sql stable as $$ select public.mi_rol() = 'cluster' $$;

-- ─────────────────────────── 2. Tablas ───────────────────────────
create table if not exists public.cluster_conversaciones (
  id            uuid primary key default gen_random_uuid(),
  autor_id      uuid not null default auth.uid(),
  autor_email   text,
  autor_nombre  text,
  organizacion  text,
  titulo        text not null default 'Nueva conversación',
  mensajes      jsonb not null default '[]'::jsonb,
  archivos      jsonb not null default '[]'::jsonb,  -- [{nombre, path, bytes, tipo}]
  estado        text not null default 'abierta'
                check (estado in ('abierta','enviada','revisada')),
  resumen_emra  text,                                 -- resumen que el agente deja al equipo
  enviada_at    timestamptz,
  revisada_por  text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.cluster_aportes (
  id               uuid primary key default gen_random_uuid(),
  conversacion_id  uuid not null references public.cluster_conversaciones(id) on delete cascade,
  autor_id         uuid not null default auth.uid(),
  tipo             text not null check (tipo in
                   ('avance','iniciativa','noticia','evento','documento','dato','consulta','otro')),
  titulo           text not null,
  resumen          text,           -- 1-3 frases
  detalle          text,           -- todo lo relevante, ordenado
  minera           text,           -- minera o empresa a la que corresponde
  iniciativa_id    text,           -- id en public.iniciativas, si se relaciona
  ciudad           text,
  oe               text,
  fecha            text,           -- fecha del hecho/evento (texto libre normalizado AAAA-MM-DD si se sabe)
  avance           text,           -- estado de avance: %, fase o hito
  archivos         text[] not null default '{}',   -- nombres de archivo de la conversación
  faltantes        text[] not null default '{}',
  publicar_en      text[] not null default '{}',   -- sugerencia: portal, web, redes, boletin, interno
  urgencia         text not null default 'normal' check (urgencia in ('normal','alta')),
  estado           text not null default 'borrador' check (estado in
                   ('borrador','enviado','requiere_info','publicado','archivado')),
  nota_emra        text,           -- comentario del equipo EMRA (lo ve el cluster)
  revisado_por     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.cluster_reportes (
  id            uuid primary key default gen_random_uuid(),
  desde         date not null,
  hasta         date not null,
  contenido     text not null,
  generado_por  text,
  created_at    timestamptz not null default now()
);

create index if not exists cluster_conv_autor_idx  on public.cluster_conversaciones(autor_id);
create index if not exists cluster_conv_estado_idx on public.cluster_conversaciones(estado);
create index if not exists cluster_aportes_conv_idx   on public.cluster_aportes(conversacion_id);
create index if not exists cluster_aportes_estado_idx on public.cluster_aportes(estado);

-- updated_at
create or replace function public.cluster_touch() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists cluster_conv_touch on public.cluster_conversaciones;
create trigger cluster_conv_touch before update on public.cluster_conversaciones
  for each row execute function public.cluster_touch();
drop trigger if exists cluster_aportes_touch on public.cluster_aportes;
create trigger cluster_aportes_touch before update on public.cluster_aportes
  for each row execute function public.cluster_touch();

-- El autor, su correo y su organización salen del token, no del navegador.
create or replace function public.cluster_firmar() returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.autor_id := auth.uid();
    if tg_table_name = 'cluster_conversaciones' then
      new.autor_email  := auth.jwt() ->> 'email';
      new.organizacion := coalesce(auth.jwt() -> 'app_metadata' ->> 'organizacion', new.organizacion);
    end if;
  elsif not public.es_equipo_emra() then
    new.autor_id := old.autor_id;
    if tg_table_name = 'cluster_conversaciones' then
      new.autor_email := old.autor_email; new.organizacion := old.organizacion;
      new.revisada_por := old.revisada_por;
    else
      new.nota_emra := old.nota_emra; new.revisado_por := old.revisado_por;
      new.conversacion_id := old.conversacion_id;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists cluster_conv_firmar on public.cluster_conversaciones;
create trigger cluster_conv_firmar before insert or update on public.cluster_conversaciones
  for each row execute function public.cluster_firmar();
drop trigger if exists cluster_aportes_firmar on public.cluster_aportes;
create trigger cluster_aportes_firmar before insert or update on public.cluster_aportes
  for each row execute function public.cluster_firmar();

-- ─────────────────────────── 3. RLS de las tablas nuevas ───────────────────────────
alter table public.cluster_conversaciones enable row level security;
alter table public.cluster_aportes        enable row level security;
alter table public.cluster_reportes       enable row level security;

-- Equipo EMRA: todo
drop policy if exists cluster_conv_equipo on public.cluster_conversaciones;
create policy cluster_conv_equipo on public.cluster_conversaciones
  for all to authenticated using (public.es_equipo_emra()) with check (public.es_equipo_emra());
drop policy if exists cluster_aportes_equipo on public.cluster_aportes;
create policy cluster_aportes_equipo on public.cluster_aportes
  for all to authenticated using (public.es_equipo_emra()) with check (public.es_equipo_emra());
drop policy if exists cluster_reportes_equipo on public.cluster_reportes;
create policy cluster_reportes_equipo on public.cluster_reportes
  for all to authenticated using (public.es_equipo_emra()) with check (public.es_equipo_emra());

-- Cluster: solo lo propio. No puede marcar 'revisada' ni 'publicado'/'archivado'.
drop policy if exists cluster_conv_propio_sel on public.cluster_conversaciones;
create policy cluster_conv_propio_sel on public.cluster_conversaciones
  for select to authenticated using (public.es_cluster() and autor_id = auth.uid());
drop policy if exists cluster_conv_propio_ins on public.cluster_conversaciones;
create policy cluster_conv_propio_ins on public.cluster_conversaciones
  for insert to authenticated with check (public.es_cluster() and estado = 'abierta');
drop policy if exists cluster_conv_propio_upd on public.cluster_conversaciones;
create policy cluster_conv_propio_upd on public.cluster_conversaciones
  for update to authenticated
  using (public.es_cluster() and autor_id = auth.uid())
  with check (public.es_cluster() and autor_id = auth.uid() and estado in ('abierta','enviada'));

drop policy if exists cluster_aportes_propio_sel on public.cluster_aportes;
create policy cluster_aportes_propio_sel on public.cluster_aportes
  for select to authenticated using (public.es_cluster() and autor_id = auth.uid());
drop policy if exists cluster_aportes_propio_ins on public.cluster_aportes;
create policy cluster_aportes_propio_ins on public.cluster_aportes
  for insert to authenticated with check (
    public.es_cluster() and estado in ('borrador','enviado')
    and exists (select 1 from public.cluster_conversaciones c
                where c.id = conversacion_id and c.autor_id = auth.uid()));
drop policy if exists cluster_aportes_propio_upd on public.cluster_aportes;
create policy cluster_aportes_propio_upd on public.cluster_aportes
  for update to authenticated
  using (public.es_cluster() and autor_id = auth.uid() and estado in ('borrador','enviado','requiere_info'))
  with check (public.es_cluster() and autor_id = auth.uid() and estado in ('borrador','enviado'));
drop policy if exists cluster_aportes_propio_del on public.cluster_aportes;
create policy cluster_aportes_propio_del on public.cluster_aportes
  for delete to authenticated using (public.es_cluster() and autor_id = auth.uid() and estado = 'borrador');

-- ─────────────────────────── 4. Archivos originales (Storage) ───────────────────────────
-- Bucket privado; cada persona del cluster sube a la carpeta <su uid>/<conversación>/
insert into storage.buckets (id, name, public, file_size_limit)
values ('cluster', 'cluster', false, 26214400)          -- 25 MB por archivo
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists cluster_files_ins on storage.objects;
create policy cluster_files_ins on storage.objects for insert to authenticated
  with check (bucket_id = 'cluster' and (
    public.es_equipo_emra()
    or (public.es_cluster() and (storage.foldername(name))[1] = auth.uid()::text)));
drop policy if exists cluster_files_sel on storage.objects;
create policy cluster_files_sel on storage.objects for select to authenticated
  using (bucket_id = 'cluster' and (
    public.es_equipo_emra()
    or (public.es_cluster() and (storage.foldername(name))[1] = auth.uid()::text)));
drop policy if exists cluster_files_del on storage.objects;
create policy cluster_files_del on storage.objects for delete to authenticated
  using (bucket_id = 'cluster' and (
    public.es_equipo_emra()
    or (public.es_cluster() and (storage.foldername(name))[1] = auth.uid()::text)));

-- ─────────────────────────── 5. Cerrar el resto del portal ───────────────────────────
-- Hasta ahora bastaba "tener sesión" para escribir iniciativas, portal_config,
-- borradores del recopilador, etc. Se agrega una política RESTRICTIVA (se suma
-- con AND a las existentes) en cada tabla de public con RLS:
--   · iniciativas: el cluster y cuentas sin rol pueden LEER, no escribir.
--   · cluster_*: ya tienen sus propias reglas.
--   · todo lo demás: con sesión, solo admin/editor (lectura y escritura).
-- No cambia nada para visitantes anónimos (rol anon).
do $$
declare t record;
begin
  for t in
    select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity
      and c.relname not like 'cluster\_%'
  loop
    execute format('drop policy if exists solo_equipo_emra on public.%I', t.relname);
    execute format('drop policy if exists solo_equipo_emra_ins on public.%I', t.relname);
    execute format('drop policy if exists solo_equipo_emra_upd on public.%I', t.relname);
    execute format('drop policy if exists solo_equipo_emra_del on public.%I', t.relname);
    if t.relname = 'iniciativas' then
      execute format('create policy solo_equipo_emra_ins on public.%I as restrictive for insert to authenticated with check (public.es_equipo_emra())', t.relname);
      execute format('create policy solo_equipo_emra_upd on public.%I as restrictive for update to authenticated using (public.es_equipo_emra()) with check (public.es_equipo_emra())', t.relname);
      execute format('create policy solo_equipo_emra_del on public.%I as restrictive for delete to authenticated using (public.es_equipo_emra())', t.relname);
    else
      execute format('create policy solo_equipo_emra on public.%I as restrictive for all to authenticated using (public.es_equipo_emra()) with check (public.es_equipo_emra())', t.relname);
    end if;
  end loop;
end $$;

-- Tablas de public SIN RLS (quedan abiertas a cualquiera con la clave pública).
-- Si aparece alguna, avisar para revisarla:
select c.relname as tabla_sin_rls
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity;

-- ─────────────────────────── 6. Crear una cuenta del cluster ───────────────────────────
-- 1) Supabase › Authentication › Users › "Add user" › "Create new user"
--    (correo + contraseña, marcar "Auto Confirm User").
-- 2) Asignarle rol y organización:
-- update auth.users
--    set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb)
--        || '{"rol":"cluster","organizacion":"Cluster Minero"}',
--        raw_user_meta_data = coalesce(raw_user_meta_data,'{}'::jsonb)
--        || '{"nombre":"Nombre Apellido"}'
--  where email = 'persona@empresa.cl';
-- 3) Entrar en portal.emra.cl/cluster con ese correo y contraseña.
