import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL("/", request.url);
        return new Response(null, { status: 301, headers: { Location: url.toString() } });
      },
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/", code: 301 });
  },
  component: () => null,
});
