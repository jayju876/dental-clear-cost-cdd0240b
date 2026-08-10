import { createFileRoute, redirect } from "@tanstack/react-router";

// The Dental Implant Cost Calculator now lives on the homepage.
// /cost is permanently redirected (301) to /.
export const Route = createFileRoute("/cost")({
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
