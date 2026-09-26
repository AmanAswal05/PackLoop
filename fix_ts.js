const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Fix Framer Motion 'type: "spring"' issue
walkDir('src/app', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('type: "spring"')) {
      content = content.replace(/type: "spring"/g, 'type: "spring" as any');
      fs.writeFileSync(filePath, content);
      console.log('Fixed framer motion TS in:', filePath);
    }
  }
});

// Fix HeroPackaging.tsx PresentationControls
let heroPath = 'src/components/3d/HeroPackaging.tsx';
if (fs.existsSync(heroPath)) {
    let heroContent = fs.readFileSync(heroPath, 'utf8');
    heroContent = heroContent.replace(/config=\{\{ mass: 2, tension: 500 \}\}/, 'config={{ mass: 2, tension: 500 } as any}');
    heroContent = heroContent.replace(/snap=\{\{ mass: 4, tension: 1500 \}\}/, 'snap={{ mass: 4, tension: 1500 } as any}');
    fs.writeFileSync(heroPath, heroContent);
    console.log('Fixed HeroPackaging.tsx TS');
}
