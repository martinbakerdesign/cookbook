<script lang="ts">
  import {getViewbox, defaultSize} from '.'

  export let icon: string = "";
  export let label: string|undefined = "";
  export let role = "presentation";
  export let size = defaultSize;
  export let style: string|undefined = undefined;

  let className: string|undefined = undefined;
  export {className as class}

  const viewBox = getViewbox(icon, size ?? defaultSize);

  const showIcon = icon && icon.length;
</script>

{#if showIcon}
<svg
  viewBox={`0 0 ${viewBox} ${viewBox}`}
  width={size}
  height={size}
  class="icon {className}"
  {role}
  aria-label={label}
  {style}
>
  {#if !!label.trim().length}<title>{label}</title>{/if}
  <use href="#icon--{icon}" />
</svg>
{/if}
