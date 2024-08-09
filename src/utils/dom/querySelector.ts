const defaultEl = document;

export default function querySelector(...args: [string|Element, string?]) {
    if (!args || !args.length) return null;

    
    const el = typeof args[0] ==='string'? defaultEl.querySelector(args[0]) : args[0] as any;

    if (args.length === 1) {
        return el ?? null;
    }

    if (!args[1]) return null;
    
    return el.querySelector(args[1]);
}