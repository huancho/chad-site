import { TruckIcon } from "lucide-react"
import { cn } from "cn"

import { CorridorFigure } from "@/components/reveal"
import { Typography } from "@/components/typography"

const label =
  "Schéma du trajet : port de Douala, environ 1 800 km jusqu’à N’Djamena et l’entrepôt de Farcha, puis livraison à Moundou, Sarh et Abéché."

const cities = ["Moundou", "Sarh", "Abéché"]

function Stop({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute size-4 rounded-full border-[3px] border-current bg-primary",
        className
      )}
    />
  )
}

// Shares the 4-column grid of the steps below it in services.tsx, so Douala,
// the truck and the N’Djamena hub each stand on top of their step. The fork is
// a fixed size and the road is the only part that stretches.
function HorizontalCorridor() {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative hidden h-44 grid-cols-4 gap-x-8 lg:grid"
    >
      <span
        data-draw="line-x"
        className="absolute top-22 left-0 h-[3px] w-[calc(75%+1.5rem)] origin-left -translate-y-1/2 bg-current"
      />

      <div className="relative">
        <Stop className="top-22 left-0 -translate-y-1/2" />
        <div className="absolute top-27 left-0">
          <Typography variant="h4" as="p">
            Douala
          </Typography>
          <Typography variant="small">Port d’arrivée</Typography>
        </div>
      </div>

      <div className="relative col-start-3">
        <div className="absolute bottom-26 left-0">
          <Typography variant="small">environ</Typography>
          <Typography variant="h2" as="p" className="whitespace-nowrap">
            1&nbsp;800&nbsp;km
          </Typography>
        </div>
        <span className="absolute top-22 left-0 -ml-2 -translate-y-1/2 bg-primary px-2">
          <TruckIcon className="size-6" />
        </span>
        <div className="absolute top-27 -right-8 text-right">
          <Typography variant="h4" as="p">
            N’Djamena
          </Typography>
          <Typography variant="small">
            Entrepôt de Farcha, 2&nbsp;400&nbsp;m²
          </Typography>
        </div>
      </div>

      <div className="relative">
        {/* Wider than the svg by the overhang of its end stops and their stroke. */}
        <div
          data-draw="fork-clip"
          className="absolute top-0 left-0 h-44 w-26 overflow-hidden"
        >
          <div data-draw="fork-art" className="absolute inset-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 96 176"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="absolute top-0 left-0 h-44 w-24 overflow-visible"
            >
              <path d="M10 88H96" />
              <path d="M10 88C52 88 40 24 80 24H96" />
              <path d="M10 88C52 88 40 152 80 152H96" />
              <circle
                cx="10"
                cy="88"
                r="10"
                fill="currentColor"
                stroke="none"
              />
              {[24, 88, 152].map((y) => (
                <circle
                  key={y}
                  cx="96"
                  cy={y}
                  r="6.5"
                  className="fill-primary"
                />
              ))}
            </svg>
          </div>
        </div>
        {cities.map((city, index) => (
          <Typography
            key={city}
            variant="h4"
            as="p"
            className="absolute left-29 -translate-y-1/2"
            style={{ top: `${24 + index * 64}px` }}
          >
            {city}
          </Typography>
        ))}
      </div>
    </div>
  )
}

function VerticalStop({
  name,
  detail,
  hub = false,
}: {
  name: string
  detail?: string
  hub?: boolean
}) {
  return (
    <div className="relative pl-8">
      <Stop
        className={hub ? "top-0.5 -left-0.5 size-5 bg-current" : "top-1 left-0"}
      />
      <Typography variant="h4" as="p">
        {name}
      </Typography>
      {detail ? <Typography variant="small">{detail}</Typography> : null}
    </div>
  )
}

// The spine stops inside the last elbow, so the three cities read as branches
// off N’Djamena and not as stops in a row.
function VerticalCorridor() {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative flex flex-col gap-5 lg:hidden"
    >
      <span
        data-draw="line-y"
        className="absolute top-3 bottom-6 left-[6.5px] w-[3px] origin-top bg-current"
      />
      <VerticalStop name="Douala" detail="Port d’arrivée" />
      <div className="relative flex items-center gap-3 pl-8">
        <span className="absolute -left-1 bg-primary py-1">
          <TruckIcon className="size-6" />
        </span>
        <Typography variant="h4" as="p">
          environ 1&nbsp;800&nbsp;km
        </Typography>
      </div>
      <VerticalStop
        name="N’Djamena"
        detail="Entrepôt de Farcha, 2&#160;400&#160;m²"
        hub
      />
      {cities.map((city) => (
        <div key={city} className="relative flex h-6 items-center pl-16">
          <span
            data-draw="branch"
            className="absolute bottom-1/2 left-[6.5px] -mb-[1.5px] h-8 w-8 origin-left rounded-bl-lg border-b-[3px] border-l-[3px] border-current"
          />
          <Stop className="top-1/2 left-9 -translate-y-1/2" />
          <Typography variant="h4" as="p">
            {city}
          </Typography>
        </div>
      ))}
    </div>
  )
}

function CorridorDiagram() {
  return (
    <CorridorFigure className="relative">
      <HorizontalCorridor />
      <VerticalCorridor />
      <Typography
        variant="small"
        as="figcaption"
        className="mt-6 lg:absolute lg:top-33.25 lg:left-[calc(25%+0.5rem)] lg:mt-0"
      >
        Schéma du trajet, sans échelle.
      </Typography>
    </CorridorFigure>
  )
}

export { CorridorDiagram }
