"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type StudioLang = "tr" | "en"

const LangContext = createContext<{
  lang: StudioLang
  setLang: (l: StudioLang) => void
  t: typeof translations.tr
} | null>(null)

export const useStudioLang = () => useContext(LangContext)!

export const translations = {
  tr: {
    badge: "VİTRİN · SEÇİLİ ÇALIŞMALAR",
    portfolioTitle: "Perde arkasında üretilen sinematik anlar.",
    manifestoBadge: "NEDEN BİZ · MANİFESTO",
    manifestoTitle: "Prodüksiyonu değil, algıyı yeniden tasarlıyoruz.",
    manifesto: [
      { label: "BÖLÜM I", title: "Sıfır Çekim Süreci", desc: "Kamera ekibine, saatler süren setlere ve operasyonel yüke ihtiyaç yok. Tüm prodüksiyon perde arkasında, sizin adınıza kurgulanır." },
      { label: "BÖLÜM II", title: "Sinematik Kalite", desc: "En gelişmiş yapay zeka görsel modelleriyle 4K sinematik doku." },
      { label: "BÖLÜM III", title: "Prestij & Dönüşüm", desc: "Sadece izlenme değil; doğrudan yüksek değerli kitleyi çeken marka görünürlüğü. Statü, güven ve talep yaratan bir imza." },
    ],
    formBadge: "BAŞVURU · MARKA İNCELEME",
    formTitle: "Başvuru & Bekleme Listesi",
    formDesc: "Üretim kalitemizi korumak adına başvuruları sırayla değerlendiriyoruz.",
    formPrivacy: "Bilgileriniz gizli tutulur, üçüncü taraflarla paylaşılmaz.",
    heroTitle1: "Dijital Çağın Yeni",
    heroTitle2: "Medya Mimarısı.",
    heroSub: "Prestijli markalar için özel olarak tasarlanmış 4K sinematik AI prodüksiyonu.",
    cta: "BEKLEME LİSTESİNE KATIL",
    formed: "Başvurunuz alındı. En kısa sürede dönüş yapacağız.",
    footer: "© 2026 Lumi — Dijital Çağın Medya Mimarısı.",
    fields: { name: "AD SOYAD", company: "İŞLETME / KLİNİK ADI", phone: "TELEFON / WHATSAPP", web: "WEBSITE" },
    placeholders: { name: "Örn. Elif Yılmaz", company: "Örn. Lumi Klinik", phone: "+90 5xx xxx xx xx", web: "websiteniz.com" },
    submit: "BAŞVURUYU GÖNDER",
  },
  en: {
    badge: "SHOWCASE · SELECTED WORKS",
    portfolioTitle: "Cinematic moments produced behind the scenes.",
    manifestoBadge: "WHY US · MANIFESTO",
    manifestoTitle: "We don't just produce — we redesign perception.",
    manifesto: [
      { label: "CHAPTER I", title: "Zero Shoot Process", desc: "No camera crew, no hours-long sets, no operational burden. All production happens behind the scenes, curated on your behalf." },
      { label: "CHAPTER II", title: "Cinematic Quality", desc: "4K cinematic texture with the most advanced AI visual models." },
      { label: "CHAPTER III", title: "Prestige & Transformation", desc: "Not just views — brand visibility that directly attracts high-value audiences. A signature that creates status, trust, and demand." },
    ],
    formBadge: "APPLY · BRAND REVIEW",
    formTitle: "Application & Waitlist",
    formDesc: "To maintain our production quality, we review applications in order.",
    formPrivacy: "Your information is kept confidential and never shared with third parties.",
    heroTitle1: "The New",
    heroTitle2: "Media Architect",
    heroSub: "Bespoke 4K cinematic AI production for prestige brands.",
    cta: "JOIN THE WAITLIST",
    formed: "Your application has been received. We'll get back to you shortly.",
    footer: "© 2026 Lumi — The Media Architect of the Digital Age.",
    fields: { name: "FULL NAME", company: "COMPANY / CLINIC NAME", phone: "PHONE / WHATSAPP", web: "WEBSITE" },
    placeholders: { name: "e.g. John Doe", company: "e.g. Lumi Clinic", phone: "+1 555 123 4567", web: "yourwebsite.com" },
    submit: "SUBMIT APPLICATION",
  },
}

export function StudioLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<StudioLang>("tr")
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}
