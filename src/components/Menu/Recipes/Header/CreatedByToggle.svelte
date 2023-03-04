<script>
  import { authorSelection, authorOptions } from "store/menu";

  import Select from "components/Inputs/Select.svelte";
</script>

<Select
  {...{
    id: "menu__header__sorting",
    className: "created-by-toggle",
    options: authorOptions,
    value: authorSelection,
  }}
/>

<style lang="scss">
  @use "../../../../styles/colours" as colours;
  @use "../../../../styles/sizes" as sizes;
  :global(.created-by-toggle__option .icon) {
    width: 0.8125rem;
    height: 0.8125rem;
    flex: none;
    position: absolute;
    left: sizes.$s1;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.75;
  }
</style>
