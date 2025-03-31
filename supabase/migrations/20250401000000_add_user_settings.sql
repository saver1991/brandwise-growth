
-- Add columns for user profile settings to the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS settings JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_data JSONB;
