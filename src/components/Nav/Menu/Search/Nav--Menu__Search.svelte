<script>
    import { isExpanded, widgetFocus } from '..';
    import Icon from 'components/Icon';
    import Button from 'components/Button';
    import Hotkey from 'components/Hotkey';
    import {onMount} from 'svelte'
    import {
        refs,
        //
        isFocused,
        hasValue,
        //
        toggleFocus,
        handleQueryChange,
        handleKeyDown,
        getShouldHideStore,
        searchIconProps,
        getIconClassName,
        getContainerFlex,
        cancel,
        //
        init
    } from '.'

    onMount(init)

    const shouldHide = getShouldHideStore(isExpanded, widgetFocus)
    $: showIcon = !($isFocused || $hasValue);

    $: containerFlex = getContainerFlex($isExpanded);

    export let placeholder = 'Search';
</script>

{#if !$shouldHide}
<div class="w-full relative {containerFlex}">
     <span class="inline-flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 user-select-none pointer-events-none z-10 w-10 h-10 aspect-square overflow-hidden">
        <Icon {...searchIconProps} class={getIconClassName(showIcon)} />
     </span>

     <input
        type="search"
        {placeholder}
        class="bg-background-fill-inverted hover:bg-background-fill-inverted-hover active:bg-background-fill-inverted-active placeholder:text-text-secondary text-text text-body-lg py-3 pr-20 rounded-1 w-full outline-none h-20 transition-[padding] {!showIcon ? 'pl-8' : 'pl-16'}"
        bind:this={refs.input}
        on:focus={toggleFocus}
        on:blur={toggleFocus}
        on:keydown={handleKeyDown}
        on:input={handleQueryChange}
        on:change={handleQueryChange}
     />

    <div class="absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center w-18 h-18 aspect-square select-none pointer-events-none">
        {#if $isFocused || $hasValue}
        <Button
            variant="outline"
            size="lg"
            isIcon={true}
            on:click={cancel}
            class="pointer-events-auto z-10"
        ><Icon icon="x--12" size={12} /></Button>
        {:else}
        <Hotkey hotkey="/" />
        {/if}

        <!-- cancel button -->
    </div>
</div>
{/if}

<style>
    /* clears the ‘X’ from Internet Explorer */
input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>