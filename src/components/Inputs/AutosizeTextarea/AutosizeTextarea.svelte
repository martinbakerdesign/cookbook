<script>
  import { onMount } from "svelte";
  import Label from 'components/Label'
  import {useStore} from '.'
  
  const store = useStore();
  const {init, style, setRef, builder} = store;

  onMount(init);
  
  let className = undefined;
  export {className as class}
  export let id = "";
  export let name = "";
  export let placeholder = "";
  export let readonly = false;
  export let label = undefined;
  export let value = '';
</script>

<div class="relative flex-1" style={$style}>
  {#if null != label && label.length > 0}
    <Label for={id} class="absolute top-0 left-0 pt-10 pl-page" {builder}>{label}</Label>
  {/if}
  <div
    class="block opacity-0 pointer-events-none select-none {className}"
    style={$style}
    hidden
    aria-hidden="true"
    data-spacer
  >
    <div use:setRef={'spacer'} class="break-all">{value}</div>
  </div>
  <textarea
    {name}
    {id}
    bind:value={value}
    {placeholder}
    class="absolute inset-0 w-full h-full resize-none {className}"
    use:setRef={'textarea'}
    {readonly}
    on:input
    on:change
    data-input
  />
</div>