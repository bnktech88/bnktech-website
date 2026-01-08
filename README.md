# BNK Tech (PTY) LTD - Website

Premium technology solutions company website built with Next.js, TypeScript, and GSAP.

## 🌿 Branch Strategy

### **Production Branches**
- **`main`** - Production branch (auto-deploys to live site)
- **`backup-stable-production`** - Emergency rollback branch (never changes)

### **Development Branches**
- **`preview/*`** - Preview-only work branches (creates Vercel Preview Deployments)
- **`preview-home-intro-motion-form-seo`** - Current premium features branch
- **`preview-next-edits`** - Future development work

## ⚠️ **Deployment Safety Rules**

1. **Never push directly to `main`** - Always work on `preview/*` branches
2. **Test in Preview first** - Create PR → Vercel Preview → Test → Merge to main
3. **Keep backup branch safe** - `backup-stable-production` is for emergency rollback only

## 🚨 **Emergency Rollback**

If production breaks, you have two fast rollback options:

### Method A: Redeploy Previous Version
1. Go to Vercel → Deployments tab
2. Find last successful deployment
3. Click "..." → "Redeploy"

### Method B: Switch to Backup Branch
1. Vercel → Settings → Git → Change Production Branch to `backup-stable-production`
2. Redeploy
3. Fix issues on preview branch
4. Switch back to `main` when ready

**📖 See [`docs/VERCEL_PREVIEW_WORKFLOW.md`](./docs/VERCEL_PREVIEW_WORKFLOW.md) for detailed instructions**

---

## 🔧 **Development Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## 🎬 **Preview Mode Features**

Set `NEXT_PUBLIC_PREVIEW_MODE=true` to enable:
- Cinematic home intro animation
- 3D scroll rotation effects
- Enhanced animations

## 📧 **Contact Form Setup**

Required environment variables:
```bash
CONTACT_TO=bnktech.net@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🛡️ **Security**

- Environment variables for sensitive data only
- Rate limiting on contact form (5 requests per 15 minutes)
- Input sanitization and validation
- CORS protection

## 📱 **Features**

- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Next.js Image optimization, lazy loading
- **SEO Ready** - Metadata, OpenGraph, Twitter Cards
- **Analytics** - Vercel Analytics integrated
- **Accessibility** - WCAG compliant, reduced motion support
- **Modern Stack** - TypeScript, Tailwind CSS, GSAP animations

---

**Company**: BNK Tech (PTY) LTD  
**Website**: https://bnktech.net  
**Contact**: bnktech.net@gmail.com  
**Phone**: +27 63 068 7409
