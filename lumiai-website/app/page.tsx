"use client"

import { useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Lang } from "@/lib/translations"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import Services from "@/components/services"
import Stats from "@/components/stats"
import Process from "@/components/process"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr")

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 82%" },
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out"
      })
    })
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <div data-reveal className="translate-y-6 opacity-0"><Hero lang={lang} /></div>
        <div data-reveal className="translate-y-6 opacity-0"><Marquee lang={lang} /></div>
        <div data-reveal className="translate-y-6 opacity-0"><Services lang={lang} /></div>
        <div data-reveal className="translate-y-6 opacity-0"><Stats lang={lang} /></div>
        <div data-reveal className="translate-y-6 opacity-0"><Process lang={lang} /></div>
        <div data-reveal className="translate-y-6 opacity-0"><Contact lang={lang} /></div>
      </main>
      <Footer lang={lang} />
    </>
  )
}
