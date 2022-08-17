<script>
  export let icon = "";
  export let label = "";
  export let role = "presentation";
  export let size = 24;
  export let style = "";

  import "./Icon.scss";

  let viewBox = +icon.split("--").pop() ?? 24;
</script>

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
