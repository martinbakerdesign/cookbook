<script>
    let htmlFor = undefined;
    let className = undefined;
    
    export {htmlFor as for}
    export {className as class}
    export let builder = () => {};
</script>

<label for={htmlFor} class="text-body-xs uppercase leading-[0.625rem] text-text-secondary tracking-[0.08em] font-medium select-none block {className}" {...$$restProps} use:builder>
    <slot />
</label>