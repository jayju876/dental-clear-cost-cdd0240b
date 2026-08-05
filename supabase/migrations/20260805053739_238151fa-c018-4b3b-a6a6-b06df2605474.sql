CREATE TYPE public.lead_status AS ENUM ('new','contacted','closed');

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status public.lead_status NOT NULL DEFAULT 'new',
  source text DEFAULT 'contact_form',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CMS users view leads" ON public.leads FOR SELECT TO authenticated USING (public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_cms_user(auth.uid())) WITH CHECK (public.is_cms_user(auth.uid()));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role,'admin'::app_role]));

CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);