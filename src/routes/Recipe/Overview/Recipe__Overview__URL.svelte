<script>
  import {AutosizeTextarea} from "components/Inputs";
  import Button from 'components/Button'
  import Icon from 'components/Icon'
  import {src} from 'store/index'
  import {canEdit} from 'store/recipe'
  import validateURL from "utils/validate/url";

  const id = 'recipe__url';

  $: href = $src;
  $: isValid = validateURL(href);
</script>

<section data-section="URL" class="flex-1 border-b relative">
  <AutosizeTextarea 
    {...{
      id,
      name: 'url',
      placeholder: 'Source URL',
      label: 'Source URL',
      readonly: !$canEdit
    }}
    bind:value={$src}
    class="text-heading-lg font-regular placeholder:text-text-secondary bg-transparent outline-none px-page pt-[3.125rem] pb-12"
  />
  <span class="absolute top-0 right-0 pt-5 pr-page">
    <Button
      variant="outline"
      size="sm"
      {href}
      target="_blank"
      disabled={!isValid}
    >
      <span slot="prefix">
        <Icon icon="link--12" size={12} />
      </span>
      Open link
    </Button>
  </span>
</section>