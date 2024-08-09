const tokenLevel = {current: null}

export default tokenLevel;

export function setTokenLevel (level) {
  tokenLevel.current = level;
}
export function getTokenLevel () {
  return tokenLevel.current;
}