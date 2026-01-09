# BNK Tech Deployment Guide

This document provides comprehensive instructions for deploying, monitoring, and managing the BNK Tech website on Vercel.

## Overview

The BNK Tech website uses a production-safe branching workflow with automatic deployments and rollback capabilities.

### Branch Structure
- **`main`** → Production deployment (auto-deploys to bnktech.net)
- **`updates`** → Development branch (gets preview deployments)
- **`backup`** → Automatic rollback branch (always points to last known good deployment)

## Environment Variables

### Required for Production
```env
# Gallery System Control
NEXT_PUBLIC_PREVIEW_MODE=true   # Enable premium gallery effects
NEXT_PUBLIC_PREVIEW_MODE=false  # Lightweight fallback for performance
```

### Optional (Contact Form)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@bnktech.net
EMAIL_TO=hello@bnktech.net
```

### Vercel Dashboard Setup
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable for **Production**, **Preview**, and **Development**
3. Redeploy if changing production variables

## Deployment Process

### Automatic Deployment (Standard)

#### Production Deployment
1. **Merge to main**:
   ```bash
   git checkout main
   git pull origin main
   git merge updates
   git push origin main
   ```

2. **Vercel automatically**:
   - Triggers production build
   - Runs tests (`npm ci`, `npm run build`, `npm run lint`)
   - Deploys to production domain
   - Updates `backup` branch (via GitHub Actions)

#### Preview Deployments
- **Any branch push** → Automatic preview deployment
- **Pull requests** → Preview deployment with unique URL
- **Feature branches** → Available at `https://bnktech-website-git-[branch]-bnktech88.vercel.app`

### Manual Deployment

#### Emergency Production Deploy
```bash
# From main branch
npm ci
npm run build
npm run start

# Or deploy specific commit
git checkout [commit-hash]
npm ci && npm run build
vercel --prod
```

## Rollback Procedures

### Method 1: Vercel Dashboard (Instant)
1. Go to Vercel Dashboard → bnktech-website → Deployments
2. Find last working deployment
3. Click **"Promote to Production"**
4. Deployment switches instantly (< 30 seconds)

### Method 2: Backup Branch (Automatic)
```bash
# Set Vercel production branch to backup temporarily
# In Vercel Dashboard: Settings → Git → Production Branch → backup

# Or redeploy backup branch
git checkout backup
git push origin backup --force-with-lease

# Vercel will auto-deploy the backup branch content
```

### Method 3: Previous Commit
```bash
# Find last good commit
git log --oneline -10

# Revert main to previous commit
git checkout main
git reset --hard [last-good-commit-hash]
git push origin main --force-with-lease

# This triggers automatic production deployment
```

### Rollback Validation
After any rollback:
1. **Check site loads**: Visit https://bnktech.net
2. **Test key pages**: /, /services, /work, /contact
3. **Verify contact form**: Submit test message
4. **Check galleries**: Ensure images load and animations work
5. **Monitor errors**: Check Vercel logs for any issues

## Monitoring & Health Checks

### Build Status
- **GitHub Actions**: Check workflow status for backup updates
- **Vercel Deployments**: Monitor build times and success rates
- **Vercel Analytics**: Track Core Web Vitals and performance

### Key Metrics to Monitor
1. **Build Time**: Should be < 60 seconds
2. **Bundle Size**: Keep First Load JS < 200KB
3. **Core Web Vitals**: 
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
4. **Error Rate**: < 1% in Vercel logs

### Health Check Endpoints
- **Homepage**: https://bnktech.net (should load < 2s)
- **Services**: https://bnktech.net/services (gallery functionality)
- **Contact**: https://bnktech.net/contact (form submission)
- **API Health**: https://bnktech.net/api/contact (should return 405 for GET)

## Troubleshooting

### Build Failures

#### Common Issues & Solutions

**1. TypeScript Errors**
```bash
# Check locally first
npm run build
npm run lint

# Common fixes
- Missing commas in services.ts
- Incorrect interface implementations
- Missing dependencies in useEffect arrays
```

