<script>
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import _$ from "utils/dom/querySelector";
  import {
    Tags,
    ContextMenu,
    useContextMenu,
    getTimeSince,
    ContextMenuTouchTrigger,
  } from ".";
  import { sortKey } from "store/menu";

  const { showContextMenu, contextPos, builder, init, hideContext, openContextMenu } =
    useContextMenu();

  onMount(init);

  $: timeSince = getTimeSince($sortKey, created, last_edited);

  export let id, name, tags, created, last_edited;
</script>

<li
  use:builder
  class="grid px-page items-center gap-x-16 gap-y-4 py-4 border-b relative grid-cols-[1fr_5.5rem_auto] lg:grid-cols-[3fr_2fr_5.5rem] lg:py-6 last:border-b-0 hover:bg-background-fill-subtle {id === 'new' ? 'pointer-events-none select-none opacity-35' : ''}"
>
  <a
    use:link
    href={`/${id}`}
    class="anchor h-px col-start-1 row-start-1">{name}</a
  >
  <div class="col-start-1 row-start-1 w-full text-heading-md text-text">
    {name}
  </div>
  <Tags
    {tags}
    maxTags={3}
    class="col-start-1 col-end-3 row-start-2 lg:col-start-2 lg:row-start-1"
  />
  <div
    class="text-text-secondary text-body-sm row-start-1 col-start-2 lg:col-start-3"
  >
    {timeSince}
  </div>
  <ContextMenuTouchTrigger on:click={openContextMenu} />
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

  .anchor {
    font-size: 0;
  }
  .anchor:after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
  }
</style>
