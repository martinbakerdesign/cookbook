<script>
  import user from "store/user";
  import Dropmenu from "./HeaderUserDropmenu.svelte";

  let show = false;

  function toggle() {
    show = !show;
  }
</script>

<button id="header__user" on:click={toggle}
  ><img src={$user?.thumb} alt={$user?.name} /></button
>
{#if show}
  <Dropmenu />
{/if}

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  #header__user {
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    overflow: hidden;
    cursor: pointer;
    outline: 0;
    pointer-events: auto;
    background-color: transparent;
    border: 2px solid transparent;
    transition: border-color 75ms cubic-bezier(0.19, 1, 0.22, 1);
    will-change: border-color;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      background-color: c.$accent;
    }

    @mixin focus {
      border-color: c.$accent;
      transition-duration: 125ms;
    }

    &:focus-visible {
      @include focus;
    }
    @media (hover: hover) {
      &:hover {
        @include focus;
      }
    }
  }
</style>
