import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(import.meta.url.replace('file:///', ''))

const svgDirectory = path.resolve(__dirname,'svg')
const iconDefsPath = path.resolve(__dirname,'iconDefs.js');

const importSVGIcons = () => {
  const svgFiles = fs.readdirSync(svgDirectory).filter(file => file.endsWith('.svg'))
  const iconDefs = {}

  svgFiles.forEach(file => {
    const iconName = path.basename(file, '.svg')
    const size = iconName.match(/size=(\d+)/)[0].replace('size=', '')
    const icon = iconName.match(/icon=([\w\-]+)/)[0].replace('icon=', '')

    const key = `${icon}--${size}`;
    iconDefs[key] = []
    
    const svgContent = fs.readFileSync(path.join(svgDirectory, file), 'utf-8')
    
    const regex = /d="(?<d>[^"]*)"/g;
    const pathMatches = svgContent.match(regex);
    
    if (pathMatches) {
      for (const match of pathMatches) {
        iconDefs[key].push(match.replace(/[d=\"]/g, ''))
      }
    }
    
  })
  
  const iconDefsContent = `const iconDefs = ${JSON.stringify(iconDefs, null, 2)};
  export default iconDefs;`
  fs.writeFileSync(iconDefsPath, iconDefsContent)

  console.log(`Icon definitions saved to ${iconDefsPath}`)
}

importSVGIcons()
