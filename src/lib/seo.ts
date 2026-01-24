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
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `https://${siteConfig.company.domain}/#organization`,
    name: siteConfig.company.name,
    alternateName: 'BNK Tech',
    url: `https://${siteConfig.company.domain}`,
    logo: `https://${siteConfig.company.domain}${siteConfig.company.logo}`,
    image: `https://${siteConfig.company.domain}${siteConfig.company.logo}`,
    description: siteConfig.seo.description,
    email: siteConfig.company.email,
    telephone: siteConfig.company.phone,
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
      addressRegion: 'Gauteng',
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    knowsAbout: [
      'Web Development',
      'Mobile App Development', 
      'Software Development',
      'UI/UX Design',
      'Business Systems',
      'E-commerce Development',
      'Progressive Web Apps',
      'Healthcare Technology',
      'Fintech Solutions',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description: 'Professional web development and design services',
        },
      },
      {
        '@type': 'Offer', 
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile application development',
        },
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.company.phone,
      email: siteConfig.company.email,
      contactType: 'customer service',
      areaServed: 'ZA',
      availableLanguage: ['English'],
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.github,
    ].filter(Boolean),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `https://${siteConfig.company.domain}/#website`,
    url: `https://${siteConfig.company.domain}`,
    name: siteConfig.company.name,
    description: siteConfig.seo.description,
    publisher: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://${siteConfig.company.domain}${item.url}`,
    })),
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
  price?: string
  features: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `https://${siteConfig.company.domain}${service.url}`,
    provider: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'ZAR',
        availability: 'https://schema.org/InStock',
      }
    }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://${siteConfig.company.domain}${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || siteConfig.company.name,
    },
    publisher: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image,
        width: 1200,
        height: 630,
      }
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${siteConfig.company.domain}${article.url}`,
    },
  }
}
