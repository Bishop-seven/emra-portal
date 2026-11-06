-- PASO 1 (solo lectura): revisar qué cuentas existen y qué rol tienen.
-- Ejecutar en Supabase › SQL Editor ANTES del paso 2.
--
-- Por qué: el paso 2 deja escribir en el portal solo a cuentas con rol
-- 'admin' o 'editor' en app_metadata. Hoy basta con tener sesión, y el
-- registro público de Supabase está ABIERTO (cualquiera puede crearse una
-- cuenta con su correo y, al confirmarla, podría modificar iniciativas y
-- portal_config). Las cuentas del equipo que aparezcan aquí con rol vacío
-- hay que marcarlas como editor (abajo) o perderán acceso al guardar.

select email,
       raw_app_meta_data ->> 'rol'           as rol,
       raw_app_meta_data ->> 'organizacion'  as organizacion,
       created_at::date                      as creada,
       last_sign_in_at::date                 as ultimo_acceso,
       email_confirmed_at is not null        as confirmada
from auth.users
order by (raw_app_meta_data ->> 'rol') nulls first, created_at;

-- Para marcar como editor a una cuenta del equipo que salga sin rol
-- (reemplaza el correo; NO lo hagas con cuentas que no reconozcas):
-- update auth.users
--    set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb) || '{"rol":"editor"}'
--  where email = 'persona@emra.cl';
