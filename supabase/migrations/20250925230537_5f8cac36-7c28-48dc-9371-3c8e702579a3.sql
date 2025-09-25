-- Disable RLS on plr-videos table since we're using custom authentication
ALTER TABLE public."plr-videos" DISABLE ROW LEVEL SECURITY;

-- Drop the existing policies
DROP POLICY IF EXISTS "Users can view their own videos" ON public."plr-videos";
DROP POLICY IF EXISTS "Users can insert their own videos" ON public."plr-videos";
DROP POLICY IF EXISTS "Users can update their own videos" ON public."plr-videos";
DROP POLICY IF EXISTS "Users can delete their own videos" ON public."plr-videos";