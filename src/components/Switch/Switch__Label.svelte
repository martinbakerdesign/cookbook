<script>
    import {
        labelVariants
    } from '.'

    $: labelClassname = labelVariants({
        variant,
        current
    })

    export let variant = 'DEFAULT';
    export let current = false;
</script>

<span class={labelClassname}>
    <slot />
</span>