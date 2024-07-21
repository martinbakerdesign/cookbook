const defaultEl = document;

export default function querySelectorAll(...args: [string|Element, string?]) {
    if (!args || !args.length || args.length === 1 && typeof args[0] !== 'string') return [];

    if (args.length === 1) {
        return typeof args[0] === 'string' ? Array.from(defaultEl.querySelectorAll(args[0])) : [];
    }

    const el = typeof args[0] ==='string'? defaultEl.querySelector(args[0]) : args[0];
    
    return Array.from(el.querySelectorAll(args[1]));
}