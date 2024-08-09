<script>
  import { onMount, onDestroy, setContext, createEventDispatcher } from "svelte";

  import { Option, Toggle, selectStore, getOptionLabel } from ".";
  import { uniqueId } from "lodash";

  export let id = uniqueId("select--");

  const dispatch = createEventDispatcher();

  const store = selectStore(id, dispatch);
  const {
      value,
      expanded,
      optionLabels,
      optionValues,
      setRef,
      init,
      cleanup,
      getCurrentOption,

    } =
    store;
  setContext(id, store);

  export let options = [];
  $: store.onOptionsChange(options);

  export let label = "";

  let className = "";
  export { className as class };

  let initValue = null;
  $: value.set(initValue);
  $: initValue !== $value && (initValue = $value);
  export { initValue as value };

  $: currentOption = getCurrentOption($value, label);
  $: toggleLabel = getOptionLabel(currentOption);

  onMount(init);
  onDestroy(cleanup);
</script>

<div class="input input--select {className}">
  <Toggle {...{ id, label }}>
    {toggleLabel}
  </Toggle>
  <ul
    role="listbox"
    data-state="open"
    dir="ltr"
    tabindex="-1"
    id="{id}__options"
    class="input__options"
    hidden={!$expanded}
    aria-hidden={!$expanded}
    use:setRef={"popup"}
  >
    {#each options as option, index ($value+' '+option.value + " " + id)}
      <Option
        {...{
          option,
          id,
          index,
          value: $optionValues[index],
        }}
      >
        {$optionLabels[index]}
      </Option>
    {/each}
  </ul>
</div>

<style lang="scss">
  @use "../../../styles/colours" as colours;
  @use "../../../styles/sizes" as sizes;
  @use "../../../styles/typo" as typo;

  .input--select {
    position: relative;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: calc(0.1 / 14 * 1em);
    color: var(--text-primary);
    user-select: none;
    letter-spacing: calc(0.2 / 12 * 1em);
    font-weight: 400;
    @include typo.font_inter;

    .input__options {
      position: absolute;
      left: -0.25rem;
      top: -0.25rem;
      list-style: none;
      padding: 0.25rem;
      border-radius: 0.375rem;
      background-color: var(--bg-secondary);
      z-index: 1;
      list-style: none;
      display: grid;
      grid-auto-flow: row;
      row-gap: sizes.$s1;

      li {
        display: block;
        margin-bottom: 0.125rem;
        &:last-child {
          margin-bottom: 0;
        }
      }

      &[hidden] {
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  :global .input--select .icon {
    position: absolute;
    right: 0.375rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    user-select: none;
    fill: var(--text-primary);
  }
  :global .input--select .input__option .icon {
    right: 0.25rem;
    transform: translateY(-52%);
  }
</style>
