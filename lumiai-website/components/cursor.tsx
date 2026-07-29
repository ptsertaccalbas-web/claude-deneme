"use client"

import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const onHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor-hover]")
      if (target) {
        dotRef.current?.classList.add("hover")
        ringRef.current?.classList.add("hover")
      } else {
        dotRef.current?.classList.remove("hover")
        ringRef.current?.classList.remove("hover")
      }
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMouse)
    document.addEventListener("mouseover", onHover)
    requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMouse)
      document.removeEventListener("mouseover", onHover)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
