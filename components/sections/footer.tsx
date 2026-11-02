import { Fragment } from "react"

import { Container } from "@/components/section"
import { navLinks } from "@/components/sections/header"
import { Typography } from "@/components/typography"
import { WovenBand } from "@/components/woven-band"
import { photos } from "@/lib/photos"

const credits = [
  ...new Map(
    Object.values(photos).map(({ credit }) => [credit.name, credit])
  ).values(),
]

// --ring is laterite, which disappears on indigo, so focus uses the foreground.
const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-foreground"

const creditLink = `underline decoration-secondary-foreground/50 underline-offset-2 transition-[text-decoration-color] duration-150 hover:decoration-secondary-foreground active:decoration-secondary-foreground ${focusRing}`

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <WovenBand className="h-6 text-primary" />
      <Container size="lg">
        <div className="grid lg:grid-cols-[7fr_5fr] lg:items-baseline lg:gap-x-16">
          <div className="pt-12 md:pt-16">
            <Typography variant="h2" as="p">
              Comptoir du Chari
            </Typography>
            <Typography variant="body" className="mt-3 text-pretty">
              Commerce général, approvisionnement et logistique. N’Djamena,
              Tchad.
            </Typography>
          </div>

          <nav
            aria-label="Navigation du pied de page"
            className="pt-6 lg:pt-16"
          >
            <ul className="grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-x-8 lg:justify-end">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Typography
                    variant="body"
                    as="a"
                    href={link.href}
                    className={`inline-block py-2.5 underline-offset-4 hover:underline active:underline ${focusRing}`}
                  >
                    {link.label}
                  </Typography>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid gap-3 border-t border-secondary-foreground/30 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:mt-14 lg:col-span-2 lg:grid-cols-subgrid lg:items-baseline">
            <Typography variant="body" className="font-medium text-pretty">
              Maquette de démonstration&nbsp;: Comptoir du Chari est une
              entreprise fictive.
            </Typography>
            <Typography
              variant="small"
              className="max-w-prose text-pretty text-secondary-foreground/85"
            >
              Photos&nbsp;:{" "}
              {credits.map((credit, index) => (
                <Fragment key={credit.name}>
                  {index > 0 ? ", " : null}
                  <a href={credit.profile} className={creditLink}>
                    {credit.name}
                  </a>
                </Fragment>
              ))}{" "}
              sur{" "}
              <a
                href="https://unsplash.com/?utm_source=proposal_demo&utm_medium=referral"
                className={creditLink}
              >
                Unsplash
              </a>
              .
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
