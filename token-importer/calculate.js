import isRefValue from "./isRefValue.js";

const valueKeys = ['value', '$value']

export default function calculate (valueStr, tokens) {
    const regex = /({.+}|\-?\d+(?:\.?\d+)?)\s*(\*|\+|\-|\/)\s*({.+}|\-?\d+(?:\.?\d+)?)/;
    
    const matches = valueStr.match(regex);

    
    if (!matches) return 0;
    
    const [x, op, y] = matches.slice(1)
    
    const xValue = isRefValue(x) ? getReferenceTokenValue(x, tokens) : parseFloat(x);
    
    const yValue = isRefValue(y) ? getReferenceTokenValue(y, tokens) : parseFloat(y);

    if (null == xValue || null == yValue) return 0;

    switch (op) {
        case '+':
            return xValue + yValue;
        case '-':
            return xValue - yValue;
        case '*':
            return xValue * yValue;
        case '/':
            return xValue / yValue;
        default:
            return 0;
    }
}

function getReferenceTokenValue (str, tokens) {
    let token = tokens;

    const path = ['base',...str.replace(/[{}]/g, '').split('.')]
    for  (const segment of path) {
        token = token[segment];
        if (!token) return null;
    }

    return getTokenValue(token);
}

function getTokenValue (token) {
    for (const key of valueKeys) {
        if (key in token) return token[key];
    }
    return null;
}