<script>
  import NameCard from "./NameCard.svelte";
  import SignOut from "./SignOut.svelte";
</script>

<div class="dropdown">
  <NameCard />
  <SignOut />
</div>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .dropdown {
    position: fixed;
    top: 3.75rem;
    right: 0.5rem;
    width: s.$s8;
    background-color: c.$grey-52;
    pointer-events: auto;
    border-radius: 0.375rem;
    color: c.$white;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: calc(2rem + 0.75rem - 0.5rem);
      transform: translate(50%, -50%) rotateZ(45deg);
      background-color: inherit;
      width: s.$s4;
      height: s.$s4;
      border-top-left-radius: 0.25rem;
      z-index: -1;
      transform-origin: center;
    }
  }
</style>
