<script>
  import { settingsFocus } from "store/settings";

  import SettingsInput from "./Inputs/SettingsInput.svelte";

  export let heading = "Settings Block";
  export let type = "TEXT";
  export let key = "";
  export let index;
  export let isGroup = false;
  export let controls = {};
</script>

<li
  class="settings__block"
  id={`settings__${key}`}
  data-index={index}
  data-focus={$settingsFocus === index}
>
  <h3 class="settings__block__heading">{heading}</h3>
  {#if !isGroup}
    <SettingsInput
      {...{
        key: [key],
        type,
      }}
    />
  {:else}
    <ul class="settings__block__group">
      {#each Object.entries(controls) as [_key, def]}
        <li>
          <h4 class="settings__block__subheading">{def.heading}</h4>
          <SettingsInput
            {...{
              key: [key, _key],
              type: def.type,
            }}
          />
        </li>
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  @use "../../styles/_sizes" as s;
  @use "../../styles/_colours" as c;
  @use "../../styles/_typo" as t;

  .settings__block {
    padding: s.$s5 0;
    position: relative;

    &:first-child {
      padding-top: s.$s6;
    }

    &:after {
      content: "";
      pointer-events: none;
      user-select: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--border);
    }
    &:last-child {
      padding-bottom: s.$s6;
      &:after {
        content: none;
      }
    }

    &__heading {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: s.$s4;
    }
    &__subheading {
      font-weight: 400;
      font-size: 0.75rem;
      // margin-bottom: s.$s2;
      letter-spacing: calc(0.3 / 12 * 1em);
    }

    &__group {
      list-style: none;

      li {
        display: grid;
        grid-template-columns: 8rem 1fr;
        grid-column-gap: s.$s5;
        align-items: center;
        margin-bottom: s.$s4;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &[data-focus="true"] {
      color: c.$accent;
    }
  }
</style>
