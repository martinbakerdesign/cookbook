<script>
    // import {ResponsiveButton} from "components/Button";
    import {
        Option,
        //
        refs,
        currentIndex,
        switchOptions,
        thumbWidth,
        thumbTranslateX,
        //
        icons,
        labels,
        //
        getOptionClickHandler
    } from '.';
    import {
        mode,
        isExpanded,
        focusedWidget,
    } from '..';
    import Icon from 'components/Icon';

    $: show = $isExpanded || null == $focusedWidget;
</script>

{#if show}
    <div
        class="rounded-1 bg-background-fill-inverted p-1 relative none aria-[hidden=false]:flex lg:w-[10rem]"
        bind:this={refs.outer}
    >
    <span
        data-thumb
        class="rounded-1 absolute z-0 inline-block left-1 top-1 bottom-1 transition-transform duration-100 bg-accent"
        style="width: {$thumbWidth}px; transform: translateX({$thumbTranslateX}px)"
        bind:this={refs.thumb}
    ></span>

    <span
        class="flex flex-1 gap-x-1 h-full"
        bind:this={refs.outer}
    >
        {#each switchOptions as option, index}
        <Option
            value={option.value}
            checked={index === $currentIndex}
            on:click={getOptionClickHandler(index)}
            class={!$isExpanded ? 'aspect-square w-[unset]' : '' }
        >
            <Icon icon={option.icon+'--20'} />
            <span hidden={!$isExpanded}>{option.label}</span>
        </Option>
        {/each}
    </span>
    </div>
{/if}