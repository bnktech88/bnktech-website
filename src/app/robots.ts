import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/\.well-known/',
      ],
    },
    sitemap: 'https://www.bnktech.net/sitemap.xml',
  }
}
