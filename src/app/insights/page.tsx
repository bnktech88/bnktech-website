import { generateSEO } from '@/lib/seo'
import { articles, categories as articleCategories } from '@/content/articles'
import Link from 'next/link'
import { ArrowRight, Clock, User, Search, TrendingUp, BookOpen, Calendar, Code } from 'lucide-react'

export const metadata = generateSEO({
  title: 'Technical Insights & Resources | BNK Tech',
  description: 'Technical articles, performance guides, and web development insights. Stay updated with the latest in web development, SEO, and digital infrastructure.',
  keywords: 'web development blog, technical articles, performance optimization, SEO guides, Next.js tutorials, technical insights, South Africa',
  url: '/insights'
})

// Placeholder articles for now - these would be dynamic in a full implementation
const featuredArticles = [
  {
    title: 'Core Web Vitals: The Complete Guide for 2024',
    excerpt: 'Understanding Google\'s Core Web Vitals and how to optimize your website for better performance and search rankings.',
    category: 'Performance',
    readTime: '8 min read',
    date: '2024-01-15',
    slug: 'core-web-vitals-guide-2024',
    icon: TrendingUp
  },
  {
    title: 'Next.js 14 Performance Optimization Techniques',
    excerpt: 'Advanced strategies for building lightning-fast Next.js applications with the latest features and optimizations.',
    category: 'Development',
    readTime: '12 min read',
    date: '2024-01-10',
    slug: 'nextjs-14-performance-optimization',
    icon: Code
  },
  {
    title: 'Technical SEO Checklist for Developers',
    excerpt: 'A comprehensive technical SEO checklist covering all the essential elements for better search visibility.',
    category: 'SEO',
    readTime: '10 min read',
    date: '2024-01-05',
    slug: 'technical-seo-checklist-developers',
    icon: Search
  }
]

const categories = [
  {
    name: 'Performance',
    description: 'Speed optimization, Core Web Vitals, and performance monitoring',
    count: 8,
    color: 'bg-blue-500'
  },
  {
    name: 'Development', 
    description: 'Next.js, TypeScript, and modern web development practices',
    count: 12,
    color: 'bg-green-500'
  },
  {
    name: 'SEO',
    description: 'Technical SEO, search optimization, and ranking strategies',
    count: 6,
    color: 'bg-purple-500'
  },
  {
    name: 'Security',
    description: 'Website security, maintenance, and best practices',
    count: 4,
    color: 'bg-red-500'
  }
]

const upcomingTopics = [
  'Building Progressive Web Apps with Next.js',
  'Advanced TypeScript Patterns for Web Development',
  'Database Optimization for High-Traffic Websites',
  'Serverless Architecture Best Practices',
  'Advanced Analytics and Conversion Tracking',
  'Modern CSS Techniques for Better Performance'
]

export default function InsightsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Technical Insights & Resources
            </h1>
            <p className="text-xl md:text-2xl text-navy mb-8 text-balance">
              In-depth technical articles, performance guides, and development insights 
              from our engineering team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Get Technical Consultation
              </Link>
              <Link 
                href="/services"
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="bg-bnk-navy py-16">
        <div className="container">
          <div className="bg-bnk-gold/10 rounded-xl p-8 text-center border border-bnk-gold/20">
            <h2 className="text-2xl font-bold mb-4 text-bnk-gold">
              Content Library Coming Soon
            </h2>
            <p className="text-bnk-gold/80 mb-6 max-w-2xl mx-auto">
              We're preparing comprehensive technical resources and insights to help you build better web applications. 
              In the meantime, get direct technical guidance through our consultation services.
            </p>
            <Link 
              href="/contact"
              className="bg-bnk-bronze text-white px-6 py-3 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200 inline-flex items-center"
            >
              Get Technical Support <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Latest Insights & Guides
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Technical articles, guides, and insights to help your business succeed online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, index) => (
              <Link 
                key={article.id} 
                href={`/insights/${article.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 group"
              >
                <div className="p-8">
                  <div className="w-12 h-12 bg-bnk-navy rounded-lg flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 text-bnk-gold" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-bnk-bronze text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-navy group-hover:text-bnk-bronze transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.datePublished).toLocaleDateString('en-ZA', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span className="text-bnk-bronze font-medium text-sm group-hover:text-bnk-navy transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Content Categories
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Technical content organized by expertise areas for easy navigation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-bnk-gold/10 rounded-xl p-6 text-center">
                <div className={`w-4 h-4 ${category.color} rounded-full mx-auto mb-4`}></div>
                <h3 className="text-xl font-semibold mb-3 text-bnk-gold">
                  {category.name}
                </h3>
                <p className="text-bnk-gold/80 text-sm mb-4">
                  {category.description}
                </p>
                <div className="text-bnk-bronze font-medium">
                  {category.count} articles planned
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Topics */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-navy">
                Upcoming Topics
              </h2>
              <p className="text-xl text-navy max-w-2xl mx-auto">
                Technical guides and insights we're working on to help you build better web applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center">
                  <div className="w-2 h-2 bg-bnk-bronze rounded-full mr-4 flex-shrink-0" />
                  <span className="text-navy font-medium">{topic}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-navy/70 mb-6">
                Have a specific technical question or topic request?
              </p>
              <Link 
                href="/contact"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Placeholder */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Stay Updated
            </h2>
            <p className="text-xl text-bnk-gold/80 mb-8">
              Be the first to know when we publish new technical insights and resources.
            </p>
            
            <div className="bg-bnk-gold/10 rounded-xl p-8 border border-bnk-gold/20">
              <p className="text-bnk-gold/80 mb-6">
                Newsletter signup coming soon. For now, follow us on social media or contact us directly 
                for technical updates and consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="bg-bnk-bronze text-white px-6 py-3 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200"
                >
                  Get Technical Updates
                </Link>
                <Link 
                  href="/services"
                  className="border border-bnk-gold text-bnk-gold px-6 py-3 rounded-lg font-medium hover:bg-bnk-gold hover:text-bnk-navy transition-all duration-200"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
