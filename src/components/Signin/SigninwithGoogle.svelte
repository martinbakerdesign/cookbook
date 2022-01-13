<script>
  export let disabled = false;
  import user from "store/user";

  const buttonProps = {
    class: "signinwith",
    ...(disabled && { disabled: true }),
  };

  function signIn() {
    user.signIn("GOOGLE");
  }
</script>

<button on:click={signIn} {...buttonProps}>
  <svg class="icon" width="28" height="28" viewBox="0 0 28 28">
    <g fill="none" fill-rule="evenodd">
      <g fill-rule="nonzero">
        <path
          fill="#4285f4"
          d="M27.44 14.318c0-.993-.09-1.947-.255-2.863H14v5.415h7.535a6.44 6.44 0 0 1-2.794 4.225v3.513h4.524c2.648-2.437 4.175-6.026 4.175-10.29z"
        />
        <path
          fill="#34a853"
          d="M14 28c3.78 0 6.95-1.254 9.265-3.392l-4.524-3.513c-1.254.84-2.857 1.337-4.741 1.337-3.646 0-6.733-2.463-7.834-5.772H1.49v3.627C3.793 24.863 8.527 28 14 28z"
        />
        <path
          fill="#fbbc05"
          d="M6.166 16.66c-.28-.84-.439-1.737-.439-2.66s.16-1.82.44-2.66V7.713H1.488C.541 9.603 0 11.74 0 14s.54 4.397 1.49 6.287z"
        />
        <path
          fill="#ea4335"
          d="M14 5.568c2.055 0 3.9.707 5.352 2.094l4.015-4.016C20.943 1.387 17.774 0 14 0 8.527 0 3.793 3.137 1.49 7.713l4.676 3.627C7.267 8.03 10.354 5.568 14 5.568z"
        />
      </g>
    </g>
  </svg>
  <span>Sign in with Google</span>
</button>

<style lang="scss">
  .signinwith {
    color: #5c585b;
    border: 1px solid #bfbbb6;
    background-color: white;
  }
</style>
