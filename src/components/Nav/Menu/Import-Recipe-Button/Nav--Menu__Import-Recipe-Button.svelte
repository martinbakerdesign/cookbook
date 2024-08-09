<script>
  import {ResponsiveButton} from "components/Button";
  import { isExpanded, widgetFocus } from "..";
  import { getShouldHideStore, iconProps, onClick } from ".";

  const shouldHide = getShouldHideStore(isExpanded, widgetFocus);
</script>

{#if !$shouldHide}
<ResponsiveButton
  icon={iconProps.icon}
  variant="primary"
  size="xl"
  expanded={$isExpanded}
  on:click={onClick}
>Import Recipe</ResponsiveButton>
{/if}