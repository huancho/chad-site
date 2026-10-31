import { parseArgs } from "node:util"

const MAX_WIDTH = 2400
const ORIENTATIONS = ["landscape", "portrait", "squarish"]

type Photo = {
  id: string
  width: number
  height: number
  color: string
  description: string | null
  alt_description: string | null
  urls: { raw: string }
  links: { html: string }
  user: { name: string; links: { html: string } }
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    count: { type: "string", default: "5" },
    orientation: { type: "string" },
  },
})

const query = positionals.join(" ").trim()
const count = Number(values.count)
const key = process.env.UNSPLASH_ACCESS_KEY

if (!query) {
  fail(
    'Usage: pnpm find-image "<query>" [--count 1-30] [--orientation landscape|portrait|squarish]'
  )
}
if (!Number.isInteger(count) || count < 1 || count > 30) {
  fail("--count must be a whole number from 1 to 30")
}
if (values.orientation && !ORIENTATIONS.includes(values.orientation)) {
  fail(`--orientation must be one of: ${ORIENTATIONS.join(", ")}`)
}
if (!key) {
  fail(
    "UNSPLASH_ACCESS_KEY is not set. Add it to ~/.zshrc and open a new terminal."
  )
}

const params = new URLSearchParams({
  query,
  per_page: String(count),
  content_filter: "high",
})
if (values.orientation) params.set("orientation", values.orientation)

const response = await fetch(
  `https://api.unsplash.com/search/photos?${params}`,
  { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" } }
)

if (!response.ok) {
  fail(`Unsplash returned ${response.status}: ${await response.text()}`)
}

const { results } = (await response.json()) as { results: Photo[] }
const referral = "utm_source=proposal_demo&utm_medium=referral"

const photos = results.map((photo) => {
  const width = Math.min(MAX_WIDTH, photo.width)

  return {
    id: photo.id,
    url: `${photo.urls.raw}&w=${width}&q=80&fm=jpg&fit=max`,
    width,
    height: Math.round((width * photo.height) / photo.width),
    color: photo.color,
    description: photo.alt_description ?? photo.description,
    credit: {
      name: photo.user.name,
      profile: `${photo.user.links.html}?${referral}`,
      photo: `${photo.links.html}?${referral}`,
    },
  }
})

console.log(JSON.stringify(photos, null, 2))
console.error(
  `${photos.length} results, ${response.headers.get("x-ratelimit-remaining")} requests left this hour`
)

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}
