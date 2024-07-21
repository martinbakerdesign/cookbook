<script>
  import { createEventDispatcher, onMount } from "svelte";
  import {useStore} from '.'
  
  let initValue = '';
  $: $value !== initValue && (initValue = $value);
  export {initValue as value};

  const dispatch = createEventDispatcher();
  
  const store = useStore(dispatch);
  const {init, value, style, setRef} = store;

  export let id = "";
  export let name = "";
  export let placeholder = "";
  export let readonly = false;

  onMount(init);
</script>

<div class="textarea-autosize" style={$style}>
  <div
    class="textarea-autosize__spacer"
    hidden
    aria-hidden="true"
    use:setRef={'spacer'}
  >
    <slot />
  </div>
  <textarea
    {name}
    {id}
    bind:value={$value}
    {placeholder}
    class="textarea-autosize__input"
    use:setRef={'textarea'}
    {readonly}
  />
</div>

<style lang="scss">
  .textarea-autosize {
    position: relative;

    &__spacer {
      display: block;
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
    &__input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      outline: 0;
      border: 0;
      padding: 0;
      margin: 0;
      background-color: transparent;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-style: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
      resize: none;

      &::placeholder {
        color: inherit;
        opacity: 0.5;
      }
    }
  }
</style>
