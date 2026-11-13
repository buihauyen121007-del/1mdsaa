const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const webDir = path.join(rootDir, 'web');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs.readdirSync(webDir);
files.forEach((file) => {
  const src = path.join(webDir, file);
  if (fs.statSync(src).isFile()) {
    // Copy to public/
    fs.copyFileSync(src, path.join(publicDir, file));
    // Also copy to root directory for maximum Vercel compatibility
    fs.copyFileSync(src, path.join(rootDir, file));
  }
});

console.log(`[build-static] Successfully synchronized ${files.length} assets from web/ to public/ and root directory.`);

