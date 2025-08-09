<script>
  import {setToggleHandler, value, onClick} from '.'
  import Icon from 'components/Icon'

  export let switchKey = "switch",
            label = "",
            id = "",
            icon = "",
            disabled = false;
  export let onToggle = () => {};
  $: setToggleHandler(onToggle)

  let initialValue = false;
  export {initialValue as value};
  $: value.set(true === initialValue);
</script>

<div class="flex w-full items-center {disabled ? 'opacity-15' : ''}" data-checked={$value}>
  {#if label && label.length > 0}
  <label for={id} class="flex-1 flex items-center text-body-sm font-normal">
    {#if icon}
      <Icon {icon} class="mr-3" />
    {/if}{label}</label>
  {/if}
  <button
    class="rounded-1 p-1 inline-flex flex-none transition-all duration-150 overflow-hidden {$value ? 'bg-background-fill-success' : 'bg-background-surface'}"
    type="button"
    role="switch"
    aria-checked={$value}
    {id}
    value={switchKey}
    on:click={onClick}
    {disabled}
  >
    <span class="w-10 h-10 aspect-square rounded-1 bg-white left-1 top-1 mr-6 data-[checked=true]:translate-x-6 transition-all duration-150 shadow-md" data-checked={$value} />
  </button>
  <input
    tabindex={-1}
    type="checkbox"
    value={switchKey}
    hidden
    aria-hidden={true}
    checked={$value}
  />
</div>
