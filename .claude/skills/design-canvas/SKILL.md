---
name: design-canvas
description: Replit Agent 4 tarzı sonsuz tuval (infinite canvas). WebGL ile browser içinde görsel tasarım arayüzü. Frame'ler, drag-drop, live preview.
---

# Design Canvas — Sonsuz Tasarım Tuvali

## Misyon
Browser'da çalışan, sonsuz büyüklükte, WebGL destekli görsel tasarım tuvali. Frame'ler oluşturma, sürükle-bırak düzenleme ve canlı önizleme.

## Mimari
```
HTML Canvas (arkaplan) + WebGL (performans) + DOM overlay (UI)
  ├── Sonsuz grid (zoom + pan)
  ├── Frame'ler (her biri bir ekran/sayfa)
  ├── Layer panel (katman yönetimi)
  ├── Property panel (seçili eleman özellikleri)
  └── Toolbar (çizim, metin, şekil araçları)
```

## Çekirdek Bileşenler

### Canvas (React Three Fiber ile)
```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'

function DesignCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 100], zoom: 1 }}>
      <ambientLight intensity={0.5} />
      {/* Sonsuz grid */}
      <Grid
        args={[1000, 1000]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6b7280"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#9ca3af"
        fadeDistance={500}
      />
      <OrbitControls enableRotate={false} minZoom={0.1} maxZoom={5} />
    </Canvas>
  )
}
```

### Frame Sistemi
```tsx
interface Frame {
  id: string
  name: string
  width: number   // px
  height: number  // px
  x: number       // canvas position
  y: number
  scale: number   // 1 = 100%
  device: 'desktop' | 'tablet' | 'mobile'
  elements: CanvasElement[]
}

interface CanvasElement {
  id: string
  type: 'text' | 'image' | 'shape' | 'button' | 'icon' | 'container'
  x: number
  y: number
  width: number
  height: number
  props: Record<string, any> // style özellikleri
  children: CanvasElement[]
}
```

### Drag-Drop & Seçim
```tsx
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'

function FrameView({ frame }: { frame: Frame }) {
  const { setNodeRef } = useDroppable({ id: frame.id })
  return (
    <div ref={setNodeRef} style={{
      width: frame.width, height: frame.height,
      position: 'absolute', left: frame.x, top: frame.y,
      backgroundColor: '#fff', borderRadius: 8,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    }}>
      {frame.elements.map(el => <DraggableElement key={el.id} element={el} />)}
    </div>
  )
}

function DraggableElement({ element }: { element: CanvasElement }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={{
      transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      position: 'absolute', left: element.x, top: element.y,
      cursor: 'move',
    }}>
      {/* Element içeriği */}
    </div>
  )
}
```

### Property Panel
```tsx
function PropertyPanel({ selectedElement }: { selectedElement: CanvasElement | null }) {
  if (!selectedElement) return <EmptyState />

  return (
    <div className="w-72 bg-background border-l border-border p-4 space-y-4">
      <h3 className="font-heading text-sm">Properties</h3>
      
      {/* Boyut */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted">W</label>
          <input type="number" value={selectedElement.width} className="w-full bg-surface border rounded p-1" />
        </div>
        <div>
          <label className="text-xs text-muted">H</label>
          <input type="number" value={selectedElement.height} className="w-full bg-surface border rounded p-1" />
        </div>
      </div>

      {/* Pozisyon */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted">X</label>
          <input type="number" value={selectedElement.x} className="w-full bg-surface border rounded p-1" />
        </div>
        <div>
          <label className="text-xs text-muted">Y</label>
          <input type="number" value={selectedElement.y} className="w-full bg-surface border rounded p-1" />
        </div>
      </div>

      {/* Stil */}
      {selectedElement.type === 'text' && <TextStyleEditor element={selectedElement} />}
      {selectedElement.type === 'shape' && <ShapeStyleEditor element={selectedElement} />}
      <BackgroundEditor element={selectedElement} />
      <BorderEditor element={selectedElement} />
      <ShadowEditor element={selectedElement} />
    </div>
  )
}
```

## Zoom & Pan (Infinite Canvas)

```typescript
// useCanvasControls hook
function useCanvasControls() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  
  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setZoom(z => Math.max(0.1, Math.min(5, z * delta)))
    } else {
      setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }))
    }
  }

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }) }
  const zoomToFit = (frames: Frame[]) => { /* tüm frame'leri görünür yap */ }

  return { zoom, pan, handleWheel, resetView, zoomToFit }
}
```

## Canvas'tan Kod Üretimi

```typescript
function canvasToCode(frames: Frame[]): string {
  return frames.map(frame => {
    return `
<section className="w-full min-h-[${frame.height}px] bg-white relative">
  <div className="container mx-auto px-4">
    ${frame.elements.map(el => elementToJSX(el)).join('\n    ')}
  </div>
</section>`
  }).join('\n\n')
}
```

## Kalite Standartları
- 60fps performans (WebGL ile)
- Sonsuz grid (10000x10000 birim)
- Klavye kısayolları: Ctrl+Z undo, Delete sil, Ctrl+D duplicate
- Responsive frame'ler (desktop 1440px, tablet 768px, mobile 375px)
- Frame içeriği canlı HTML preview (iframe)

## Referanslar
- Replit Agent 4 Design Canvas: infinite board + artifact previews + design mockups
- Canva: WebGL rendering engine + drag-drop editor
- Figma: infinite canvas + frame system (referans amaçlı)
