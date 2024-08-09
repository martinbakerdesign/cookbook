import $ from 'utils/dom/querySelector';
import { get } from 'svelte/store';
import { bg } from 'store/index';

export default function setBG ($location) {
    if (!$("html")) return;

    const showBG = ['/'].includes($location);
    const $bg = get(bg)[0] ?? '';
    const bgPath = `/assets/img/landing/${$bg}.webp`;

    $("html").style.backgroundImage = ['', `url(${bgPath})`][+showBG];
}