const fs = require('fs');
const path = require('path');

const TARGET_PREFIX = '/giangk244111398/mentor-app/';
const BUILD_DIR = path.resolve('build');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

// Convert a string to its possible JS hex-escaped form
// e.g. "Bìa" -> "B\\xeca" (because 'ì' = \xec + 'a')
// Actually webpack uses \xHH for chars 128-255
function toJsHexEscaped(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code > 127 && code < 256) {
      result += '\\x' + code.toString(16);
    } else if (code >= 256) {
      result += '\\u' + code.toString(16).padStart(4, '0');
    } else {
      result += str[i];
    }
  }
  return result;
}

// Collect all asset filenames in build/ (non-code files)
const allBuildFiles = walk(BUILD_DIR);
const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.pdf', '.mp4', '.webm']);

const assetFiles = new Set();
allBuildFiles.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (assetExtensions.has(ext)) {
    const relPath = path.relative(BUILD_DIR, file).replace(/\\/g, '/');
    assetFiles.add(relPath);
    const baseName = path.basename(file);
    assetFiles.add(baseName);
  }
});

console.log(`Found ${assetFiles.size} unique asset references to track.`);

// Get all JS, CSS, HTML files in build
const codeFiles = allBuildFiles.filter(file => /\.(html|js|css)$/.test(file));

let totalPatches = 0;

codeFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  assetFiles.forEach(asset => {
    // Skip webpack-managed assets
    if (asset.startsWith('static/')) return;

    // Normal string replacement
    content = content.split(`"./${asset}"`).join(`"${TARGET_PREFIX}${asset}"`);
    content = content.split(`'./${asset}'`).join(`'${TARGET_PREFIX}${asset}'`);
    content = content.split(`"/${asset}"`).join(`"${TARGET_PREFIX}${asset}"`);
    content = content.split(`'/${asset}'`).join(`'${TARGET_PREFIX}${asset}'`);

    // Also try hex-escaped version for unicode filenames
    const escapedAsset = toJsHexEscaped(asset);
    if (escapedAsset !== asset) {
      content = content.split(`"./${escapedAsset}"`).join(`"${TARGET_PREFIX}${asset}"`);
      content = content.split(`'./${escapedAsset}'`).join(`'${TARGET_PREFIX}${asset}'`);
      content = content.split(`"/${escapedAsset}"`).join(`"${TARGET_PREFIX}${asset}"`);
      content = content.split(`'/${escapedAsset}'`).join(`'${TARGET_PREFIX}${asset}'`);
    }
  });

  // Catch remaining url() references in CSS
  content = content.replace(/url\(\s*["']?(\.\/)([^"')]+\.(png|jpg|jpeg|gif|svg|webp|ico))["']?\s*\)/g, (match, prefix, filename) => {
    return `url("${TARGET_PREFIX}${filename}")`;
  });

  content = content.replace(/url\(\s*["']?(\/)([^"')]+\.(png|jpg|jpeg|gif|svg|webp|ico))["']?\s*\)/g, (match, prefix, filename) => {
    if (filename.startsWith('giangk244111398/')) return match;
    return `url("${TARGET_PREFIX}${filename}")`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalPatches++;
    console.log(`Patched: ${path.relative(BUILD_DIR, file)}`);
  }
});

console.log(`\nDone! Patched ${totalPatches} files total.`);

// Xóa index.html sau khi build - file này được thay thế bởi PHP Template trên WordPress
const buildIndexHtml = path.join(BUILD_DIR, 'index.html');
if (fs.existsSync(buildIndexHtml)) {
  fs.unlinkSync(buildIndexHtml);
  console.log('Removed: index.html (replaced by PHP Template on WordPress)');
}
