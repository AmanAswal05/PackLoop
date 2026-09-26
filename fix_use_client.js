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
    if (content.includes('framer-motion') && !content.includes('"use client"')) {
      content = '"use client";\n' + content;
      fs.writeFileSync(filePath, content);
      console.log('Added "use client" to:', filePath);
    }
  }
});
