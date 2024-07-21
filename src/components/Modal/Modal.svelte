<script>
  import { onDestroy, onMount } from "svelte";
  import {show, refs, toggleAutofocus, onClickOut, setAttributes, cleanup} from '.'
  import { registerModal } from "store/modals";

  import "./Modal.scss";

  export let id = "";

  let showInitially = false;
  export {showInitially as show};
  $: show.set(showInitially);

  export let autofocus = false;
  $: toggleAutofocus(autofocus);

  onMount(() => {
    registerModal(refs.modal, showInitially);
  })
  onDestroy(cleanup);  
</script>

<div
  bind:this={refs.bg}
  class="modal__bg"
  aria-hidden={!$show}
  on:click={onClickOut}
/>
<div
  {id}
  class="modal"
  use:setAttributes
  aria-hidden={!$show}
  hidden={!$show}
  on:click={onClickOut}
  bind:this={refs.modal}
>
  <slot />
</div>
<span
  class="modal__focusguard"
  tabindex={!$show ? -1 : 0}
  aria-hidden={!$show}
/>

<style lang="scss">
  @use "../../styles/sizes" as s;
  @use "../../styles/colours" as c;
  @use "../../styles/layers" as l;

  .modal {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;

    &,
    &__bg {
      z-index: l.$modal;
    }

    &__bg {
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: var(--bg-primary);
      opacity: 0.95;
      position: fixed;
      inset: 0px;
    }
    &__focusguard {
      outline: none;
      opacity: 0;
      position: fixed;
    }

    &,
    &__bg,
    &__focusguard {
      &[aria-hidden="true"] {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
</style>
