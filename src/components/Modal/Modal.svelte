<script>
  export let show = false;
  export let autofocus = false;

  function addTags(el) {
    let child = el.childNodes[0];

    child.setAttribute("role", "dialog");
    child.setAttribute("tabindex", "-1");
    let input = el.querySelector("input");
    if (!input) return;

    input.focus();
    if (!autofocus) input.blur();
  }
</script>

{#if show}
  <div
    data-state="open"
    class="modal__bg"
    style="pointer-events: auto;"
    data-aria-hidden="true"
    aria-hidden="true"
  />
  <div class="modal" use:addTags>
    <slot />
  </div>
  <span
    class="modal__focusguard"
    tabindex="0"
    data-aria-hidden="true"
    aria-hidden="true"
  />
{/if}

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
      background-color: c.$grey-31;
      opacity: 0.9;
      position: fixed;
      inset: 0px;
    }
    &__focusguard {
      outline: none;
      opacity: 0;
      position: fixed;
      pointer-events: none;
    }
  }

  :global(.modal > div) {
    background-color: c.$white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 90vw;
    max-height: 90vh;
    min-width: 24rem;
    min-height: 8rem;
    overflow: hidden;
    border-radius: 0.875rem;
    box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px,
      rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  }
</style>
