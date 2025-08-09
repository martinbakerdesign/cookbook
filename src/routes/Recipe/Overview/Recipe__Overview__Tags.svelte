<script>
  import { derived, get, writable } from "svelte/store";
  import Label from "components/Label";
  import Button from "components/Button";
  import Icon from "components/Icon";
  import Tag from "components/Tag";
  import { tags } from "store/index";
  import isTouch from "store/isTouch";
  import { removeTag, addTag as addTagToStore, canEdit } from "store/recipe";
  import getSuggestions from "utils/tags/getSuggestions";

  const id = "recipe__tags";

  const refs = {
    input: null,
    suggestions: null
  };

  const inputValue = writable("");
  const focus = writable(false);
  const selectedSuggestion = writable(null);
  const suggestions = derived([inputValue, tags], ([$inputValue, $tags]) =>
    $inputValue.length > 0 ? getSuggestions($inputValue, $tags) : []
  );

  $: suggestionsHidden = !$focus || !$inputValue.length;
  $: addTagButtonDisabled = !$inputValue.length;
  $: buttonSize = $isTouch ? 'sm' : 'xs';

  function onChange(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      return;
    }
  }
  function onKeydown(e) {
    const $value = get(inputValue);
    const $tags = get(tags);
    const $suggestions = get(suggestions);
    const $selectedSuggestion = get(selectedSuggestion);

    // Create new tag
    let isEnter = e.key === "Enter" || e.keyCode === 13;
    if (isEnter) {
      e.preventDefault();
      $selectedSuggestion != null
        ? tags.add($suggestions[$selectedSuggestion])
        : tags.add($value);
      inputValue.set("");
      return;
    }
    // // Edit last tag
    // else if (e.key === "Backspace" && !value.length) {
    //   let lastTag = $tags[$tags.length - 1];
    //   value = lastTag.slice(0, lastTag.length);
    //   tags.remove(lastTag);
    // }
    // Remove last tag
    else if (e.key === "Backspace" && !$value.length) {
      return;
      let lastTag = $tags[$tags.length - 1];
      // value = lastTag.slice(0, lastTag.length);
      tags.remove(lastTag);
    } else if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.keyCode === 40 ||
      e.keyCode === 38
    ) {
      const count = $suggestions.length;
      e.preventDefault();
      if (!$value.length || !count) return;
      let isDown = e.key === "ArrowDown" || e.keyCode === 40;
      let current = $selectedSuggestion;

      selectedSuggestion.set(
        isDown
          ? current == null
            ? 0
            : (current + 1) % count
          : current == null
            ? count - 1
            : (current + count - 1) % count
      );
    }
  }
  function toggleFocus(e) {
    const $focus = e.type === "focus" || refs?.suggestions.contains(e?.relatedTarget ?? null);
    if (get(focus) === $focus) return;
    focus.set($focus);
  }
  function addTag(e) {
    addTagToStore(e);
    focus.set(false);
    inputValue.set("");
  }
  function onClick(e) {
    if (!get(canEdit) || !refs.input || e.target.closest(".tag") || e.closest('#create-tag')) return;

    refs.input.focus();
  }
  function handleAddTagClick () {
    const newTag = get(inputValue);
    tags.add(newTag);
    focus.set(false);
    inputValue.set('')
  }
</script>

<section
  data-section="TAGS"
  class="px-page pt-[3.125rem] pb-12 relative flex flex-wrap gap-2 items-center cursor-text border-t flex-none w-full xl:flex-1 xl:border-t-0 xl:pl-10"
>
  <span class="absolute inset-0 z-0" on:click={onClick}></span>

  <Label
    for={id}
    class="absolute top-10 cursor-text z-10">Tags</Label
  >

  {#each $tags as tag}
    <Tag class="p-0 items-center select-none tag relative z-10 py-0">
      <span
        class="inline-flex text-body-lg leading-[1.25rem] gap-x-2 items-center select-none"
      >
        <span>{tag}</span>
        {#if $canEdit}
          <Button
            size={buttonSize}
            variant="ghost"
            on:click={removeTag}
            isIcon={true}
            data-tag={tag}
            class="fill-icon hover:fill-icon-critical -mr-2"
            ><Icon
              icon="x--12"
              size={12}
            /></Button
          >
        {/if}
      </span>
    </Tag>
  {/each}

  {#if $canEdit}
    <div class="flex items-center gap-x-2 flex-1 relative z-10">
      <Button
        size={buttonSize}
        variant='accent'
        isIcon={true}
        disabled={addTagButtonDisabled}
        on:click={handleAddTagClick}
        id="create-tag"
      >
        <Icon
          icon="plus--12"
          size={12}
        />
      </Button>
      <input
        type="text"
        {id}
        placeholder="Add tag"
        class="bg-transparent text-text placeholder:text-text-secondary outline-none text-body-lg flex-1"
        bind:this={refs.input}
        on:keyup={onChange}
        on:change={onChange}
        on:keydown={onKeydown}
        on:focus={toggleFocus}
        on:blur={toggleFocus}
        bind:value={$inputValue}
      />
    </div>
    <div
      class="absolute bottom-6 translate-y-full left-page right-page rounded-1 bg-background shadow-lg z-50 p-2 space-y-2 text-body-lg flex-col none aria-[hidden=false]:flex flex-1 w-full"
      hidden={suggestionsHidden}
      aria-hidden={suggestionsHidden}
      bind:this={refs.suggestions}
    >
      {#each $suggestions as suggestion, index}
        <button
          class="block rounded-1 p-2 hover:bg-background-fill-inverted-hover w-full text-left {index ===
          $selectedSuggestion
            ? 'bg-background-fill-inverted-hover'
            : ''}"
          data-tag={suggestion}
          on:click={addTag}>{suggestion}</button
        >
      {/each}
      {#if !$suggestions.length}
        <span class="no-suggestions p-2 text-text-secondary"
          >No suggestions</span
        >
      {/if}
    </div>
  {/if}
</section>
