/**
 *
 * @param {Record<string, any>} obj
 * @param {string|string[]} path
 * @returns {any}
 */
export default function getNestedValue(obj = {}, path = "") {
    const invalidObj = "object" !== typeof obj || Array.isArray(obj) || !Object.keys(obj).length;
    const invalidPath =
      !path || ("string" !== typeof path && !Array.isArray(path)) || !path.length;
    if (invalidObj || invalidPath) return null;
  
    const pathArr = Array.isArray(path)
      ? path
      : path.includes(".")
        ? path.split(".")
        : [path];
  
    let value = { ...obj };
    for (const key of pathArr) {
      value = value[key] ?? null;
      if (value === null) return value;
    }
  
    return value;
  }

  