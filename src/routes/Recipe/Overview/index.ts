  import {amount, scaleFactor} from 'store/index'
  import { get } from "svelte/store";
  import { findValues } from "utils/recipes/fragment/RecipeFragment";
  import unscaleAmount from "utils/text/unscaleAmount";

import Overview from './Recipe__Overview.svelte'

import Title from './Recipe__Overview__Title.svelte'
import Yield from './Recipe__Overview__Yield.svelte'
import Duration from './Recipe__Overview__Duration.svelte'
import Tags from './Recipe__Overview__Tags.svelte'
import URL from './Recipe__Overview__URL.svelte'

function onYieldInput(e) {
    const unscaled = unscaleAmount(e.target.value, get(scaleFactor));
    
    if (unscaled === get(amount)) return;

    const value = findValues(unscaled)[0];
    const quantity = value?.value ?? null;
    const unit = (value?.value
      ? unscaled.slice(value.pos+value.quantitySize+1)
      : '').trim();

    amount.set({
      quantity,
      unit,
      text: unscaled
    });
  }

export {
    Overview as default,
    Title,
    Yield,
    Duration,
    Tags,
    URL,
    //
    onYieldInput
}