<script>
  import user from "store/user";

  export let provider = null;
  export let disabled = true;
  export let icon = [];
  export let name = [];
  export let bg = "";
  export let text = "";
  export let border = null;

  const style = [
    `background-color: ${bg}`,
    `color: ${text}`,
    `border: ${border ? `calc(1/16 * 1rem) solid ${border}` : "0"}`,
  ].join(';')

  function signIn() {
    user.signIn(provider);
  }
</script>

<button
  on:click={signIn}
  {style}
  class="w-full flex justify-center items-center gap-4 rounded-1 p-6 text-body-lg font-medium"
>
  <svg
    class="icon w-10 h-10 aspect-square"
    width="20"
    height="20"
    viewBox="0 0 28 28"
  >
    <g
      fill="none"
      fill-rule="evenodd"
    >
      {#each icon as [d, fill]}
        <path
          {d}
          {fill}
          fill-rule="nonzero"
        />
      {/each}
    </g>
  </svg>

  <span>Sign in with {name}</span>
</button>
