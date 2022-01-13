<script>
  import SigninwithGoogle from "components/Signin/SigninwithGoogle.svelte";
  import SigninwithFacebook from "components/Signin/SigninwithFacebook.svelte";
  import SigninwithApple from "components/Signin/SigninwithApple.svelte";
  import "./ButtonDefault.scss";
</script>

<main id="signin__form">
  <h1>Sign in</h1>
  <div class="providers">
    <SigninwithGoogle />
    <SigninwithFacebook disabled={true} />
    <SigninwithApple disabled={true} />
  </div>
</main>

<style lang="scss">
  @import "../../styles/colours.scss";
  @import "../../styles/sizes.scss";
  @import "../../styles/typo.scss";

  #signin__form {
    position: fixed;
    top: 0;
    left: 50%;
    width: 35rem;
    padding: $s6;
    z-index: 1;
    display: grid;
    transform: translateX(-50%);
    background-color: white;
    height: unset;
    padding-top: 30vh;

    .providers {
      display: flex;
      flex-direction: column;
      gap: $s2;
    }

    &__bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: url(/assets/img/landing/fruits-and-veggies--spencer-gabor.webp);
      background-position: center;
      background-size: cover;

      &__credit {
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
  }
  h1 {
    @include font-soehne;
    font-weight: 500;
    font-size: 1.625rem;
    color: $black;
    letter-spacing: 0;
    margin-bottom: $s7;
  }
</style>
