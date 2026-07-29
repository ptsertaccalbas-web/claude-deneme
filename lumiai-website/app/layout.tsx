import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/lenis-provider"
import Cursor from "@/components/cursor"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif-custom" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans-custom" })

export const metadata: Metadata = {
  title: "LUMI AI Media — AI Destekli Dijital Dönüşüm",
  description: "47+ firma analiz edildi. B2B firmalar için AI destekli dijital kimlik profili ve dönüşüm çözümleri.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`bg-background text-foreground ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
