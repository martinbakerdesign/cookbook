<script>
    import { onMount } from 'svelte';
    import { loading } from 'store/index';
    import { init, Contents, setFixed } from '.'
    import user, { checked } from "store/user";
    import { location } from "svelte-spa-router";

    $: disabled = $loading;

    let showNav = false;
    $: showNav = $checked && ($user || $location !== '/');

    onMount(init)
</script>

{#if showNav}
<nav class="pt-safe-area-inset-top bg-background-surface-backdrop backdrop-blur-lg sticky top-0 w-full z-40" use:setFixed>
    <div class="px-page pt-page w-full">
        <div class="rounded-2 bg-background-fill/15 backdrop-blur-md max-w-full p-group-md">
            <span class="flex gap-2 w-full h-20 {disabled ? 'select-none pointer-events-none opacity-15' : ''}">
                {#if $Contents}
                <svelte:component this={$Contents} />
                {/if}
            </span>
        </div>
    </div>
</nav>
{/if}