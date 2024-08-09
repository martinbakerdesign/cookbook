<script>
    import Button from 'components/Button';
    import {
        refs,
        scaleValue,
        yieldValue,
        yieldSuffix,
        getSuggestions,
        getSuggestionClickHandler
    } from '.'

    $: suggestions = getSuggestions($scaleValue, $yieldValue, $yieldSuffix);
</script>

<div class="absolute -bottom-1 translate-y-full left-0 right-0 w-full rounded-1 bg-background p-1 flex flex-col gap-y-1 shadow-lg" bind:this={refs.suggestions}>
    {#each suggestions as [scale, _yield]}
    <Button
        variant="inverted"
        size="sm"
        class="flex-1 w-full"
        on:click={getSuggestionClickHandler(scale)}
    >
        <span class="flex gap-x-2 items-center w-full flex-1 text-left">
            <span class="flex-none w-32 inline-block text-body-md">{scale}x</span> <span class="text-text-secondary inline-block flex-none w-42 text-body-sm">{_yield}</span>
        </span>
    </Button>
    {/each}
</div>