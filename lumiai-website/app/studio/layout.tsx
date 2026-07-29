import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "../globals.css"
import StudioLenis from "@/components/studio/studio-lenis"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif-custom" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans-custom" })

export const metadata: Metadata = {
  title: "LUMI AI MEDIA STUDIO",
  description: "Sinematik AI Prodüksiyon",
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`bg-background text-foreground ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <StudioLenis>{children}</StudioLenis>
      </body>
    </html>
  )
}
