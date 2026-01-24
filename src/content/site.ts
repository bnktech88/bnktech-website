export const siteConfig = {
  company: {
    name: 'BNK Tech (PTY) LTD',
    domain: 'www.bnktech.net',
    email: 'bnktech.net@gmail.com',
    phone: '+27 63 068 7409',
    whatsapp: '+27630687409',
    logo: '/bnktech-logo.png',
    founded: 2025,
  },
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { 
      name: 'Services', 
      href: '/services',
      submenu: [
        { name: 'Website Builds & Maintenance', href: '/services/website-builds' },
        { name: 'Performance & SEO', href: '/services/performance-seo' },
        { name: 'Maintenance & Security', href: '/services/maintenance-security' },
        { name: 'Retainers', href: '/services/retainers' }
      ]
    },
    { name: 'Insights', href: '/insights' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  seo: {
    title: 'BNK Tech (PTY) LTD | Premium Technology Solutions',
    description: 'BNK Tech delivers high-performance websites, digital infrastructure, IT services, and security solutions for businesses ready to scale.',
    keywords: 'web development, digital infrastructure, IT services, technology solutions, South Africa',
    ogImage: '/bnktech-logo.png',
    twitterHandle: '@bnktech',
  },
  social: {
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
}
