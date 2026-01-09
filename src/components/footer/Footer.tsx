import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { formatPhoneNumber, createWhatsAppUrl } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bnk-navy text-bnk-gold">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src={siteConfig.company.logo}
                alt="BNK Tech (PTY) LTD logo"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 72px, 80px"
              />
            </Link>
            <p className="text-bnk-gold text-lg mb-6 max-w-md">
              Premium technology solutions for businesses ready to scale. 
              We deliver high-performance websites, digital infrastructure, 
              and comprehensive IT services.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-bnk-gold">
                Call or WhatsApp: {' '}
                <a 
                  href={`tel:${siteConfig.company.phone}`}
                  className="text-bnk-gold hover:text-bnk-bronze transition-colors font-medium"
                >
                  {formatPhoneNumber(siteConfig.company.phone)}
                </a>
              </p>
              <p className="text-bnk-gold">
                Email: {' '}
                <a 
                  href={`mailto:${siteConfig.company.email}`}
                  className="text-bnk-gold hover:text-bnk-bronze transition-colors font-medium"
                >
                  {siteConfig.company.email}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-bnk-gold">Services</h3>
            <ul className="space-y-2 text-sm text-bnk-gold">
              <li>
                <Link 
                  href="/services#website-builds" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Website Builds
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#digital-infrastructure" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Digital Infrastructure
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#it-services" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  IT Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#security-maintenance" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Security & Maintenance
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#retainers-scaling" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Retainers & Scaling
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-bnk-gold">Company</h3>
            <ul className="space-y-2 text-sm text-bnk-gold">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/work" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="hover:text-bnk-bronze transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bnk-bronze mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-bnk-gold">
            &copy; {currentYear} {siteConfig.company.name}. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a
              href={createWhatsAppUrl(
                siteConfig.company.phone,
                `Hi! I'm interested in your services and would like to get a quote.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-bnk-bronze text-bnk-gold hover:bg-bnk-bronze hover:text-bnk-navy px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              WhatsApp Us
            </a>
            <Link href="/contact" className="bg-bnk-bronze hover:bg-bnk-gold text-bnk-navy px-6 py-2.5 rounded-lg font-medium transition-all duration-200">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
