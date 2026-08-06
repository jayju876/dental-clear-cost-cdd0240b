-- Allow public contact form submissions
CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (true);

GRANT INSERT ON public.leads TO anon;

-- Fix "permission denied for function has_role" on public reads of site_settings
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_cms_user(uuid) TO anon, authenticated;