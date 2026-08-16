-- CMS pages and scheduled publishing foundation
CREATE TYPE public.page_status AS ENUM ('draft', 'scheduled', 'published', 'archived');

CREATE TABLE public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_html TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  status public.page_status NOT NULL DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  robots TEXT DEFAULT 'index,follow',
  schema_json JSONB,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cms_pages_status_published ON public.cms_pages(status, published_at DESC);
CREATE INDEX idx_cms_pages_slug ON public.cms_pages(slug);
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published pages are public" ON public.cms_pages FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));
CREATE POLICY "CMS users view all pages" ON public.cms_pages FOR SELECT
  USING (public.is_cms_user(auth.uid()));
CREATE POLICY "Editors create pages" ON public.cms_pages FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','content_editor']::public.app_role[]));
CREATE POLICY "Editors update pages" ON public.cms_pages FOR UPDATE
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','content_editor','seo_manager']::public.app_role[]));
CREATE POLICY "Admins delete pages" ON public.cms_pages FOR DELETE
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));

CREATE TRIGGER trg_cms_pages_updated BEFORE UPDATE ON public.cms_pages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.publish_scheduled_content()
RETURNS TABLE (entity_type TEXT, entity_id UUID)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  UPDATE public.cms_pages
  SET status = 'published', published_at = COALESCE(published_at, scheduled_for), scheduled_for = NULL, updated_at = now()
  WHERE status = 'scheduled' AND scheduled_for IS NOT NULL AND scheduled_for <= now()
  RETURNING 'page'::TEXT, id;

  RETURN QUERY
  UPDATE public.blog_posts
  SET status = 'published', published_at = COALESCE(published_at, scheduled_for), scheduled_for = NULL, updated_at = now()
  WHERE status = 'scheduled' AND scheduled_for IS NOT NULL AND scheduled_for <= now()
  RETURNING 'blog_post'::TEXT, id;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_scheduled_content() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_scheduled_content() TO service_role;
