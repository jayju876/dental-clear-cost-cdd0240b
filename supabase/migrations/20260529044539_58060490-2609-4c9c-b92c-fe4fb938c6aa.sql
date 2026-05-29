
-- 1. set_updated_at: fix mutable search_path
ALTER FUNCTION public.set_updated_at() SET search_path = public;

-- 2. Revoke direct API EXECUTE on SECURITY DEFINER helpers from public/anon
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_cms_user(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_cms_user(uuid) TO authenticated;

-- 3. cms_authors: hide email column from anon (public can still read other columns)
REVOKE SELECT ON public.cms_authors FROM anon;
GRANT SELECT (id, slug, name, role, bio, long_bio, image_url, credentials, expertise,
              linkedin, twitter, years_experience, created_at, updated_at)
  ON public.cms_authors TO anon;

-- 4. profiles: restrict cross-user reads to admin/super_admin only
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'admin'::app_role])
  );

-- 5. site_settings: restrict public reads to a whitelist of safe keys
DROP POLICY IF EXISTS "Settings public read" ON public.site_settings;
CREATE POLICY "Public settings keys are readable"
  ON public.site_settings
  FOR SELECT
  USING (
    key IN (
      'site_name',
      'site_description',
      'site_logo',
      'site_favicon',
      'google_tag_manager_id',
      'google_analytics_id',
      'custom_head_code',
      'custom_body_code',
      'robots_txt',
      'social_links',
      'contact_public'
    )
  );
CREATE POLICY "CMS users read all settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (public.is_cms_user(auth.uid()));

-- 6. storage: prevent anonymous listing of cms-media (public file URLs still work)
DROP POLICY IF EXISTS "Public read cms-media" ON storage.objects;
CREATE POLICY "Authenticated list cms-media"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'cms-media');
