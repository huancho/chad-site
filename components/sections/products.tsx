import Image from "next/image"

import { Reveal } from "@/components/reveal"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { photos } from "@/lib/photos"

const products = [
  {
    name: "Ciment",
    family: "Construction",
    photo: photos.ciment,
    alt: "Sacs blancs empilés sur des palettes dans un entrepôt",
  },
  {
    name: "Fer à béton",
    family: "Construction",
    photo: photos.fer,
    alt: "Barres de fer à béton crénelées en botte",
  },
  {
    name: "Tôles",
    family: "Construction",
    photo: photos.toles,
    alt: "Toiture en tôle nervurée de couleur orange",
  },
  {
    name: "Groupes électrogènes",
    family: "Énergie",
    photo: photos.groupes,
    alt: "Groupe électrogène blanc capoté, posé dans un local technique",
  },
  {
    name: "Panneaux solaires",
    family: "Énergie",
    photo: photos.solaire,
    alt: "Panneaux solaires fixés sur une toiture en tôle",
  },
  {
    name: "Riz",
    family: "Alimentaire",
    photo: photos.riz,
    alt: "Grains de riz blanc vus de près",
  },
  {
    name: "Sucre",
    family: "Alimentaire",
    photo: photos.sucre,
    alt: "Tas de sucre cristallisé et cuillère",
  },
  {
    name: "Huile",
    family: "Alimentaire",
    photo: photos.huile,
    alt: "Filet d’huile dorée coulant d’un bec métallique",
  },
]

function Products() {
  return (
    <Section id="produits" tone="muted">
      <Container size="lg">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Typography variant="eyebrow" className="text-primary">
              Exemple de catalogue
            </Typography>
            <Typography variant="h2" className="mt-3">
              Quelques produits que nous livrons
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-5">
            <Typography variant="lead" className="text-muted-foreground">
              Les prix sont donnés sur devis, selon la quantité et le lieu de
              livraison.
            </Typography>
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              className="h-11 px-5"
            >
              Demander un prix
            </Button>
          </div>
        </div>

        <Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <li key={product.name} data-reveal>
                <Image
                  src={product.photo.src}
                  width={product.photo.width}
                  height={product.photo.height}
                  alt={product.alt}
                  sizes="(min-width: 1280px) 286px, (min-width: 768px) 23vw, 50vw"
                  style={{ backgroundColor: product.photo.color }}
                  className="aspect-[4/3] w-full rounded-lg object-cover outline -outline-offset-1 outline-foreground/10"
                />
                <div className="mt-3 flex flex-col xl:flex-row xl:items-baseline xl:justify-between xl:gap-3">
                  <Typography variant="h4" as="h3">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-muted-foreground xl:shrink-0"
                  >
                    {product.family}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}

export { Products }
