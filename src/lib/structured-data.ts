import { siteConfig } from '@/content/site'

export function generateServiceSchema(service: {
  name: string
  description: string
  features: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://${siteConfig.company.domain}/#service-${service.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: service.name,
    description: service.description,
    provider: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small and Medium Businesses',
    },
    category: 'Software Development',
    serviceType: service.name,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Features`,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
        position: index + 1,
      })),
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

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    publisher: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${siteConfig.company.domain}${url}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `https://${siteConfig.company.domain}${siteConfig.company.logo}`,
      width: 800,
      height: 600,
    },
  }
}

export function generateProjectSchema({
  name,
  description,
  technologies,
  client,
  year,
  url,
}: {
  name: string
  description: string
  technologies: string[]
  client: string
  year: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://${siteConfig.company.domain}${url}`,
    name: name,
    description: description,
    creator: {
      '@id': `https://${siteConfig.company.domain}/#organization`,
    },
    dateCreated: year,
    client: client,
    about: technologies.join(', '),
    url: `https://${siteConfig.company.domain}${url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${siteConfig.company.domain}${url}`,
    },
  }
}
