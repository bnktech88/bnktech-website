'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Tag, ExternalLink } from 'lucide-react'
import type { Article } from '@/content/articles'

interface ArticleDetailProps {
  article: Article
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb & Navigation */}
      <section className="bg-bnk-navy py-8">
        <div className="container">
          <div className="flex items-center gap-2 text-bnk-gold/80 text-sm mb-4">
            <Link href="/" className="hover:text-bnk-gold">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-bnk-gold">Insights</Link>
            <span>/</span>
            <span className="text-bnk-gold">{article.title}</span>
          </div>
          
          <Link 
            href="/insights"
            className="inline-flex items-center text-bnk-gold hover:text-bnk-bronze transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-bnk-bronze py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center bg-bnk-navy text-bnk-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Tag className="w-4 h-4 mr-2" />
              {article.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-navy">
              {article.title}
            </h1>
            
            <p className="text-xl text-navy/80 mb-8 leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-navy/70">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article.readTime}</span>
              </div>
              <div>
                Published: {new Date(article.datePublished).toLocaleDateString('en-ZA', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      {article.tableOfContents && (
        <section className="bg-bnk-gold py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-display font-bold mb-6 text-navy">Table of Contents</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ul className="space-y-2">
                  {article.tableOfContents.map((item, index) => (
                    <li key={index} className={`${item.level === 2 ? 'font-medium' : 'ml-4 text-sm'}`}>
                      <a 
                        href={`#${item.id}`}
                        className="text-navy hover:text-bnk-bronze transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .replace(/\n/g, '<br />')
                    .replace(/#{1}\s(.*?)(<br \/>|$)/g, '<h1 class="text-3xl font-display font-bold mb-6 mt-12 text-navy first:mt-0">$1</h1>')
                    .replace(/#{2}\s(.*?)(<br \/>|$)/g, '<h2 class="text-2xl font-display font-bold mb-4 mt-10 text-navy">$1</h2>')
                    .replace(/#{3}\s(.*?)(<br \/>|$)/g, '<h3 class="text-xl font-display font-semibold mb-3 mt-8 text-navy">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-bnk-bronze hover:text-bnk-navy underline transition-colors">$1</a>')
                    .replace(/- (.*?)(<br \/>|$)/g, '<li class="mb-2 text-navy">$1</li>')
                    .replace(/(\d+)\.\s(.*?)(<br \/>|$)/g, '<li class="mb-2 text-navy">$2</li>')
                    .replace(/<br \/><br \/>/g, '</p><p class="mb-4 text-navy leading-relaxed">')
                    .replace(/^/, '<p class="mb-4 text-navy leading-relaxed">')
                    .replace(/$/, '</p>')
                }}
              />
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-bnk-navy rounded-lg text-center">
              <h3 className="text-2xl font-display font-bold mb-4 text-bnk-gold">
                Need Professional Help?
              </h3>
              <p className="text-bnk-gold/80 mb-6 max-w-2xl mx-auto">
                Don't tackle these challenges alone. Our team specializes in helping South African businesses succeed online with proven strategies and technical expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact#book-call"
                  className="bg-bnk-bronze text-white px-8 py-4 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200"
                >
                  Book Free Consultation
                </Link>
                <Link 
                  href="/contact#proposal"
                  className="border-2 border-bnk-gold text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-gold hover:text-bnk-navy transition-all duration-200"
                >
                  Request Proposal
                </Link>
              </div>
            </div>

            {/* Keywords */}
            <div className="mt-12 pt-8 border-t border-navy/20">
              <h4 className="text-sm font-semibold text-navy/70 mb-3">RELATED TOPICS</h4>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="bg-bnk-gold/20 text-navy px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
