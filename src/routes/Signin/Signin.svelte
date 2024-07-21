<script>
  import { bg } from "store";
  import { authProviders , Button } from '.'
  import "./Button/Signin__Button.scss";
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>
<article id="signin">
  <h1 id="signin__title">Cookbook</h1>
  <main id="signin__form">
    <h2 id="signin__form__heading">Sign in</h2>
    <div class="providers">
      {#each authProviders as props}
        <Button {...props} />
      {/each}
    </div>
  </main>
  <a id="signin__bgcredit" href={$bg[2]} target="_blank">{$bg[1]}</a>
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/typo" as t;

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
    &__title {
      position: fixed;
      top: s.$s3;
      left: s.$s3;
      @include t.font-soehne;
      font-size: 0.8125rem;
      letter-spacing: calc(0.2 / 13 * 1em);
      line-height: 1rem;
      color: c.$white;
      padding: 1.25rem 2rem;
      user-select: none;
    }
    &__form {
      position: fixed;
      top: 0;
      left: 50%;
      width: 35rem;
      padding: s.$s6;
      z-index: 1;
      display: grid;
      transform: translateX(-50%);
      background-color: c.$white;
      height: unset;
      padding-top: 30vh;
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;

      &__heading {
        @include t.font-soehne;
        font-weight: 500;
        font-size: 1.625rem;
        color: c.$black;
        letter-spacing: 0;
        margin-bottom: s.$s7;
      }

      .providers {
        display: flex;
        flex-direction: column;
        gap: s.$s2;
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
          right: s.$s6;
          bottom: s.$s6;
          text-decoration: none;
          font-size: 0.8125rem;
          color: c.$white;
          mix-blend-mode: difference;
          opacity: 0.65;
        }
      }
    }
  }
</style>
