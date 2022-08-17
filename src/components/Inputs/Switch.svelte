<script>
  import { get, writable } from "svelte/store";

  export let key = "",
    label = "",
    id = "";
  export let onToggle = (value) => {
    console.log("onToggle: ", { value });
  };
  export let initialValue = false;

  console.log({ initialValue });
  const value = inputStore(initialValue);

  function inputStore(initial = false) {
    console.log({ initial });
    const store = writable(initial);
    const { set, subscribe } = store;

    function toggle() {
      let value = !get(store);
      onToggle(value);
      set(value);
    }
    return {
      toggle,
      subscribe,
    };
  }
  function onClick() {
    value.toggle();
  }
</script>

<div class="input--switch" data-checked={$value}>
  <label for={id} class="input--switch__label">{label}</label>
  <button
    class="input--switch__switch"
    type="button"
    role="switch"
    aria-checked={$value}
    {id}
    value={key}
    on:click={onClick}
  >
    <span class="input--switch__switch__thumb" data-checked={$value} />
  </button>
  <input
    tabindex={-1}
    type="checkbox"
    value={key}
    hidden
    aria-hidden={true}
    checked={$value}
  />
</div>

<style lang="scss">
  @use "../../styles/sizes" as s;
  @use "../../styles/colours" as c;

  .input--switch {
    display: flex;
    align-items: center;
    --border: 0.125em;
    font-size: 1rem;

    &__label {
      margin-right: s.$s4;
      font-size: 0.875rem;
    }
    &__switch {
      height: calc(1em + 2 * var(--border));
      position: relative;
      width: 2em;
      border-radius: 2em;
      background-color: c.$grey-82;
      transition: 150ms cubic-bezier(0.19, 1, 0.22, 1);
      transition-property: background-color;
      padding: 0;
      border: 0;
      outline: 0;
      font-size: inherit;
      cursor: pointer;

      &__thumb {
        font-size: inherit;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: absolute;
        background-color: white;
        left: var(--border);
        top: var(--border);
        transition: transform 150ms cubic-bezier(0.19, 1, 0.22, 1);
        will-change: transform;
        transform: translate3d(0, 0, 0);

        &[data-checked="true"] {
          transform: translate3d(0.8em, 0, 0);
        }
      }

      &:focus-visible {
        box-shadow: 0px 0px 0px var(--border) c.$accent inset;
      }
    }

    input {
      font-size: inherit;
      transform: translateX(-100%);
      position: absolute;
      pointer-events: none;
      opacity: 0;
      margin: 0px;
      width: 2em;
      height: calc(1em + 2 * var(--border));
    }

    &[data-checked="true"] {
      .input--switch {
        &__switch {
          background-color: c.$accent;
        }
      }
    }
  }
</style>
