<script>
  import user, { checked } from "store/user";
  import Router, { location } from "svelte-spa-router";
  import {userRoutes, guestRoutes} from 'routes'
  import _$ from 'utils/dom/querySelector'
  import {wok} from 'constants/anim'
  import setBG from "utils/bg/setBG";
  
  import {useIcons} from "components/Icon";
  import Settings from "components/Settings";
  import Animation from "components/Animation";

  import "styles/styles.scss";
  import "styles/_colours.scss";

  useIcons();
  $: setBG($location);
</script>

{#if !$checked && $location === "/"}
  <div id="app__loading">
    <div class="spinner">
      <Animation {...wok} />
    </div>
  </div>
{:else if $checked}
  {#if $user}
    <Router routes={userRoutes} />
  {:else}
    <Router routes={guestRoutes} />
  {/if}
{/if}
<Settings />

<style lang="scss">
  @use "./styles/sizes" as sizes;

  #app {
    position: relative;

    &__bg {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &__loading {
      z-index: 1;
      position: relative;

      .spinner {
        padding: sizes.$s2;
        margin: sizes.$s4;
        background-color: white;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }
</style>
