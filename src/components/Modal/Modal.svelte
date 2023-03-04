<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  import "./Modal.scss";

  export let show = writable(false);
  export let id = "";
  export let autofocus = false;

  const refs = {
    modal: null,
    bg: null,
  };

  $: toggleListeners($show);

  onMount(() => {
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClickOut);
    };
  });

  function toggleListeners(show) {
    window[`${show ? "add" : "remove"}EventListener`]("keydown", onKeyDown),
      window[`${show ? "add" : "remove"}EventListener`]("click", onClickOut);
  }
  function toggleModal(s = null) {
    let shouldShow = s ?? !$show;
    show.set(shouldShow);
  }
  function addTags(el) {
    if (!el.childNodes || !el.childNodes.length) return;
    let child = el.childNodes[0];

    child.setAttribute("role", "dialog");
    child.setAttribute("tabindex", "-1");
    let input = el.querySelector("input");
    if (!input) return;

    input.focus();
    if (!autofocus) input.blur();
  }
  function onKeyDown(e) {
    if (
      !$show ||
      e.key !== "Escape" ||
      e.target.closest("button.input__option")
    )
      return;
    e.preventDefault();
    window.event.preventDefault();
    toggleModal(false);
  }
  function onClickOut(e) {
    if (refs.bg !== e.target) return;
    toggleModal(false);
  }
</script>

<div
  bind:this={refs.bg}
  class="modal__bg"
  aria-hidden={!$show}
  on:click={onClickOut}
/>
<div
  class="modal"
  use:addTags
  aria-hidden={!$show}
  hidden={!$show}
  {id}
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
