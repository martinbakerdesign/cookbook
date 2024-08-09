import { type VariantProps, tv } from "tailwind-variants";
import { type Button as ButtonPrimitive } from "bits-ui";
import Root from "./Button.svelte";
import ResponsiveButton from "./Button--Responsive.svelte";

const iconSlotClasses =
  "w-10 h-10 aspect-square flex items-center justify-center empty:none";

const buttonVariants = tv({
  base: "rounded-1 flex items-center justify-center disabled:opacity-15",
  variants: {
    variant: {
      primary:
        "bg-background-fill hover:bg-background-fill-hover active:bg-background-fill-active fill-icon-inverted text-text-inverted",
      secondary:
        "bg-background-fill-subtle hover:bg-background-fill-subtle-hover active:bg-background-fill-subtle-active fill-icon text-text",
      accent:
        "bg-background-fill-accent hover:bg-background-fill-accent-hover active:bg-background-fill-accent-active fill-icon-accent-on-fill text-text-accent-on-fill",
      inverted:
        "bg-background-fill-inverted hover:bg-background-fill-inverted-hover active:bg-background-fill-inverted-active text-text fill-icon",
      ghost:
        "bg-background-fill-transparent hover:bg-background-fill-transparent-hover active:bg-background-fill-transparent-active text-text fill-icon",
      success:
        "bg-background-fill-success hover:bg-background-fill-success-hover active:bg-background-fill-success-active text-text-success-on-fill fill-icon-success-on-fill",
      warning:
        "bg-background-fill-warning hover:bg-background-fill-warning-hover active:bg-background-fill-warning-active text-text-warning-on-fill fill-icon-warning-on-fill",
      critical:
        "bg-background-fill-critical hover:bg-background-fill-critical-hover active:bg-background-fill-critical-active text-text-critical-on-fill fill-icon-critical-on-fill",
      outline:
        "border bg-background-fill-transparent hover:bg-background-fill-transparent-hover active:bg-background-fill-transparent-active text-text fill-text",
    },
    size: {
      xs: "p-element-sm",
      sm: "p-element-md",
      md: "p-element-lg",
      lg: "p-element-xl",
      xl: "p-element-2xl",
    },
    isIcon: {
      true: ''
    },
    animation: {
      none: '',
      pulse: 'animation-pulse',
      toggle: 'animation-toggle',
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    isIcon: false,
    animation: 'none'
  },
});

const contentVariants = tv({
  base: "inline-block flex-none text-body-lg",
  variants: {
    size: {
      xs: "px-2",
      sm: "px-2",
      md: "px-2",
      lg: "px-3",
      xl: "px-3",
    },
    isIcon: {
      true: iconSlotClasses,
      false: "",
    },
  },
  compoundVariants: [
    { size: "xs", isIcon: true, class: "px-0" },
    { size: "sm", isIcon: true, class: "px-0" },
    { size: "md", isIcon: true, class: "px-0" },
    { size: "lg", isIcon: true, class: "px-0" },
    { size: "xl", isIcon: true, class: "px-0" },
  ],
  defaultVariants: {
    size: "md",
    isIcon: false,
  },
});

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];
type ContentSize = VariantProps<typeof contentVariants>["size"];
type ContentIsIcon = VariantProps<typeof contentVariants>["isIcon"];

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};
type ContentProps = {
  size?: ContentSize;
  isIcon?: ContentIsIcon;
};

type ButtonEvents = ButtonPrimitive.Events;

export {
  Root as default,
  ResponsiveButton,
  //
  type ButtonProps,
  type ContentProps,
  type ButtonEvents,
  //
  iconSlotClasses,
  buttonVariants,
  contentVariants,
};
