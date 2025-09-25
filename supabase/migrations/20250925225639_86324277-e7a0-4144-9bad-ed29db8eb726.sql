-- Enable Row Level Security on plr-videos table
ALTER TABLE public."plr-videos" ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view only their own videos
CREATE POLICY "Users can view their own videos"
ON public."plr-videos"
FOR SELECT
USING (id_usuario = (SELECT id FROM "plr-usuarios" WHERE (auth.uid())::text = (id)::text));

-- Create policy for users to insert their own videos (if needed in the future)
CREATE POLICY "Users can insert their own videos"
ON public."plr-videos"
FOR INSERT
WITH CHECK (id_usuario = (SELECT id FROM "plr-usuarios" WHERE (auth.uid())::text = (id)::text));

-- Create policy for users to update their own videos (if needed in the future)
CREATE POLICY "Users can update their own videos"
ON public."plr-videos"
FOR UPDATE
USING (id_usuario = (SELECT id FROM "plr-usuarios" WHERE (auth.uid())::text = (id)::text));

-- Create policy for users to delete their own videos (if needed in the future)
CREATE POLICY "Users can delete their own videos"
ON public."plr-videos"
FOR DELETE
USING (id_usuario = (SELECT id FROM "plr-usuarios" WHERE (auth.uid())::text = (id)::text));