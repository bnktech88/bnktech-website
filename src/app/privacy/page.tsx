import { generateSEO } from '@/lib/seo'
import { siteConfig } from '@/content/site'

export const metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'BNK Tech Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with POPIA and international privacy standards.',
  url: '/privacy'
})

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-grey-100">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-grey-700">
              Last updated: January 2025
            </p>
            <p className="text-lg text-grey-700 mt-4">
              This Privacy Policy explains how {siteConfig.company.name} collects, uses, 
              and protects your personal information in compliance with the Protection of 
              Personal Information Act (POPIA) and international privacy standards.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Project Information:</strong> Service requirements, project details, communication preferences</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information for website functionality</li>
              <li><strong>Communication Records:</strong> Messages, emails, and call records related to our services</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Provide and deliver our technology services</li>
              <li>Communicate about your projects and respond to inquiries</li>
              <li>Send important updates about our services</li>
              <li>Improve our website and service offerings</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Trusted partners who assist in delivering our services (hosting, analytics, communication tools)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfer:</strong> In connection with a merger, acquisition, or sale of business assets</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication systems</li>
              <li>Staff training on data protection practices</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Data Retention</h2>
            <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:</p>
            <ul>
              <li><strong>Project Data:</strong> Retained for the duration of the project plus 3 years for support purposes</li>
              <li><strong>Communication Records:</strong> Retained for 2 years for customer service purposes</li>
              <li><strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Your Rights (POPIA Compliance)</h2>
            <p>Under POPIA and other applicable privacy laws, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information we hold</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Portability:</strong> Request transfer of your data to another controller</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Cookies and Tracking</h2>
            <p>Our website uses cookies and similar technologies to:</p>
            <ul>
              <li>Ensure proper website functionality</li>
              <li>Analyze website usage and performance</li>
              <li>Remember your preferences</li>
              <li>Provide security features</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">International Transfers</h2>
            <p>Some of our service providers may be located outside South Africa. When we transfer your data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with POPIA requirements.</p>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Contact Information</h2>
            <p>If you have questions about this Privacy Policy or want to exercise your rights, please contact us:</p>
            <div className="bg-grey-50 p-6 rounded-lg not-prose">
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.company.email}`} className="text-black hover:text-grey-700">{siteConfig.company.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${siteConfig.company.phone}`} className="text-black hover:text-grey-700">{siteConfig.company.phone}</a></p>
              <p><strong>Response Time:</strong> We will respond to privacy requests within 30 days as required by POPIA.</p>
            </div>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by:</p>
            <ul>
              <li>Posting the updated policy on our website</li>
              <li>Sending email notifications for material changes</li>
              <li>Updating the "Last updated" date at the top of this policy</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mb-4 mt-8">Complaints</h2>
            <p>If you believe we have not handled your personal information in accordance with this policy or applicable privacy laws, you may lodge a complaint with:</p>
            <ul>
              <li>Our privacy contact (details above)</li>
              <li>The Information Regulator of South Africa</li>
            </ul>

            <div className="bg-black text-white p-6 rounded-lg mt-12 not-prose">
              <h3 className="text-lg font-semibold mb-2">Questions About Your Privacy?</h3>
              <p className="mb-4">We're committed to transparency and protecting your personal information. Contact us anytime with privacy-related questions.</p>
              <a href="/contact" className="btn btn-primary bg-white text-black hover:bg-grey-100">
                Contact Us
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
