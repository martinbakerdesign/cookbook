<script>
  import { settingsFocus } from "store/settings";
  import { onDestroy } from "svelte";

  export let key, index, heading, type;

  let ref;

  function onClick(e) {
    let main = document.querySelector("#settings__main");
    let list = document.querySelector("#settings__main__list");
    let block = document.querySelector(
      `.settings__block[data-index="${index}"]`
    );
    let mainTop = main.getBoundingClientRect().top;
    let blockTop = block.getBoundingClientRect().top - mainTop;
    let scrollTo = blockTop + main.scrollTop;
    main.scrollTo(0, scrollTo);
    settingsFocus.set(index);
  }

  function clickOut(e) {
    if (e.target.closest(`.settings__aside__item[data-index='${index}']`))
      return;
    settingsFocus.set(null);
  }

  $: $settingsFocus === index
    ? window.addEventListener("click", clickOut)
    : window.removeEventListener("click", clickOut);

  onDestroy(() => {
    window.removeEventListener("click", clickOut);
  });
</script>

<li
  class="settings__aside__item"
  data-index={index}
  data-active={$settingsFocus === index}
  bind:this={ref}
>
  <button type="button" on:click={onClick}>{heading}</button>
</li>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/typo" as t;

  .settings__aside__item {
    color: var(--text-primary);
    font-size: 0.75rem;
    margin-bottom: s.$s1;
    &:last-child {
      margin-bottom: 0;
    }

    button {
      font-size: 0.8125rem;
      color: inherit;
      background-color: transparent;
      padding: 0 s.$s2;
      font-family: inherit;
      cursor: pointer;
      display: block;
      border-radius: 0.25rem;
      border: 0;
      width: 100%;
      text-align: left;
      line-height: 1.375rem;
      font-weight: 500;
      letter-spacing: calc(0.1 / 13 * 1em);

      @mixin focus {
        box-shadow: 0px 0px 0px 1px c.$accent;
        color: c.$accent;
      }

      &:focus-visible,
      &:hover {
        @include focus;
      }
    }
    &[data-active="true"] {
      button {
        background-color: c.$accent;
        color: c.$white;
      }
    }
  }
</style>
