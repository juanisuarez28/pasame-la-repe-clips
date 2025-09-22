-- Fix the authenticate_user function with correct data types
DROP FUNCTION public.authenticate_user(text, text);

CREATE OR REPLACE FUNCTION public.authenticate_user(user_name TEXT, user_password TEXT)
RETURNS TABLE(id BIGINT, username TEXT, password TEXT, path TEXT, nombre TEXT, created_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.password, u.path, u.nombre, u.created_at
    FROM "plr-usuarios" u
    WHERE u.username = user_name AND u.password = user_password;
END;
$$;