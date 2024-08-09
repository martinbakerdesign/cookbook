import processToken from "./processToken.js"

export default function processModeTokens (cssStyles, tailwindConfig, mode, modeTokens) {
    if (!cssStyles.modes[mode]) {
        cssStyles.modes[mode] = {}
    }
    Object.entries(modeTokens).forEach(([propKey, propTokens]) => 
        processToken(cssStyles, tailwindConfig, propKey, propTokens, [], {mode})
    )
}