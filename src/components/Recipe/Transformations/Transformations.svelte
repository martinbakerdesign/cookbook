<script>
  import Scale from "./Scale.svelte";
  import Translate from "./Translate.svelte";
  import "./Transformations.scss";
</script>

<aside id="transformations">
  <ul>
    <Scale />
    <Translate />
  </ul>
</aside>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @use "../../../styles/typo" as t;
  @use "../../../styles/layers" as l;

  #transformations {
    padding: 0 s.$s5;
    position: fixed;
    top: 0;
    right: 0;
    width: calc((100vw - var(--main)) * 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ul {
      list-style: none;
    }

    @media screen and (max-width: 1440px) {
      width: calc((100vw - 68rem) * 0.5);
    }
  }
</style>
