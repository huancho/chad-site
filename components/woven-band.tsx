import { useId } from "react"
import { cn } from "cn"

function WovenBand({ className }: { className?: string }) {
  const id = useId()

  return (
    <svg aria-hidden="true" className={cn("block h-3 w-full", className)}>
      <defs>
        <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 6 0l6 12ZM12 0l6 12 6-12Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export { WovenBand }
