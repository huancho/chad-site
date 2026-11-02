import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const typographyVariants = cva("wrap-anywhere", {
  variants: {
    variant: {
      // "Du port de Douala" sets ~8.8em wide in Young Serif at this tracking.
      // The first min() term keeps that line whole inside Container's 3rem
      // padding on phones, and above h2's 1.75rem floor. Young Serif defaults
      // to old-style figures, where 1 reads as I and 0 as o, so headings line up.
      h1: "font-heading font-normal lining-nums text-[length:min((100vw-3rem)/9,1.25rem+3.6vw,4.5rem)] leading-[1.08] tracking-[-0.015em] text-balance",
      h2: "font-heading font-normal lining-nums text-[length:clamp(1.75rem,1.25rem+2.2vw,3rem)] leading-[1.12] tracking-[-0.01em] text-balance",
      h3: "font-heading font-normal lining-nums text-[length:clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.2] text-balance",
      h4: "font-heading font-normal lining-nums text-lg leading-[1.25] text-balance md:text-xl",
      lead: "max-w-prose font-sans text-lg leading-[1.5] font-normal text-pretty md:text-xl",
      body: "max-w-prose font-sans text-base leading-[1.55] font-normal text-pretty",
      small: "font-sans text-sm leading-[1.5] font-normal",
      eyebrow:
        "font-sans text-[0.8125rem] leading-[1.3] font-semibold tracking-[0.08em] uppercase",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>

const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "p",
  eyebrow: "p",
} as const satisfies Record<TypographyVariant, React.ElementType>

type TypographyProps<T extends React.ElementType> = {
  as?: T
  variant?: TypographyVariant
  className?: string
} & Omit<React.ComponentProps<T>, "as" | "variant" | "className">

function Typography<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TypographyProps<T>) {
  const Component: React.ElementType = as ?? defaultElements[variant]

  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
