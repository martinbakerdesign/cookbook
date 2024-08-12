<script>
  import { onMount } from "svelte";
  import Button from "components/Button";
  import Icon from "components/Icon";
  import { setFixed, setRefBuilder, saveStatus, init, BlockTypeSwitch, buttonSize } from ".";
  import { NODES } from "..";
  import { refs } from "store/recipe";

  onMount(init)

  $: statusIcon = `${{
    'SAVED': 'saved',
    'SAVING': 'saving',
    'CHANGES_CUED': 'saving',
  }[$saveStatus]}--20`
  $: statusFill = {
    'SAVED': 'fill-text-success',
    'SAVING': 'fill-[#88cdf8]',
    'CHANGES_CUED': 'fill-icon-inverted',
  }[$saveStatus];
</script>

<div
  class="pb-safe-inset-bottom px-page sticky z-40 background-blur-sm bg-background-surface-backdrop backdrop-blur-lg w-full"
  use:setFixed
>
  <div class="pb-page grid justify-center">
    <div
      class="rounded-2 bg-background-fill/15 p-2 gap-x-2 flex backdrop-blur-md"
      bind:this={refs.toolbar}
      id="recipe__toolbar"
    >
      <Button
        variant="inverted"
        size={$buttonSize}
        isIcon={true}
        label="Undo"
        builders={[setRefBuilder("editorActions.undo")]}
        ><Icon
          icon="undo--12"
          size={12}
        /></Button
      >
      <Button
        variant="inverted"
        size={$buttonSize}
        isIcon={true}
        label="Redo"
        builders={[setRefBuilder("editorActions.redo")]}
        ><Icon
          icon="redo--12"
          size={12}
        /></Button
      >
      <!-- <Switch
        values={nodeValues}
        bind:value={nodeType}
        variant="inverted"
        class="flex-1 w-[11.5rem]"
      /> -->
      <BlockTypeSwitch />
      <Button
        variant="inverted"
        size={$buttonSize}
        isIcon={true}
        label="Degrees"
        builders={[setRefBuilder("editorActions.degrees")]}
        ><Icon
          icon="degrees--12"
          size={12}
        /></Button
      >
      <!-- <Button
        variant="inverted"
        size={buttonSize}
        isIcon={true}
        label="Insert link"
        ><Icon
          icon="link--12"
          size={12}
        /></Button
      > -->
      <div class="aspect-square h-full flex justify-center items-center flex-none">
        <Icon icon={statusIcon} size={20} class={statusFill} />
      </div>
    </div>
  </div>
</div>
