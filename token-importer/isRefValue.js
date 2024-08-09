export default function isRefValue (value = '') {
    return value && value.length > 0 && value.slice(0,1) === '{' && value.slice(-1) === '}'
}