import { generateSEO } from '@/lib/seo'
import AboutHero from '@/components/sections/AboutHero'
import Mission from '@/components/sections/Mission'
import Values from '@/components/sections/Values'
import Methodology from '@/components/sections/Methodology'
import Team from '@/components/sections/Team'
import TrustBadges from '@/components/sections/TrustBadges'

export const metadata = generateSEO({
  title: 'About BNK Tech - Engineering Team & Methodology | South Africa',
  description: 'Engineering-focused team delivering measurable results through proven methodologies. Learn about our technical expertise, quality standards, and systematic approach to web development.',
  keywords: 'engineering team, technical expertise, development methodology, quality standards, system architecture, performance optimization, South Africa developers',
  url: '/about'
})

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <Mission />
      <Values />
      <Methodology />
      <Team />
      <TrustBadges />
    </div>
  )
}
