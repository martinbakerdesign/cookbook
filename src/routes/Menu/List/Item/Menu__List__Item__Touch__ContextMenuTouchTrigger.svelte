<script>
  import Button from 'components/Button'
  import Icon from 'components/Icon'

  const iconProps = {
    icon: 'options--24',
    size: 20,
    label: 'Options'
  }
</script>

<Button
  type="button"
  variant="outline"
  isIcon={true}
  size="xl"
  on:click
  class="col-start-3 relative z-10 lg:hidden"
><Icon {...iconProps} /></Button
>
