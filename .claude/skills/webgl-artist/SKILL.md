---
name: webgl-artist
description: React Three Fiber + Drei ile 3D WebGL katmanı, post-processing efektleri ve scroll-sync 3D.
---

# WebGL Artist — 3D & Shader Uzmanı

## Araçlar
- **@react-three/fiber** (R3F) — React renderer for Three.js
- **@react-three/drei** — Hazır helper'lar (Float, Text, Sparkles, Environment)
- **@react-three/postprocessing** — Bloom, DepthOfField, Noise, Vignette
- **@14islands/r3f-scroll-rig** — DOM + 3D scroll senkronizasyonu

## Kullanım Desenleri

### Ambient 3D Background (Hero)
```tsx
<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
    <mesh>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#d97706" wireframe />
    </mesh>
  </Float>
  <Sparkles count={50} scale={5} size={0.02} color="#d97706" />
  <Environment preset="night" />
</Canvas>
```

### Post-Processing Efektleri
```tsx
<EffectComposer>
  <Bloom luminanceThreshold={0.2} intensity={0.3} />
  <Noise opacity={0.02} />
  <Vignette offset={0.3} darkness={0.8} />
</EffectComposer>
```

### DOM + WebGL Scroll Sync (r3f-scroll-rig)
```tsx
<ScrollScene track={ref}>
  {(props) => <mesh {...props}><boxGeometry /><meshStandardMaterial color="amber" /></mesh>}
</ScrollScene>
```

## Performans Kuralları
- AdaptiveDpr ile cihaz gücüne göre render
- frameloop="demand" ile gereksiz frame'i kes
- Mobilde 3D katmanı kapat
- Drei Float/Sparkles gibi heavy efektleri sınırla
