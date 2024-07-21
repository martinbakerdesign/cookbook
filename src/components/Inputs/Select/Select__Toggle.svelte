<script>
  import Icon from "components/Icon";
  import { getContext } from "svelte";

  export let id = "";
  export let label = "";

  const store = getContext(id);
  const {
    expanded,
    expand,
    width,
    setRef
  } = store;
</script>

<button
  {id}
  type="button"
  class="input__toggle"
  aria-expanded={$expanded}
  aria-controls="{id}__options"
  aria-label={label}
  aria-autocomplete="none"
  on:click={expand}
  style="width: {$width}px"
  use:setRef={"toggle"}
>
  <span
    class="input__toggle__label"
    use:setRef={"toggleLabel"}
  ><slot/></span
  >
  <Icon
    {...{
      icon: "chevron--down--16",
      size: 16,
    }}
  />
</button>

<style lang="scss">
  @use "../../../styles/colours" as colours;
  @use "../../../styles/sizes" as sizes;
  @use "../../../styles/typo" as typo;

  .input__toggle {
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
    position: relative;
    // background-color: var(--bg-secondary);
    background-color: transparent;
    box-shadow: 0 0 0 0.0625rem inset var(--border);

    @media (hover: hover) {
      &:hover {
        box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
      }
    }
    &:focus-visible {
      box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
    }
  }
</style>
