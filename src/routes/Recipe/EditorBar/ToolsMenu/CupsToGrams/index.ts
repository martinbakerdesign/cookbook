import { writable } from "svelte/store";
import CupsToGrams from "./CupsToGrams.svelte";

type PowderedContent = 'apflour' | 'breadflour' | 'sugar';

const cups = writable<number>(1);
const content = writable<PowderedContent>('apflour');

const contentOptions = [
    {
        value: 'apflour',
        label: 'All Purpose Flour',
    },
    {value: 'breadflour', label: 'Bread Flour',},
    {value: 'sugar', label: 'Sugar',},
]

const gramsPerCup = {
    'apflour': 125,
    'breadflour': 136,
    'sugar': 200,
} as Record<PowderedContent, number>;

function cupsToGrams(cups: number, content: PowderedContent): number {
    if (content == null || !gramsPerCup[content]) {
        return 0;
    }
  return cups * gramsPerCup[content];
}

export {
    type PowderedContent,
    //
    CupsToGrams as default,
    //
    contentOptions,
    cups,
    content,
    //
    cupsToGrams
}