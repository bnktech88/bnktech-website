import Link from 'next/link'
import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: '404 - Page Not Found | BNK Tech',
  description: 'The page you are looking for could not be found. Return to BNK Tech homepage or explore our web development services.',
  url: '/404'
})

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bnk-gold to-bnk-bronze flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-bnk-navy mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bnk-navy mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-bnk-navy mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="btn btn-primary px-8 py-4 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center"
          >
            Return Home
          </Link>
          <Link 
            href="/services"
            className="btn btn-outline px-8 py-4 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center"
          >
            View Services
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-bnk-navy/20">
          <p className="text-bnk-navy/80 mb-4">Need help? Get in touch:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-bnk-navy">
            <a 
              href="tel:+27630687409"
              className="hover:text-bnk-bronze transition-colors"
            >
              📞 +27 63 068 7409
            </a>
            <span className="hidden sm:inline">•</span>
            <a 
              href="mailto:bnktech.net@gmail.com"
              className="hover:text-bnk-bronze transition-colors"
            >
              ✉️ bnktech.net@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
