// CSS Variables are the single source of truth
// Incorporate tailwind to add some magic

import fs from "fs";
import path from 'path'
import generateCSSFile from "./generateCSSFile.js";
import generateTailwindVariablesFile from "./generateTailwindVariablesFile.js";
import __dirname from './__dirname.js'
import { processVariableObject } from "./processVariableObject.js";
import cssStyles from './cssStyles.js'
import tailwindConfig from './tailwindConfig.js'

const completed = [0,0,0,0,0]
let stackPointer = 0;

console.log(`${getProgressBar()} 📃 Importing JSON variables...`)
const figmaVariables = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./to-import/figmaVariables.json"), "utf8")
);
onStackItemCompleted()
console.log(`${getProgressBar()} ✅ JSON variables imported!`)
stackPointer++;

let totalVars = 0;
for (const tokenLevel of ['base', 'abstract', 'component']) {
  const vars = figmaVariables[tokenLevel]
  const varCount = getVarCount(vars);
  totalVars += varCount;

  if (!varCount) {
    onStackItemCompleted()
    
    console.log(`${getProgressBar()} ⤵️ Skipping ${tokenLevel} level. No variables present.`);
    stackPointer++;
    continue;
  }

  
  console.log(`${getProgressBar()} 🛠️ Formatting ${varCount} ${tokenLevel} level variables ...`);
  Object.entries(vars ?? {}).forEach(([varType, vars]) => {
    processVariableObject(cssStyles, tailwindConfig, varType, vars, [], tokenLevel);
  });
  onStackItemCompleted()
  
  console.log(`${getProgressBar()} ✅ ${tokenLevel} level variables formatted!`);
  stackPointer++;
}


console.log(`${getProgressBar()} 🏭 Generating CSS and Tailwind config files...`);
outputVariableFiles();
onStackItemCompleted()

console.log(`${getProgressBar()} ✅ CSS and Tailwind config files generated!`);


console.log(`🎉 Finished! ${totalVars} variables created`);

function outputVariableFiles () {
  generateCSSFile(cssStyles);
  generateTailwindVariablesFile(tailwindConfig);
}

function getVarCount (obj, count = 0) {
  for (const [key, value] of Object.entries(obj)) {
    if ('$value' in value) {
      count++;
    } else {
      count = getVarCount(value, count);
    }
  }
  return count;
}
function getProgressBar () {
  return `[${completed.map(v => v ? '✅' : '⚬').join('')}]`;
}
function onStackItemCompleted () {
  completed[stackPointer] = 1;
}