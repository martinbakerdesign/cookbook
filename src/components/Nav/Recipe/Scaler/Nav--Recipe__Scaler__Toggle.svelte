<script>
    import Button from "components/Button";
    import Icon from "components/Icon";
    import {
      WIDGETS,
      //
      isExpanded,
      focusedWidget
    } from "..";
    import {
      toggleScaler
    } from '.'
  
    $: showToggle = !$isExpanded && WIDGETS.TIMER !== $focusedWidget;
  
    $: toggleIcon = $focusedWidget === WIDGETS.SCALER ? "x" : "scale-recipe";
  </script>
  
  {#if showToggle}
    <Button
      size="xl"
      variant="inverted"
      isIcon={true}
      on:click={toggleScaler}
    >
      <Icon
        icon={`${toggleIcon}--20`}
        size={20}
      />
    </Button>
  {/if}
  