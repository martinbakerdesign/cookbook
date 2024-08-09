<script>
  import { loading } from "store/index";
  import {Servings, Duration, Tags, SaveStatus} from '.'
  import {readonly} from 'store/recipe'
</script>

<div id="recipe__header__meta" class:loading={$loading}>
  <ul class="inputs">
    <Servings />
    <Duration />
    <Tags />
  </ul>
  {#if !readonly}
    <SaveStatus />
  {/if}
</div>

<style lang="scss">
  @use "../../../../styles/sizes" as sizes;

  #recipe__header__meta {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 2rem;
    // display: flex;
    // justify-content: space-between;
    // align-items: flex-start;

    .inputs {
      display: grid;
      grid-auto-flow: row;
      gap: sizes.$s3;
      list-style: none;
      font-size: 0.875rem;
      color: var(--text-primary);
      letter-spacing: calc(0.2 / 14 * 1em);
      line-height: 1.5rem;
      
      li span {
        outline: none;
        border: 0;
        box-shadow: none;
        min-width: calc(10 / 14 * 1em);
        display: inline-block;
      }
      @media (min-width:1440px) {
        gap: sizes.$s4;
        grid-auto-flow: none;
        grid-template-columns: repeat(3,1fr);
      }
    }

    &.loading {
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
  }
</style>
