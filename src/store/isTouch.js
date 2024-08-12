import { writable } from "svelte/store";

const isTouch = isTouchStore();

function isTouchStore () {
    const store = writable(false);

    const onTouchStart = () => {
        store.set(true)
        cleanup();
    };

    window.addEventListener('touchstart', onTouchStart)

    function cleanup () {
        window.removeEventListener('touchstart', onTouchStart)
    }

    return {
        ...store,
        cleanup
    }
}

export {
    isTouch as default
}