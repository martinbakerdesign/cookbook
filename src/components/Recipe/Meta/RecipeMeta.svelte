<script>
  import Notes from "./Notes.svelte";

  import "./RecipeMeta.scss";
</script>

<aside id="recipe__meta">
  <ul>
    <Notes />
  </ul>
</aside>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @use "../../../styles/typo" as t;
  @use "../../../styles/layers" as l;

  #recipe__meta {
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
      display: grid;
      grid-auto-flow: row;
      grid-gap: s.$s5;
    }

    @media screen and (max-width: 1440px) {
      width: calc((100vw - 68rem) * 0.5);
    }
  }
</style>
