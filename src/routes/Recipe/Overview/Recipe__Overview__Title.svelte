<script>
  import {AutosizeTextarea} from "components/Inputs";
  import {title} from 'store/index'
  import {canEdit} from 'store/recipe'

  const id = 'recipe__title';
</script>

<section data-section="TITLE">
  <AutosizeTextarea 
    {...{
      id,
      name: 'title',
      placeholder: 'My recipe',
      label: 'Title',
      readonly: !$canEdit
    }}
    bind:value={$title}
    class="text-heading-3xl font-regular placeholder:text-text-secondary bg-transparent border-b px-page space-y-10 pt-[3.125rem] pb-12 outline-none"
  />
</section>