import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("relative w-full scroll-mt-16", {
  variants: {
    spacing: {
      default: "py-20 md:py-28",
      sm: "py-12 md:py-16",
      lg: "py-28 md:py-40",
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

const containerVariants = cva("mx-auto w-full px-6 md:px-8", {
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
})

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
