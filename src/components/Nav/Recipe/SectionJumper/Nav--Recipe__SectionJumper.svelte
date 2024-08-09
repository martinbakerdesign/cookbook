<script>
    import { Select } from "bits-ui";
    import {
        Trigger,
        Content,
        //
        focusedSection,
        //
        getSelected,
        onChangeCallback,
    } from '.';
    import {
        isExpanded,
        focusedWidget
    } from '..'
    import {RecipeSectionOptions as items} from 'store/recipe';

    // const dispatch = createEventDispatcher();

    $: selected = getSelected($focusedSection, items);
    const onSelectedChange = onChangeCallback

    $: show = $isExpanded || null === $focusedWidget;
</script>

{#if show}
<Select.Root {items} bind:selected={selected} {onSelectedChange}>
    <Trigger />
    <Content {...{selected, items}} />
</Select.Root>
{/if}
        