import fs from 'fs'
import path from 'path';
import __dirname from './__dirname.js'

export default function generateCSSFile(cssStyles, outputPath = '../src/styles') {
    const indent = Indent();

    // Generate CSS content
    let cssContent = indent.get()+"@tailwind base;\n@layer base {\n";
    indent.increase();
    cssContent += indent.get()+":root {\n";
    indent.increase()
    cssContent += indent.get()+"font-size: 16px;\n";
    for (const [key, value] of Object.entries(cssStyles.root)) {
      cssContent += `${indent.get()}--${key}: ${value};\n`;
    }
    cssContent += "\n\n";

    for (const [breakpoint, styles] of Object.entries(cssStyles.media?.min ?? {})) {
      cssContent += `${indent.get()}@media screen and (min-width: ${breakpoint}px) {\n`;
      indent.increase()
      for (const [key, value] of Object.entries(styles)) {
        cssContent += `${indent.get()}--${key}: ${value};\n`;
      }
      indent.decrease()
      cssContent += indent.get()+"}\n\n";
    }
    indent.decrease()

    cssContent += indent.get()+"}\n\n";
  
    for (const [mode, styles] of Object.entries(cssStyles.modes)) {
      cssContent += `${indent.get()}.${mode} {\n`;
      indent.increase()
      for (const [key, value] of Object.entries(styles)) {
        cssContent += `${indent.get()}--${key}: ${value};\n`;
      }
      indent.decrease()
      cssContent += "  }\n\n";
    }
    indent.decrease()
    
    cssContent += indent.get()+"}";

    const filename = 'variables.css';

    const writeTo = path.resolve(__dirname, ...outputPath.split('/'), filename)
  
    // Write CSS content to file
    fs.writeFileSync(writeTo, cssContent);
  }

  function Indent () {
    let indent = 0;

    return {
      get () {
        return new Array(indent*2).fill(0).map(() => ' ').join('');
      },
      set ($i) {
        indent = $i;
        return indent;
      },
      increase () {
        indent++;
        return indent;
      },
      decrease() {
        indent--;
        return indent;
      }
    }
  }