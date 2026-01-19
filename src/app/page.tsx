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
  title: 'BNK Tech - Premium Web Development & Software Solutions South Africa',
  description: 'BNK Tech (Pty) Ltd delivers premium web development, mobile apps, digital infrastructure, and IT services in South Africa. Transform your business with our expert software solutions.',
  keywords: 'web development South Africa, software development, mobile app development, UI/UX design, business systems, BNK Tech, Johannesburg web developers, digital transformation',
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
