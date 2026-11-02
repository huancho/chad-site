import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      default: "py-16 md:py-20",
      sm: "py-10 md:py-12",
      lg: "py-24 md:py-28",
    },
    tone: {
      default: "bg-background text-foreground",
      muted: "bg-muted text-foreground",
      primary: "bg-primary text-primary-foreground",
    },
  },
  defaultVariants: {
    spacing: "default",
    tone: "default",
  },
})

function Section({
  className,
  spacing = "default",
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, tone, className }))}
      {...props}
    />
  )
}

// A phone in landscape puts its notch at the side, so the gutter grows to clear it.
const containerVariants = cva(
  "mx-auto w-full pr-[max(1.5rem,env(safe-area-inset-right))] pl-[max(1.5rem,env(safe-area-inset-left))] md:pr-[max(2rem,env(safe-area-inset-right))] md:pl-[max(2rem,env(safe-area-inset-left))]",
  {
    variants: {
      size: {
        default: "max-w-6xl",
        sm: "max-w-3xl",
        lg: "max-w-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants, Container, containerVariants }
