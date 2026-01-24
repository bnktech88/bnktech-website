# SEO Checklist & Search Console Setup

This guide provides step-by-step instructions for setting up Google Search Console, Bing Webmaster Tools, and ongoing SEO monitoring for the BNK Tech website.

## 🎯 Quick SEO Verification

Before setting up tools, verify these foundations are in place:

### ✅ Technical SEO Foundation Complete

- **Sitemap:** [https://www.bnktech.net/sitemap.xml](https://www.bnktech.net/sitemap.xml)
- **Robots.txt:** [https://www.bnktech.net/robots.txt](https://www.bnktech.net/robots.txt)
- **Meta titles:** Unique on all 25 pages
- **Meta descriptions:** Compelling CTAs on all pages
- **Canonical URLs:** Point to production domain
- **Schema markup:** Organization, Service, FAQ, Breadcrumb, Article

## 🔍 Google Search Console Setup

### Step 1: Verify Domain Ownership

1. **Go to:** [Google Search Console](https://search.google.com/search-console)
2. **Add Property:** Choose "Domain" (preferred) or "URL prefix"
   - **Domain:** `bnktech.net` (covers www and non-www)
   - **URL Prefix:** `https://www.bnktech.net` (specific subdomain)
3. **Verify Ownership:** Choose verification method:
   - **DNS Record (Recommended):** Add TXT record to domain
   - **HTML File:** Upload verification file to site root
   - **HTML Tag:** Add meta tag to homepage head
   - **Google Analytics:** Use existing GA tracking code

### Step 2: Submit Sitemap

1. **Navigate to:** Sitemaps section in left sidebar
2. **Add Sitemap URL:** `https://www.bnktech.net/sitemap.xml`
3. **Submit and Monitor:** Check for errors or warnings
4. **Verify Coverage:** Ensure all 25 pages are discovered

### Step 3: Request Indexing for Key Pages

Priority pages to request indexing (do immediately after verification):

```
https://www.bnktech.net/
https://www.bnktech.net/services
https://www.bnktech.net/services/website-builds
https://www.bnktech.net/contact
https://www.bnktech.net/insights
```

**How to request indexing:**
1. Use "URL Inspection" tool in Search Console
2. Enter each URL above
3. Click "Request Indexing" if not already indexed
4. Repeat for each priority page

### Step 4: Set Up Enhanced Features

1. **Core Web Vitals:** Monitor in "Experience" section
2. **Mobile Usability:** Check for mobile issues
3. **Security Issues:** Monitor for security problems
4. **Manual Actions:** Watch for Google penalties
5. **Enhancement Reports:** Monitor structured data

## 🎯 Bing Webmaster Tools Setup

### Step 1: Create Account & Verify Site

1. **Go to:** [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. **Add Site:** `https://www.bnktech.net`
3. **Verify Ownership:** Similar options to Google:
   - XML file upload (easiest)
   - Meta tag in homepage
   - DNS CNAME record

### Step 2: Submit Sitemap

1. **Navigate to:** Sitemaps section
2. **Submit:** `https://www.bnktech.net/sitemap.xml`
3. **Monitor:** Check submission status

### Step 3: URL Submission

Submit the same priority pages as listed above for Google.

## 📊 SEO Monitoring Dashboard

### Weekly Monitoring Tasks

**Google Search Console (Every Monday)**
- [ ] **Coverage Report:** Check for new errors or warnings
- [ ] **Core Web Vitals:** Monitor performance metrics
- [ ] **Search Performance:** Review clicks, impressions, CTR
- [ ] **Mobile Usability:** Check for mobile issues

**Bing Webmaster Tools (Every Monday)**  
- [ ] **Crawl Information:** Review crawl stats
- [ ] **Search Performance:** Monitor Bing traffic
- [ ] **SEO Reports:** Check for recommendations

### Monthly SEO Audit

**Performance Metrics**
- [ ] **Organic Traffic:** Track month-over-month growth
- [ ] **Keyword Rankings:** Monitor target keywords
- [ ] **Core Web Vitals:** Ensure all pages pass thresholds
- [ ] **Click-Through Rates:** Optimize low-performing pages

**Technical Health**
- [ ] **Broken Links:** Use Screaming Frog or similar tool
- [ ] **Site Speed:** Monitor with PageSpeed Insights
- [ ] **Mobile Friendliness:** Test on various devices
- [ ] **Security:** Check for mixed content or HTTPS issues

## 🎯 Target Keywords by Page

### Homepage
- **Primary:** "web development South Africa"
- **Secondary:** "custom website development", "business websites SA"

### Service Pages
- **Website Builds:** "website development South Africa", "custom web development"
- **Performance & SEO:** "website SEO South Africa", "Core Web Vitals optimization"
- **Maintenance:** "website maintenance South Africa", "web security services"
- **Retainers:** "web development retainer", "ongoing website support"

### Article Pages
- **Maintenance Guide:** "website maintenance costs South Africa"
- **Core Web Vitals:** "Core Web Vitals optimization", "website performance"  
- **Partner Guide:** "choose web developer South Africa"

## 📈 SEO Growth Strategy

### Phase 1: Foundation (Months 1-3)
- **Goal:** Establish baseline rankings and traffic
- **Actions:**
  - Monitor Search Console for indexing issues
  - Fix any technical SEO problems that arise  
  - Track initial keyword positions
  - Optimize pages based on Search Console data

### Phase 2: Content Expansion (Months 4-6)
- **Goal:** Build topical authority with more content
- **Actions:**
  - Add 2-3 new insights articles monthly
  - Target long-tail keywords with guides
  - Build internal linking between related content
  - Monitor article performance and optimize

### Phase 3: Authority Building (Months 7-12)
- **Goal:** Increase domain authority and competitive rankings
- **Actions:**
  - Create comprehensive resource pages
  - Guest posting and digital PR opportunities
  - Local SEO optimization for South African market
  - Advanced performance optimization

## 🛠️ SEO Tools & Resources

### Free Tools (Essential)
- **Google Search Console** - Search performance and technical issues
- **Google PageSpeed Insights** - Performance and Core Web Vitals
- **Google Analytics 4** - Traffic analysis and conversions  
- **Rich Results Test** - Schema markup validation
- **Mobile-Friendly Test** - Mobile optimization check

### Paid Tools (Recommended)
- **Ahrefs/SEMrush** - Keyword research and competitor analysis
- **Screaming Frog** - Technical SEO crawling and audit
- **GTmetrix** - Advanced performance monitoring
- **BrightLocal** - Local SEO tracking (if targeting local SA market)

## 🚨 Common Issues & Solutions

### Indexing Problems
**Issue:** Pages not appearing in search results
**Solution:** 
1. Check robots.txt isn't blocking pages
2. Ensure proper internal linking  
3. Submit sitemap again in Search Console
4. Use "Request Indexing" tool

### Core Web Vitals Issues  
**Issue:** Poor performance scores
**Solution:**
1. Optimize images (use WebP format)
2. Minimize JavaScript execution
3. Implement proper caching headers
4. Use Next.js Image optimization

### Schema Markup Errors
**Issue:** Structured data warnings in Search Console
**Solution:**
1. Validate with Rich Results Test tool
2. Fix required properties missing
3. Ensure proper nesting of schema objects
4. Re-submit pages for indexing

### Mobile Usability Problems
**Issue:** Mobile-specific SEO issues
**Solution:**
1. Test on real devices, not just desktop
2. Check touch target sizes (min 48px)
3. Ensure text is readable without zooming
4. Verify mobile navigation functionality

## 📞 Next Steps After Setup

### Immediate Actions (Week 1)
1. **Set up Google Search Console and Bing Webmaster Tools**
2. **Submit sitemaps to both platforms**
3. **Request indexing for 5 priority pages**
4. **Set up Google Analytics 4 (already configured)**
5. **Bookmark monitoring dashboard links**

### First Month Tasks
1. **Monitor crawl errors and fix immediately**
2. **Track keyword positions for target terms**
3. **Set up weekly monitoring routine**
4. **Identify content opportunities from Search Console**
5. **Plan first new article based on search data**

### Ongoing Success Metrics

**Technical SEO Health**
- Zero crawl errors in Search Console
- All pages pass Core Web Vitals thresholds
- 100% mobile-friendly score
- Clean security and manual action reports

**Traffic & Rankings**
- Month-over-month organic traffic growth
- Improving positions for target keywords
- Increasing click-through rates from search
- Growing impressions and search visibility

---

**SEO Foundation Complete ✅**

The BNK Tech website has a comprehensive SEO foundation with proper technical optimization, schema markup, content strategy, and monitoring setup. Follow this checklist for ongoing SEO success and traffic growth.
