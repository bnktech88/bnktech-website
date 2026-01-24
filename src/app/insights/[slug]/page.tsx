import { notFound } from 'next/navigation'
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { articles, type Article } from '@/content/articles'
import ArticleDetail from '@/components/sections/ArticleDetail'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  
  if (!article) {
    return {}
  }

  return generateSEO({
    title: article.title,
    description: article.description,
    keywords: article.keywords.join(', '),
    url: `/insights/${article.slug}`
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    url: `/insights/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: article.author
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: article.title, url: `/insights/${article.slug}` }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleDetail article={article} />
    </>
  )
}
