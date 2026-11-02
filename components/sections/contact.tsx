import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"

const details = [
  {
    label: "Téléphone / WhatsApp",
    value: "+235 66 00 12 34",
    variant: "h3",
  },
  {
    label: "E-mail",
    value: "contact@comptoirduchari.td",
    variant: "body",
  },
  {
    label: "Adresse",
    value: "Zone industrielle de Farcha, N’Djamena, Tchad",
    variant: "body",
  },
  {
    label: "Horaires",
    value: "lun.–ven. 7\u00A0h\u00A030–17\u00A0h, sam. 8\u00A0h–12\u00A0h",
    variant: "body",
  },
] as const

function Contact() {
  return (
    <Section id="contact" tone="muted">
      <Container size="lg">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[6fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-16">
            <div>
              <Typography variant="eyebrow" className="text-primary">
                Contact
              </Typography>
              <Typography variant="h2" className="mt-3">
                Demandez votre devis, réponse sous 48&nbsp;h
              </Typography>
              <Typography variant="lead" className="mt-5 text-muted-foreground">
                Dites-nous le produit, la quantité et le lieu de livraison. Le
                devis vous donne le prix et le délai.
              </Typography>
            </div>

            <div
              data-reveal
              className="flex flex-col rounded-lg bg-card p-6 text-card-foreground md:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <ContactForm />
            </div>

            <dl
              data-reveal
              className="@container border-b border-foreground/20 lg:self-end"
            >
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="grid items-baseline gap-1 border-t border-foreground/20 py-3 first:border-foreground @md:grid-cols-[9.5rem_1fr] @md:gap-4"
                >
                  <Typography
                    variant="small"
                    as="dt"
                    className="text-muted-foreground"
                  >
                    {detail.label}
                  </Typography>
                  <Typography
                    variant={detail.variant}
                    as="dd"
                    className="text-pretty"
                  >
                    {detail.value}
                  </Typography>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export { Contact }
