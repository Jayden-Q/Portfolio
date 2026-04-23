import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jaydenqin.com"

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-04-23'),
    },
  ]
}