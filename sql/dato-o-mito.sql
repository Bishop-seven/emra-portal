-- ¿Dato o mito? · medición de la campaña
-- Ejecutar una vez en Supabase (proyecto del portal EMRA) → SQL Editor → pegar todo → Run.
-- Se puede volver a ejecutar sin problema: no borra datos.
--
-- Qué guarda: un evento por cada paso del juego. Es anónimo: "visitante" es un código al azar que
-- el navegador guarda para reconocer a la misma persona si vuelve; "sesion" cambia en cada visita.
-- Permisos: desde la página (clave pública) solo se pueden AGREGAR filas, nunca leerlas.
-- Leer los datos y las vistas de resumen requiere sesión iniciada en el admin del portal.

create table if not exists public.dm_eventos (
  id         uuid primary key default gen_random_uuid(),
  creado     timestamptz not null default now(),
  tipo       text not null,
  visitante  text not null,
  sesion     text not null,
  fuente     text,
  campana    text,
  embebido   boolean not null default false,
  tarjeta    text,
  acierto    boolean,
  aciertos   int,
  total      int
);

create index if not exists dm_eventos_creado_idx on public.dm_eventos (creado);
create index if not exists dm_eventos_tipo_idx   on public.dm_eventos (tipo);

alter table public.dm_eventos enable row level security;

-- La página solo puede agregar eventos válidos (tipos conocidos y textos de largo acotado).
drop policy if exists "dm_eventos: la página agrega" on public.dm_eventos;
create policy "dm_eventos: la página agrega" on public.dm_eventos
  for insert to anon, authenticated
  with check (
    tipo in ('entra','empieza','responde','termina','comparte','sigue_mineria','conoce_emra','otra_vez')
    and length(visitante) <= 40 and length(sesion) <= 40
    and coalesce(length(fuente), 0) <= 60 and coalesce(length(campana), 0) <= 60
    and coalesce(length(tarjeta), 0) <= 200
    and (aciertos is null or aciertos between 0 and 100)
    and (total is null or total between 0 and 100)
  );

-- Leer: solo usuarios con sesión del admin.
drop policy if exists "dm_eventos: el admin lee" on public.dm_eventos;
create policy "dm_eventos: el admin lee" on public.dm_eventos
  for select to authenticated using (true);

revoke all on public.dm_eventos from anon;
grant insert on public.dm_eventos to anon;
grant insert, select on public.dm_eventos to authenticated;

-- ── Vistas de resumen (las usa la pestaña "Dato o mito" del admin) ──
-- security_invoker: las vistas respetan los permisos de quien consulta (el público no puede leerlas).
-- Las fechas van en hora de Chile.

-- Personas distintas y eventos por paso, en total y por fuente (fuente null = todas las fuentes).
create or replace view public.dm_resumen with (security_invoker = on) as
select fuente, tipo,
       count(*)::int                  as eventos,
       count(distinct visitante)::int as personas
from public.dm_eventos
group by grouping sets ((fuente, tipo), (tipo));

-- Por día (para ver el efecto de cada publicación).
create or replace view public.dm_por_dia with (security_invoker = on) as
select (creado at time zone 'America/Santiago')::date as dia, tipo,
       count(distinct visitante)::int as personas
from public.dm_eventos
group by 1, 2;

-- Qué tarjetas se aciertan y cuáles se fallan.
create or replace view public.dm_tarjetas with (security_invoker = on) as
select tarjeta,
       count(*)::int                                 as respuestas,
       count(*) filter (where acierto)::int          as aciertos,
       round(100.0 * count(*) filter (where acierto) / nullif(count(*), 0))::int as pct_acierto
from public.dm_eventos
where tipo = 'responde' and tarjeta is not null
group by tarjeta;

-- Puntaje de los juegos terminados.
create or replace view public.dm_puntajes with (security_invoker = on) as
select count(*)::int                                   as juegos,
       round(avg(aciertos)::numeric, 1)                as promedio,
       round(100.0 * avg(aciertos::numeric / nullif(total, 0)))::int as pct_promedio
from public.dm_eventos
where tipo = 'termina';

revoke all on public.dm_resumen, public.dm_por_dia, public.dm_tarjetas, public.dm_puntajes from anon;
grant select on public.dm_resumen, public.dm_por_dia, public.dm_tarjetas, public.dm_puntajes to authenticated;
