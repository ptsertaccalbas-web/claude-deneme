---
name: design-to-code
description: Figma/screenshot/örnek site → clean Next.js + Tailwind kodu. v0'ın Figma import + Canva Code 2.0 HTML import yeteneklerini kopyalar.
---

# Design to Code — Görsel Tasarımdan Koda

## Misyon
Bir web sitesi görseli (screenshot, Figma tasarımı, rakip sitesi) analiz edip birebir aynı görünen, clean Next.js + Tailwind v4 kodu üretmek.

## Desteklenen Girdiler
| Kaynak | Yöntem | Doğruluk |
|--------|--------|----------|
| Screenshot (PNG/JPG) | agent-browser + görsel analiz + HTML çıkarımı | Yüksek |
| Figma URL | Figma API + token çıkarımı | Çok Yüksek |
| Web sitesi URL | agent-browser ile DOM + CSS yakalama | Yüksek |
| Referans site | webfetch + stil analizi | Orta-Yüksek |

## Süreç

### 1. Girdi Analizi
```
Screenshot/URL → agent-browser (DOM + computed styles + layout)
  → Renk paleti çıkarımı (dominant renkler)
  → Layout grid analizi (section, container, flex/grid yapısı)
  → Tipografi haritası (font aileleri, boyutları, weight'ler)
  → Component tespiti (header, hero, cards, footer, nav)
```

### 2. Design Token Çıkarımı
```typescript
extractDesignTokens(DOM: Document): DesignTokens {
  // Computed style'ları tara
  const styles = extractComputedStyles(DOM)
  
  return {
    colors: {
      background: dominantColor(styles.backgrounds),
      foreground: dominantColor(styles.textColors),
      primary: dominantColor(styles.accentColors),
      muted: dominantColor(styles.secondaryText),
      border: dominantColor(styles.borders),
    },
    typography: {
      headingFont: mostUsedFont(styles.headings),
      bodyFont: mostUsedFont(styles.body),
      scale: extractFontScale(styles),
    },
    spacing: {
      baseUnit: extractBaseUnit(styles),
      containerWidth: extractContainerWidth(DOM),
      gapPattern: extractGapPattern(styles),
    },
    borderRadius: dominantBorderRadius(styles),
    shadows: extractShadows(styles),
  }
}
```

### 3. Component Tree Oluşturma
```typescript
interface DetectedComponent {
  type: 'header' | 'hero' | 'section' | 'card' | 'grid' | 'footer' | 'nav' | 'form'
  selector: string
  children: DetectedComponent[]
  styles: Record<string, string>
  layout: 'flex' | 'grid' | 'stack' | 'absolute'
  content: { text?: string; images?: string[]; links?: string[] }
}
```

### 4. Kod Üretimi
```tsx
// Örnek: Hero component çıktısı
function generateHero(component: DetectedComponent): string {
  const { colors, typography, spacing } = component.styles

  return `
<section className="relative w-full ${spacing.py} bg-[${colors.background}]">
  <div className="container mx-auto ${spacing.px}">
    <div className="flex ${component.layout === 'centered' ? 'flex-col items-center text-center' : 'flex-row items-center'} gap-${spacing.gap}">
      <div className="flex-1 space-y-${spacing.contentGap}">
        <h1 className="text-${typography.headingSize} font-${typography.headingWeight} text-[${colors.foreground}]">
          ${component.content.text}
        </h1>
      </div>
      ${component.content.images ? `<div className="flex-1"><img src="${component.content.images[0]}" alt="" className="w-full h-auto" /></div>` : ''}
    </div>
  </div>
</section>`
}
```

### 5. Varlık Yönetimi
- Görseller → `/public/images/` klasörüne indir
- İkonlar → Lucide-react eşdeğerleriyle değiştir
- Fontlar → Google Fonts API'den import et
- SVG'ler → inline component olarak kaydet

## agent-browser Entegrasyonu

```powershell
# Hedef siteyi analiz et
$url = "https://hedef-site.com"

# Bash ile agent-browser çağır
$result = agent-browser navigate --url $url --wait 5000 --screenshot "screenshot.png"
$dom = agent-browser evaluate --script "JSON.stringify({
  styles: getComputedStyles(),
  layout: getLayout(),
  fonts: getFonts(),
  colors: getColors()
})"

# Design token'ları çıkar
$tokens = Parse-TokensFromDOM $dom

# Next.js + Tailwind kodu üret
Generate-NextJSCode -Tokens $tokens -Screenshot "screenshot.png" -Output "./generated-site"
```

## Kalite Kontrol
- Pixel-perfect karşılaştırma: screenshot vs generated site (pixelmatch)
- Renk farkı < 5% CIEDE2000
- Layout uyumu: section yükseklikleri +/- 10px
- Tipografi: font ailesi + boyutu birebir eşleşmeli

## Referanslar
- v0 Figma import: Premium+ planda Figma tasarımından kod
- Canva Code 2.0: HTML import + visual editing
- Lovable: screenshot-to-code ile başlangıç
- basement.studio: design-driven development
