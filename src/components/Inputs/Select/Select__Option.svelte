<script>
  import { getContext } from "svelte";
  import Icon from "components/Icon";
  import {getIsSelected} from '.'

  export let index = 0;
  export let id = "";
  export let option = {};
  let optionValue = '';
  export {optionValue as value}

  const store = getContext(id);
  const {
    value,
    expanded,
    focus,
    setValue,
    focusOnEnter,
    blurOnLeave,
  } = store;

  $: isFocused = $focus === index;
  $: isSelected = getIsSelected($value, option, index);
  $: tabindex = $expanded && isFocused ? 0 : -1;
</script>

<li>
  <button
    id="{id}__option--{index}"
    class="input__option"
    class:focus={isFocused}
    role="option"
    aria-labelledby="{id}__option--{index}__label"
    aria-selected={isSelected}
    data-value={optionValue}
    data-index={index}
    {tabindex}
    on:click={setValue}
    on:focus={focusOnEnter}
    on:pointerenter={focusOnEnter}
    on:pointerleave={blurOnLeave}
  >
    <span
      id="{id}__option--{index}__label"
      class="input__option__label"
    >
      <slot />
    </span>
    {#if isSelected}
      <Icon {...{ icon: "tick--16", size: 16 }} />
    {/if}
  </button>
</li>

<style lang="scss">
  @use "../../../styles/colours" as colours;
  @use "../../../styles/sizes" as sizes;
  @use "../../../styles/typo" as typo;

  .input__option {
    padding: sizes.$s1 sizes.$s3;
    padding-right: 1.5rem;
    border-radius: 0.25rem;
    margin: 0;
    border: 0;
    outline: 0;
    text-align: left;
    font-family: inherit;
    font-style: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    color: inherit;
    background-color: transparent;
    display: block;
    width: 100%;
    white-space: nowrap;
    position: relative;

    &.focus {
      background-color: var(--accent);
    }
  }
</style>
