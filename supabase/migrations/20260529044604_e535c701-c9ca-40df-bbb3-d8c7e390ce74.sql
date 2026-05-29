
DROP POLICY IF EXISTS "Authenticated list cms-media" ON storage.objects;
CREATE POLICY "CMS users list cms-media"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'cms-media' AND public.is_cms_user(auth.uid()));
