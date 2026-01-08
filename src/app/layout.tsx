import type { Metadata } from 'next'
import { Inter, Archivo } from 'next/font/google'
import './globals.css'
import { generateSEO, generateOrganizationSchema } from '@/lib/seo'
import { siteConfig } from '@/content/site'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/footer/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/cursor/CustomCursor'
import PageTransition from '@/components/transitions/PageTransition'
import HoverPreviewProvider from '@/components/ui/HoverPreviewProvider'
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
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        <link rel="icon" type="image/png" href={siteConfig.company.logo} />
      </head>
      <body className="cursor-hide">
        <SmoothScroll>
          <HoverPreviewProvider>
            <CustomCursor />
            <Navigation />
            <PageTransition>
              <main className="min-h-screen">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </HoverPreviewProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
