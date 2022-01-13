<script>
  import user from "store/user";
  export let disabled = false;

  const buttonProps = {
    class: "signinwith",
    ...(disabled && { disabled: true }),
  };
</script>

<button on:click={user.signIn} {...buttonProps}>
  <svg class="icon" width="28" height="28" viewBox="0 0 28 28">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h28v28H0z" />
      <path
        fill="#fff"
        fill-rule="nonzero"
        d="M14.327 6.462c1.22 0 2.75-.855 3.66-1.994.826-1.033 1.427-2.474 1.427-3.916A2.73 2.73 0 0 0 19.362 0c-1.357.053-2.99.943-3.97 2.136-.773.908-1.478 2.332-1.478 3.792 0 .213.034.427.052.498.086.018.223.036.36.036zM10.03 28c1.667 0 2.406-1.157 4.486-1.157 2.114 0 2.578 1.121 4.434 1.121 1.822 0 3.042-1.744 4.194-3.453 1.289-1.958 1.822-3.88 1.856-3.97-.12-.035-3.61-1.512-3.61-5.66 0-3.596 2.75-5.215 2.905-5.34-1.822-2.706-4.589-2.777-5.345-2.777-2.045 0-3.713 1.282-4.76 1.282-1.135 0-2.63-1.21-4.4-1.21-3.37 0-6.79 2.883-6.79 8.33 0 3.382 1.272 6.96 2.836 9.274C7.176 26.398 8.346 28 10.03 28z"
      />
    </g>
  </svg>

  <span>Sign in with Apple</span>
</button>

<style lang="scss">
  .signinwith {
    color: white;
    border: 0;
    background-color: #111111;
  }
</style>
