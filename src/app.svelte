<script>
  import { loadingRecipes } from "./store";
  import user, { checked } from "store/user";
  import Router, { location } from "svelte-spa-router";
  import {userRoutes, guestRoutes} from 'routes'
  import _$ from 'utils/dom/querySelector'
  import {wok} from 'constants/anim'
  
  import {useIcons} from "components/Icon";
  import Settings from "components/Settings";
  import Animation from "components/Animation";
  import Nav from "components/Nav";

  import "styles/app.css";

  useIcons();
</script>

{#if $checked}
  {#if $user}
    <Nav />
    <Router routes={userRoutes} />
  {:else}
    <Router routes={guestRoutes} />
  {/if}
{/if}
{#if (!$checked || $loadingRecipes) && $location === "/"}
  <div class="z-10 fixed inset-0 flex justify-center items-center pointer-events-none">
    <div class="inline-block">
      <Animation {...wok} />
    </div>
  </div>
{/if}
<Settings />
