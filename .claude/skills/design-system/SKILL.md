---
name: design-system
description: Canva/v0 tarzı tasarım sistemi yönetimi — renk/font/komponent token havuzu. Marka kimliğini projeler arası taşır.
---

# Design System — Tasarım Sistemi Yöneticisi

## Misyon
Tüm projelerde tutarlı marka kimliği sağlamak için design token'ları (renk, tipografi, spacing, component) tek merkezden yönetmek.

## Design Token Yapısı

```css
/* tokens.css — Tailwind v4 @theme inline ile */
@theme inline {
  /* Renkler */
  --color-brand-primary: #E5C158;
  --color-brand-secondary: #0B0B0B;
  --color-surface: #FFFFFF;
  --color-surface-secondary: #F5F5F7;
  --color-text-primary: #0B0B0B;
  --color-text-secondary: #6B7280;
  --color-border: rgba(0, 0, 0, 0.1);
  --color-error: #EF4444;
  --color-success: #10B981;

  /* Tipografi */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --text-h1: 3.5rem;
  --text-h1--line-height: 1.1;
  --text-h2: 2.25rem;
  --text-h2--line-height: 1.2;
  --text-body: 1rem;
  --text-body--line-height: 1.6;
  --text-small: 0.875rem;

  /* Spacing */
  --spacing-section: 6rem;
  --spacing-container: 1280px;
  --spacing-gap: 1.5rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-elevated: 0 10px 40px rgba(0,0,0,0.12);
}
```

## Token JSON Formatı (Portable)

```json
{
  "name": "LUMI AI Brand",
  "version": "1.0.0",
  "colors": {
    "brand-primary": { "value": "#E5C158", "type": "color" },
    "brand-secondary": { "value": "#0B0B0B", "type": "color" },
    "surface": { "value": "#FFFFFF", "type": "color" },
    "text-primary": { "value": "#0B0B0B", "type": "color" },
    "error": { "value": "#EF4444", "type": "color" }
  },
  "typography": {
    "heading-family": { "value": "'Playfair Display', serif", "type": "fontFamily" },
    "body-family": { "value": "'Inter', sans-serif", "type": "fontFamily" },
    "h1": { "value": { "size": "3.5rem", "weight": "700", "lineHeight": "1.1" }, "type": "typography" }
  },
  "spacing": {
    "section": { "value": "6rem" },
    "container": { "value": "1280px" }
  }
}
```

## Component Kütüphanesi

```typescript
// components/ui/button.tsx — Design system primitives
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// Design token'ları kullan
const variants = {
  primary: 'bg-brand-primary text-brand-secondary hover:opacity-90',
  secondary: 'bg-surface border border-border text-text-primary hover:bg-surface-secondary',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary',
  danger: 'bg-error text-white hover:bg-red-600',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
```

## Marka Paketi Oluşturma

```powershell
# scripts/create-brand-package.ps1
param(
  [string]$BrandName,
  [string]$PrimaryColor = "#E5C158",
  [string]$SecondaryColor = "#0B0B0B",
  [string]$HeadingFont = "Playfair Display",
  [string]$BodyFont = "Inter"
)

# Token JSON'ı oluştur
$tokenJson = @{
  name = $BrandName
  version = "1.0.0"
  colors = @{
    "brand-primary" = @{ value = $PrimaryColor; type = "color" }
    "brand-secondary" = @{ value = $SecondaryColor; type = "color" }
  }
  typography = @{
    "heading-family" = @{ value = "'$HeadingFont', serif"; type = "fontFamily" }
    "body-family" = @{ value = "'$BodyFont', sans-serif"; type = "fontFamily" }
  }
} | ConvertTo-Json -Depth 5

# CSS tokens çıktısı
$cssTokens = @"
@theme inline {
  --color-brand-primary: $PrimaryColor;
  --color-brand-secondary: $SecondaryColor;
  --font-heading: '$HeadingFont', serif;
  --font-body: '$BodyFont', sans-serif;
}
"@

New-Item -Path "./brands/$BrandName" -ItemType Directory -Force
$tokenJson | Out-File "./brands/$BrandName/tokens.json" -Encoding utf8
$cssTokens | Out-File "./brands/$BrandName/tokens.css" -Encoding utf8
```

## Kalite Standartları
- Renk kontrastı: metin için en az 4.5:1 (WCAG AA)
- Font sayısı max 2 aile (1 başlık + 1 gövde)
- Renk sayısı max 5 (1 primary + 2-3 nötr + 1 accent)
- Shadow / radius / spacing tutarlı scale
- Token'lar JSON + CSS formatında export edilebilir

## Referanslar
- Canva Brand Intelligence: kalıcı marka belleği (renk, font, spacing kuralları)
- v0 Design Systems: reusable token havuzu, projeler arası taşıma
- shadcn/ui: CSS variables-based theming sistemi
