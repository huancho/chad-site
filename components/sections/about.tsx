import { Reveal } from "@/components/reveal"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"

const stats = [
  { value: "2012", caption: "Année de création" },
  { value: "2\u2009400", unit: "m²", caption: "d’entrepôt à Farcha" },
  { value: "48", unit: "h", caption: "pour recevoir votre devis" },
  {
    value: "1\u2009800",
    unit: "km",
    caption: "environ, de Douala à N’Djamena",
  },
]

function About() {
  return (
    <Section id="a-propos" tone="default" spacing="lg">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="flex flex-col justify-between gap-6 lg:col-span-5 lg:gap-10">
            <div>
              <Typography variant="eyebrow" className="text-primary">
                À propos
              </Typography>
              <Typography variant="h2" className="mt-3">
                Depuis 2012, notre base est à Farcha
              </Typography>
            </div>
            <div className="flex flex-col gap-4 lg:pb-1.5">
              <Typography>
                Comptoir du Chari fournit le BTP, les commerces, les ONG et les
                administrations au Tchad. Vous parlez à la même personne de
                l’achat à la réception, et c’est elle qui répond quand vous
                demandez où en est votre livraison.
              </Typography>
              <Typography>
                Votre devis indique le prix, le délai et si la marchandise est
                déjà à Farcha ou doit venir de Douala.
              </Typography>
            </div>
          </div>

          <Reveal>
            <ul className="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-x-2 border-t-2 border-foreground lg:col-span-7">
              {stats.map((stat) => (
                <li
                  key={stat.caption}
                  data-reveal
                  className="col-span-full grid grid-cols-subgrid items-baseline border-b border-border py-5 last:border-b-0 last:pb-0 lg:py-6"
                >
                  <Typography
                    variant="h1"
                    as="span"
                    className="text-right whitespace-nowrap text-primary"
                  >
                    {stat.value}
                  </Typography>{" "}
                  {stat.unit ? (
                    <Typography
                      variant="h3"
                      as="span"
                      className="whitespace-nowrap text-primary"
                    >
                      {stat.unit}
                    </Typography>
                  ) : null}{" "}
                  <Typography
                    variant="lead"
                    as="span"
                    className="col-start-3 pl-4 text-muted-foreground lg:pl-10"
                  >
                    {stat.caption}
                  </Typography>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export { About }
