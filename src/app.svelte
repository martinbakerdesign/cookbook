<script>
  import { bg } from "./store";
  import user, { checked } from "store/user";
  import Router, { location } from "svelte-spa-router";
  import useIcons from "components/Icon/useIcons";

  import Signin from "routes/Signin/Signin.svelte";
  import Menu from "routes/Menu/Menu.svelte";
  import Recipe from "routes/Recipe/Recipe.svelte";
  import Settings from "components/Settings/Settings.svelte";
  import Header from "components/Header/Header.svelte";
  import Animation from "components/Animation/Animation.svelte";
  import "styles/styles.scss";
  import { scrollY } from "store/menu";
  import "styles/_colours.scss";

  useIcons();

  const userRoutes = {
    "/:id": Recipe,
    "/": Menu,
  };
  const guestRoutes = {
    "/:id": Recipe,
    "/": Signin,
  };

  let routes = guestRoutes;
  $: routes = $user ? userRoutes : guestRoutes;

  const animProps = {
    animation: "loading--wok--64",
    fps: 30,
    fill: "#f5853f",
  };

  $: document.querySelector("html").style.backgroundImage =
    $location === "/" ? `url(/assets/img/landing/${$bg[0]}.webp)` : "";
</script>

<svelte:window bind:scrollY={$scrollY} />
{#if $checked && ((!$user && $location !== "/") || $user)}
  <Header />
{/if}
{#if !$checked && $location === "/"}
  <div id="app__loading">
    <div class="spinner">
      <Animation {...animProps} />
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
