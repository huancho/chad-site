import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { WovenBand } from "@/components/woven-band"
import { photos } from "@/lib/photos"

function Hero() {
  return (
    <Section id="accueil" spacing="sm" tone="default">
      <Container size="lg">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-7">
            <div>
              <Typography variant="eyebrow" className="text-primary">
                Commerce général, approvisionnement, logistique
              </Typography>
              <Typography variant="h1" className="mt-5">
                Du port de Douala jusque chez&nbsp;vous, un&nbsp;seul&nbsp;contact
              </Typography>
            </div>

            <div className="border-t pt-6">
              <Typography variant="lead" className="text-muted-foreground">
                Comptoir du Chari achète, dédouane, transporte et livre vos
                marchandises au Tchad. Vous gardez le même contact de la
                commande à la livraison.
              </Typography>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  render={<a href="#contact" />}
                  nativeButton={false}
                  size="lg"
                  className="h-11 px-5"
                >
                  Demander un devis
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
                <Button
                  render={<a href="#produits" />}
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                  className="h-11 px-5"
                >
                  Voir les produits
                </Button>
              </div>
              <Typography
                variant="small"
                className="mt-6 text-muted-foreground"
              >
                Devis sous 48&nbsp;h. Entrepôt à Farcha, N’Djamena.
              </Typography>
            </div>
          </div>

          <figure className="lg:col-span-5">
            <div className="aspect-square overflow-hidden rounded-t-lg sm:aspect-[3/2] lg:aspect-auto lg:h-[clamp(28rem,100svh-14rem,36rem)]">
              <Image
                src={photos.hero.src}
                width={photos.hero.width}
                height={photos.hero.height}
                alt="Vue aérienne de piles de conteneurs colorés dans un terminal portuaire"
                // Rendered width of the landscape photo covering each frame: its
                // 576px height on desktop and full width on tablet. Phones would
                // need 145vw for full sharpness, but ask for less to load faster.
                sizes="(min-width: 1024px) 835px, (min-width: 640px) 100vw, 95vw"
                preload
                style={{ backgroundColor: photos.hero.color }}
                className="size-full object-cover"
              />
            </div>
            <WovenBand className="text-primary" />
          </figure>
        </div>
      </Container>
    </Section>
  )
}

export { Hero }
