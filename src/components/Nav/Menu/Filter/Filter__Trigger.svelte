<script>
    import {Select} from 'bits-ui'

    export let label = '';
</script>

<Select.Trigger
    class="rounded-1 px-3 py-3 flex flex-col justify-center gap-2 bg-background-fill-inverted hover:bg-background-fill-inverted-hover w-full flex-1"
    aria-label={label}
    on:click
    on:keydown
    {...$$restProps}
>
    {#if label}<span class="text-secondary text-body-xs uppercase tracking-loosest font-[150] leading-300 inline-block label">{label}</span>{/if}
    <Select.Value class="text-text text-body-md font-medium leading-300" />
</Select.Trigger>

<style>
    .label {
        font-size: 0.5rem;
        line-height: calc(10/16 * 1rem);
        letter-spacing: 0.08em;
    }
</style>