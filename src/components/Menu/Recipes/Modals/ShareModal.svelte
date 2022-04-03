<script>
  import Switch from "components/Inputs/Switch.svelte";

  import Modal from "components/Modal/Modal.svelte";
  import recipe from "store/";
  import { url, recipes } from "store/";
  import { getContext, onDestroy } from "svelte";
  import { get, writable } from "svelte/store";

  const { id, shareModal: show } = getContext("menu__modals");

  const saving = writable(false);

  // TODO Recipe sharing functionality
  // 1. Set recipe:shared attr to true
  // $: $show && recipes.toggleShare(get(id), true);
  // 2. Create link
  let link = "";
  $: link = `${$url}/#/${$id}`;

  let switchProps = {
    id: "menu__recipe__share__public",
    label: "Allow anyone with the link to see this recipe",
    initialValue: $recipes.filter((r) => r.id === $id)[0]?.shared ?? false,
    onToggle: toggleShared,
  };

  $: switchProps.initialValue =
    $recipes.filter((r) => r.id === $id)[0]?.shared ?? false;

  async function toggleShared(value) {
    try {
      saving.set(true);
      await recipes.toggleShare($id, value);
      saving.set(false);
    } catch (err) {
      console.error(err);
    }
  }
  function selectAll(e) {
    e.target.select();
  }
  function cancel() {
    show.set(false);
  }
  let copyButton;
  let success = writable(false);
  let timeout = null;
  function copyToClipboard() {
    navigator.clipboard.writeText(link);
    onLinkCopied();
  }
  function onLinkCopied() {
    clear();
    copyButton.querySelector("span").innerHTML = "Link copied";
    success.set(true);
    timeout = setTimeout(() => {
      copyButton.querySelector("span").innerHTML = "Copy link";
      success.set(false);
    }, 3000);
  }
  function clear() {
    timeout && (clearTimeout(timeout), (timeout = null));
    success.set(false);
  }
  onDestroy(() => {
    clear();
  });
</script>

<Modal show={$show}>
  <div class="menu__recipes__item__share">
    <h2 class="menu__recipes__item__modal__heading">Share recipe</h2>
    <div class="menu__recipes__item__modal__copylink">
      <input
        class="menu__recipes__item__modal__copylink__input"
        type="text"
        value={link}
        readonly
        on:click={selectAll}
      />
      <button
        class="menu__recipes__item__modal__copylink__button"
        type="button"
        on:click={copyToClipboard}
        bind:this={copyButton}
        class:success={$success}
      >
        <span>Copy link</span>
      </button>
    </div>
    <div class="menu__recipes__item__modal__switch">
      <Switch {...switchProps} />
    </div>
    <div class="menu__recipes__item__modal__actions">
      <button type="button" on:click={cancel} disabled={$saving}>Done</button>
    </div>
  </div>
</Modal>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;

  .menu__recipes__item__share {
    min-width: 28rem;

    .menu__recipes__item__modal {
      &__heading {
        margin-bottom: s.$s6;
      }
    }
  }

  .menu__recipes__item__modal {
    &__copylink,
    &__switch {
      padding: 0 s.$s4;
    }
    &__copylink {
      width: 100%;
      display: flex;
      gap: s.$s2;
      margin-bottom: s.$s4;
      &__input,
      &__button {
        font-family: inherit;
        padding: s.$s3 s.$s2;
        border-radius: s.$s2;
        border: 0;
        outline: 0;
      }
      &__input {
        background-color: c.$grey-96;
        color: c.$accent;
        flex: 1;
      }
      &__button {
        flex: none;
        background-color: transparent;
        color: c.$contrast;
        font-weight: 600;
        letter-spacing: calc(0.2 / 16 * 1em);
        cursor: pointer;

        @mixin focus {
          background-color: c.$grey-96;
        }
        &:focus-visible {
          @include focus;
        }
        @media (hover: hover) {
          &:hover {
            @include focus;
          }
        }

        &.success {
          background-color: c.$success;
          pointer-events: none;
          user-select: none;
          span {
            color: c.$grey-63;
            mix-blend-mode: multiply;
          }
        }
      }
    }
    &__switch {
      margin-bottom: s.$s5;
      width: 100%;
    }
  }

  :global(.menu__recipes__item__modal__switch .input--switch) {
    width: 100%;
    justify-content: space-between;

    label {
      font-size: 0.875rem;
    }
  }
</style>
