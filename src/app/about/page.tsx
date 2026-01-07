import { generateSEO } from '@/lib/seo'
import AboutHero from '@/components/sections/AboutHero'
import Mission from '@/components/sections/Mission'
import Team from '@/components/sections/Team'
import Values from '@/components/sections/Values'

export const metadata = generateSEO({
  title: 'About Us',
  description: 'Learn about BNK Tech\'s mission to become South Africa\'s leading technology powerhouse, our values of innovation, precision, and excellence.',
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
