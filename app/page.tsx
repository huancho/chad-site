import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Products } from "@/components/sections/products"
import { Services } from "@/components/sections/services"

export default function Page() {
  return (
    <>
      <a
        href="#accueil"
        className="sr-only rounded-lg bg-primary text-sm font-medium text-primary-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2.5 focus-visible:left-2.5 focus-visible:z-50 focus-visible:px-4 focus-visible:py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Aller au contenu
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
