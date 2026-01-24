export type MediaType = 'image' | 'video'

export interface MediaItem {
  type: MediaType
  src: string
  poster?: string // required for videos
  alt?: string
  width?: number
  height?: number
  caption?: string
  tags?: string[]
  priority?: boolean // only for first hero slide
}

export type GalleryStyle = 'minimalFade' | 'stackCards' | 'splitReveal' | 'cinematicZoom' | 'parallaxSlide'
export type TransitionType = 'fade' | 'slide' | 'wipe' | 'scale' | '3dFlip' | 'clipReveal'
export type LightboxStyle = 'darkGlass' | 'pureBlack' | 'studioWhite'
export type ScrollTriggerMode = 'scrub' | 'snap'

export interface GalleryConfig {
  style: GalleryStyle
  transition: TransitionType
  autoPlay: boolean
  intervalMs: number
  lightboxEnabled: boolean
  lightboxStyle: LightboxStyle
  scrollTrigger: {
    enabled: boolean
    mode: ScrollTriggerMode
    start: string
    end: string
  }
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  process: string[]
  pricing: {
    starting: string
    model: string
    maintenance?: string
    maintenanceModel?: string
  }
  status?: 'active' | 'coming-soon'
  gallery?: MediaItem[]
  galleryConfig?: GalleryConfig
}

export const services: Service[] = [
  {
    id: 'website-builds',
    title: 'Website Builds & Maintenance',
    description: 'Professional web development and maintenance services delivering high-performance, SEO-optimized websites that drive business growth. From small business websites to enterprise e-commerce platforms, we build modern, scalable solutions using the latest technologies.',
    features: [
      'Custom responsive design optimized for all devices',
      'Sub-2 second load times with performance optimization',
      'Technical SEO and search engine optimization',
      'Mobile-first responsive development approach',
      'Content Management System (CMS) integration',
      'E-commerce and online store development',
      'Progressive Web App (PWA) capabilities',
      'Google Analytics and conversion tracking setup',
      'SSL security and GDPR compliance',
      'Ongoing maintenance and support packages'
    ],
    process: [
      'Discovery & Strategy: Requirements gathering, competitor analysis, and technical planning',
      'Design & Prototyping: UI/UX design, wireframes, and interactive prototypes', 
      'Development & Testing: Frontend/backend coding, quality assurance, and performance testing',
      'Launch & Optimization: Deployment, SEO setup, analytics configuration, and ongoing optimization'
    ],
    pricing: {
      starting: 'R5,000',
      model: 'Project-based',
      maintenance: 'R1,500',
      maintenanceModel: 'Monthly / Retainer'
    },
    status: 'active',
    gallery: [
      { type: 'image', src: '/assets/website-builds-1.jpeg', alt: 'Website build showcase 1', priority: true },
      { type: 'image', src: '/assets/website-builds-2.jpeg', alt: 'Website build showcase 2' },
      { type: 'image', src: '/assets/website-builds-3.jpeg', alt: 'Website build showcase 3' },
      { type: 'image', src: '/assets/website-builds-4.jpeg', alt: 'Website build showcase 4' }
    ],
    galleryConfig: {
      style: 'cinematicZoom',
      transition: 'clipReveal',
      autoPlay: true,
      intervalMs: 4000,
      lightboxEnabled: true,
      lightboxStyle: 'darkGlass',
      scrollTrigger: {
        enabled: true,
        mode: 'scrub',
        start: 'top 80%',
        end: 'bottom 20%'
      }
    }
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence and drive qualified leads to your business — launching soon.',
    features: [
      'SEO & Content Strategy',
      'Pay-Per-Click Advertising (PPC)',
      'Social Media Management',
      'Email Marketing Automation',
      'Analytics & Conversion Tracking',
      'Brand Positioning & Messaging',
      'Lead Generation Campaigns',
      'Performance Reporting'
    ],
    process: [
      'Marketing Strategy & Audit',
      'Campaign Development',
      'Implementation & Launch',
      'Optimization & Reporting'
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
      { type: 'image', src: '/assets/app-dev-maintenance-1.jpeg', alt: 'App development showcase – mobile UI', priority: true },
      { type: 'image', src: '/assets/app-dev-maintenance-2.jpeg', alt: 'Cross-platform application dashboard' },
      { type: 'image', src: '/assets/app-dev-maintenance-3.jpeg', alt: 'Backend system integration interface' },
      { type: 'image', src: '/assets/app-dev-maintenance-4.jpeg', alt: 'Ongoing app maintenance & optimization' }
    ],
    galleryConfig: {
      style: 'stackCards',
      transition: '3dFlip',
      autoPlay: true,
      intervalMs: 3500,
      lightboxEnabled: true,
      lightboxStyle: 'pureBlack',
      scrollTrigger: {
        enabled: true,
        mode: 'snap',
        start: 'top 70%',
        end: 'bottom 30%'
      }
    }
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

  }
]
