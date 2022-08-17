<script>
  import { onMount } from "svelte";

  import { writable } from "svelte/store";
  import clamp from "utils/math/clamp";
  import { v4 as uuid } from "uuid";

  import Icon from "components/Icon/Icon.svelte";

  export let value = writable(null);
  export let options = [];
  export let label = "";
  export let id = uuid();
  export let className = "";

  const ro = new ResizeObserver(onResize);
  const arrowKeyCodes = [38, 40];
  const jumpKeyCodes = [36, 35];
  const escKeyCode = [27];
  const searchAheadKeyCodes = new Array(90 - 48).fill(0).map((v, i) => i + 48);
  const refs = {
    button: null,
    popup: null,
    options: [],
  };

  let expanded = false;
  let searchAheadItems, searchAheadIndexes, width;
  let focus =
    $value != null ? options.findIndex((o) => getValue(o) === $value) : 0;

  onMount(() => {
    ro.observe(refs.popup);
    refs.options = [...refs.popup.querySelectorAll("button")];

    return () => {
      destroyListeners();
      ro.disconnect();
    };
  });

  function onResize() {
    width = refs.popup.querySelector("li").getBoundingClientRect().width;
  }
  function getLabel(value) {
    return value?.label ?? value?.value ?? value?.id ?? value ?? "";
  }
  function getValue(value) {
    return value?.value ?? value?.id ?? value.label ?? value ?? "";
  }
  function expand() {
    let labelTop = refs.button
      .querySelector(".input__toggle__label")
      .getBoundingClientRect().top;

    focus =
      $value != null ? options.findIndex((o) => getValue(o) === $value) : 0;

    refs.popup.style.transform = "none";
    let focusTop = refs.options[focus]
      .querySelector(".input__option__label")
      .getBoundingClientRect().top;
    refs.popup.style.transform = `translateY(${labelTop - focusTop}px)`;

    expanded = true;
    refs.options[focus].focus();
    requestAnimationFrame(() => {
      window.addEventListener("click", onClickOut);
      window.addEventListener("keydown", onKeyDown);
    });
  }
  function hide(e) {
    expanded = false;
    focus =
      $value != null ? options.findIndex((o) => $value === getValue(o)) : 0;
    destroyListeners();
    escKeyCode.includes(e?.keyCode ?? null) &&
      (e.preventDefault && e.preventDefault(),
      e.stopPropagation && e.stopPropagation());
  }
  function onClickOut(e) {
    if (refs.button.contains(e.target) || refs.popup.contains(e.target)) return;
    hide(e);
  }
  function setValue(e) {
    let newValue = e.target.closest("button").dataset.value;
    value.set(newValue);
    focus = +e.target.closest("button").dataset.index;
    hide(e);
  }
  function focusOnEnter(e) {
    let itemIndex = +e.target.dataset.index;
    focus !== itemIndex && (focus = itemIndex);
  }
  function blurOnLeave(e) {
    focus = null;
  }
  function onKeyDown(e) {
    if (
      ![
        ...searchAheadKeyCodes,
        ...jumpKeyCodes,
        ...arrowKeyCodes,
        ...escKeyCode,
      ].includes(e.keyCode)
    )
      return;

    searchAheadKeyCodes.includes(e.keyCode) && searchAhead(e);
    escKeyCode.includes(e.keyCode) && hide(e);
    arrowKeyCodes.includes(e.keyCode) && toggleFocus(e);
    jumpKeyCodes.includes(e.keyCode) && jumpFocus(e);
  }
  function searchAhead(e) {
    let items = options.filter(
      (o) => getLabel(o).slice(0, 1).toLowerCase() === e.key.toLowerCase()
    );
    if (searchAheadItems !== items) {
      searchAheadItems = items;
      searchAheadIndexes = items.map((i) =>
        options.findIndex((o) => getValue(o) === getValue(i))
      );
      refs.options[searchAheadIndexes[0]]?.focus();
      return;
    }
    if (searchAheadItems.length === 1) return;
    let searchIndex = searchAheadIndexes.findIndex(
      (o) => getValue(o) === getValue(options[focus])
    );
    let newIndex = (searchIndex + 1) % searchAheadIndexes.length;
    refs.options[searchAheadIndexes[newIndex]].focus();
  }
  function toggleFocus(e) {
    let isDown = e.keyCode === 40;
    let delta = isDown ? 1 : -1;
    let newFocus =
      focus != null
        ? clamp(0, focus + delta, options.length - 1)
        : isDown
        ? 0
        : options.length - 1;
    if (newFocus === focus) return;
    focus = newFocus;
    refs.options[newFocus].focus();
  }
  function jumpFocus(e) {
    let isDown = e.keyCode === 36;
    let newFocus = isDown ? 0 : options.length - 1;
    if (newFocus === focus) return;
    refs.options[newFocus].focus();
  }
  function destroyListeners() {
    window.removeEventListener("click", onClickOut);
    window.removeEventListener("keydown", onKeyDown);
  }
  function isSelected(value, option, index) {
    return value != null ? getValue(option) === value : !index;
  }
