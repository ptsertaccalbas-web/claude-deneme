import type { Metadata } from "next"
import { Oswald, Inter } from "next/font/google"
import "./globals.css"

const oswald = Oswald({ subsets: ["latin"], variable: "--font-heading-custom" })
const inter = Inter({ subsets: ["latin"], variable: "--font-body-custom" })

export const metadata: Metadata = {
  title: "N-PAK Ambalaj | Endüstriyel Bant ve Paketleme Çözümleri",
  description: "3M distribütörü N-PAK - 2013'ten beri Çorlu'da endüstriyel bant, yapıştırıcı, corex kasa ve PP seperatör üretimi.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`bg-background text-foreground ${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  )
}
