import { generateSEO } from '@/lib/seo'
import AboutHero from '@/components/sections/AboutHero'
import Mission from '@/components/sections/Mission'
import Team from '@/components/sections/Team'
import Values from '@/components/sections/Values'

export const metadata = generateSEO({
  title: 'About BNK Tech - Leading Software Development Company South Africa',
  description: 'Founded in 2020, BNK Tech (Pty) Ltd is South Africa\'s premier software development company. Learn about our mission, values, and expert team delivering innovative technology solutions.',
  keywords: 'BNK Tech about, software development company South Africa, technology solutions, web development team, innovation, precision, excellence, Gauteng software developers',
  url: '/about'
})

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <Mission />
      <Values />
      <Team />
    </div>
  )
}
