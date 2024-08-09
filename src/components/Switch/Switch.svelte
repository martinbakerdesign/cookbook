<script>
    import { Switch } from "bits-ui";
    import {
        // type SwitchVariant,
        //
        switchVariants,
        thumbVariants,
        Label,
    } from ".";

    $: switchClassname = switchVariants({
        variant,
        className
    });
    $: thumbClassname = thumbVariants({
        variant
    });
    
    let className = undefined;
    export {className as class};
    export let variant = 'DEFAULT';
    export let values = [
        {
            value: '',
            label: ''
        },
        {
            value: '',
            label: ''
        }
    ];
    export let value = values[0]?.value ?? undefined;
    
    let checked = false;
    $: value = values[+checked]?.value;

    let thumbWidth = 0;

    function getClickHandler (val) {
        return () => {
            value = val;
        }
    }
</script>

<Switch.Root class={switchClassname} {...$$restProps} bind:checked={checked}>
    <Switch.Input/>
    <span bind:offsetWidth={thumbWidth} style="transform: translateX({(thumbWidth + 2) * +checked}px)" class={thumbClassname}>
    </span>
    <div class="flex-1"></div>
    <div class="absolute inset-1 flex gap-x-[inherit]" >
        {#each values as val}
            <Label {...{variant, current: (val?.value ?? val) === value}} on:click={getClickHandler(val?.value ?? val)}>{val?.label ?? val?.value ?? val}</Label>
        {/each}
    </div>
</Switch.Root>