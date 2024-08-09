export default function isMathValue (value) {
    return 'string' === typeof value && null != value.match(/({.+}|\-?\d+(?:\.?\d+)?)\s*(\*|\+|\-|\/)\s*({.+}|\-?\d+(?:\.?\d+)?)/);
}