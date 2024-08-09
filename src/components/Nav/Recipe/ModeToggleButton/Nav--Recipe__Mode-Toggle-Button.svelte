<script>
    import {ResponsiveButton} from "components/Button";
    import {getIcon, getLabel} from '.';
    import {
        mode,
        isExpanded,
        focusedWidget,
        //
        toggleMode,
    } from '..';

    $: icon = getIcon($mode);
    $: label = getLabel($mode);

    $: show = $isExpanded || null == $focusedWidget;
</script>

{#if show}
<ResponsiveButton
    type="button"
    variant="accent"
    size="xl"
    on:click={toggleMode}
    expanded={$isExpanded}
    {icon}
>
{label}
</ResponsiveButton>
{/if}