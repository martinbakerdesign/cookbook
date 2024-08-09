<script>
  import {Switch} from 'components/Inputs'

  export let key = '';
  export let label = '';
  export let id = '';
  export let value = false;
  
  const inputProps = {
    key,
    label,
    id,
    value
  }
</script>

<Switch
  {...inputProps}
/>