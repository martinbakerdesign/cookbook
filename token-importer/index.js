// CSS Variables are the single source of truth
// Incorporate tailwind to add some magic

import generateCSSFile from "./generateCSSFile.js";
import generateTailwindVariablesFile from "./generateTailwindVariablesFile.js";
import __dirname from "./__dirname.js";
import cssStyles from "./cssStyles.js";
import tailwindConfig from "./tailwindConfig.js";
import figmaTokens from "./getFigmaTokens.js";
import processToken from "./processToken.js";
import processModeTokens from "./processModeTokens.js";
import processResponsiveTokens from "./processResponsiveTokens.js";

const completed = [0, 0, 0];
let stackPointer = 0;

if (!Object.keys(figmaTokens).length) {
  console.log(
    `❌ figmaTokens empty. Make sure that your .json file in the 'to-import' folder is formatted correctly.`
  );
} else {
  runImporter();
}

function runImporter() {
  const flattenedTokens = flattenTokenSets(figmaTokens);

  let totalVars = getVarCount(flattenedTokens);
  const { modes, media, ...basic } = flattenedTokens;

  const basicCount = getVarCount(basic ?? {});
  console.log(
    `${getProgressBar()} 🛠️ Converting ${basicCount} basic tokens ...`
  );
  Object.entries(basic ?? {}).forEach(([propKey, propTokens]) =>
    processToken(cssStyles, tailwindConfig, propKey, propTokens)
  );
  onStackItemCompleted();
  console.log(`${getProgressBar()} ✅ ${basicCount} basic tokens converted!`);
  stackPointer++;

  const modesCount = getVarCount(modes ?? {});
  console.log(
    `${getProgressBar()} 🛠️ Converting ${modesCount} mode tokens ...`
  );
  Object.entries(modes ?? {}).forEach(([mode, modeTokens]) =>
    processModeTokens(cssStyles, tailwindConfig, mode, modeTokens)
  );
  onStackItemCompleted();
  console.log(`${getProgressBar()} ✅ ${modesCount} mode tokens converted!`);
  stackPointer++;

  const mediaCount = getVarCount(media ?? {});
  console.log(
    `${getProgressBar()} 🛠️ Converting ${mediaCount} responsive tokens ...`
  );
  Object.entries(media ?? {}).forEach(([size, sizeTokens]) =>
    processResponsiveTokens(cssStyles, tailwindConfig, size, sizeTokens)
  );
  onStackItemCompleted();
  console.log(`${getProgressBar()} ✅ ${modesCount} responsive tokens converted!`);
  stackPointer++;

  console.log(
    `${getProgressBar()} 🏭 Generating CSS and Tailwind config files...`
  );
  outputVariableFiles();
  onStackItemCompleted();

  console.log(
    `${getProgressBar()} ✅ CSS and Tailwind config files generated!`
  );

  console.log(`🎉 Finished! ${totalVars} variables created`);
}

function outputVariableFiles() {
  generateCSSFile(cssStyles);
  generateTailwindVariablesFile(tailwindConfig);
}

function getVarCount(obj, count = 0) {
  for (const [key, value] of Object.entries(obj)) {
    if (['$min', '$max'].includes(key)) continue;
    if ("$value" in value) {
      count++;
    } else {
      count = getVarCount(value, count);
    }
  }
  return count;
}

function getProgressBar() {
  return `[${completed.map((v) => (v ? "✅" : "⚬")).join("")}]`;
}

function onStackItemCompleted() {
  completed[stackPointer] = 1;
}

function flattenTokenSets(tokenSets) {
  const flattened = {};

  for (const [setKey, tokenSet] of Object.entries(tokenSets)) {
    for (const [propKey, propTokens] of Object.entries(tokenSet)) {
      if (!flattened[propKey]) {
        flattened[propKey] = {};
      }
      flattened[propKey] = {
        ...flattened[propKey],
        ...propTokens,
      };
    }
  }

  return flattened;
}
