# BNK Tech Website

Modern, professional website for BNK Tech built with Next.js 15, featuring premium gallery experiences, service management, and contact functionality.

## Overview

BNK Tech is a forward-thinking technology company specializing in web development, digital infrastructure, and comprehensive IT solutions. This website showcases our services with interactive galleries, detailed service information, and streamlined contact forms.

## Branch Workflow

This repository uses a clean, professional branching strategy designed for production stability:

### Branch Structure
- **`main`** - Production/live branch (auto-deploys to Vercel)
- **`updates`** - Development branch (all new features merged here first)
- **`backup`** - Automatic rollback branch (always points to last known good deployment)

### Development Workflow
1. **New Features**: Create feature branches from `updates`
2. **Integration**: Merge feature branches into `updates`
3. **Validation**: Test and validate `updates` branch thoroughly
4. **Release**: Merge `updates` → `main` (triggers production deployment)
5. **Safety**: `backup` branch automatically updates after successful `main` deployment

### Branch Protection
- **`main`** branch is protected and requires:
  - Successful build checks (npm ci, npm run build, npm run lint)
  - Pull request review (in team environments)
  - All status checks must pass before merge

## Features

### Premium Gallery System
- **5 Gallery Styles**: minimalFade, stackCards, cinematicZoom, splitReveal, parallaxSlide
- **6 Transition Types**: fade, slide, wipe, scale, 3dFlip, clipReveal
- **Premium Lightbox**: Full-screen media viewer with video support and 3 theme styles
- **GSAP Animations**: Hardware-accelerated 60fps transitions
- **Scroll Integration**: GSAP ScrollTrigger for scroll-controlled galleries
- **Mobile Optimized**: Automatic fallbacks and performance optimization
- **Accessibility**: Keyboard navigation, screen reader support, reduced motion compliance

### Enhanced User Experience
- **Service Reordering**: Popular services (Website Builds, App Development) prioritized
- **Dual Pricing Display**: Transparent project + maintenance cost breakdown
- **Contact Form**: Updated service options with proper validation
- **Smooth Scrolling**: Lenis integration for premium scroll experience
- **Performance**: Next.js optimization, lazy loading, image optimization

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch Navigation**: Native swipe gestures for galleries
- **Performance**: Reduced animations on mobile to preserve battery
- **Accessibility**: WCAG compliant with keyboard and screen reader support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bnktech88/bnktech-website.git
   cd bnktech-website
   ```

2. **Switch to development branch**
   ```bash
   git checkout updates
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Environment Variables

### Required
```env
# Gallery System Control
NEXT_PUBLIC_PREVIEW_MODE=true   # Enable premium gallery effects
NEXT_PUBLIC_PREVIEW_MODE=false  # Production fallback (lightweight)
```

### Optional
```env
# Contact Form (Production)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@bnktech.net
EMAIL_TO=hello@bnktech.net
```

## Gallery System

The premium gallery system supports multiple styles and configurations:

### Gallery Styles
- **minimalFade**: Clean crossfade transitions
- **stackCards**: 3D stacked cards (Cuberto-inspired)  
- **cinematicZoom**: Film-grain overlay with zoom effects
- **splitReveal**: Split-panel dramatic transitions
- **parallaxSlide**: Horizontal parallax with scroll control

### Configuration
Services are configured in `src/content/services.ts` with gallery arrays and config objects. See `README-gallery.md` for detailed documentation.

## Project Structure

```bash
src/
├── app/                    # Next.js 15 App Router
├── components/
│   ├── gallery/            # Premium gallery system
│   │   ├── styles/         # Gallery style renderers
│   │   ├── media/          # Image & video components  
│   │   └── *.tsx           # Core gallery components
│   ├── sections/           # Page sections
│   ├── ui/                 # Reusable UI components
│   └── intro/              # Home page intro
├── content/                # Content management
│   ├── services.ts         # Service data & gallery config
│   └── site.ts             # Site metadata
└── lib/                    # Utilities & helpers
```

## Deployment

### Automatic Deployment (Vercel)
1. **Production**: Push/merge to `main` branch triggers automatic deployment
2. **Preview**: Feature branches get automatic preview deployments
3. **Rollback**: Use `backup` branch for instant rollback capability

### Manual Deployment
```bash
npm run build
npm run start
```

For detailed deployment procedures, rollback instructions, and troubleshooting, see [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Contributing

1. **Create feature branch** from `updates`
   ```bash
   git checkout updates
   git pull origin updates
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and commit
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

3. **Push and create PR** to `updates` branch
   ```bash
   git push origin feature/your-feature-name
   ```

4. **After merge**, feature branch will be cleaned up automatically

## License

This project is proprietary to BNK Tech. All rights reserved.

## Support

For support, email hello@bnktech.net or visit our [website](https://bnktech.net).

---

**Built with ❤️ by BNK Tech**: +27 63 068 7409
