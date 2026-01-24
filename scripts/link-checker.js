const fs = require('fs');
const path = require('path');

// Simple link checker for internal links
function findInternalLinks(dir, links = new Set()) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findInternalLinks(fullPath, links);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Find href attributes
      const hrefMatches = content.match(/href=["']([^"']*?)["']/g) || [];
      hrefMatches.forEach(match => {
        const href = match.match(/href=["']([^"']*?)["']/)[1];
        if (href.startsWith('/') && !href.startsWith('//')) {
          links.add(href);
        }
      });
      
      // Find Link to attributes
      const linkMatches = content.match(/to=["']([^"']*?)["']/g) || [];
      linkMatches.forEach(match => {
        const to = match.match(/to=["']([^"']*?)["']/)[1];
        if (to.startsWith('/') && !to.startsWith('//')) {
          links.add(to);
        }
      });
      
      // Find router.push calls
      const routerMatches = content.match(/router\.push\(['"`]([^'"`]*?)['"`]\)/g) || [];
      routerMatches.forEach(match => {
        const route = match.match(/router\.push\(['"`]([^'"`]*?)['"`]\)/)[1];
        if (route.startsWith('/') && !route.startsWith('//')) {
          links.add(route);
        }
      });
    }
  }
  
  return links;
}

// Define expected routes
const expectedRoutes = [
  '/',
  '/about',
  '/services',
  '/work',
  '/contact',
  '/privacy',
  '/work/enterprise-ecommerce-platform',
  '/work/fintech-progressive-web-app', 
  '/work/healthcare-portal-rebuild',
  '/admin/leads',
  '/sitemap.xml'
];

// Find all internal links
const srcDir = path.join(__dirname, '..', 'src');
const links = findInternalLinks(srcDir);

console.log('🔍 Internal Links Found:');
links.forEach(link => {
  console.log(`  ${link}`);
});

console.log('\n📋 Expected Routes:');
expectedRoutes.forEach(route => {
  console.log(`  ${route}`);
});

console.log('\n⚠️  Links Not in Expected Routes:');
const extraLinks = [...links].filter(link => {
  // Remove hash fragments and query params for comparison
  const cleanLink = link.split('#')[0].split('?')[0];
  return !expectedRoutes.includes(cleanLink);
});

if (extraLinks.length > 0) {
  extraLinks.forEach(link => {
    console.log(`  ${link}`);
  });
} else {
  console.log('  None - All links are valid!');
}

console.log('\n✅ Expected Routes Not Found in Code:');
const missingLinks = expectedRoutes.filter(route => {
  return ![...links].some(link => {
    const cleanLink = link.split('#')[0].split('?')[0];
    return cleanLink === route;
  });
});

if (missingLinks.length > 0) {
  missingLinks.forEach(route => {
    console.log(`  ${route} - Consider adding internal links to this page`);
  });
} else {
  console.log('  None - All expected routes are referenced!');
}

console.log('\n🎯 Link Validation Summary:');
console.log(`  Total internal links found: ${links.size}`);
console.log(`  Expected routes: ${expectedRoutes.length}`);
console.log(`  Extra links to review: ${extraLinks.length}`);
console.log(`  Missing route references: ${missingLinks.length}`);
