<script>
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  // import { focus } from "utils/prosemirror/plugins/ingredient/toggleHeader";

  export let context, placeholder, className, type;

  const focus = writable(false);

  const { getViews, onMount: onDomMount } = getContext(context);

  let editorRef;

  const observer = new ResizeObserver(onResize);
  function onResize([e]) {
    let {
      contentRect: { width },
      target,
    } = e;

    target.style.setProperty("--width", `${width - 24}px`);
  }

  let view;
  onMount(() => {
    view =
      getViews()[
        type === "RECIPE__EDITOR--INGREDIENTS" ? "ingredients" : "method"
      ];
    observer.observe(editorRef),
      view.dom.addEventListener("focus", toggleFocus),
      view.dom.addEventListener("blur", toggleFocus);

    return () => {
      observer.disconnect(),
        view.dom.removeEventListener("focus", toggleFocus),
        view.dom.removeEventListener("blur", toggleFocus),
        view?.destroy();
    };
  });

  function toggleFocus({ type, relatedTarget }) {
    let shouldFocus =
      type === "focus" ||
      (relatedTarget != null &&
        relatedTarget.closest(".context__menu") != null);
    shouldFocus !== $focus && focus.set(shouldFocus);
  }
</script>

{#if type === "RECIPE__EDITOR--INGREDIENTS"}
  <div
    use:onDomMount
    {placeholder}
    class={`recipe__editor recipe__editor--${className}`}
    class:focus={$focus}
    bind:this={editorRef}
  />
{:else}
  <dl
    {placeholder}
    class={`recipe__editor recipe__editor--${className}`}
    class:focus={$focus}
    use:onDomMount
    bind:this={editorRef}
  />
{/if}

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @import "../../../styles/typo.scss";

  .recipe__editor {
    display: grid;
  }
</style>
