-- Fix function search path security warnings

-- Update hash_password function to set search_path
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf', 10));
END;
$$;

-- Update verify_password function to set search_path
CREATE OR REPLACE FUNCTION public.verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN crypt(password, hash) = hash;
END;
$$;

-- Update create_user function to set search_path
CREATE OR REPLACE FUNCTION public.create_user(
    user_name TEXT, 
    user_password TEXT, 
    user_nombre TEXT DEFAULT 'toro',
    user_path TEXT DEFAULT ''
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_user_id BIGINT;
BEGIN
    INSERT INTO "plr-usuarios" (username, password, nombre, path)
    VALUES (user_name, hash_password(user_password), user_nombre, user_path)
    RETURNING id INTO new_user_id;
    
    RETURN new_user_id;
END;
$$;