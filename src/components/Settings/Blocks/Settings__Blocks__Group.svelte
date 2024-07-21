<script>
  import { Input } from "../";

  let groupKey = "";
  export {groupKey as key};
  
  export let controls = [];
</script>

<ul class="settings__block__group">
  {#each Object.entries(controls) as [key, def]}
    <li>
      <h4 class="settings__block__subheading">{def.heading}</h4>
      <Input {...{ key: [groupKey, key].join("--"), type: def.type }} />
    </li>
  {/each}
</ul>

<style lang="scss">
  @use "../../../styles/_sizes" as s;

  .settings__block__group {
    list-style: none;

    li {
      display: grid;
      grid-template-columns: 8rem 1fr;
      grid-column-gap: s.$s5;
      align-items: center;
      margin-bottom: s.$s4;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
