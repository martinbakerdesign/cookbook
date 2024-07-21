<script>
  import { loading, isUserAuthor } from "store";
  import user from "store/user";
  import {
    Name,
    Toolbar,
    Meta,
    URL,
    Description,
    AddToBook,
  } from '.'

$: userIsNotAuthor = $user && !$loading;
</script>

<header id="recipe__header" class:loading={$loading}>
    <Name />
    <!-- <Description /> -->
    <URL />
    <Meta />
    {#if $isUserAuthor}
      <Toolbar />
    {:else if userIsNotAuthor}
      <AddToBook />
    {/if}
</header>

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  #recipe__header {
    padding: s.$s6 var(--pad-x) s.$s3;
    flex: none;
    width: 100%;
    // background-color: c.$white;
    z-index: 100;
    position: relative;

    &__inner {
      margin: 0 auto;
      width: 100%;
      max-width: 57rem;
    }

    &.min {
      padding: s.$s3 var(--pad-x);
      display: flex;
      gap: s.$s6;
    }

    &.loading {
      display: block;
      border-radius: 0.75rem;
      background-color: var(--bg-secondary);
      margin: s.$s6 var(--pad-x) s.$s3;
      padding: 0;
      animation: load 1500ms infinite linear;
      animation-delay: 1000ms;
      width: calc(100% - 10.5rem);

      .metarow {
      }
    }
  }
</style>
