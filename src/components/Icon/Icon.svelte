<script>
  import {getViewbox, defaultSize} from '.'
  import "./Icon.scss";

  export let icon = "";
  export let label = "";
  export let role = "presentation";
  export let size = defaultSize;
  export let style = "";

  const viewBox = getViewbox(icon, size ?? defaultSize);

  const showIcon = icon && icon.length;
</script>

{#if showIcon}
<svg
  viewBox={`0 0 ${viewBox} ${viewBox}`}
  width={size}
  height={size}
  class="icon"
  {role}
  aria-label={label}
  {style}
>
  {#if !!label.trim().length}<title>{label}</title>{/if}
  <use href="#icon--{icon}" />
</svg>
{/if}
