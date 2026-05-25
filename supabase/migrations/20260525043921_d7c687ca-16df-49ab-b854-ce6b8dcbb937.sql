
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'content_editor', 'seo_manager');
CREATE TYPE public.post_status AS ENUM ('draft', 'scheduled', 'published');

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles public.app_role[])
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = ANY(_roles)) $$;

CREATE OR REPLACE FUNCTION public.is_cms_user(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id) $$;

-- Profiles policies
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_cms_user(auth.uid()));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Super admins update any profile" ON public.profiles FOR UPDATE USING (public.has_role(auth.uid(), 'super_admin'));

-- User roles policies
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Super admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- ============ TRIGGER: auto profile + seed super admin ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;

  IF LOWER(NEW.email) = 'drjoedispenza@dmcc.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'super_admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ CMS AUTHORS ============
CREATE TABLE public.cms_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  long_bio TEXT,
  image_url TEXT,
  credentials TEXT[] DEFAULT '{}',
  expertise TEXT[] DEFAULT '{}',
  email TEXT,
  linkedin TEXT,
  twitter TEXT,
  years_experience INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authors public read" ON public.cms_authors FOR SELECT USING (true);
CREATE POLICY "Admins manage authors" ON public.cms_authors FOR ALL
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));

-- ============ BLOG POSTS ============
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_md TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES public.cms_authors(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES public.cms_authors(id) ON DELETE SET NULL,
  status public.post_status NOT NULL DEFAULT 'draft',
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  reading_time INT,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  robots TEXT DEFAULT 'index,follow',
  schema_json JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_blog_posts_status_pub ON public.blog_posts(status, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

CREATE POLICY "Published posts public read" ON public.blog_posts FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));
CREATE POLICY "CMS users view all posts" ON public.blog_posts FOR SELECT
  USING (public.is_cms_user(auth.uid()));
CREATE POLICY "Editors create posts" ON public.blog_posts FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','content_editor']::public.app_role[]));
CREATE POLICY "Editors update posts" ON public.blog_posts FOR UPDATE
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','content_editor','seo_manager']::public.app_role[]));
CREATE POLICY "Admins delete posts" ON public.blog_posts FOR DELETE
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));

-- ============ PAGE SEO ============
CREATE TABLE public.page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  page_title TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  robots TEXT DEFAULT 'index,follow',
  schema_json JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Page SEO public read" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "SEO managers edit pages" ON public.page_seo FOR ALL
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','seo_manager']::public.app_role[]));

-- ============ MEDIA ============
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  alt_text TEXT,
  folder TEXT DEFAULT 'uploads',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media public read" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "CMS users upload media" ON public.media_assets FOR INSERT
  WITH CHECK (public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users update media" ON public.media_assets FOR UPDATE
  USING (public.is_cms_user(auth.uid()));
CREATE POLICY "Admins delete media" ON public.media_assets FOR DELETE
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));

-- ============ ACTIVITY LOG ============
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_activity_created ON public.activity_log(created_at DESC);
CREATE POLICY "Admins view activity" ON public.activity_log FOR SELECT
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));
CREATE POLICY "CMS users insert activity" ON public.activity_log FOR INSERT
  WITH CHECK (public.is_cms_user(auth.uid()));

-- ============ SITE SETTINGS ============
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Super admins edit settings" ON public.site_settings FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- ============ updated_at TRIGGERS ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_authors_updated BEFORE UPDATE ON public.cms_authors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_pageseo_updated BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ STORAGE BUCKET ============
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read cms-media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "CMS users upload cms-media" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cms-media' AND public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users update cms-media" ON storage.objects FOR UPDATE
  USING (bucket_id = 'cms-media' AND public.is_cms_user(auth.uid()));
CREATE POLICY "Admins delete cms-media" ON storage.objects FOR DELETE
  USING (bucket_id = 'cms-media' AND public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::public.app_role[]));
