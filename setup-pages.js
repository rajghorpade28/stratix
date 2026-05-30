const fs = require('fs');
const path = require('path');

const pages = ['about', 'services', 'pricing', 'case-studies', 'contact', 'faq', 'privacy', 'terms'];

pages.forEach(page => {
  const dirPath = path.join(__dirname, 'src', 'app', page);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const componentName = page.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Page';
  const title = page.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  
  const content = `export default function ${componentName}() {\n  return (\n    <main className="pt-24 min-h-screen">\n      <div className="container mx-auto px-4">\n        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">${title}</h1>\n      </div>\n    </main>\n  );\n}\n`;
  
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('Pages created successfully.');
