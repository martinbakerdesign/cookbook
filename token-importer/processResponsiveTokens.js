import processToken from "./processToken.js";

export default function processResponsiveTokens(
  cssStyles,
  tailwindConfig,
  size,
  sizeTokens
) {
  const { $min, $max, ...rest } = sizeTokens;

  const isMin = null != $min;
  const isMax = null != $max;
  const isRoot = !isMin && !isMax;

  if (isRoot && !cssStyles.media.root) {
    cssStyles.media.root = {}
  }
  if (isMin && !cssStyles.media.min) {
    cssStyles.media.min = {};
  }
  if (isMax && !cssStyles.media.max) {
    cssStyles.media.max = {};
  }
  const responsive = {
    id: size
  }
  if (isRoot) {
    responsive.root = true;
  }
  if (isMin) {
    responsive.min = $min
  }
  if (isMax) {
    responsive.max = $max;
  }

  for (const [propKey, propTokens] of Object.entries(rest ?? {})) {
    processToken(cssStyles, tailwindConfig, propKey, propTokens, [], {responsive});
  }
}
