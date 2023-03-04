<script>
  import { sortingOptions, sortingSelection } from "store/menu";
  import { link } from "svelte-spa-router";
  import dateToRecencyString from "utils/date/dateToRecencyString";
  import timestampToDate from "utils/db/timestamp/timestampToDate";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  import Tags from "./MenuRecipesListItemTags.svelte";
  import ShareButton from "./ShareButton.svelte";
  import DeleteButton from "./DeleteButton.svelte";
  import ContextMenu from "./ContextMenu/ContextMenu.svelte";

  export let index, id, name, tags, created, last_edited, editable;

  let sortKey, ref, timeSince;
  const focus = writable(false);
  const showContextMenu = writable(false);
  const contextPos = writable([0, 0]);

  onMount(() => {
    window.addEventListener("click", onClickOut);

    return () => {
      window.removeEventListener("click", onClickOut);
    };
  });

  $: (sortKey = sortingOptions[$sortingSelection][1]),
    (timeSince = dateToRecencyString(
      timestampToDate(sortKey, created, last_edited)
    ));

  function getPos(el) {
    if (!el) return [0, 0];
    let rect = el.getBoundingClientRect();

    return [rect.left, rect.top];
  }
  function toggleBorder(type) {
    if (!index) return;
    let prevRow = document.querySelector(
      `.menu__recipes__list__item[data-index="${index - 1}"]`
    );

    prevRow.classList[type === "pointerenter" ? "add" : "remove"]("noborder");
  }
  function onPointerOver({ type }) {
    toggleBorder(type);
    onFocusToggle({ type: type === "pointerenter" ? "focus" : "blur" });
  }
  function onContext({ target, clientX, clientY }) {
    if (target.closest(".menu__recipes__list__item__delete")) return;
    let itemPos = getPos(ref);
    contextPos.set([clientX - itemPos[0], clientY - itemPos[1]]);
    showContextMenu.set(true);
  }
  function onClickOut(e) {
    if (ref.contains(e.target)) return;
    $focus && focus.set(false), $showContextMenu && hideContext();
  }
  function hideContext() {
    showContextMenu.set(false);
    focus.set(false);
  }
  function onFocusToggle({ type }) {
    focus.set(type === "focus");
  }
</script>

<li
  bind:this={ref}
  class="menu__recipes__list__item"
  data-id={id}
  data-index={index}
  class:focus={$focus}
  on:pointerenter={onPointerOver}
  on:pointerleave={onPointerOver}
  on:contextmenu|preventDefault={onContext}
>
  <a
    use:link
    href={`/${id}`}
    class="menu__recipes__list__item__link"
    on:focus={onFocusToggle}
    on:blur={onFocusToggle}
  >
    <div class="menu__recipes__list__item__name cell">
      {name}
    </div>
    <Tags {tags} />
    <div class={`menu__recipes__list__item__${sortKey} cell`}>
      {timeSince}
    </div>
  </a>
  <ShareButton {id} />
  {#if editable}
  <DeleteButton {id} />
  {/if}
  <ContextMenu
    show={$showContextMenu}
    pos={$contextPos}
    {hideContext}
    recipeId={id}
  />
</li>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .menu__recipes__list__item {
    font-size: 0.8125rem;
    letter-spacing: 0;
    line-height: 1.5rem;
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto auto;
    width: 100%;

    &:after {
      content: "";
      left: 0;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: var(--border);
      pointer-events: none;
      user-select: none;
      display: block;
      z-index: 1;
    }
    &:last-child {
      &:after {
        content: none;
      }
    }
    @mixin focus {
      &:before {
        content: "";
        position: absolute;
        left: -1rem;
        top: 0;
        width: calc(100% + 2rem);
        height: 100%;
        z-index: 0;
        background-color: var(--bg-secondary);
        display: block;
        opacity: 0.75;
        border-radius: 0.25rem;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }
      &:after {
        opacity: 0;
      }
    }
    &.focus {
      @include focus;
    }

    &__link {
      color: var(--text-primary);
      padding: s.$s3 0;
      text-decoration: none;
      color: inherit;
      flex: 1;
      height: 3rem;
      position: relative;
      z-index: 1;
      outline: 0;
      display: grid;
      grid-template-columns: 6fr 5fr 2fr;
      width: 100%;
    }

    &.focus {
      .menu__recipes__list__item {
        &__link {
          color: var(--accent);
        }
      }
    }

    .cell {
      padding: 0 s.$s4;
      width: 100%;
      display: block;
      overflow: hidden;

      &.menu__recipes__list__item {
        &__name {
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: calc(0.1 / 14 * 1em);
          padding-left: 0;
        }
        &__tags {
        }
        &__created,
        &__last_edited {
          width: 8rem;
        }
      }

      @media screen and (max-width: 1440px) {
        padding: 0 s.$s3;
      }
    }

    &.noborder {
      &:after {
        content: none;
      }
    }
  }

  :global(.menu__recipes__list__item:hover .cell tag) {
    background-color: var(--accent);
    color: var(--white);
  }
  :global(.menu__recipes__list__item:hover .menu__recipes__list__item__delete),
  :global(.menu__recipes__list__item:hover .menu__recipes__list__item__share) {
    opacity: 1;
  }
</style>
