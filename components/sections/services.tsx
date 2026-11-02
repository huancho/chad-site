import { CorridorDiagram } from "@/components/corridor-diagram"
import { Reveal } from "@/components/reveal"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"

const steps = [
  {
    title: "Approvisionnement",
    text: "Nous achetons la marchandise selon la quantité et le délai que vous demandez.",
  },
  {
    title: "Douane",
    text: "Nous préparons les documents et suivons le dédouanement. Les papiers ne sont plus votre souci.",
  },
  {
    title: "Transport",
    text: "Vos marchandises font le trajet Douala – N’Djamena, environ 1 800 km, puis arrivent à notre entrepôt de Farcha.",
  },
  {
    title: "Livraison",
    text: "Nous livrons à votre dépôt, votre boutique ou votre chantier, à N’Djamena, Moundou, Sarh et Abéché.",
  },
]

function Services() {
  return (
    <Section id="services" tone="primary">
      <Container size="lg">
        <div className="grid gap-6 lg:grid-cols-4 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-2">
            <Typography variant="eyebrow">Services</Typography>
            <Typography variant="h2" className="mt-3">
              Quatre métiers, un seul contact
            </Typography>
          </div>
          <Typography variant="lead" className="lg:col-span-2">
            Un acheteur, un transitaire, un transporteur, un livreur. Chez nous,
            c’est la même équipe et un seul numéro à appeler.
          </Typography>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-12 lg:grid-cols-1 lg:gap-12">
          <CorridorDiagram />

          <Reveal>
            <ol className="grid gap-8 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  data-reveal
                  className="flex gap-4 lg:block"
                >
                  <Typography
                    variant="h2"
                    as="p"
                    className="w-8 shrink-0 lg:w-auto"
                  >
                    {index + 1}
                  </Typography>
                  <div className="lg:mt-3">
                    <Typography variant="h4" as="h3">
                      {step.title}
                    </Typography>
                    <Typography className="mt-2">{step.text}</Typography>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export { Services }
