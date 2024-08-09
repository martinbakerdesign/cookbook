<script>
  import { onMount } from "svelte";
  import {useModal} from '.'

  export let id = "";

  const {
    show,
    //
    init,
    toggleAutofocus,
    onClickOut,
    builder
  } = useModal(id);
  
  onMount(init);
  
  export let autofocus = false;
  $: toggleAutofocus(autofocus);
  
  $: hidden = !$show;
</script>

<div
  class="z-50 fixed inset-0 bg-background-surface-backdrop [&[aria-hidden=true]]:opacity-0 [&[aria-hidden=true]]:pointer-events-none backdrop-blur-lg"
  aria-hidden={hidden}
/>

<div
  {id}
  class="fixed flex justify-center items-center inset-0 overflow-hidden z-50 [&[aria-hidden=true]]:opacity-0 [&[aria-hidden=true]]:pointer-events-none"
  use:builder
  aria-hidden={hidden}
  hidden={hidden}
  on:click={onClickOut}
>
  <slot/>
</div>

<span
  class="outline-none opacity-0 fixed z-50"
  tabindex={hidden ? -1 : 0}
  aria-hidden={hidden}
/>