<script>
  import user from "store/user";
</script>

<button class="signout" on:click={user.signOut}>Sign Out</button>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .signout {
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 500;
    color: c.$white;
    letter-spacing: 0;
    line-height: 1rem;
    background-color: transparent;
    position: relative;
    border: 0;
    padding: 0;
    cursor: pointer;
    margin: 0 auto;
    display: inline-block;
    margin-bottom: 1rem;

    @mixin focus {
      color: c.$accent;
    }

    @media (hover: hover) {
      &:hover {
        @include focus;
      }
    }
    &:focus {
      @include focus;
    }
  }
</style>
