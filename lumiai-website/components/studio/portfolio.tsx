"use client"

import { Play } from "lucide-react"
import { useStudioLang } from "./lang-context"

const trProjects = [
  { id: "01", tag: "MOTION", title: "15-Saniye Sinematik Intro", desc: "Markanızın ilk saniyede bıraktığı iz.", bg: "from-[#1a1206] via-[#0a0603] to-[#0B0B0B]", accent: "bg-accent/5" },
  { id: "02", tag: "NARRATIVE", title: "Yapay Zeka Marka Anlatısı", desc: "Duyguyu kurgulayan görsel dil.", bg: "from-[#001a1a] via-[#000d0d] to-[#0B0B0B]", accent: "bg-[#00a8a8]/5" },
  { id: "03", tag: "3D SPACE", title: "3D Mekan & İç Mimari Atmosferi", desc: "Görünmeyen setlerde inşa edilen dünyalar.", bg: "from-[#0a1020] via-[#050810] to-[#0B0B0B]", accent: "bg-[#6080b0]/5" },
]
const enProjects = [
  { id: "01", tag: "MOTION", title: "15-Second Cinematic Intro", desc: "The impression your brand makes in the first second.", bg: "from-[#1a1206] via-[#0a0603] to-[#0B0B0B]", accent: "bg-accent/5" },
  { id: "02", tag: "NARRATIVE", title: "AI Brand Narrative", desc: "A visual language that crafts emotion.", bg: "from-[#001a1a] via-[#000d0d] to-[#0B0B0B]", accent: "bg-[#00a8a8]/5" },
  { id: "03", tag: "3D SPACE", title: "3D Space & Interior Atmospheres", desc: "Worlds built on invisible sets.", bg: "from-[#0a1020] via-[#050810] to-[#0B0B0B]", accent: "bg-[#6080b0]/5" },
]

function ScreenImage({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${bg}`} />
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${accent} blur-[60px]`} />
      <div className={`absolute bottom-0 left-1/4 h-20 w-40 rounded-full ${accent} blur-[40px]`} />
      <div className="absolute -left-1/4 top-1/3 h-px w-[150%] rotate-12 bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
      <div className="absolute -left-1/4 top-[60%] h-px w-[150%] -rotate-6 bg-gradient-to-r from-transparent via-foreground/3 to-transparent" />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
    </div>
  )
}

export default function StudioPortfolio() {
  const { t, lang } = useStudioLang()
  const projects = lang === "tr" ? trProjects : enProjects

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="text-center">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{t.badge}</span>
          <p className="mb-10 text-lg text-foreground/80 md:text-xl">{t.portfolioTitle}</p>
        </div>

        <div className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={i} className="group relative flex aspect-[9/16] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border transition-all hover:border-accent/20 sm:max-w-none">
              <ScreenImage bg={p.bg} accent={p.accent} />
              <span className="absolute left-4 top-4 z-10 flex gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-accent md:text-[10px]">
                <span className="text-foreground/50">{p.id}</span> <span>{p.tag}</span> <span className="text-foreground/30">· 9:16</span>
              </span>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-foreground/5 backdrop-blur-sm transition-all group-hover:border-accent/30 group-hover:bg-accent/5 md:h-14 md:w-14">
                <Play className="ml-0.5 h-4 w-4 text-foreground/70 transition-all group-hover:text-accent md:h-5 md:w-5" />
              </div>
              <div className="absolute bottom-6 left-4 right-4 z-10 md:left-6 md:bottom-8">
                <h3 className="mb-1 font-serif text-base font-semibold text-foreground md:text-lg">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted md:text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
