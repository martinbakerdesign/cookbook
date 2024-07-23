import fs from 'fs'
import path from 'path';
import __dirname from './__dirname.js'

export default function generateTailwindVariablesFile(tailwindConfig, outputPath = '..') {

    const filename = 'figmaVariables.js';
    const writeTo = path.resolve(__dirname, ...outputPath.split('/'), filename);
    // Export tailwindConfig to figmaVars.js
    fs.writeFileSync(
      writeTo,
      "const figmaVariables = "+JSON.stringify(tailwindConfig, null, 2)+";\n\nexport default figmaVariables;"
    );
  }