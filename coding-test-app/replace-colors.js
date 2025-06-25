const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
const colorsToReplace = {
  '#1f2027': '#0f1115', // Main bg
  '#24252d': '#16171d', // Panels
  '#343640': '#222329', // Cards / active buttons
  '#4a4c57': '#2a2c35'  // Borders
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [oldC, newC] of Object.entries(colorsToReplace)) {
    if (content.includes(oldC)) {
      content = content.split(oldC).join(newC);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

function walk(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk(dir);
