import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { GoogleTagManager } from "@/components/site/GoogleTagManager";
import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";
import { CustomCodeInjector } from "@/components/site/CustomCodeInjector";
import { DynamicPageSeo } from "@/components/site/DynamicPageSeo";
import { SchemaInjector } from "@/components/site/SchemaInjector";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "UDDICvLjeg4CkqawYoCKpy0QSfZ3bgahLfNBOR9e2EM" },
      { title: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { name: "author", content: "ImplantCost" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ImplantCost" },
      { property: "og:title", content: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { property: "og:description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "twitter:description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68d5f80c-21bd-4da1-866c-ef3f08225959/id-preview-7f3ae137--8d8eb8f4-6d21-431d-a5a0-f4ddd546fa75.lovable.app-1780030056245.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68d5f80c-21bd-4da1-866c-ef3f08225959/id-preview-7f3ae137--8d8eb8f4-6d21-431d-a5a0-f4ddd546fa75.lovable.app-1780030056245.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5909416740227116",
        async: true,
        crossOrigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ImplantCost",
          url: "https://dentalimplantcalculator.lovable.app/",
          description: "America's dental implant cost estimation platform — instant cost, loan and ratio calculators.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleTagManager />
        <GoogleAnalytics />
        <CustomCodeInjector />
        <DynamicPageSeo />
        <SchemaInjector />
        {isAdmin ? (
          <>
            <Outlet />
            <Toaster richColors position="top-center" />
          </>
        ) : (
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <StickyCTA />
            <Toaster richColors position="top-center" />
          </div>
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
}
