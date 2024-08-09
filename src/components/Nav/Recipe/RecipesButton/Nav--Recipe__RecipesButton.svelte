<script>
  import {ResponsiveButton} from "components/Button";
  import Icon from "components/Icon";
  import { iconProps, onClick } from ".";
  import {isExpanded} from '../'

  const label = "Recipes";
</script>

<ResponsiveButton
  size="xl"
  variant="primary"
  aria-label={label}
  href="/"
  on:click={onClick}
  icon="home--20"
  expanded={$isExpanded}
>
  <span slot="prefix">
    <Icon {...iconProps} />
  </span>
  {label}
</ResponsiveButton>
