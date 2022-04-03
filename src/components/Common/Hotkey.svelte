<script>
  export let hotkey = "";
</script>

<div class="hotkey">
  {hotkey}
</div>

<style lang="scss">
  @import "../../styles/colours.scss";
  @import "../../styles/sizes.scss";

  .hotkey {
    border: 1px solid var(--text-primary);
    color: var(--text-primary);
    padding: $s1 $s2;
    border-radius: 0.5em;
    display: inline-block;
    font-size: 0.75rem;
    user-select: none;
    opacity: 0.65;
    pointer-events: none;
  }
</style>
