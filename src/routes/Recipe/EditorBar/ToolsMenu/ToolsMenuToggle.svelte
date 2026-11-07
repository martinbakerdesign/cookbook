<script>
  import { isOpen, toggleMenu, InsertDegrees, refs, UseUnitShorthand, setupClickOut, CupsToGrams } from ".";
  import {buttonSize} from '..'
  import {ResponsiveButton} from "components/Button";
  import isExpanded from 'store/isExpanded'

  let icon = 'minus';
  let menuHidden = true;

  $: icon = $isOpen ? 'minus' : 'plus';
  $: menuHidden = !$isOpen;

</script>
<div class="relative" use:setupClickOut>
  <ResponsiveButton
    on:click={toggleMenu}
    variant="inverted"
    size={$buttonSize}
    icon="{icon}--20"
    expanded={$isExpanded}
  >
    Tools
  </ResponsiveButton>
  <div class="none w-110 absolute -top-2 -translate-y-full left-1/2 -translate-x-1/2 aria-[hidden=false]:flex flex-col rounded-2 p-2 gap-2 backdrop-blur-md bg-background shadow-lg" hidden={menuHidden} aria-hidden={menuHidden}>
    <CupsToGrams />
    <UseUnitShorthand />
    <InsertDegrees />
  </div>
</div>
