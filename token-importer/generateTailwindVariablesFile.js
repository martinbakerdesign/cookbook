import fs from 'fs'
import path from 'path';
import __dirname from './__dirname.js'
import tailwindKeys from './tailwindKeys.js';

export default function generateTailwindVariablesFile(tailwindConfig, outputPath = '..') {

    const inheritRefs = {}
    for (const key of tailwindKeys.inheritSpacing) {
      if (!tailwindConfig[key]) continue;
      inheritRefs[`spacing.${key}`] = {...tailwindConfig[key]}
      tailwindConfig[key] = `{inheritRefs.spacing.${key}}`;
    }
    for (const key of tailwindKeys.inheritColors) {
      if (!tailwindConfig[key]) continue;
      inheritRefs[`colors.${key}`] = {...tailwindConfig[key]}
      tailwindConfig[key] = `{inheritRefs.colors.${key}}`;
    }

    const filename = 'figmaVariables.js';
    const writeTo = path.resolve(__dirname, ...outputPath.split('/'), filename);

    let figmaVars = "const figmaVariables = "+JSON.stringify(tailwindConfig, null, 2)+";\n\nexport default figmaVariables;";

    for (const [key, obj] of Object.entries(inheritRefs)) {
      const inherit = key.split('.')[0]
      let fnString = "(theme) => ({\n    ...theme('"+inherit+"'),\n";
      for (const [_key, _value] of Object.entries(obj)) {
        fnString += `    ${JSON.stringify(_key)} : ${JSON.stringify(_value)},`+"\n";
      }
      fnString += "  })"

      figmaVars = figmaVars.replace(`"{inheritRefs.${key}}"`, fnString)
    }

    // Export tailwindConfig to figmaVars.js
    fs.writeFileSync(
      writeTo,
      figmaVars
    );
  }