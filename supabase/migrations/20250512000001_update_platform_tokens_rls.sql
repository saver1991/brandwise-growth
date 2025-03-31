
-- First, check if RLS is enabled for the platform_tokens table
ALTER TABLE IF EXISTS public.platform_tokens ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies for platform_tokens to ensure we have a clean slate
DROP POLICY IF EXISTS "Users can view their own platform tokens" ON public.platform_tokens;
DROP POLICY IF EXISTS "Users can insert their own platform tokens" ON public.platform_tokens;
DROP POLICY IF EXISTS "Users can update their own platform tokens" ON public.platform_tokens;
DROP POLICY IF EXISTS "Users can delete their own platform tokens" ON public.platform_tokens;

-- Re-create policies for platform_tokens table
-- Users can view their own tokens
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
