-- 006: gestionar roles (admin / editor / cluster) y organización desde
-- Admin › Seguridad del portal, sin tocar el worker.
-- El worker sigue creando, suspendiendo y borrando cuentas; el rol y la
-- organización se fijan con estas dos funciones, que solo puede usar un admin.
-- Ejecutar DESPUÉS de 005. Se puede re-ejecutar.

create or replace function public.admin_set_rol(uid uuid, nuevo_rol text, org text default null)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if public.mi_rol() <> 'admin' then raise exception 'Solo un administrador puede cambiar roles'; end if;
  if nuevo_rol not in ('admin','editor','cluster') then raise exception 'Rol no válido: %', nuevo_rol; end if;
  if uid = auth.uid() and nuevo_rol <> 'admin' then raise exception 'No puedes quitarte el rol de administrador'; end if;
  update auth.users
     set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb)
         || jsonb_build_object('rol', nuevo_rol)
         || case when org is null then '{}'::jsonb
                 when btrim(org) = '' then jsonb_build_object('organizacion', null)
                 else jsonb_build_object('organizacion', btrim(org)) end
   where id = uid;
  if not found then raise exception 'Usuario no encontrado'; end if;
end $$;

create or replace function public.admin_roles()
returns table (id uuid, rol text, organizacion text)
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if public.mi_rol() <> 'admin' then raise exception 'Solo administradores'; end if;
  return query
    select u.id, coalesce(u.raw_app_meta_data ->> 'rol', ''), u.raw_app_meta_data ->> 'organizacion'
      from auth.users u;
end $$;

revoke all on function public.admin_set_rol(uuid,text,text) from public, anon;
revoke all on function public.admin_roles() from public, anon;
grant execute on function public.admin_set_rol(uuid,text,text) to authenticated;
grant execute on function public.admin_roles() to authenticated;
