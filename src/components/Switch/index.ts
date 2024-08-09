import { tv } from "tailwind-variants";
import Switch from "./Switch.svelte";
import Label from "./Switch__Label.svelte";
import { VariantProps } from "class-variance-authority";

const switchVariants = tv({
  base: "flex rounded-1 p-1 gap-x-1 text-center relative text-body-md",
  variants: {
    variant: {
      DEFAULT:
        "bg-background-fill-surface",
      inverted:
        "bg-background-fill-inverted",
    },
  },
  defaultVariants: {
    variant: "DEFAULT",
  },
});
type SwitchVariant = VariantProps<typeof switchVariants>["variant"];

const thumbVariants = tv({
  base: "block rounded-1 h-full p-0 m-0 transition-transform duration-100 flex-1",
  variants: {
    variant: {
      DEFAULT:
        "bg-background-fill-inverted",
      inverted:
        "bg-background-fill",
    },
  },
  defaultVariants: {
    variant: "DEFAULT",
  },
});
type ThumbVariant = VariantProps<typeof thumbVariants>["variant"];

const labelVariants = tv({
  base: "flex justify-center items-center flex-1",
  variants: {
    variant: {
      DEFAULT:
        "",
      inverted:
        "",
    },
    current: {
        false: '',
        true: '',
    },
  },
  compoundVariants: [
    {
        variant: 'DEFAULT',
        current: false,
        class: 'text-secondary'
    },
    {
        variant: 'DEFAULT',
        current: true,
        class: 'text-text'
    },
    {
        variant: 'inverted',
        current: false,
        class: 'text-text-inverted-secondary'
    },
    {
        variant: 'inverted',
        current: true,
        class: 'text-text-inverted'
    },
  ],
  defaultVariants: {
    variant: "DEFAULT",
    current: false
  },
});
type LabelVariant = VariantProps<typeof labelVariants>["variant"];
type LabelCurrent = VariantProps<typeof labelVariants>["current"];

export {
    Switch as default,
    Label,
    //
    switchVariants,
    thumbVariants,
    labelVariants,
    type SwitchVariant,
    type ThumbVariant,
    type LabelVariant,
    type LabelCurrent,
};
