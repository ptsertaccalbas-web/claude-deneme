import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif-custom" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans-custom" })

export const metadata: Metadata = {
  title: "Çorlu İlgi Diş | Ağız ve Diş Sağlığı Polikliniği",
  description: "Çorlu'da güvenilir diş hekimi. İmplant, ortodonti, estetik diş hekimliği ve genel diş tedavileri. Online randevu ve WhatsApp desteği.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`bg-background text-foreground ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
