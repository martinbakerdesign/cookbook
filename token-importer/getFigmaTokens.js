import fs from 'fs'
import path from 'path'
import __dirname from './__dirname.js'

function getFigmaTokens () {
    try {
        console.log('fetching figma variables from file')
        const figmaVariables = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./to-import/figmaVariables-3.json"), "utf8")
        );
        return figmaVariables;
    } catch (err) {
        console.error(err)
        return {}
    }
}

const figmaTokens = getFigmaTokens();

export default figmaTokens;