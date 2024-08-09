<script>
  import Tag from 'components/Tag'
  
  export let tags = [];
  export let maxTags = 3;
  let className = undefined;
  export {className as class}
</script>

<div class="flex gap-2 flex-wrap w-full {className}">
  {#each tags.slice(0, maxTags) as tag}
    <Tag>{tag}</Tag>
  {/each}
  {#if tags.length > maxTags}
    <Tag>+{tags.length - maxTags}</Tag>
  {/if}
</div>