"use client"

import * as React from "react"
import { useAnimateMini, useReducedMotion } from "motion/react"

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const
const ENTER = 0.35
const STAGGER = 0.09
const MAX_STAGGER_STEPS = 3
const LINE = 0.8

const rise = {
  hidden: "translateY(8px)",
  shown: "translateY(0)",
}

const fork = {
  duration: 0.5,
  ease: EASE_OUT,
  delay: LINE - 0.05,
}

const line = {
  duration: LINE,
  ease: EASE_IN_OUT,
  delay: 0,
}

const corridorParts = {
  "line-x": { hidden: "scaleX(0)", shown: "scaleX(1)", ...line },
  "line-y": { hidden: "scaleY(0)", shown: "scaleY(1)", ...line },
  // The clip and the art travel in opposite directions, so the art holds still
  // while the clip's edge wipes across it. A curve drawn with transforms only.
  "fork-clip": { hidden: "translateX(-100%)", shown: "translateX(0)", ...fork },
  "fork-art": { hidden: "translateX(100%)", shown: "translateX(0)", ...fork },
  branch: { hidden: "scaleX(0)", shown: "scaleX(1)", ...fork },
}

type CorridorPart = keyof typeof corridorParts

// The server HTML is always the finished state. Only content still below the
// fold once JavaScript runs gets hidden, so slow or failed scripts leave
// everything visible and on-screen content never flashes.
function isBelowFold(element: Element) {
  return element.getBoundingClientRect().top >= window.innerHeight
}

function clearStyles(element: HTMLElement) {
  element.style.opacity = ""
  element.style.transform = ""
}

// The huge top margin makes content a visitor jumped past count as reached, so
// an anchor link never leaves it hidden above the viewport.
function observeOnce(
  targets: HTMLElement[],
  bottomInset: string,
  onEnter: (target: HTMLElement, order: number) => void,
  onPassed: (target: HTMLElement) => void
) {
  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        const target = entry.target as HTMLElement
        if (entry.boundingClientRect.bottom <= 0) onPassed(target)
        else onEnter(target, order++)
      }
    },
    { rootMargin: `100000px 0px ${bottomInset} 0px` }
  )
  targets.forEach((target) => observer.observe(target))
  return observer
}

// Fades up each descendant marked data-reveal. Items reached together, like a
// row of tiles, stagger as a batch whatever the breakpoint's column count.
function Reveal({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimateMini<HTMLDivElement>()
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (reduceMotion) return

    const items = Array.from(
      scope.current.querySelectorAll<HTMLElement>("[data-reveal]")
    ).filter(isBelowFold)

    for (const item of items) {
      item.style.opacity = "0"
      item.style.transform = rise.hidden
    }

    const observer = observeOnce(
      items,
      "-8%",
      (item, order) => {
        animate(
          item,
          { opacity: [0, 1], transform: [rise.hidden, rise.shown] },
          {
            duration: ENTER,
            ease: EASE_OUT,
            delay: Math.min(order, MAX_STAGGER_STEPS) * STAGGER,
          }
        ).then(() => clearStyles(item))
      },
      clearStyles
    )

    return () => {
      observer.disconnect()
      items.forEach(clearStyles)
    }
  }, [animate, reduceMotion, scope])

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  )
}

// The page's one signature moment: the road draws from Douala to N’Djamena,
// then forks to the cities. Stops and labels stay put, so only lines ever hide.
function CorridorFigure({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [scope, animate] = useAnimateMini<HTMLElement>()
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (reduceMotion || !isBelowFold(scope.current)) return

    const parts = Array.from(
      scope.current.querySelectorAll<HTMLElement>("[data-draw]")
    )
    const partOf = (element: HTMLElement) =>
      corridorParts[element.dataset.draw as CorridorPart]

    for (const part of parts) part.style.transform = partOf(part).hidden

    const clearParts = () => parts.forEach(clearStyles)

    const observer = observeOnce(
      [scope.current],
      "-25%",
      () => {
        let branchIndex = 0
        for (const part of parts) {
          const { hidden, shown, duration, ease, delay } = partOf(part)
          const stagger =
            part.dataset.draw === "branch" ? branchIndex++ * STAGGER : 0
          animate(
            part,
            { transform: [hidden, shown] },
            { duration, ease, delay: delay + stagger }
          ).then(() => clearStyles(part))
        }
      },
      clearParts
    )

    return () => {
      observer.disconnect()
      clearParts()
    }
  }, [animate, reduceMotion, scope])

  return (
    <figure ref={scope} className={className}>
      {children}
    </figure>
  )
}

export { CorridorFigure, Reveal }
