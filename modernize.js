const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already modernized (contains framer-motion)
    if (!content.includes('framer-motion')) {
      let originalContent = content;
      
      // Inject motion import
      content = content.replace(/(import .* from ['"]lucide-react['"];?)/, '$1\nimport { motion } from "framer-motion";');
      
      // Convert main div to motion.div
      content = content.replace(/<div className="container mx-auto([^"]+)">/, '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto$1 relative z-10">');
      content = content.replace(/(<motion\.div.*>)[\s\S]*?(<\/div>\s*\)\s*})/, function(match, p1, p2) {
         // This regex is tricky. Let's just do a simple replacement for the last </div>
         return match; 
      });
      
      // We need to replace the last </div> with </motion.div> if we changed the opening tag.
      if (content !== originalContent) {
         let lastDivIndex = content.lastIndexOf('</div>');
         if (lastDivIndex !== -1) {
             content = content.substring(0, lastDivIndex) + '</motion.div>' + content.substring(lastDivIndex + 6);
         }
      }

      // Upgrade cards
      content = content.replace(/<Card className="([^"]*?bg-card[^"]*?)"/g, '<Card className="$1 glass"');
      content = content.replace(/<Card className="([^"]*?border-border[^"]*?)"/g, function(match, classes) {
         if (!classes.includes('glass')) {
            return `<Card className="${classes} glass-panel hover:shadow-xl transition-all duration-300"`;
         }
         return match;
      });

      fs.writeFileSync(filePath, content);
      console.log('Modernized:', filePath);
    }
  }
});
