<script>
  import user, { checked } from "store/user";
  import Router from "svelte-spa-router";
  import Signin from "routes/Signin/Signin.svelte";
  import Menu from "routes/Menu/Menu.svelte";
  import Recipe from "routes/Recipe/Recipe.svelte";
  import Settings from "components/Settings/Settings.svelte";
  import Header from "components/Header/Header.svelte";
  import { location } from "svelte-spa-router";
  import { bg } from "./store";
  import Animation from "components/Animation/Animation.svelte";
  import "styles/styles.scss";

  const routes = {
    "/:id": Recipe,
    "/": Menu,
  };

  const animProps = {
    animation: "loading--wok--64",
    fps: 30,
    fill: "#f5853f",
  };
</script>

{#if !$checked && $location === "/"}
  <div
    id="app__loading"
    style={`background-image: url(/assets/img/landing/${$bg[0]}.webp)`}
  >
    <div class="spinner">
      <Animation {...animProps} />
    </div>
  </div>
{:else if $checked && !$user}
  <Signin />
{:else if $checked}
  <Header />
  <Router {routes} />
{/if}
<Settings />

<style lang="scss">
  @import "./styles/colours.scss";
  @import "./styles/sizes.scss";

  #app__loading {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .spinner {
      padding: $s2;
      margin: $s4;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
    }
  }
  main {
  }
</style>
