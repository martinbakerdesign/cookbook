export default function isComposite (value) {
    return 'string' !== typeof value && !isNaN(value) && !Array.isArray(value) && 'object' === typeof value;
}