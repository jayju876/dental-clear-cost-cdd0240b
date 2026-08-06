GRANT INSERT ON TABLE public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO authenticated;
GRANT ALL ON TABLE public.leads TO service_role;