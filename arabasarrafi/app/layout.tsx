import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] })

export const metadata: Metadata = {
  title: "Araba Sarrafı | Designed By İbrahim Sarı",
  description: "Araç alım satım, PPF kaplama, restore ve detaylandırma. 2011'den beri Konya'da. Arabanız sarraf ellerde.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`bg-background text-foreground ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased text-pretty overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
