"use client"

import * as React from "react"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const hasText = (value: string) => value.trim() !== ""

// Native bubbles follow the browser's language, not the page's, so these
// replace them. Chadian numbers have 8 digits.
const rules = {
  nom: { isValid: hasText, message: "Indiquez votre nom." },
  telephone: {
    isValid: (value: string) => value.replace(/\D/g, "").length >= 8,
    message: "Indiquez un numéro de téléphone ou WhatsApp.",
  },
  besoin: { isValid: hasText, message: "Décrivez votre besoin." },
}

type RuleName = keyof typeof rules

const ruleNames = Object.keys(rules) as RuleName[]

function isRuleName(name: string): name is RuleName {
  return name in rules
}

function RequiredField({
  name,
  label,
  isInvalid,
  className,
  children,
}: {
  name: RuleName
  label: string
  isInvalid: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <Field data-invalid={isInvalid || undefined} className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {children}
      {isInvalid ? (
        <FieldError id={`${name}-erreur`}>{rules[name].message}</FieldError>
      ) : null}
    </Field>
  )
}

function ContactForm() {
  const [pending, setPending] = React.useState(false)
  const [invalid, setInvalid] = React.useState<RuleName[]>([])

  function controlProps(name: RuleName) {
    const isInvalid = invalid.includes(name)
    return {
      id: name,
      name,
      required: true,
      "aria-invalid": isInvalid || undefined,
      "aria-describedby": isInvalid ? `${name}-erreur` : undefined,
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const form = event.currentTarget
    const data = new FormData(form)
    const failed = ruleNames.filter(
      (name) => !rules[name].isValid(String(data.get(name)))
    )

    setInvalid(failed)
    if (failed.length > 0) {
      form.querySelector<HTMLElement>(`[name="${failed[0]}"]`)?.focus()
      return
    }

    setPending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setPending(false)

    toast.success("Merci, nous avons bien reçu votre demande.", {
      description: "Votre devis vous parvient sous 48 h.",
    })
    form.reset()
  }

  // An error clears the moment the field is fixed, and none appears mid-typing.
  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const { name, value } = event.target as HTMLInputElement
    if (
      isRuleName(name) &&
      invalid.includes(name) &&
      rules[name].isValid(value)
    ) {
      setInvalid(invalid.filter((other) => other !== name))
    }
  }

  function handleTextareaKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-1 flex-col"
    >
      <FieldGroup className="flex-1">
        <div className="grid items-start gap-5 @md/field-group:grid-cols-2">
          <RequiredField
            name="nom"
            label="Nom"
            isInvalid={invalid.includes("nom")}
          >
            <Input
              autoComplete="name"
              autoCapitalize="words"
              className="h-11"
              {...controlProps("nom")}
            />
          </RequiredField>
          <Field>
            <FieldLabel htmlFor="societe" className="gap-1">
              Société{" "}
              <span className="font-normal text-muted-foreground">
                (optionnel)
              </span>
            </FieldLabel>
            <Input
              id="societe"
              name="societe"
              autoComplete="organization"
              autoCapitalize="words"
              className="h-11"
            />
          </Field>
        </div>
        <RequiredField
          name="telephone"
          label="Téléphone ou WhatsApp"
          isInvalid={invalid.includes("telephone")}
        >
          <Input
            type="tel"
            autoComplete="tel"
            className="h-11"
            {...controlProps("telephone")}
          />
        </RequiredField>
        <RequiredField
          name="besoin"
          label="Votre besoin"
          isInvalid={invalid.includes("besoin")}
          className="flex-1"
        >
          <Textarea
            placeholder="Par exemple, 200 sacs de ciment à livrer à Moundou"
            className="max-h-72 min-h-24 flex-1"
            onKeyDown={handleTextareaKeyDown}
            {...controlProps("besoin")}
          />
        </RequiredField>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          focusableWhenDisabled
          className="h-11 w-full px-5"
        >
          {pending ? (
            <>
              <Loader2Icon
                data-icon="inline-start"
                className="animate-spin motion-reduce:animate-none"
              />
              Envoi en cours…
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}

export { ContactForm }