**2. Missing Dependencies**
```bash
# Install missing packages
npm install [package-name]

# Update package.json and push
git add package.json package-lock.json
git commit -m "fix: add missing dependencies"
```

**3. Environment Variable Issues**
- Check Vercel dashboard environment variables
- Ensure NEXT_PUBLIC_ prefix for client-side variables
- Redeploy after environment variable changes

**4. Gallery/Image Loading Issues**
- Verify all images exist in `/public/assets/`
- Check file naming matches services.ts exactly
- Ensure Next.js Image optimization is working

#### Build Log Analysis
```bash
# Check Vercel build logs
1. Go to Vercel Dashboard → Deployments
2. Click failed deployment
3. View "Build Logs" tab
4. Look for error patterns:
   - "Module not found" → Missing dependency
   - "Type error" → TypeScript issue
   - "Expected ','" → Syntax error in content files
```

### Runtime Errors

**Gallery System Issues**
- Check `NEXT_PUBLIC_PREVIEW_MODE` setting
- Verify GSAP license and imports
- Ensure all media files are accessible

**Contact Form Issues**
- Verify SMTP environment variables
- Check email provider app password
- Test API endpoint directly

**Performance Issues**
- Enable production optimizations
- Check bundle size in build output  
- Review Core Web Vitals in Vercel Analytics

## Backup Management

### Automatic Backup Updates
The `backup` branch automatically updates via GitHub Actions when:
1. `main` branch receives a push
2. All build checks pass (npm ci, build, lint)
3. Deployment appears successful

### Manual Backup Update
```bash
# Update backup to current main
git checkout backup
git reset --hard main
git push origin backup --force-with-lease

# Verify backup is correct
git log --oneline -5
```

### Backup Validation
Weekly backup verification:
```bash
# Test backup branch builds correctly
git checkout backup
npm ci
npm run build

# Should complete without errors
# Compare with main branch functionality
```

## Security Considerations

### Environment Variables
- **Never commit** `.env.local` or production secrets
- **Use Vercel environment variables** for production
- **Rotate SMTP passwords** periodically
- **Review environment variable access** in Vercel dashboard

### Branch Protection
- `main` branch requires successful build checks
- No direct commits to `main` (merge via PRs when in team)
- Force push protection on `main` branch

### Access Control
- **Repository access**: Only authorized BNK Tech team members
- **Vercel project access**: Limited to deployment team
- **Domain management**: Separate DNS/domain registrar access

## Performance Optimization

### Production Settings
```bash
# Vercel automatically enables:
- Image optimization (Next.js Image component)
- Static generation where possible
- Edge caching for static assets
- Gzip compression
- HTTP/2 and HTTP/3 support
```

### Bundle Optimization
- Gallery system uses preview mode gating
- Heavy animations disabled on mobile
- Lazy loading for non-critical components
- Tree shaking for unused code

### Monitoring Tools
- **Vercel Analytics**: Performance and usage metrics
- **Core Web Vitals**: User experience metrics
- **Build Analytics**: Bundle size and build time tracking

## Emergency Procedures

### Site Down Emergency
1. **Check Vercel status**: https://vercel.com/status
2. **Immediate rollback**: Use Method 1 (Vercel Dashboard)
3. **Verify rollback success**: Test key functionality
4. **Investigate issue**: Check build logs and error reports
5. **Communicate**: Update team/stakeholders on status

### Database/Content Issues
1. **Backup current state**: Export current content
2. **Identify problematic changes**: Check recent commits
3. **Revert specific files**: Use targeted rollback
4. **Test thoroughly**: Verify all functionality works
5. **Document issue**: Update troubleshooting guide

### Security Incident
1. **Immediate assessment**: Determine scope of issue
2. **Rotate credentials**: Change all API keys/passwords
3. **Review access logs**: Check for unauthorized access
4. **Update security measures**: Implement additional protections
5. **Monitor closely**: Watch for follow-up attacks

---

**For immediate support during emergencies, contact the BNK Tech development team.**

**Last Updated**: January 2025  
**Version**: 2.0  
**Next Review**: March 2025
