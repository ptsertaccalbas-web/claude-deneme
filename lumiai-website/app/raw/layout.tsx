import type { Metadata } from "next"
import { Cinzel, DM_Sans } from "next/font/google"
import "../globals.css"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" })

export const metadata: Metadata = {
  title: "LUMI AI",
  description: "We exist. You found us. That's enough.",
}

export default function RawLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${dmSans.variable}`}>
      <body className="bg-[#0a0a09] font-sans antialiased">{children}</body>
    </html>
  )
}
