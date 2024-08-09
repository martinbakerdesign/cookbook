<script>
  import {AutosizeTextarea} from "components/Inputs";
  import {duration} from 'store/index'
  import {canEdit} from 'store/recipe'

  const id = 'recipe__duration';
</script>

<section data-section="DURATION" class="flex flex-col flex-1 xl:border-r">
  <AutosizeTextarea 
    {...{
      id,
      name: 'duration',
      placeholder: 'Duration',
      label: 'Duration',
      readonly: !$canEdit
    }}
    bind:value={$duration.text}
    class="text-heading-lg font-regular placeholder:text-text-secondary bg-transparent pr-page pl-10 space-y-10 pt-[3.125rem] pb-12 outline-none flex-1 xl:pr-10"
  />
</section>