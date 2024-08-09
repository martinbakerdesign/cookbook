
/**
 * Sets a nested value in an object given a key string array and a value
 * @param {Object} obj - The object to modify
 * @param {string[]} path - An array of keys representing the path to the nested value
 * @param {*} value - The value to set
 * @returns {Object} The modified object
 */
export default function setNestedValue(obj, path, value) {
  if (!obj || typeof obj !== 'object' || !Array.isArray(path) || path.length === 0 || path.some((key) => ('string' !== typeof key || !key.length))) {
    return {}
  }

    const lastKey = path.pop()
    const nestedObj = path.reduce((acc, key) => {
      if (!acc[key] || typeof acc[key] !== 'object') {
        acc[key] = {}
      }
      return acc[key]
    }, obj)
    nestedObj[lastKey] = value
    return obj
  }