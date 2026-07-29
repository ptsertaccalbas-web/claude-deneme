# Component Templates

## LenisProvider
```tsx
"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Lenis from "lenis"

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      anchors: { offset: 80 },
    })
    setLenis(instance)
    function raf(time: number) { instance.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => instance.destroy()
  }, [])
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
```

## CustomCursor
```tsx
"use client"
import { useEffect, useRef } from "react"
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dotRef.current && (dotRef.current.style.left = `${mx}px`, dotRef.current.style.top = `${my}px`) }
    const onHover = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor]")
      dotRef.current?.classList.toggle("hover", !!t); ringRef.current?.classList.toggle("hover", !!t)
    }
    const anim = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px` }; requestAnimationFrame(anim) }
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseover", onHover); requestAnimationFrame(anim)
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onHover) }
  }, [])
  return <><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>
}
```

## AmbientGlow (Background)
```tsx
"use client"
import { motion, useScroll, useTransform } from "framer-motion"
export default function AmbientGlow() {
  const { scrollYProgress } = useScroll()
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "60%"]), opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.3]) }} className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/3 blur-[120px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]) }} className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/2 blur-[100px]" />
    </div>
  )
}
```

## Hero with SplitText
```tsx
// GSAP SplitText karakter animasyonu + Lenis scrollTo
```

## Services Grid
```tsx
// Lucide ikonlar + stagger animation + hover effect
```

## Stats Bar
```tsx
// 4-column, font-mono numbers, amber orbs
```
