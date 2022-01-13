<script>
  import Servings from "./Servings.svelte";
  import Duration from "./Duration.svelte";
  import Tags from "./Tags.svelte";

  export let min;
</script>

<ul class="meta" class:min>
  <li>
    <Servings />
  </li>
  <li>
    <Duration />
  </li>
  <li>
    <Tags />
  </li>
</ul>

<style lang="scss">
  @import "../../../../styles/_colours.scss";
  @import "../../../../styles/_sizes.scss";

  .meta {
    display: flex;
    gap: $s6;
    list-style: none;
    font-size: 0.875rem;
    color: #110e12;
    letter-spacing: calc(0.2 / 14 * 1em);
    line-height: 1.5rem;

    li span {
      outline: none;
      border: 0;
      box-shadow: none;
      min-width: calc(10 / 14 * 1em);
      display: inline-block;
    }

    &.min {
    }
  }
</style>
