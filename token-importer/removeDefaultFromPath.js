export default function removeDefaultFromPath(path) {
    const lastIndex = path.length - 1;
    return path.filter((v, i) => i !== lastIndex || v !== "DEFAULT");
  }