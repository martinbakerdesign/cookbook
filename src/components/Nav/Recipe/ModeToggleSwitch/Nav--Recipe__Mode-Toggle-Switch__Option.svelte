<script>
  import { setThumbWidth } from '.'

  export let checked = false;
  export let value = "";
  export let id = "";

  let className;
  export {className as class};

  let width = 0;
  $: setThumbWidth(width)
</script>

<label
  for={id}
  class="flex text-center justify-center w-full relative text-body-md items-center z-10 gap-x-2 h-full {checked ? 'text-text-accent-on-fill fill-icon-accent-on-fill' : 'text-text-inverted-secondary fill-icon-inverted-secondary'} {className}"
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
