<script>
  import {setThumbWidth } from '.'

  export let checked = false;
  export let value = "";
  export let id = "";

  let width = 0;
  $: setThumbWidth(width)
</script>

<label
  for={id}
  class="flex text-center justify-center w-full relative text-body-md items-center px-5 z-10  {checked ? 'text-text-inverted' : 'text-text-inverted-secondary'}"
  on:click
  bind:offsetWidth={width}
>
  <input
    type="checkbox"
    {...{
      id,
      checked,
      value
    }}
    class="opacity-0 absolute inset-0"
  />
  <slot />
</label>
