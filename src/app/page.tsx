import { generateSEO } from '@/lib/seo'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import CTA from '@/components/sections/CTA'
import HomeIntro from '@/components/intro/HomeIntro'
import ScrollContainer from '@/components/ui/ScrollContainer'

export const metadata = generateSEO({
  title: 'Premium Technology Solutions',
  description: 'BNK Tech delivers high-performance websites, digital infrastructure, IT services, and security solutions for businesses ready to scale.',
})

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <ScrollContainer>
        <Hero />
        <Services />
        <FeaturedWork />
        <Process />
        <About />
        <CTA />
      </ScrollContainer>
    </>
  )
}
