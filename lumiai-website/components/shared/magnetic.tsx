"use client"

import { useRef, useCallback, type ReactNode } from "react"

type SpringConfig = { stiffness?: number; damping?: number; mass?: number }

export function useMagnetic<T extends HTMLElement>({ stiffness = 0.15, damping = 0.85, mass = 1 }: SpringConfig = {}) {
  const ref = useRef<T>(null)
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const raf = useRef(0)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const { x, y, vx, vy } = state.current
    const fx = -x * stiffness
    const fy = -y * stiffness
    state.current.vx = (vx + fx) * damping
    state.current.vy = (vy + fy) * damping
    state.current.x += state.current.vx
    state.current.y += state.current.vy
    el.style.transform = `translate(${state.current.x}px, ${state.current.y}px)`
    if (Math.abs(state.current.x) > 0.01 || Math.abs(state.current.y) > 0.01) {
      raf.current = requestAnimationFrame(update)
    }
  }, [stiffness, damping])

  const onMove = useCallback((e: { clientX: number; clientY: number }) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    state.current.x += (e.clientX - cx) * 0.08
    state.current.y += (e.clientY - cy) * 0.08
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(update)
  }, [update])

  const onLeave = useCallback(() => {
    state.current.x = 0
    state.current.y = 0
    raf.current = requestAnimationFrame(update)
  }, [update])

  return { ref, onMove, onLeave }
}

export function Magnetic({ children, className = "", ...spring }: SpringConfig & { children: ReactNode; className?: string }) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLDivElement>(spring)
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
