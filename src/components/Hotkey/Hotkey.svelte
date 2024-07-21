<script>
  export let hotkey = "";
</script>

<div class="hotkey">
  {hotkey}
</div>

<style lang="scss">
  @use "../../styles/sizes" as sizes;

  .hotkey {
    border: 1px solid var(--text-primary);
    color: var(--text-primary);
    padding: sizes.$s1 sizes.$s2;
    border-radius: 0.5em;
    display: inline-block;
    font-size: 0.75rem;
    user-select: none;
    opacity: 0.65;
    pointer-events: none;
  }
</style>
