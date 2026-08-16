export type InternalLink = { to: string; params?: Record<string, string>; label: string; body?: string };

export type LinkGroup = { title: string; links: InternalLink[] };

/**
 * Related-page navigation has been intentionally removed from the public page layouts.
 * The component remains as a no-op for existing route imports so those routes stay stable.
 */
export function InternalLinks(_props: { heading?: string; groups?: LinkGroup[] } = {}) {
  return null;
}
