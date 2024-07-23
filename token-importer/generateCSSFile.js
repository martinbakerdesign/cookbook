import fs from 'fs'
import path from 'path';
import __dirname from './__dirname.js'

export default function generateCSSFile(cssStyles, outputPath = '../src/styles') {
    // Generate CSS content
    let cssContent = "@tailwind base;\n@layer base {\n";
    cssContent += "  :root {\n";
    cssContent += "    font-size: 16px;\n";
    for (const [key, value] of Object.entries(cssStyles.root)) {
      cssContent += `    --${key}: ${value};\n`;
    }
    cssContent += "  }\n\n";
  
    for (const [mode, styles] of Object.entries(cssStyles.modes)) {
      cssContent += `  .${mode} {\n`;
      for (const [key, value] of Object.entries(styles)) {
        cssContent += `    --${key}: ${value};\n`;
      }
      cssContent += "  }\n\n";
    }
    cssContent += "}";

    const filename = 'variables.css';

    const writeTo = path.resolve(__dirname, ...outputPath.split('/'), filename)
  
    // Write CSS content to file
    fs.writeFileSync(writeTo, cssContent);
  }