<script>
  import {AutosizeTextarea} from "components/Inputs";
  import {amount, scaleFactor} from 'store/index'
  import {canEdit} from 'store/recipe'
  import { derived } from "svelte/store";
  import {
    onYieldInput
  } from '.'
  import scaleAmount from "utils/text/scaleAmount";

  const id = 'recipe__yield';

  const inputValue = derived(
    [amount, scaleFactor],
    ([$amount, $scaleFactor]) => scaleAmount($amount, $scaleFactor)
  );
  
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
    on:input={onYieldInput}
    on:change={onYieldInput}
    class="text-heading-lg font-regular placeholder:text-text-secondary bg-transparent pl-page pr-10 space-y-10 pt-[3.125rem] pb-12 outline-none"
  />
</section>