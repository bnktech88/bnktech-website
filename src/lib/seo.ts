import { siteConfig } from '@/content/site'
import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title 
    ? `${title} | ${siteConfig.company.name}`
    : siteConfig.seo.title

  const seoDescription = description || siteConfig.seo.description
  const seoImage = image || siteConfig.seo.ogImage
  const seoUrl = url ? `https://${siteConfig.company.domain}${url}` : `https://${siteConfig.company.domain}`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords || siteConfig.seo.keywords,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: siteConfig.company.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: siteConfig.company.name,
        },
      ],
      locale: 'en_ZA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: siteConfig.seo.twitterHandle,
    },
    alternates: {
      canonical: seoUrl,
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.company.name,
    url: `https://${siteConfig.company.domain}`,
    logo: `https://${siteConfig.company.domain}${siteConfig.company.logo}`,
    description: siteConfig.seo.description,
    email: siteConfig.company.email,
    telephone: siteConfig.company.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.github,
    ].filter(Boolean),
  }
}
