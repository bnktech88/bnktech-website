import type { Metadata } from 'next'
import { Inter, Archivo } from 'next/font/google'
import './globals.css'
import { generateSEO, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo'
import { siteConfig } from '@/content/site'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/footer/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/cursor/CustomCursor'
import PageTransition from '@/components/transitions/PageTransition'
import HoverPreviewProvider from '@/components/ui/HoverPreviewProvider'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  ...generateSEO(),
  metadataBase: new URL(`https://${siteConfig.company.domain}`),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        <link rel="icon" type="image/png" href={siteConfig.company.logo} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="cursor-hide">
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-bnk-gold focus:text-bnk-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <HoverPreviewProvider>
            <CustomCursor />
            <Navigation />
            <PageTransition>
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </HoverPreviewProvider>
        </SmoothScroll>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
