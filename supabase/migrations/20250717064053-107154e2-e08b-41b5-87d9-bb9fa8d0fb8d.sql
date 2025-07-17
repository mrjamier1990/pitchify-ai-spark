-- Add onboarding_completed column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;

-- Update the handle_new_user function to not complete onboarding
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, onboarding_completed)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', false);
  RETURN NEW;
END;
$function$;