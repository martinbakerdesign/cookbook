<script>
  import {AutosizeTextarea} from "components/Inputs";
  import {amount, scaleFactor} from 'store/index'
  import {canEdit} from 'store/recipe'
  import { derived, get } from "svelte/store";
  import { findValues } from "utils/recipes/fragment/RecipeFragment";
  import scaleAmount from "utils/text/scaleAmount";
  import unscaleAmount from "utils/text/unscaleAmount";

  const id = 'recipe__yield';

  const inputValue = derived(
    [amount, scaleFactor],
    ([$amount, $scaleFactor]) => scaleAmount($amount, $scaleFactor)
  );
  function onInput(e) {
    const unscaled = unscaleAmount(e.target.value, get(scaleFactor));
    
    if (unscaled === get(amount)) return;

    const value = findValues(unscaled)[0];
    const quantity = value?.value ?? null;
    const unit = (value.value ? unscaled.slice(value.pos+value.quantitySize+1) : '').trim();

    amount.set({
      quantity,
      unit,
      text: unscaled
    });
  }
</script>

<section data-section="YIELD" class="flex-1 border-r flex flex-col">
  <AutosizeTextarea 
    {...{
      id,
      name: 'yield',
      placeholder: 'Yield',
      label: 'Yield',
      readonly: !$canEdit
    }}
    value={$inputValue}
    on:input={onInput}
    on:change={onInput}
    class="text-heading-lg font-regular placeholder:text-text-secondary bg-transparent pl-page pr-10 space-y-10 pt-[3.125rem] pb-12 outline-none"
  />
</section>