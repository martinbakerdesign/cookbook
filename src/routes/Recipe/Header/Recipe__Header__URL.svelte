<script>
  import { isUserAuthor, src, loading } from "store/";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import _$ from "utils/dom/querySelector";
  import { readonly } from "store/recipe";

  const altPressed = writable(false);

  let ref;
  let ro = new ResizeObserver(() => {
    let maxWidth = _$("#recipe__header__name").getBoundingClientRect().width;
    ref.style.maxWidth = `${maxWidth}px`;
  });
  function setMaxWidth(el) {
    ref = el;
    ro.observe(el.parentElement);
  }

  onMount(() => {
    window.addEventListener("keydown", onAltPress);
    window.addEventListener("keyup", onAltPress);

    return () => {
      ro.disconnect();
      window.removeEventListener("keydown", onAltPress);
      window.removeEventListener("keyup", onAltPress);
    };
  });

  const valid = writable(false);
  $: $valid = validateURL($src);

  function validateURL(url) {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  }
  function onClick(e) {
    $valid && (($isUserAuthor && e.altKey) || !$isUserAuthor) && goToURL($src);
  }
  function goToURL(url) {
    window.open(url, "_blank");
    $altPressed = false;
  }
  function onAltPress({ type, altKey }) {
    $altPressed = type === "keydown" && altKey;
  }
</script>

{#if altPressed}
  <a
    class:loading={$loading}
    id="recipe__header__src-url"
    href={$src}
    target="_blank"
    use:setMaxWidth
  >
    <span>
      {$src ?? "Source URL"}
    </span>
  </a>
{:else}
  <div
    id="recipe__header__src-url"
    class:valid={$valid}
    class:alt={$altPressed}
    class:loading={$loading}
    use:setMaxWidth
  >
    <input
      bind:value={$src}
      placeholder="Source URL"
      type="url"
      on:click={onClick}
      readonly={$readonly}
    />
  </div>
{/if}

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;

  #recipe__header__src-url {
    position: relative;
    // margin-bottom: s.$s2;
    margin-bottom: s.$s3;
    color: var(--text-primary);
    display: block;
    appearance: none;
    font-size: 0.875rem;
    letter-spacing: calc(0.2 / 14 * 1em);
    line-height: 1.5rem;

    &,
    span,
    input {
      overflow: hidden;
      word-wrap: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }

    input {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      letter-spacing: inherit;
      line-height: 1.5rem;
      outline: 0;
      border: 0;
      background-color: transparent;
      text-decoration: inherit;
      cursor: inherit;

      &::placeholder {
        color: inherit;
        opacity: 0.5;
      }
    }
    &.valid,
    &a {
      text-decoration: underline;

      &.alt {
        cursor: pointer;
      }
    }

    &.loading {
      pointer-events: none;
      opacity: 0;
    }
  }
</style>
