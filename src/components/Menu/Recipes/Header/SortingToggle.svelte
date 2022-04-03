<script>
  import Icon from "components/Icon/Icon.svelte";
  import { writable } from "svelte/store";
  import { sortingSelection, sortingOptions } from "store/menu";
  import { onDestroy } from "svelte";

  const iconProps = {
    icon: "chevron-down--24",
    size: 20,
    fill: "#8a8480",
  };
  let label = sortingOptions[$sortingSelection][0];
  $: label = sortingOptions[$sortingSelection][0];
  let open = writable(false);

  onDestroy(() => {
    window.removeEventListener("click", onClickOut);
  });

  function toggleOpen({ target }) {
    if (target.closest(".sortingtoggle__option")) return;
    let newState = !$open;
    open.set(newState);
    newState && window.addEventListener("click", onClickOut);
  }
  function onClickOut({ target }) {
    if (target.closest("#menu__header__sorting")) return;
    open.set(false);
    window.removeEventListener("click", onClickOut);
  }
  function toggleSelected({ target }) {
    sortingSelection.set(+target.dataset.index);
    open.set(false);
  }
</script>

<div
  id="menu__header__sorting"
  class="sortingtoggle"
  data-open={$open}
  on:click={toggleOpen}
>
  <span>{label}</span>
  <Icon {...iconProps} />
  {#if $open}
    <div class="sortingtoggle__options">
      {#each sortingOptions as option, index}
        <button
          class="sortingtoggle__option"
          data-index={index}
          on:click={toggleSelected}
          tabindex={index + 1}
        >
          {#if +$sortingSelection === index}
            <Icon icon="tick--15" size={12} />
          {/if}
          {option[0]}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/typo.scss";

  .sortingtoggle {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: $grey-52;
    letter-spacing: 0;
    line-height: 1.5rem;
    cursor: pointer;
    position: relative;

    span {
      user-select: none;
      padding-right: 0.125rem;
    }

    &__options {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(0.5rem);
      width: 10rem;
      text-align: left;
      background-color: var(--bg-primary);
      border: 0.0625rem solid var(--border);
      color: var(--text-primary);
      border-radius: 0.375rem;
      padding: $s1;
    }
    &__option {
      color: inherit;
      font-family: inherit;
      border: 0;
      margin: 0;
      width: 100%;
      display: block;
      background-color: transparent;
      padding: $s1 $s3 $s1 $s4;
      line-height: 1.0625rem;
      cursor: pointer;
      text-align: left;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      opacity: 0.65;
      position: relative;
      --fill: var(--text-primary);

      @mixin focus {
        opacity: 1;
        background-color: $accent;
        color: var(--white);
        --fill: var(--white);
      }

      &:focus {
        @include focus;
      }
      @media (hover: hover) {
        &:hover {
          @include focus;
        }
      }
    }

    &[data-open="true"] {
      .sortingtoggle {
        &__options {
          display: block;
        }
      }
    }
  }
  :global(.sortingtoggle__option .icon) {
    width: 0.8125rem;
    height: 0.8125rem;
    flex: none;
    position: absolute;
    left: $s1;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.75;
  }
</style>
