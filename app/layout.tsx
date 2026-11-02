import type { Metadata, Viewport } from "next"
import { Schibsted_Grotesk, Young_Serif } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
})

export const metadata: Metadata = {
  title: "Comptoir du Chari | Commerce général et logistique à N’Djamena",
  description:
    "Approvisionnement, douane, transport et livraison, du port de Douala à N’Djamena, Moundou, Sarh et Abéché, avec un seul interlocuteur. Devis sous 48\u00A0h.",
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  viewportFit: "cover",
  // The sRGB value of --background in globals.css.
  themeColor: "#faf5ec",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "font-sans antialiased [font-synthesis:none]",
        youngSerif.variable,
        schibstedGrotesk.variable
      )}
    >
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
