<script>
  import { onMount } from "svelte";
  import {readonly} from 'store/recipe'
  import {
    ModeToggleSwitch,
    RecipesButton,
    SectionJumper,
    Scaler,
    Timer,
    //
    MODES,
    //
    mode,
    //
    init
  } from ".";
  import user from "store/user";
  // import { Timer } from 'components/Timer';

  onMount(init);
</script>

{#if $user}
<RecipesButton />
{/if}

<SectionJumper />

<Scaler />

{#if $mode === MODES.READ}
<Timer />
{/if}

{#if !$readonly}
<ModeToggleSwitch />
{/if}
