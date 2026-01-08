# 🚀 **Vercel Preview-First Workflow Guide**

This guide ensures safe deployments with instant rollback capabilities for the BNK Tech website.

## **📋 Workflow Overview**

1. **Work on preview branches** → Create Vercel Preview Deployment
2. **Test thoroughly** → Merge to main when ready  
3. **Monitor production** → Rollback immediately if issues occur

---

## **🌿 Branch Strategy**

| Branch | Purpose | Auto-Deploy |
|--------|---------|-------------|
| `main` | Production (live site) | ✅ Vercel Production |
| `backup-stable-production` | Emergency rollback | ❌ Manual only |
| `preview/*` | Feature development | ✅ Vercel Preview |

---

## **🔧 Step 1: Creating Preview Deployments**

### **Method A: From Pull Request (Recommended)**

```bash
# 1. Create your feature branch
git checkout main
git pull
git checkout -b preview-your-feature-name

# 2. Make your changes
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "feat: your feature description"
git push -u origin preview-your-feature-name
```

4. Go to GitHub → Create Pull Request
5. **Vercel automatically creates Preview Deployment** 
6. Find Preview URL in PR checks or Vercel dashboard

### **Method B: Direct Branch Push**

```bash
# Push any preview-* branch to GitHub
git push origin preview-your-feature-name
```

Vercel automatically detects and deploys any `preview-*` branches.

---

## **🔍 Step 2: Finding Preview URLs**

### **Option 1: GitHub PR Checks**
1. Open your Pull Request
2. Scroll to PR checks section
3. Click **"Details"** next to Vercel check
4. Preview URL: `https://bnktech-website-git-preview-your-feature-bnktech88.vercel.app`

### **Option 2: Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open **bnktech-website** project
3. Click **"Deployments"** tab
4. Find your branch deployment → Click **"Visit"**

---

## **⚙️ Step 3: Environment Variables for Preview**

### **Setting Preview-Only Variables**

1. **Vercel Dashboard** → **bnktech-website** → **Settings** → **Environment Variables**

2. **Add Preview Mode Flag:**
   ```bash
   # Variable Name: NEXT_PUBLIC_PREVIEW_MODE
   # Value: true
   # Environment: Preview (ONLY)
   ```

3. **Add Contact Form Variables (Optional for testing):**
   ```bash
   CONTACT_TO=bnktech.net@gmail.com    # Preview + Production
   SMTP_HOST=smtp.gmail.com            # Preview + Production  
   SMTP_PORT=587                       # Preview + Production
   SMTP_USER=your-email@gmail.com      # Preview + Production
   SMTP_PASS=your-app-password         # Preview + Production
   ```

### **⚠️ Important Environment Rules:**
- **Preview features:** Set environment to **"Preview"** only
- **Production secrets:** Set environment to **"Production"** only  
- **Shared configs:** Set environment to **"All"**

---

## **✅ Step 4: Testing Checklist**

Before merging to production, verify in Preview:

### **🎬 Preview Mode Features (if enabled)**
- [ ] Cinematic intro plays on first home page load
- [ ] 3D scroll rotation effect works smoothly  
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Mobile performance is acceptable

### **🔧 Core Functionality**
- [ ] All pages load without errors
- [ ] Contact form validation works
- [ ] Contact form submissions work (if SMTP configured)
- [ ] Mobile menu functions correctly
- [ ] No JavaScript console errors
- [ ] SEO metadata appears in page source

### **📱 Mobile Testing**
- [ ] Layout responsive on phone/tablet
- [ ] Touch interactions work
- [ ] Performance acceptable on mobile

---

## **🚢 Step 5: Deploying to Production**

### **Safe Merge Process:**

```bash
# 1. Final check - ensure preview branch is ready
git checkout preview-your-feature-name
npm run build  # Must pass

# 2. Switch to main and merge
git checkout main
git pull
git merge preview-your-feature-name

# 3. Push to production
git push origin main
```

**🚨 Monitor production immediately after deployment!**

---

## **🚨 Emergency Rollback Methods**

If production breaks, choose the fastest method:

### **Method A: Redeploy Previous Version (Fastest)**

1. **Vercel Dashboard** → **bnktech-website** → **Deployments**
2. Find the **last successful production deployment** (green checkmark)
3. Click **"..."** → **"Redeploy"**
4. **Production restored in ~30 seconds**

### **Method B: Switch to Backup Branch**

1. **Vercel Dashboard** → **bnktech-website** → **Settings** → **Git**
2. **Production Branch:** Change from `main` to `backup-stable-production`
3. Click **"Deploy"**
4. **Production restored in ~60 seconds**

**After fixing the issue:**
5. Test fix on preview branch
6. Merge fix to main  
7. Switch production branch back to `main`
8. Deploy

### **Method C: Git Revert (If rollback not available)**

```bash
# Find the problematic commit
git log --oneline -10

# Revert the problematic commit
git revert [commit-hash]
git push origin main
```

---

## **🔄 Updating Backup Branch**

**Only update backup branch when production is confirmed stable:**

```bash
# After successful production deployment
git checkout backup-stable-production
git reset --hard main
git push -f origin backup-stable-production
```

**⚠️ Only do this when main is proven stable in production**

---

## **📊 Monitoring & Alerts**

### **Vercel Deployment Status**
- ✅ Green = Successful
- 🟡 Yellow = Building  
- 🔴 Red = Failed

### **Real-time Monitoring**
1. **Vercel Dashboard** → **Functions** → **Errors** (check API routes)
2. **Analytics** → **Web Vitals** (performance metrics)
3. **Browser DevTools** → **Console** (JavaScript errors)

### **Health Checks After Deployment**
- [ ] Homepage loads correctly
- [ ] Contact form works  
- [ ] No 500 errors in Vercel Functions
- [ ] Core user journeys function

---

## **🎯 Quick Reference Commands**

```bash
# Create new preview branch
git checkout -b preview-feature-name

# Push and create PR
git push -u origin preview-feature-name

# Safe production merge
git checkout main && git pull && git merge preview-feature-name && git push

# Emergency: Switch production to backup
# (Do in Vercel Dashboard: Settings → Git → Production Branch)

# Update backup after stable deployment  
git checkout backup-stable-production && git reset --hard main && git push -f
```

---

## **🆘 Emergency Contacts**

If all rollback methods fail:

- **Email**: bnktech.net@gmail.com
- **Phone**: +27 63 068 7409  
- **GitHub**: https://github.com/bnktech88/bnktech-website
- **Vercel Project**: https://vercel.com/bnktech88/bnktech-website

---

**🛡️ Remember: Preview first, test thoroughly, merge safely, monitor closely, rollback instantly if needed.**
