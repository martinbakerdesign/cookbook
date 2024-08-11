<script>
  import Button from 'components/Button'
  import Icon from 'components/Icon'
  import { getTriggerClickHandler } from '.'

  export let id = null;

  const iconProps = {
    icon: 'options--24',
    size: 20,
    label: 'Options'
  }
  const clickHandler = getTriggerClickHandler(id);
</script>

<Button
  type="button"
  variant="outline"
  isIcon={true}
  size="xl"
  on:click={clickHandler}
  class="col-start-3 relative z-10 lg:hidden"
>
  <Icon {...iconProps} />
</Button>
