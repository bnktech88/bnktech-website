export interface Project {
  slug: string
  title: string
  category: 'Website Build' | 'Performance & SEO' | 'Maintenance & Security'
  industry: string
  client: string
  isAnonymized: boolean
  summary: string
  heroResult: string
  context: {
    description: string
    constraints: string[]
    goals: string[]
  }
  problem: {
    description: string
    beforeMetrics: { label: string; value: string; context?: string }[]
  }
  approach: {
    architecture: string
    keyDecisions: string[]
  }
  solution: {
    highlights: string[]
    features: string[]
  }
  results: {
    metrics: { label: string; before: string; after: string; improvement: string }[]
    summary: string
  }
  technologies: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  } | null
  year: string
  image: string
}

export const projects: Project[] = [
  {
    slug: 'enterprise-ecommerce-platform',
    title: 'Enterprise E-commerce Platform',
    category: 'Website Build',
    industry: 'E-commerce',
    client: 'Anonymized Retail Corp',
    isAnonymized: true,
    summary: 'High-performance e-commerce platform handling 10k+ daily transactions with sub-2s load times and 34% conversion improvement.',
    heroResult: '2.1s → 0.8s LCP + 34% conversion increase',
    context: {
      description: 'Large South African retailer needed to replace their legacy e-commerce platform that was struggling with performance and scalability during peak traffic periods.',
      constraints: ['High-traffic seasonal peaks', 'Complex inventory management', 'Multiple payment gateways', 'SEO migration requirements'],
      goals: ['Sub-2 second page load times', 'Handle 50k+ concurrent users', 'Maintain SEO rankings', 'Improve conversion rates']
    },
    problem: {
      description: 'The existing platform suffered from poor performance, frequent downtime during sales events, and a 23% cart abandonment rate due to slow checkout processes.',
      beforeMetrics: [
        { label: 'Page Load Time', value: '4.8s average', context: 'Lighthouse Performance: 34' },
        { label: 'Cart Abandonment', value: '23%', context: 'Industry average: 18%' },
        { label: 'Mobile Conversion', value: '1.2%', context: '65% of traffic was mobile' },
        { label: 'Uptime During Sales', value: '92%', context: 'Frequent crashes during peak hours' }
      ]
    },
    approach: {
      architecture: 'Serverless Next.js architecture with edge caching, microservices for inventory/payments, and progressive enhancement for mobile-first performance.',
      keyDecisions: [
        'Next.js 14 with App Router for optimal performance',
        'Redis caching layer for inventory and session management', 
        'CDN edge computing for global performance',
        'Incremental Static Regeneration for product pages',
        'Microservices architecture for payment processing'
      ]
    },
    solution: {
      highlights: [
        'Sub-1 second page loads with 95+ Lighthouse scores',
        'Zero-downtime deployments with automatic rollbacks',
        'Advanced caching strategy reducing database load by 80%',
        'Mobile-optimized checkout flow with Apple/Google Pay',
        'Real-time inventory synchronization across channels'
      ],
      features: [
        'Progressive Web App with offline browsing',
        'Advanced search with faceted filtering',
        'Personalized product recommendations',
        'Multi-currency and multi-language support',
        'Integrated analytics and conversion tracking'
      ]
    },
    results: {
      metrics: [
        { label: 'Page Load Time', before: '4.8s', after: '0.8s', improvement: '83% faster' },
        { label: 'Lighthouse Score', before: '34', after: '96', improvement: '182% improvement' },
        { label: 'Conversion Rate', before: '2.1%', after: '2.8%', improvement: '34% increase' },
        { label: 'Cart Abandonment', before: '23%', after: '15%', improvement: '35% reduction' },
        { label: 'Mobile Revenue', before: '31%', after: '47%', improvement: '52% increase' },
        { label: 'Uptime', before: '92%', after: '99.8%', improvement: '8.5% increase' }
      ],
      summary: 'The new platform delivered immediate performance improvements and sustained business growth, with mobile revenue increasing by over 50% within the first quarter.'
    },
    technologies: ['Next.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Stripe', 'Vercel', 'Supabase'],
    testimonial: null,
    year: '2024',
    image: '/assets/project-ecommerce.jpg'
  },
  {
    slug: 'fintech-progressive-web-app',
    title: 'Fintech Progressive Web App',
    category: 'Website Build',
    industry: 'Financial Services',
    client: 'Anonymized Fintech Scale-up',
    isAnonymized: true,
    summary: 'Secure PWA serving 50k+ users with 99.9% uptime, real-time synchronization, and 45% reduction in support inquiries.',
    heroResult: '99.9% uptime + 45% fewer support tickets',
    context: {
      description: 'Fast-growing fintech company needed a secure, scalable web application to serve their expanding customer base with real-time financial data and mobile-first experience.',
      constraints: ['POPIA compliance requirements', 'Real-time data synchronization', 'Multi-device authentication', 'Offline capability needs'],
      goals: ['Bank-grade security', '99.9% uptime SLA', 'Native app-like experience', 'Real-time transaction updates']
    },
    problem: {
      description: 'Legacy system had frequent sync issues, poor mobile experience, and generated high support volumes due to usability problems and offline limitations.',
      beforeMetrics: [
        { label: 'Mobile Usability', value: '2.3/5 user rating', context: 'App store reviews' },
        { label: 'Support Tickets', value: '1,200/month', context: 'Mostly sync and UX issues' },
        { label: 'Offline Usage', value: '0%', context: 'No offline capability' },
        { label: 'Load Time', value: '3.2s', context: 'Mobile 3G conditions' }
      ]
    },
    approach: {
      architecture: 'Progressive Web App with service workers, encrypted local storage, WebSocket real-time updates, and biometric authentication integration.',
      keyDecisions: [
        'PWA architecture for native app-like experience',
        'End-to-end encryption with client-side key management',
        'WebSocket connections for real-time updates',
        'Service workers for offline transaction queuing',
        'Biometric authentication with secure fallbacks'
      ]
    },
    solution: {
      highlights: [
        'Bank-grade security with biometric authentication',
        'Real-time transaction updates via WebSockets',
        'Offline transaction capability with sync queuing',
        'Progressive enhancement for all device types',
        'POPIA-compliant data handling and storage'
      ],
      features: [
        'Fingerprint and face ID authentication',
        'Real-time balance and transaction updates',
        'Offline transaction viewing and queuing',
        'Push notifications for account activity',
        'Advanced transaction categorization and budgeting'
      ]
    },
    results: {
      metrics: [
        { label: 'User Rating', before: '2.3/5', after: '4.7/5', improvement: '104% improvement' },
        { label: 'Support Tickets', before: '1,200/month', after: '660/month', improvement: '45% reduction' },
        { label: 'Mobile Usage', before: '23%', after: '71%', improvement: '209% increase' },
        { label: 'Session Duration', before: '2.1 min', after: '4.8 min', improvement: '129% increase' },
        { label: 'Uptime', before: '97.2%', after: '99.9%', improvement: '2.8% increase' }
      ],
      summary: 'The PWA exceeded all performance targets and dramatically improved user satisfaction, leading to increased engagement and reduced operational costs.'
    },
    technologies: ['React', 'PWA', 'TypeScript', 'WebSockets', 'Node.js', 'MongoDB', 'WebCrypto API'],
    testimonial: null,
    year: '2024',
    image: '/assets/project-fintech.jpg'
  },
  {
    slug: 'healthcare-portal-rebuild',
    title: 'Healthcare Portal Performance Rebuild',
    category: 'Performance & SEO',
    industry: 'Healthcare Technology',
    client: 'Anonymized MedTech Provider',
    isAnonymized: true,
    summary: 'Complete performance overhaul reducing load times from 12s to 1.1s, increasing mobile usage 180% and staff productivity 25%.',
    heroResult: '12s → 1.1s load time + 25% productivity gain',
    context: {
      description: 'Healthcare technology provider needed to modernize their patient management portal that was causing efficiency issues for medical staff due to poor performance.',
      constraints: ['Legacy database integration', 'HIPAA compliance requirements', '24/7 uptime necessity', 'Multi-location access needs'],
      goals: ['Sub-2 second load times', 'Mobile-responsive design', 'Maintain data compliance', 'Improve staff workflow efficiency']
    },
    problem: {
      description: 'The legacy system had severe performance issues with 12+ second load times, no mobile optimization, and poor user experience that was impacting patient care efficiency.',
      beforeMetrics: [
        { label: 'Page Load Time', value: '12.3s average', context: 'On hospital networks' },
        { label: 'Mobile Usage', value: '8%', context: 'Due to unusable mobile experience' },
        { label: 'Staff Satisfaction', value: '2.1/5', context: 'Internal survey results' },
        { label: 'Task Completion', value: '73%', context: 'Users completing workflows' }
      ]
    },
    approach: {
      architecture: 'Modern SPA with lazy loading, optimized API design, progressive enhancement, and performance-first development approach.',
      keyDecisions: [
        'Vue.js for reactive UI with minimal bundle size',
        'API redesign with GraphQL for efficient data fetching',
        'Lazy loading and code splitting for faster initial loads',
        'PWA capabilities for offline access to critical data',
        'Performance budgets enforced in CI/CD pipeline'
      ]
    },
    solution: {
      highlights: [
        'Complete frontend rebuild with modern performance techniques',
        'API optimization reducing data transfer by 60%',
        'Mobile-first responsive design for tablet/phone usage',
        'Progressive loading with skeleton screens',
        'Offline capability for critical patient data'
      ],
      features: [
        'Intuitive mobile-optimized interface',
        'Real-time patient data synchronization',
        'Advanced search and filtering capabilities',
        'Customizable dashboard for different user roles',
        'Comprehensive audit logging for compliance'
      ]
    },
    results: {
      metrics: [
        { label: 'Page Load Time', before: '12.3s', after: '1.1s', improvement: '91% faster' },
        { label: 'Mobile Usage', before: '8%', after: '45%', improvement: '463% increase' },
        { label: 'Staff Satisfaction', before: '2.1/5', after: '4.2/5', improvement: '100% increase' },
        { label: 'Task Completion', before: '73%', after: '94%', improvement: '29% increase' },
        { label: 'Support Tickets', before: '180/month', after: '52/month', improvement: '71% reduction' }
      ],
      summary: 'The performance rebuild transformed the user experience, leading to measurable improvements in staff productivity and patient care efficiency.'
    },
    technologies: ['Vue.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Laravel', 'MySQL', 'PWA'],
    testimonial: null,
    year: '2023',
    image: '/assets/project-healthcare.jpg'
  }
]
