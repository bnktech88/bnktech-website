export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  process: string[]
  pricing: {
    starting: string
    model: string
  }
  status?: 'active' | 'coming-soon'
  gallery?: { src: string; alt: string }[]
}

export const services: Service[] = [
  {
    id: 'website-builds',
    title: 'Website Builds',
    description: 'High-performance, modern websites built with cutting-edge technology for maximum speed, security, and scalability.',
    features: [
      'Custom responsive design',
      'Sub-2 second load times',
      'SEO optimization',
      'Mobile-first approach',
      'CMS integration',
      'E-commerce capabilities',
      'Progressive Web App features',
      'Advanced analytics setup'
    ],
    process: [
      'Discovery & Strategy',
      'Design & Prototyping', 
      'Development & Testing',
      'Launch & Optimization'
    ],
    pricing: {
      starting: 'R3,000',
      model: 'Project-based'
    },
    status: 'active',
    gallery: [
      { src: '/assets/website-builds-1.jpeg', alt: 'Website build showcase 1' },
      { src: '/assets/website-builds-2.jpeg', alt: 'Website build showcase 2' },
      { src: '/assets/website-builds-3.jpeg', alt: 'Website build showcase 3' },
      { src: '/assets/website-builds-4.jpeg', alt: 'Website build showcase 4' }
    ]
  },
  {
    id: 'digital-infrastructure',
    title: 'Digital Infrastructure',
    description: 'Scalable cloud infrastructure solutions that grow with your business, ensuring reliability and cost-effectiveness.',
    features: [
      'Cloud migration strategy',
      'AWS/Azure deployment',
      'Containerization (Docker/Kubernetes)',
      'CI/CD pipeline setup',
      'Infrastructure as Code',
      'Auto-scaling configuration',
      'Disaster recovery planning',
      'Performance monitoring'
    ],
    process: [
      'Infrastructure Assessment',
      'Migration Planning',
      'Implementation & Testing',
      'Monitoring & Optimization'
    ],
    pricing: {
      starting: 'Coming Soon',
      model: 'Available in future'
    },
    status: 'coming-soon'
  },
  {
    id: 'it-services',
    title: 'IT Services',
    description: 'Comprehensive managed IT services to keep your business running smoothly with proactive support and maintenance.',
    features: [
      '24/7 system monitoring',
      'Help desk support',
      'Software license management',
      'User account administration',
      'Network management',
      'Hardware procurement',
      'Training & documentation',
      'Strategic IT planning'
    ],
    process: [
      'IT Infrastructure Audit',
      'Service Level Agreement',
      'Implementation & Setup',
      'Ongoing Support & Maintenance'
    ],
    pricing: {
      starting: 'Coming Soon',
      model: 'Available in future'
    },
    status: 'coming-soon'
  },
  {
    id: 'security-maintenance',
    title: 'Security & Maintenance',
    description: 'Proactive security monitoring and system maintenance to protect your digital assets and ensure optimal performance.',
    features: [
      'Vulnerability assessments',
      'Security monitoring (SIEM)',
      'Regular system updates',
      'Backup management',
      'Incident response',
      'Compliance reporting',
      'Performance optimization',
      'Emergency support'
    ],
    process: [
      'Security Assessment',
      'Monitoring Setup',
      'Regular Maintenance',
      'Continuous Improvement'
    ],
    pricing: {
      starting: 'Coming Soon',
      model: 'Available in future'
    },
    status: 'coming-soon'
  },
  {
    id: 'retainers-scaling',
    title: 'Retainers & Scaling Support',
    description: 'Dedicated technical partnership for growing businesses requiring ongoing development and strategic technology guidance.',
    features: [
      'Dedicated development hours',
      'Priority support access',
      'Strategic technology planning',
      'Code reviews & optimization',
      'New feature development',
      'Integration services',
      'Performance scaling',
      'Technical consultation'
    ],
    process: [
      'Partnership Assessment',
      'Custom Retainer Agreement',
      'Resource Allocation',
      'Ongoing Collaboration'
    ],
    pricing: {
      starting: 'Coming Soon',
      model: 'Available in future'
    },
    status: 'coming-soon'
  },
  {
    id: 'app-development',
    title: 'App Development & Maintenance',
    description: 'Mobile and web applications designed for performance, scale, and reliability — launching soon.',
    features: [
      'Native iOS & Android apps',
      'Progressive Web Applications',
      'Cross-platform development',
      'App Store deployment',
      'Performance optimization',
      'User experience design',
      'Backend integration',
      'Ongoing maintenance'
    ],
    process: [
      'App Strategy & Planning',
      'Design & Prototyping',
      'Development & Testing',
      'Deployment & Support'
    ],
    pricing: {
      starting: 'Coming Soon',
      model: 'Available in future'
    },
    status: 'coming-soon',
    gallery: [
      { src: '/assets/app-dev-maintenance-1.jpeg', alt: 'App development showcase 1' },
      { src: '/assets/app-dev-maintenance-2.jpeg', alt: 'App development showcase 2' }
    ]
  }
]
