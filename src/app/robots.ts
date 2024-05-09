import { MetadataRoute } from 'next'

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/download',
    },
    sitemap: `https://${hostname}/sitemap.xml`,
  }
}