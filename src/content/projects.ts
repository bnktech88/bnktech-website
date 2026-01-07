export interface Project {
  slug: string
  title: string
  category: 'Website Build'
  summary: string
  description: string
  challenge: string
  solution: string
  results: string
  image: string
  technologies: string[]
  year: string
  client: string
}

export const projects: Project[] = [
  {
    slug: 'enterprise-ecommerce-platform',
    title: 'Enterprise E-commerce Platform',
    category: 'Website Build',
    summary: 'High-performance e-commerce platform handling 10k+ daily transactions with sub-2s load times.',
    description: 'Built a scalable e-commerce platform from the ground up using modern web technologies, focusing on performance and user experience.',
    challenge: 'Client needed a robust e-commerce solution that could handle high traffic volumes while maintaining excellent performance and security standards.',
    solution: 'Developed using Next.js with optimized SSR, implemented Redis caching, CDN integration, and microservices architecture for scalability.',
    results: 'Achieved 98% uptime, 1.8s average load time, and increased conversion rates by 34% within the first quarter.',
    image: '/assets/project-ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Stripe'],
    year: '2024',
    client: 'Retail Corp SA'
  },
  {
    slug: 'fintech-progressive-web-app',
    title: 'Fintech Progressive Web App',
    category: 'Website Build',
    summary: 'Secure PWA for financial services with real-time data synchronization and offline capabilities.',
    description: 'Created a comprehensive financial management PWA with advanced security features and seamless user experience.',
    challenge: 'Building a secure financial application that works across all devices with real-time updates and strict compliance requirements.',
    solution: 'Implemented PWA architecture with service workers, end-to-end encryption, biometric authentication, and real-time WebSocket connections.',
    results: 'Deployed to 50,000+ users with 99.9% uptime and full POPIA compliance. Reduced customer service inquiries by 45%.',
    image: '/assets/project-fintech.jpg',
    technologies: ['React', 'PWA', 'WebSockets', 'Node.js', 'MongoDB'],
    year: '2024',
    client: 'SecureFinance Ltd'
  },
  {
    slug: 'healthcare-portal-rebuild',
    title: 'Healthcare Portal Performance Optimization',
    category: 'Website Build',
    summary: 'Complete rebuild of legacy healthcare portal, improving performance by 300% and user satisfaction.',
    description: 'Modernized a legacy healthcare management system with focus on performance, accessibility, and mobile responsiveness.',
    challenge: 'Legacy system was slow, non-responsive, and had poor user experience affecting patient care efficiency.',
    solution: 'Complete rebuild using modern stack with performance-first approach, implementing lazy loading, code splitting, and optimized APIs.',
    results: 'Load times reduced from 12s to 3s, mobile usage increased by 180%, and staff productivity improved by 25%.',
    image: '/assets/project-healthcare.jpg',
    technologies: ['Vue.js', 'Tailwind CSS', 'Laravel', 'MySQL', 'Docker'],
    year: '2023',
    client: 'MedTech Solutions'
  }
]
