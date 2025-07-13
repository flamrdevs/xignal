import type { APIRoute } from 'astro';

const getRobotsTxt = ({sitemapURL}:{sitemapURL: URL}) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  
  return new Response(getRobotsTxt({sitemapURL: new URL('sitemap-index.xml', site)}));
};