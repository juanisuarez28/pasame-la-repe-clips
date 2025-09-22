-- Create a function to authenticate users from the plr-usuarios table
CREATE OR REPLACE FUNCTION authenticate_user(user_name text, user_password text)
RETURNS TABLE(id bigint, username text, password text, path text, created_at timestamptz)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.username, u.password, u.path, u.created_at
  FROM "plr-usuarios" u
  WHERE u.username = user_name AND u.password = user_password;
END;
$$;