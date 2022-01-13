<script>
  import Name from "./Name.svelte";
  import Meta from "./Meta/Meta.svelte";
  import SaveStatus from "./SaveStatus.svelte";

  export let headerH;

  let height;
  export let min = false;
  $: headerH.set(height);

  function toggleMin() {
    min = !min;
  }
</script>

<header class:min bind:clientHeight={height}>
  <Name {min} />
  <div class="metarow">
    <Meta {min} />
    <SaveStatus />
  </div>
  <!-- <Resizer {...{ toggleMin, min }} /> -->
</header>

<style lang="scss">
  @import "../../../styles/colours.scss";
  @import "../../../styles/sizes.scss";

  header {
    padding: $s6 $s7 $s5;
    flex: none;
    width: 100%;
    background-color: white;
    z-index: 1;

    .metarow {
      display: flex;
      justify-content: space-between;
    }

    &.min {
      padding: $s3 $s7;
      display: flex;
      gap: $s6;
    }
  }
</style>
