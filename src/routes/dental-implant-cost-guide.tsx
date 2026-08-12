import { createFileRoute, redirect } from "@tanstack/react-router";

// The cost guide content now lives on the homepage.
// /dental-implant-cost-guide is permanently redirected (301) to /.
export const Route = createFileRoute("/dental-implant-cost-guide")({
  server: {
    handlers: {
      GET: async () => new Response(null, { status: 301, headers: { Location: "/" } }),
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
  component: () => null,
});
