<script>
  import {Select} from 'bits-ui'

  export let value;
  export let label;
  export let isSelected = false;
</script>

  <Select.Item class="text-center {isSelected ? 'text-text' : 'text-text-secondary'} rounded-1 hover:bg-background-fill-inverted-hover py-4 select-none pointer-default" {...{value,label}}>
    {label}
  </Select.Item>