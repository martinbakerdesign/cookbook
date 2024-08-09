<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import {
    //
    dismissAlarm,
    setRefBuilder,
  } from ".";
  import { restart } from "store/timer";
</script>

<div class="flex justify-center items-center h-full w-16 fill-icon-accent-on-fill">
  <Icon
    icon="timer--20"
    size={20}
  />
</div>
<Button
  variant="secondary"
  size="lg"
  builders={[setRefBuilder("stop")]}
  on:click={dismissAlarm}
  class="flex-1"
>
  <span slot="prefix"
    ><Icon
      icon="x--20"
      size={20}
    /></span
  >
  Dismiss
</Button>
<Button
  variant="secondary"
  size="lg"
  builders={[setRefBuilder("restart")]}
  on:click={restart}
  class="flex-1"
>
  <span slot="prefix"
    ><Icon
      icon="restart--20"
      size={20}
    /></span
  >
  Restart
</Button>
