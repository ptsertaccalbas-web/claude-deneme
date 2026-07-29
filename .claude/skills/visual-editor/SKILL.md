---
name: visual-editor
description: Lovable/v0 tarzı UI elemanlarına tıklayıp CSS düzeyinde görsel düzenleme. Tailwind token-aware, kredi/re-prompt gerektirmez.
---

# Visual Editor — Click-to-Edit UI

## Misyon
Kullanıcının yeniden prompt yazmadan, UI elemanlarına doğrudan tıklayarak renk, spacing, font, layout gibi özellikleri değiştirmesini sağlar. Lovable'ın Visual Edits + v0'ın Design Mode özelliklerinin birleşimi.

## Nasıl Çalışır
```
Kullanıcı → UI elemanına tıklar
  → Elemanın Tailwind sınıfları + component tree analiz edilir
  → Düzenlenebilir özellikler panelde gösterilir (renk, spacing, font, border, shadow)
  → Değişiklik yapılır → Tailwind sınıfları güncellenir → preview yenilenir
```

## Düzenlenebilir Özellikler

### Renkler
- `text-{color}` → text color
- `bg-{color}` → background
- `border-{color}` → border
- `from-{color}` / `to-{color}` → gradients
- Renk seçici: hex, tailwind renk paleti, design token (--color-*)

### Spacing
- `p-{size}` → padding
- `m-{size}` → margin
- `gap-{size}` → gap
- `space-x/y-{size}` → flex/grid spacing

### Tipografi
- `text-{size}` → font size (Tailwind scale)
- `font-{weight}` → font weight
- `leading-{size}` → line height
- `tracking-{size}` → letter spacing
- `text-{align}` → alignment

### Layout
- `flex-{dir}` / `grid-cols-{n}` → display mode
- `justify-{align}` / `items-{align}` → alignment
- `w-{size}` / `h-{size}` → width/height
- `max-w-{size}` → max width

### Dekoratif
- `rounded-{size}` → border radius
- `shadow-{size}` → box shadow
- `border-{width}` → border width
- `opacity-{val}` → opacity

## Implementation (Next.js + Tailwind v4)

```tsx
// Editor overlay bileşeni
interface VisualEditorProps {
  children: React.ReactNode
  enabled: boolean
  onEdit: (path: string, changes: Record<string, string>) => void
}

// Her bir düzenlenebilir eleman için wrapper
function EditableElement({ 
  className, 
  path, 
  onEdit, 
  children 
}: EditableElementProps) {
  const [editing, setEditing] = useState(false)
  const [props, setProps] = useState({})

  const handleClick = (e: React.MouseEvent) => {
    if (!editing) return
    e.stopPropagation()
    // Mevcut Tailwind sınıflarını parse et
    const parsed = parseTailwindClasses(className)
    setProps(parsed)
  }

  return (
    <div onClick={handleClick} className={editing ? 'outline-2 outline-accent outline-dashed' : ''}>
      {children}
    </div>
  )
}
```

## Tailwind Sınıf Parse Etme

```typescript
// Tailwind sınıflarını kategorilere ayır
function parseTailwindClasses(classes: string): Record<string, string> {
  const patterns = {
    textColor: /^text-(.+)$/,
    bgColor: /^bg-(.+)$/,
    padding: /^p([trblxy])?-(.+)$/,
    margin: /^m([trblxy])?-(.+)$/,
    fontSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    fontWeight: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    borderRadius: /^rounded(-[a-z]+)?$/,
    shadow: /^shadow-(sm|md|lg|xl|2xl|inner|none)$/,
  }
  // Her sınıfı kategorisine göre parse et
  return classes.split(' ').reduce((acc, cls) => {
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = cls.match(pattern)
      if (match) acc[key] = cls
    }
    return acc
  }, {} as Record<string, string>)
}
```

## Panel Bileşenleri

### Renk Editörü
```tsx
function ColorEditor({ current, onChange }: ColorEditorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted">Renk</label>
      <div className="flex gap-2">
        {/* Design token renkleri */}
        {Object.entries(designTokens).map(([name, value]) => (
          <button
            key={name}
            className={`w-8 h-8 rounded-full border ${current === name ? 'ring-2 ring-accent' : ''}`}
            style={{ backgroundColor: value }}
            onClick={() => onChange(name)}
          />
        ))}
        {/* Custom hex */}
        <input type="color" value={current} onChange={e => onChange(e.target.value)} />
      </div>
    </div>
  )
}
```

### Spacing Editörü
```tsx
function SpacingEditor({ current, onChange }: SpacingEditorProps) {
  // Tailwind spacing scale: 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
  const spacingScale = [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64]

  return (
    <div className="space-y-2">
      <label className="text-sm text-muted">Padding: {current}</label>
      <input
        type="range"
        min={0}
        max={spacingScale.length - 1}
        value={spacingScale.indexOf(parseInt(current))}
        onChange={e => onChange(`p-${spacingScale[e.target.value]}`)}
      />
    </div>
  )
}
```

## Kullanıcı Akışı
1. Editör modu açılır (kalem ikonu veya `E` tuşu)
2. Her UI elemanı outline + "tıkla" göstergesi alır
3. Tıklanan elemanın özellikleri sağ panelde açılır
4. Değişiklik canlı önizlemede görünür
5. Kaydet / Geri al seçenekleri

## Referanslar
- Lovable Visual Edits: click-to-modify UI without re-prompting
- v0 Design Mode: Tailwind token-aware visual editor, kredi tüketmez
- Canva Editor: drag-drop + property panel pattern'i
