<script>
  import { sortingOptions, sortingSelection } from "store/menu";
  import { link } from "svelte-spa-router";
  import dateToRecencyString from "utils/date/dateToRecencyString";
  import timestampToDate from "utils/db/timestamp/timestampToDate";
  import Tags from "./MenuRecipesListItemTags.svelte";
  import DeleteButton from "./DeleteButton.svelte";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";
  import ContextMenu from "../../../ContextMenu/ContextMenu.svelte";

  export let index, id, name, tags, created, last_edited;

  let sortKey, timeSince, ref;
  const focus = writable(false);
  const showContextMenu = writable(false);
  const contextPos = writable([0, 0]);
  $: sortKey = sortingOptions[$sortingSelection][1];
  $: timeSince = dateToRecencyString(
    timestampToDate(
      sortKey === "created"
        ? created
        : sortKey === "last_edited"
        ? last_edited
        : ""
    )
  );
  $: window[$showContextMenu ? "addEventListener" : "removeEventListener"](
    "click",
    onClickOut
  ),
    window[$showContextMenu ? "addEventListener" : "removeEventListener"](
      "contextmenu",
      onClickOut
    );

  onDestroy(() => {
    window.removeEventListener("click", onClickOut);
  });

  function getPos() {
    let rect = ref.getBoundingClientRect();
    return [rect.left, rect.top];
  }
  function onPointerOver({ target, type }) {
    if (index > 0) {
      let prevRow = document.querySelector(
        `.menu__recipes__list__item[data-index="${index - 1}"]`
      );

      prevRow.classList[type === "pointerenter" ? "add" : "remove"]("noborder");
    }
  }
  function onContext({ target, clientX, clientY }) {
    if (target.closest(".menu__recipes__list__item__delete")) return;
    let itemPos = getPos();
    contextPos.set([clientX - itemPos[0], clientY - itemPos[1]]);
    showContextMenu.set(true);
  }
  function onClickOut(e) {
    if (e.target.closest(`.menu__recipes__list__item[data-index="${index}"]`))
      return;
    hideContext();
  }
  function hideContext() {
    showContextMenu.set(false);
  }
  function onFocus({ type }) {
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
    on:focus={onFocus}
    on:blur={onFocus}
  >
    <div class="menu__recipes__list__item__name cell">
      {name}
    </div>
    <Tags {tags} />
    <div class={`menu__recipes__list__item__${sortKey} cell`}>
      {timeSince}
    </div>
  </a>
  <DeleteButton {id} />
  <ContextMenu
    show={$showContextMenu}
    pos={$contextPos}
    {hideContext}
    recipeId={id}
  />
</li>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .menu__recipes__list__item {
    font-size: 0.8125rem;
    letter-spacing: 0;
    line-height: 1.5rem;
    position: relative;
    display: flex;

    &:after {
      content: "";
      left: 0;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: c.$border;
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
      color: c.$accent;

      &:before {
        content: "";
        position: absolute;
        left: -1rem;
        top: 0;
        width: calc(100% + 2rem);
        height: 100%;
        z-index: 0;
        background-color: c.$grey-96;
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
    @media (hover: hover) {
      &:hover {
        @include focus;
      }
    }

    &__link {
      padding: s.$s3 0;
      display: flex;
      text-decoration: none;
      color: inherit;
      flex: 1;
      height: 3rem;
      position: relative;
      z-index: 1;
      outline: 0;
    }

    .cell {
      padding: 0 s.$s4;

      &.menu__recipes__list__item {
        &__name {
          flex: 6;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: calc(0.1 / 14 * 1em);
          padding-left: 0;
        }
        &__tags {
        }
        &__created,
        &__last_edited {
          flex: 1;
        }
      }
    }

    &.noborder {
      &:after {
        content: none;
      }
    }
  }

  :global(.menu__recipes__list__item:hover .cell tag) {
    background-color: c.$accent;
    color: c.$white;
  }
</style>
