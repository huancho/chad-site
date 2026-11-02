import { Container } from "@/components/section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#produits", label: "Produits" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
]

const linkStates =
  "rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:text-primary"

function Header() {
  return (
    // Its 65px are mirrored by scroll-padding-top in globals.css, which keeps
    // anchor jumps and keyboard focus clear of it.
    <header className="sticky top-0 z-40 border-b border-border bg-background print:static">
      <Container
        size="lg"
        className="flex h-16 items-center justify-between min-[360px]:gap-1"
      >
        <Typography
          variant="h4"
          as="a"
          href="#accueil"
          className={`flex min-h-11 min-w-0 items-center leading-none ${linkStates}`}
        >
          Comptoir du Chari
        </Typography>

        <div className="flex shrink-0 items-center gap-2 lg:gap-8">
          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-4 lg:gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Typography
                    variant="small"
                    as="a"
                    href={link.href}
                    className={`flex h-11 items-center whitespace-nowrap underline-offset-4 hover:underline ${linkStates}`}
                  >
                    {link.label}
                  </Typography>
                </li>
              ))}
            </ul>
          </nav>
          {/* The toggle's own padding holds the gap on 320px phones, where the
              wordmark, toggle and button only just fit. With larger text the
              wordmark wraps instead of pushing the page sideways. */}
          <div className="flex shrink-0 items-center min-[360px]:gap-1">
            <ThemeToggle />
            <Button
              render={<a href="#contact" aria-label="Demander un devis" />}
              nativeButton={false}
              size="lg"
              className="h-11 px-2 min-[360px]:px-3.5"
            >
              <span className="md:hidden">Devis</span>
              <span className="hidden md:inline">Demander un devis</span>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { Header, navLinks }
