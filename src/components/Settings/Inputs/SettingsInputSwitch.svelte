<script>
  import { settings } from "store/";
  import { settingsConfig } from "store/settings";

  import { get, writable } from "svelte/store";

  export let key = "";

  function inputStore(initial = false) {
    const store = writable(initial);
    const { set, subscribe, update } = store;

    function toggle() {
      let value = !get(store);
      settings.set(key, value);
      set(value);
    }
    return {
      toggle,
      subscribe,
    };
  }
  const value = inputStore($settings[key]);

  function onClick() {
    value.toggle();
  }
</script>

<div class="settings__input--switch" data-checked={$value}>
  <label for={`settings--${key}`} class="settings__input--switch__label"
    >{settingsConfig[key].heading}</label
  >
  <button
    class="settings__input--switch__switch"
    type="button"
    role="switch"
    aria-checked={$value}
    id={`settings--${key}`}
    value={key}
    on:click={onClick}
  >
    <span
      class="settings__input--switch__switch__thumb"
      data-checked={$value}
    />
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
  @use "../../../styles/_sizes.scss" as s;
  @use "../../../styles/_colours.scss" as c;
  @use "../../../styles/_typo.scss" as t;

  .settings__input--switch {
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
      .settings__input--switch {
        &__switch {
          background-color: c.$accent;
        }
      }
    }
  }
</style>
