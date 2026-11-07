<script>
    import Select from 'components/Inputs/Select';
    import {contentOptions, cups, cupsToGrams, content} from '.'

    let grams = 0;
    let suffix = 'g';
    let cupsLabel = 'cups';
    $: cupsLabel = $cups === 1 ? 'cup' : 'cups';
    $: grams = cupsToGrams($cups, $content);
    $: suffix = grams > 1000 ? 'kg' : 'g';
    $: displayGrams = grams > 1000 ? (grams / 1000).toFixed(2) : grams;
</script>

<div class="rounded-2 bg-background-fill-subtle p-4 flex flex-col gap-4">
    <div class="grid gap-4 grid-cols-[1fr_auto_1fr] items-center text-400">
        <div class="w-full flex items-center gap-2">
            <input type="number" min="0" step="0.01" placeholder="No. of cups" bind:value={$cups} class="border-border rounded-2 bg-transparent w-full min-w-[unset]" /><span class="flex-none "> {cupsLabel}</span>
        </div>
        <div>=</div>
        <div class="w-full">{displayGrams} {suffix}</div>
    </div>
    <Select options={contentOptions} value={$content} on:change={(e) => content.set(e.detail)} class="w-full" variant="outline" size="lg" />
</div>