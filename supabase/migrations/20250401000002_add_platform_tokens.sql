
-- Create table for storing platform authentication tokens
CREATE TABLE IF NOT EXISTS public.platform_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, platform)
);

-- Add RLS policies
ALTER TABLE public.platform_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only view their own tokens
CREATE POLICY "Users can view their own platform tokens"
  ON public.platform_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own tokens
CREATE POLICY "Users can insert their own platform tokens"
  ON public.platform_tokens
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own tokens
CREATE POLICY "Users can update their own platform tokens"
  ON public.platform_tokens
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own tokens
CREATE POLICY "Users can delete their own platform tokens"
  ON public.platform_tokens
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at column
CREATE TRIGGER update_platform_tokens_updated_at
BEFORE UPDATE ON public.platform_tokens
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
