<script>
  export let disabled = false;
  import user from "store/user";

  const buttonProps = {
    class: "signinwith",
    ...(disabled && { disabled: true }),
  };

  function signIn() {
    user.signIn("FACEBOOK");
  }
</script>

<button on:click={signIn} {...buttonProps}>
  <svg class="icon" width="28" height="28" viewBox="0 0 28 28">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h28v28H0z" />
      <path
        fill="#fff"
        d="M28 14.086C28 6.306 21.732 0 14 0S0 6.306 0 14.086C0 21.116 5.12 26.943 11.813 28v-9.843H8.258v-4.071h3.555v-3.104c0-3.53 2.09-5.48 5.288-5.48 1.531 0 3.133.275 3.133.275v3.467H18.47c-1.74 0-2.282 1.085-2.282 2.2v2.642h3.883l-.62 4.071h-3.262V28C22.88 26.943 28 21.116 28 14.086"
      />
    </g>
  </svg>
  <span>Sign in with Facebook</span>
</button>

<style lang="scss">
  .signinwith {
    color: white;
    border: 0;
    background-color: #1877f2;
  }
</style>
