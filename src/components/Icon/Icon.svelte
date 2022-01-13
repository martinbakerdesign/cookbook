<script>
  import iconDefs from "./iconDefs";
  export let icon = "";
  export let label = "";
  export let role = "presentation";
  export let fill;
  let viewBox = icon.split("--")[1] ?? 24;
  export let size = 24;
  let paths = iconDefs[icon];

  let style = `${fill ? `--fill:${fill}` : ""};`;
</script>

<svg
  viewBox={`0 0 ${viewBox} ${viewBox}`}
  width={size}
  height={size}
  class="icon"
  {role}
  aria-label={label}
  {style}
>
  {#each paths as d}
    <path {d} />
  {/each}
</svg>

<style lang="scss">
  @import "../../styles/colours.scss";
  @import "../../styles/sizes.scss";

  :global(:root) {
    --fill: #211e20;
    --hover: #211e20;
  }

  .icon {
    flex: none;
    fill: var(--fill);
  }
</style>
