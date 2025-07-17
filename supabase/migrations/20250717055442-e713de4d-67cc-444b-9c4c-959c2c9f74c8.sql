-- Add missing fields for comprehensive onboarding flow
ALTER TABLE public.profiles 
ADD COLUMN startup_name TEXT,
ADD COLUMN startup_website TEXT,
ADD COLUMN funding_amount_seeking TEXT,
ADD COLUMN investor_type_preference TEXT[],
ADD COLUMN pitch_deck_url TEXT,
ADD COLUMN video_pitch_url TEXT,
ADD COLUMN investor_check_size TEXT,
ADD COLUMN investment_status TEXT,
ADD COLUMN preferred_sectors TEXT[],
ADD COLUMN preferred_stages TEXT[],
ADD COLUMN regional_focus TEXT[],
ADD COLUMN why_good_fit TEXT,
ADD COLUMN investor_type TEXT;