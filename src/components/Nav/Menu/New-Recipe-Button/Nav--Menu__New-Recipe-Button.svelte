<script>
  import {ResponsiveButton} from "components/Button";
  import { isExpanded, widgetFocus } from "..";
  import { getShouldHideStore, openNewRecipe, iconProps } from ".";

  const shouldHide = getShouldHideStore(isExpanded, widgetFocus);
</script>

{#if !$shouldHide}
<ResponsiveButton
  icon={iconProps.icon}
  variant="accent"
  size="xl"
  expanded={$isExpanded}
  href="/#/new"
  on:click={openNewRecipe}
>New Recipe</ResponsiveButton>
{/if}