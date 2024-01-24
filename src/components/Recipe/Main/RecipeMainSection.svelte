<script>
  import { loading } from "store/";
  import RecipeMainEditor from "./RecipeMainEditor.svelte";
  import SectionHeader from "./SectionHeader.svelte";
  export let index, id, header, editor;
</script>

<section id={`recipe__${id}`} class="recipe__section" class:loading={$loading}>
  <div class="recipe__section__scrollwindow">
    <SectionHeader {index}>{header}</SectionHeader>
    <RecipeMainEditor {...editor} />
  </div>
</section>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @import "../../../styles/typo";

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .recipe__section {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;

    &__scrollwindow {
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
      padding-left: s.$s5;
      padding-right: s.$s5;
    }
    &#recipe {
      &__ingredients {
        .recipe__section__scrollwindow {
          padding-left: calc(5.25rem - 1.5rem);
        }
      }
      &__method {
        .recipe__section__scrollwindow {
          padding-right: s.$s5;
          padding-left: 1.5rem;
        }
      }
    }
    &.loading {
      display: block;
      border-radius: 0.75rem;
      background-color: var(--bg-secondary);
      margin-left: s.$s6;
      margin-right: s.$s6;
      margin-top: s.$s4;
      animation: load 1500ms infinite linear;
      height: calc(100vh - 11.125rem - 4.5rem);

      &#recipe__ingredients {
        margin-left: s.$s7;
        margin-right: s.$s6;
      }
      &#recipe__method {
        margin-right: s.$s7;
        margin-left: s.$s6;
      }
    }
  }

  .recipe__editor {
    &--ingredients,
    &--method {
      height: 100%;

      .ProseMirror {
        display: flex;
        flex-direction: column;

        &[contenteditable="false"] {
          dragthumb {
            display: none;
          }
        }
        &:empty {
          position: relative;
          padding-left: 1.5rem;

          &:before,
          &:after {
            cursor: text;
            font-size: 0.875rem;
            font-weight: 400;
            letter-spacing: calc(0.2 / 14 * 1em);
            line-height: 1rem;
            margin-bottom: s.$s3;
            opacity: 0.5;
          }
        }
      }
    }
    &--ingredients {
      .ProseMirror:empty {
        &:before {
          content: "Ingredient";
        }
      }
    }
    &--method {
      .ProseMirror:empty {
        margin-left: 1.5rem;
        padding-left: s.$s4;

        &:before,
        &:after {
          display: inline-block;
        }
        &:before {
          position: absolute;
          top: 0;
          height: 1rem;
          content: "1";
          cursor: text;
          font-weight: 600;
          left: 0;
          opacity: 1;
        }
        &:after {
          content: "First step ...";
          cursor: text;
          opacity: 0.5;
        }
      }
    }
  }

  .context {
    z-index: 3;
    position: absolute;
    top: 0;
    background-color: transparent;
    border: 0;
    padding: 0;

    &[data-type="toggleheader"] {
      // display: none;
      top: 0.5rem;
      right: calc(100% + 0.25rem);
      transform: translateY(-50%);
      background-color: transparent;
      border: 0;
      padding: 0;
    }

    &#ingredients__translateunit {
      left: 0;
      top: 0;
      display: none;
      transform: translate(-50%, 0.5rem);
      padding: s.$s1;
      font-size: 0.8125rem;
      letter-spacing: calc(0.1 / 13 * 1em);
      background-color: c.$white;
      border: 1px solid c.$border;
      padding: s.$s1;
      border-radius: 0.375rem;
      color: c.$black;

      li {
        line-height: 1.25;
        padding: 0.125rem s.$s3;
        padding-left: s.$s4;
        border-radius: 0.25rem;
        position: relative;
        user-select: none;

        .icon {
          --icon: 0.875rem;
          position: absolute;
          left: s.$s1;
          top: 50%;
          transform: translateY(-50%);
          fill: c.$black;
          width: var(--icon);
          height: var(--icon);
        }

        &[data-selected="true"] {
          color: c.$accent;
          .icon {
            fill: c.$accent;
          }
        }

        @mixin focus {
          background-color: c.$accent;
          color: c.$white;

          .icon {
            fill: c.$white;
          }
        }
        &:focus-visible {
          @include focus;
        }
        @media (hover: hover) {
          &:hover {
            @include focus;
          }
        }
      }

      &.show {
        display: inline-block;
      }
    }

    &__icon {
      fill: c.$black;
      display: block;
      flex: none;
      cursor: pointer;

      &--header {
        opacity: 0.5;
        width: 1rem;
        height: 1rem;
        fill: c.$black;
        transition: fill 75ms ease-out;

        &[data-active="true"] {
          opacity: 1;
        }

        @mixin focus {
          transition-duration: 100ms;
          opacity: 0.75;
        }
        &:focus-visible {
          @include focus;
        }
        @media (hover: hover) {
          &:hover {
            @include focus;
          }
        }
      }
      &--translate {
        display: flex;
        flex-direction: column;
        list-style: none;
      }
    }
  }
</style>
