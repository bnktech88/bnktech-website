# Premium Gallery System Documentation

This document explains how to use and extend the premium gallery system implemented in the BNK Tech website.

## Overview

The gallery system provides top-tier agency-level visual experiences with:
- 5 different gallery styles (minimalFade, stackCards, cinematicZoom, splitReveal, parallaxSlide)
- 6 transition types (fade, slide, wipe, scale, 3dFlip, clipReveal) 
- Premium lightbox with video/image support
- Scroll-triggered slideshow motion (GSAP ScrollTrigger)
- Mobile optimization and accessibility
- Preview mode gating (`NEXT_PUBLIC_PREVIEW_MODE=true`)

## Configuration

### Environment Variables

The gallery system respects the preview mode environment variable:

```env
NEXT_PUBLIC_PREVIEW_MODE=true   # Enables premium gallery effects
NEXT_PUBLIC_PREVIEW_MODE=false  # Falls back to simple gallery (production)
```

### Service Content Structure

Services are configured in `src/content/services.ts`:

```typescript
interface MediaItem {
  type: 'image' | 'video'
  src: string
  poster?: string      // required for videos
  alt?: string
  width?: number
  height?: number
  caption?: string
  tags?: string[]
  priority?: boolean   // only for first hero slide
}

interface GalleryConfig {
  style: 'minimalFade' | 'stackCards' | 'splitReveal' | 'cinematicZoom' | 'parallaxSlide'
  transition: 'fade' | 'slide' | 'wipe' | 'scale' | '3dFlip' | 'clipReveal'
  autoPlay: boolean
  intervalMs: number
  lightboxEnabled: boolean
  lightboxStyle: 'darkGlass' | 'pureBlack' | 'studioWhite'
  scrollTrigger: {
    enabled: boolean
    mode: 'scrub' | 'snap'
    start: string
    end: string
  }
}
```

## Gallery Styles

### 1. minimalFade
- **Description**: Clean, simple crossfade transitions
- **Best for**: Professional services, coming soon states
- **Performance**: Lightweight, works on all devices

### 2. stackCards (Cuberto-inspired)
- **Description**: Stacked cards with depth and 3D transforms
- **Best for**: App showcases, interactive media
- **Performance**: Desktop optimized, mobile fallback

### 3. cinematicZoom
- **Description**: Film-grain overlay, slow zoom effects, cinematic UI
- **Best for**: Premium showcases, artistic presentations
- **Performance**: Desktop heavy, mobile optimized

### 4. splitReveal
- **Description**: Split-panel reveal transitions with elegant indicators
- **Best for**: Dramatic presentations, high-impact visuals
- **Performance**: Medium weight, responsive

### 5. parallaxSlide
- **Description**: Horizontal parallax with background drift effects
- **Best for**: Dynamic content, scroll-controlled experiences
- **Performance**: Preview-mode only, scroll-triggered

## Adding New Media

### Images

1. **Add image files** to `/public/assets/` using web-safe naming:
   ```
   /public/assets/service-name-1.jpeg
   /public/assets/service-name-2.jpeg
   ```

2. **Update service content** in `src/content/services.ts`:
   ```typescript
   gallery: [
     { 
       type: 'image', 
       src: '/assets/service-name-1.jpeg', 
       alt: 'Descriptive alt text',
       priority: true // for first image only
     },
     { 
       type: 'image', 
       src: '/assets/service-name-2.jpeg', 
       alt: 'Second image description'
     }
   ]
   ```

### Videos

1. **Add video files** to `/public/assets/`:
   ```
   /public/assets/service-demo.mp4
   /public/assets/service-demo-poster.jpg
   ```

2. **Update service content**:
   ```typescript
   gallery: [
     { 
       type: 'video', 
       src: '/assets/service-demo.mp4',
       poster: '/assets/service-demo-poster.jpg',
       alt: 'Video demonstration',
       caption: 'Live demo of our platform'
     }
   ]
   ```

## Gallery Configuration Examples

### Website Builds (Current)
```typescript
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
```

### App Development (Current)
```typescript
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
```

### Coming Soon Services
```typescript
galleryConfig: {
  style: 'minimalFade',
  transition: 'fade',
  autoPlay: false,
  intervalMs: 3000,
  lightboxEnabled: false,
  lightboxStyle: 'darkGlass',
  scrollTrigger: {
    enabled: false,
    mode: 'scrub',
    start: 'top 80%',
    end: 'bottom 20%'
  }
}
```

## Performance Optimization

### Mobile Behavior
- Heavy gallery styles (`stackCards`, `cinematicZoom`, `parallaxSlide`) automatically fall back to `minimalFade` on mobile
- Autoplay is disabled on mobile for heavy styles to preserve battery
- Touch/swipe navigation is optimized for mobile interaction

### Reduced Motion
- Respects `prefers-reduced-motion: reduce` user preference
- Disables animations and falls back to simple transitions
- Maintains accessibility while preserving functionality

### Preview Mode Gating
- Premium effects only activate when `NEXT_PUBLIC_PREVIEW_MODE=true`
- Production builds use lightweight fallbacks automatically
- Scroll-triggered effects are preview-mode only

## Architecture

### File Structure
```
src/components/gallery/
├── ServiceGallery.tsx           # Main orchestrator component
├── Lightbox.tsx                 # Premium lightbox with video support
├── useGalleryMotion.ts          # GSAP transition hooks
├── useScrollGallery.ts          # ScrollTrigger integration
├── media/
│   ├── ImageSlide.tsx           # Optimized image component
│   └── VideoSlide.tsx           # Video with autoplay detection
└── styles/
    ├── MinimalFadeGallery.tsx   # Simple crossfade style
    ├── StackCardsGallery.tsx    # 3D stacked cards
    ├── CinematicZoomGallery.tsx # Film-like experience
    ├── SplitRevealGallery.tsx   # Split-panel transitions
    └── ParallaxSlideGallery.tsx # Parallax with scroll control
```

### Integration Points
- `src/components/sections/ServiceDetail.tsx` - Services page gallery display
- `src/components/sections/Services.tsx` - Home page service cards (if needed)
- `src/content/services.ts` - Content source of truth

## Troubleshooting

### Build Issues
1. **TypeScript errors**: Ensure all MediaItem objects have required `type` field
2. **Missing dependencies**: Run `npm install gsap lucide-react` if needed
3. **Image optimization warnings**: Use Next.js `Image` component, not `<img>` tags

### Performance Issues
1. **Slow mobile**: Check if preview mode is enabled in production
2. **Memory leaks**: Ensure GSAP timelines are properly cleaned up
3. **Layout shifts**: Verify aspect-ratio containers are used consistently

### Accessibility Issues  
1. **Keyboard navigation**: All galleries support arrow keys and tab navigation
2. **Screen readers**: Ensure alt text is provided for all images
3. **Focus management**: Lightbox implements focus trapping

## Future Extensions

### Adding New Gallery Styles
1. Create new component in `src/components/gallery/styles/`
2. Import and add to switch statement in `ServiceGallery.tsx`
3. Add new style type to `GalleryStyle` union type
4. Update documentation with usage examples

### Adding New Transition Types
1. Add transition logic to `useGalleryMotion.ts`
2. Add new type to `TransitionType` union
3. Test across all gallery styles for compatibility

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintainer**: BNK Tech Development Team
