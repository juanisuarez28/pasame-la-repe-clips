-- Drop and recreate authenticate_user function without path column
DROP FUNCTION IF EXISTS public.authenticate_user(text, text);

CREATE OR REPLACE FUNCTION public.authenticate_user(user_name text, user_password text)
 RETURNS TABLE(id bigint, username text, nombre text, created_at timestamp with time zone, password text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.nombre, u.created_at, u.password
    FROM "plr-usuarios" u
    WHERE u.username = user_name 
    AND u.password = user_password;
END;
$function$;