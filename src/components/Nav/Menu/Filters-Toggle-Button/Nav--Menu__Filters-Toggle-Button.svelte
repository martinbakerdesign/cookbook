<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import { isExpanded, showFilters, toggleWidgetFocus } from "..";
  import { getIconProps, getShowButtonStore, getLabel } from ".";

  $: iconProps = getIconProps($showFilters);
  $: label = getLabel($showFilters);

  const showButton = getShowButtonStore(isExpanded);
</script>

{#if $showButton}
  <Button
    variant="inverted"
    size="xl"
    class="flex-none"
    isIcon={true}
    on:click={toggleWidgetFocus}
    aria-label={label}
    aria-expanded={$showFilters}
  >
    <Icon {...iconProps} />
  </Button>
{/if}
