<script>
  import SigninForm from "components/Signin/SigninForm.svelte";
  import { bg } from "store/";
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>
<article
  id="signin"
  style={`background-image: url(/assets/img/landing/${$bg[0]}.webp)`}
>
  <SigninForm />
  <a id="signin__bgcredit" href={$bg[2]} target="_blank">{$bg[1]}</a>
</article>

<style lang="scss">
  @import "../../styles/colours.scss";
  @import "../../styles/sizes.scss";
  @import "../../styles/typo.scss";
  @import "../../components/Signin/ButtonDefault.scss";

  #signin {
    width: 100vw;
    height: 100vh;
    background-image: url(/assets/img/landing/fruits-and-veggies--spencer-gabor.webp);
    background-position: center;
    background-size: cover;

    &__bgcredit {
      position: fixed;
      right: $s6;
      bottom: $s6;
      text-decoration: none;
      font-size: 0.8125rem;
      color: $white;
      mix-blend-mode: difference;
      opacity: 0.65;
    }
  }
</style>
