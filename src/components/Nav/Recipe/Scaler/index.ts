import { derived, get, writable } from 'svelte/store';
import { showScalerToggle, showScalerValueInToggle, toggleWidget, WIDGETS } from '..'
import Scaler from './Nav--Recipe__Scaler.svelte'
import Toggle from './Nav--Recipe__Scaler__Toggle.svelte'
import Suggestions from './Nav--Recipe__Scaler__Suggestions.svelte'
import { amount, scaleFactor } from 'store/index';
import pluralize from 'pluralize';
import { findValues } from 'utils/recipes/fragment/RecipeFragment';

const refs = {
    input: null,
    inputContainer: null,
    suggestions: null
}

const focus = writable(false);

const yieldValue = derived(
    [amount,scaleFactor],
    ([$amount, $scale]) => {
        if (Array.isArray($amount.quantity)) {
            return $amount.quantity.map(v => v.value * parseFloat($scale))
        }
        return Math.round(($amount?.quantity ?? $amount ?? 0) * parseFloat($scale))
    }
)
const yieldSuffix = derived(
    [amount, yieldValue],
    ([$amount, $yield]) => {
        if (!$yield || !$amount?.unit) return '';
        return pluralize($amount?.unit, $yield);
    }
)
const hasYield = derived(
    [yieldValue, yieldSuffix],
    ([$yield, $suffix]) => {
        return $yield && $yield > 0 && $suffix && $suffix.length > 0;
    }
)

function toggleScaler() {
    toggleWidget(WIDGETS.SCALER);
}
function increase () {
    scaleFactor.update($s => parseFloat($s) +1)
}
function decrease () {
    scaleFactor.update($s => Math.max(1, parseFloat($s) - 1))
}
function onScaleChange (e) {
    const $scale = extractFloat(e.target.textContent)

    scaleFactor.set($scale);
}
function onYieldChange (e) {
    const $yield = findValues(e.target.textContent);
    if (!$yield.length) return;
    
    const yieldValue = $yield[0].value;

    const baseYield = get(amount).quantity ?? 0;

    const isWhole = $yield % baseYield === 0;
    const $scale = $yield / baseYield;

    scaleFactor.set(isWhole ? $scale : $scale.toFixed(2));
}
function extractFloat (str) {
    const match = str.match(/\d+(\.\d+)?/);
    return parseFloat(match ? match[0] ?? 0 : 0);
}
function toggleFocus (e) {
    focus.set(e.type === 'focus' || refs.inputContainer && refs.inputContainer.contains(e.relatedTarget) || refs.suggestions && refs.suggestions.contains(e.relatedTarget)) ;
}
function getSuggestions ($scale, $yieldValue, $yieldSuffix) {
    const unscaledYield = parseFloat($yieldValue) / parseFloat($scale);

    const scales = [
        0.125,0.25,0.5,0.75,1,1.25,1.5,1.75,2,3,4,6,10
    ]
    const suggestions = scales.map(scale =>  
        [scale, `${unscaledYield*scale} ${pluralize($yieldSuffix, unscaledYield*scale)}`]
    ).map(([scale,y]) => [scale,y.replace(/\s+/g, ' ')])

    return suggestions;
}
function getSuggestionClickHandler (scale) {
    return () => {
        scaleFactor.set(scale);
        focus.set(false);
    }
}

export {
    Scaler as default,
    Toggle,
    Suggestions,
    //
    refs,
    //
    focus,
    scaleFactor as scaleValue,
    yieldValue,
    yieldSuffix,
    showScalerToggle as showToggle,
    showScalerValueInToggle as showValueInToggle,
    hasYield,
    //
    toggleScaler,
    increase,
    decrease,
    onScaleChange,
    onYieldChange,
    toggleFocus,
    getSuggestions,
    getSuggestionClickHandler
}