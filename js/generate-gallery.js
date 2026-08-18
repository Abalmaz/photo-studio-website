const fs = require('fs');
const path = require('path');

const categories = ['maternity', 'newborn', 'cakesmash', '6months'];
const imagesDir = path.join(__dirname, '..', 'images');
const manifest = {};

categories.forEach(category => {
  const dir = path.join(imagesDir, category);
  if (!fs.existsSync(dir)) {
    manifest[category] = [];
    return;
  }
  manifest[category] = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
});

fs.writeFileSync(
  path.join(imagesDir, 'gallery-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Gallery manifest generated:', manifest);