</script>

<div class="input input--select {className}">
  <button
    {id}
    type="button"
    class="input__toggle"
    aria-expanded={expanded}
    aria-controls="{id}__options"
    aria-label={label}
    aria-autocomplete="none"
    on:click={expand}
    bind:this={refs.button}
    style="width: {width}px"
  >
    <span class="input__toggle__label">
      {getLabel(
        $value != null
          ? options.filter((o) => getValue(o) === $value)[0]
          : options[0]
      )}
    </span>
    <Icon
      {...{
        icon: "chevron--down--16",
        size: 16,
      }}
    />
  </button>
  <ul
    role="listbox"
    data-state="open"
    dir="ltr"
    tabindex="-1"
    id="{id}__options"
    bind:this={refs.popup}
    class="input__options"
    hidden={!expanded}
    aria-hidden={!expanded}
  >
    {#each options as option, index}
      <li>
        <button
          id="{id}__option--{index}"
          class="input__option"
          class:focus={focus === index}
          role="option"
          aria-labelledby="{id}__option--{index}__label"
          aria-selected={isSelected($value, option, index)}
          data-value={getValue(option)}
          data-index={index}
          tabindex={expanded && index === focus ? 0 : -1}
          on:click={setValue}
          on:focus={focusOnEnter}
          on:pointerenter={focusOnEnter}
          on:pointerleave={blurOnLeave}
        >
          <span id="{id}__option--{index}__label" class="input__option__label">
            {getLabel(option)}
          </span>
          {#if isSelected($value, option, index)}
            <Icon {...{ icon: "tick--16", size: 16 }} />
          {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  @use "../../styles/colours" as colours;
  @use "../../styles/sizes" as sizes;
  @use "../../styles/typo" as typo;

  .input--select {
    position: relative;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: calc(0.1 / 14 * 1em);
    color: var(--text-primary);
    user-select: none;
    letter-spacing: calc(0.2 / 12 * 1em);
    font-weight: 400;
    @include typo.font_inter;

    .input {
      &__toggle,
      &__option {
        padding: sizes.$s1 sizes.$s3;
        padding-right: 1.5rem;
        border-radius: 0.25rem;
        margin: 0;
        border: 0;
        outline: 0;
        text-align: left;
        font-family: inherit;
        font-style: inherit;
        font-size: inherit;
        font-weight: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        color: inherit;
      }
      &__toggle {
        position: relative;
        // background-color: var(--bg-secondary);
        background-color: transparent;
        box-shadow: 0 0 0 0.0625rem inset var(--border);

        @media (hover: hover) {
          &:hover {
            box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
          }
        }
        &:focus-visible {
          box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
        }
      }
      &__option {
        background-color: transparent;
        display: block;
        width: 100%;
        white-space: nowrap;
        position: relative;

        &.focus {
          background-color: var(--accent);
        }
      }
      &__options {
        position: absolute;
        left: -0.25rem;
        top: -0.25rem;
        list-style: none;
        padding: 0.25rem;
        border-radius: 0.375rem;
        background-color: var(--bg-secondary);
        z-index: 1;
        list-style: none;
        display: block;

        li {
          display: block;
          margin-bottom: 0.125rem;
          &:last-child {
            margin-bottom: 0;
          }
        }

        &[hidden] {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }

  :global .input--select .icon {
    position: absolute;
    right: 0.375rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    user-select: none;
    fill: var(--text-primary);
  }
  :global .input--select .input__option .icon {
    right: 0.25rem;
    transform: translateY(-52%);
  }
</style>
