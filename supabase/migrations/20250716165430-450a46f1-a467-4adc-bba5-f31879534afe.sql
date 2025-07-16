-- Add new social media URL columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN instagram_url TEXT,
ADD COLUMN facebook_url TEXT,
ADD COLUMN tiktok_url TEXT;