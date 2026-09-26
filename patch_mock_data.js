const fs = require('fs');

const file = 'src/lib/mock-data.ts';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(/name:\s*"Kraft Cookie Box",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/kraft-cookie-box.jpg"'));
data = data.replace(/name:\s*"Paper Stand-Up Pouch",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/paper-stand-up-pouch.jpg"'));
data = data.replace(/name:\s*"Reusable Fabric Pouch",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/reusable-fabric-pouch.jpg"'));
data = data.replace(/name:\s*"Corrugated Mailer Box",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/corrugated-mailer-box.jpg"'));
data = data.replace(/name:\s*"Compostable Food Container",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/compostable-food-container.jpg"'));
data = data.replace(/name:\s*"Kraft Paper Bag \(Small\)",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/kraft-paper-bag.jpg"'));
data = data.replace(/name:\s*"Bamboo Cutlery Set",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/bamboo-cutlery-set.jpg"'));
data = data.replace(/name:\s*"Glass Jars with Cork",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/glass-jars-cork.jpg"'));
data = data.replace(/name:\s*"Recycled Poly Mailer",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/recycled-poly-mailer.jpg"'));
data = data.replace(/name:\s*"Molded Pulp Trays",[\s\S]*?image:\s*"[^"]+"/g, match => match.replace(/image: "[^"]+"/, 'image: "/images/products/molded-pulp-trays.jpg"'));

fs.writeFileSync(file, data);
