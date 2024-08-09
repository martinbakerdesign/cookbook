export function useSetRef (refs) {
    return (ref, key) => {
        refs[key] = ref;
    }
}