import { generateSEO } from '@/lib/seo'
import WorkGrid from '@/components/sections/WorkGrid'
import WorkFilters from '@/components/sections/WorkFilters'

export const metadata = generateSEO({
  title: 'Our Work',
  description: 'Explore our portfolio of high-performance websites, digital infrastructure, and technology solutions that drive business growth.',
  url: '/work'
})

export default function WorkPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-grey-100">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl text-grey-700 max-w-4xl mx-auto text-balance">
              Discover how we've helped businesses transform their digital presence 
              and scale their operations with cutting-edge technology solutions.
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
