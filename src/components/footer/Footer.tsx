import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { formatPhoneNumber, createWhatsAppUrl } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
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
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 filter invert"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 72px, 80px"
              />
            </Link>
            <p className="text-grey-300 text-large mb-6 max-w-md">
              Premium technology solutions for businesses ready to scale. 
              We deliver high-performance websites, digital infrastructure, 
              and comprehensive IT services.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-grey-300">
                Call or WhatsApp: {' '}
                <a 
                  href={`tel:${siteConfig.company.phone}`}
                  className="text-white hover:text-grey-300 transition-colors"
                >
                  {formatPhoneNumber(siteConfig.company.phone)}
                </a>
              </p>
              <p className="text-grey-300">
                Email: {' '}
                <a 
                  href={`mailto:${siteConfig.company.email}`}
                  className="text-white hover:text-grey-300 transition-colors"
                >
                  {siteConfig.company.email}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-grey-300">
              <li>
                <Link 
                  href="/services#website-builds" 
                  className="hover:text-white transition-colors"
                >
                  Website Builds
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#digital-infrastructure" 
                  className="hover:text-white transition-colors"
                >
                  Digital Infrastructure
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#it-services" 
                  className="hover:text-white transition-colors"
                >
                  IT Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#security-maintenance" 
                  className="hover:text-white transition-colors"
                >
                  Security & Maintenance
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#retainers-scaling" 
                  className="hover:text-white transition-colors"
                >
                  Retainers & Scaling
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-grey-300">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/work" 
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-grey-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-grey-400">
            © {currentYear} {siteConfig.company.name}. All rights reserved.
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <a
              href={createWhatsAppUrl(
                siteConfig.company.whatsapp,
                `Hi BNK Tech, I'm interested in your services. Can we discuss my project?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-white border-white hover:bg-white hover:text-black"
            >
              WhatsApp Us
            </a>
            <Link href="/contact" className="btn btn-primary">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
