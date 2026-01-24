import { generateSEO } from '@/lib/seo'
import Hero from '@/components/sections/Hero'
import WhyBNK from '@/components/sections/WhyBNK'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import CTA from '@/components/sections/CTA'
import HomeIntro from '@/components/intro/HomeIntro'
import ScrollContainer from '@/components/ui/ScrollContainer'

export const metadata = generateSEO({
  title: 'High-Performance Websites + Engineering Support | BNK Tech South Africa',
  description: 'High-performance websites and ongoing engineering support for growing businesses. Sub-2 second load times, TypeScript + Next.js engineering, productized retainers with clear SLAs.',
  keywords: 'high performance websites, web development, Next.js development, TypeScript, Core Web Vitals, engineering support, retainers, SLA, South Africa',
})

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <ScrollContainer>
        <Hero />
        <WhyBNK />
        <Services />
        <FeaturedWork />
        <Process />
        <About />
        <CTA />
      </ScrollContainer>
    </>
  )
}
