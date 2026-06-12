import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  server: {
    handlers: {
      GET: async () => Response.redirect(new URL("/", "http://placeholder").toString().replace("http://placeholder", ""), 301),
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/", code: 301 });
  },
  component: () => null,
});
