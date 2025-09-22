-- Fix critical security issues in plr-usuarios table

-- First, drop the overly permissive RLS policy
DROP POLICY IF EXISTS "Allow authenticated access to plr-usuarios" ON "plr-usuarios";

-- Create a more restrictive RLS policy - users can only see their own records
CREATE POLICY "Users can only access their own records" 
ON "plr-usuarios" 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Add password hashing function (using pgcrypto extension)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a function to hash passwords using bcrypt
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf', 10));
END;
$$;

-- Create a function to verify passwords
CREATE OR REPLACE FUNCTION public.verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN crypt(password, hash) = hash;
END;
$$;

-- Update the authenticate_user function to work with hashed passwords
DROP FUNCTION IF EXISTS public.authenticate_user(text, text);

CREATE OR REPLACE FUNCTION public.authenticate_user(user_name TEXT, user_password TEXT)
RETURNS TABLE(id BIGINT, username TEXT, path TEXT, nombre TEXT, created_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.path, u.nombre, u.created_at
    FROM "plr-usuarios" u
    WHERE u.username = user_name 
    AND verify_password(user_password, u.password);
END;
$$;

-- Hash existing plaintext passwords (if any exist)
-- This will convert all existing plaintext passwords to hashed versions
UPDATE "plr-usuarios" 
SET password = hash_password(password) 
WHERE password IS NOT NULL 
AND length(password) < 60; -- bcrypt hashes are typically 60 characters

-- Create a function for creating new users with hashed passwords
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