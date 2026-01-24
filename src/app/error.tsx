'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-bnk-bronze to-bnk-navy flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-bnk-gold mb-4">
            Oops!
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bnk-gold mb-6">
            Something went wrong
          </h2>
          <p className="text-xl text-bnk-gold/90 mb-8 max-w-lg mx-auto">
            We encountered an unexpected error. Don't worry - our team has been notified 
            and we're working to fix it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={reset}
            className="bg-bnk-gold text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-gold/90 transition-all duration-200 inline-flex items-center justify-center"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="bg-transparent border-2 border-bnk-gold text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-gold hover:text-bnk-navy transition-all duration-200 inline-flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-bnk-gold/20">
          <p className="text-bnk-gold/80 mb-4">Still having issues? Contact us directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-bnk-gold">
            <a 
              href="tel:+27630687409"
              className="hover:text-bnk-bronze transition-colors"
            >
              📞 +27 63 068 7409
            </a>
            <span className="hidden sm:inline text-bnk-gold/50">•</span>
            <a 
              href="mailto:bnktech.net@gmail.com"
              className="hover:text-bnk-bronze transition-colors"
            >
              ✉️ bnktech.net@gmail.com
            </a>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-red-50 border border-red-200 rounded-lg p-4">
            <summary className="font-medium text-red-800 cursor-pointer">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
