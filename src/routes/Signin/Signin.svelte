<script>
  import SigninForm from "components/Signin/SigninForm.svelte";
  import { bg } from "store/";
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>
<article id="signin">
  <SigninForm />
  <a id="signin__bgcredit" href={$bg[2]} target="_blank">{$bg[1]}</a>
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/typo" as t;
  @import "../../components/Signin/ButtonDefault.scss";

  #signin {
    width: 100vw;
    height: 100vh;

    &__bgcredit {
      position: fixed;
      right: s.$s6;
      bottom: s.$s6;
      text-decoration: none;
      font-size: 0.8125rem;
      color: c.$white;
      mix-blend-mode: difference;
      opacity: 0.65;
    }
  }
</style>
