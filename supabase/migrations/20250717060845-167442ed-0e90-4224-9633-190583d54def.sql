-- Create function for complete account deletion
CREATE OR REPLACE FUNCTION public.delete_user_completely(user_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete user matches
  DELETE FROM public.matches WHERE user_id = delete_user_completely.user_id OR matched_user_id = delete_user_completely.user_id;
  
  -- Delete user profile
  DELETE FROM public.profiles WHERE user_id = delete_user_completely.user_id;
  
  -- Delete from auth.users (this will cascade to related auth tables)
  DELETE FROM auth.users WHERE id = delete_user_completely.user_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;