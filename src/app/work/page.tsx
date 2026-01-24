import { generateSEO } from '@/lib/seo'
import WorkGrid from '@/components/sections/WorkGrid'
import WorkFilters from '@/components/sections/WorkFilters'

export const metadata = generateSEO({
  title: 'Proof-Driven Case Studies - Measurable Results | BNK Tech',
  description: 'Real case studies with verified metrics. See how we deliver 83% faster load times, 34% conversion increases, and measurable business improvements through engineering excellence.',
  keywords: 'case studies, performance improvements, web development results, Core Web Vitals, conversion optimization, technical SEO, measurable results, South Africa',
  url: '/work'
})

export default function WorkPage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Section 1 = Bronze */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Proof-Driven Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-navy max-w-4xl mx-auto text-balance">
              Real metrics, verified results. See how engineering excellence delivers 
              measurable business improvements for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <WorkFilters />

      {/* Project Grid */}
      <WorkGrid />
    </div>
  )
}
