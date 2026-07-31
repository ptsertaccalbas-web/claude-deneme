# PROJECT-DNA — LUMI AI Studio
> Full system DNA. Flash this to any new PC, hand to any AI, get a fully working replica.
> Total: ~220KB embedded source code across ~1500 lines of config + bootstrap + code.

---

## 1. SYSTEM REQUIREMENTS

| Component | Required | Notes |
|-----------|----------|-------|
| OS | Windows 10/11 | PowerShell 5.1+ |
| Node.js | ^20 (LTS) | For Next.js, video pipeline |
| Python | ^3.11 | For MCP server, whisper, silero |
| FFmpeg | ^7.0 | For video encoding (libx264) |
| Chrome/Chromium | ^120 | Puppeteer headless rendering |
| Git | ^2.40 | Version control |
| Disk | 5GB+ free | node_modules + Chrome + FFmpeg |
| RAM | 16GB+ | Recommended for browser rendering |
| GPU | None required | CPU-only (SwiftShader/software) |

---

## 2. FILE TREE — Complete Project Map

```
C:\Users\asus\Desktop\claude-deneme\
├── .claude/
│   └── skills/                          # 34 AI skills (see Section 5)
├── .env.local                           # 🔴 SECRETS — NOT in DNA
├── .gitignore
├── .mcp.json                            # MCP server config
├── claude_desktop_config.json           # Claude Desktop config
├── opencode.json                        # OpenCode config w/ instructions
├── ANCHORED_SUMMARY.md                  # Current session state
├── HISTORY.md                           # All session history
├── TASKS.md                             # Task queue
├── NOTLAR.md                            # User notes (Telegram)
├── PROJECT-DNA.md                       # THIS FILE
├── .env.secrets                         # 🔴 SECRETS TEMPLATE
│
├── WEBSITE-TALIMATLARI.md              # Website build checklist (7 steps)
├── WEBSITE-TASARIM-REHBERI.md          # Full design guide (6 chapters)
├── SITE-OTOMASYON-KURALLARI.md         # Auto build rules
├── SABLON-ENDUSTRİYEL.md               # Industrial site template (16 blocks)
├── STUDIO-DESIGN-SYSTEM.md             # LUMI AI design tokens
├── REFERANS-SITELER.md                 # Reference site library
│
├── packages/
│   └── video/                           # VIDEO PIPELINE (core deliverable)
│       ├── package.json                 # @studio/video
│       ├── tsconfig.json
│       ├── src/
│       │   ├── index.ts                 # Exports: renderVideo, Composition, RenderOptions
│       │   └── pipeline.ts             # Puppeteer+GSAP+FFmpeg render engine (101 lines)
│       ├── scripts/
│       │   └── render.ts               # Parametric showcase render CLI (255 lines)
│       ├── memory/
│       │   ├── memory.ts               # DB: cache, budget, recommend, rating (217 lines)
│       │   └── db.json                 # Persistent store (389 lines, 6 palettes, 4 fonts, 6 renders)
│       ├── video_mcp_server.py         # FastMCP: TTS, Whisper, FFprobe, silence removal (99 lines)
│       └── manifest.yaml               # 4 pipeline definitions (57 lines)
│
├── packages/shared/                     # SHARED COMPONENTS (cross-project)
│   ├── magnetic.tsx                     # Spring-physics mouse magnet (56 lines)
│   ├── scroll-camera.ts                 # Three.js Z-axis camera rig (31 lines)
│   └── webgpu.ts                        # WebGPU backend detection (19 lines)
│
├── lumiai-website/                      # LUMI AI STUDIO WEBSITE
│   ├── package.json                     # Next.js 16.2.11, React 19, Tailwind v4
│   ├── AGENTS.md                        # Next.js 16 breaking changes warning
│   ├── app/                             # App Router pages
│   │   ├── layout.tsx                   # Root layout (Inter + Playfair fonts)
│   │   ├── page.tsx                     # Main studio page
│   │   ├── globals.css                  # Tailwind v4 + @theme inline tokens
│   │   ├── api/waitlist/route.ts        # Waitlist (Google Sheets → Resend)
│   │   ├── demo-shared/page.tsx         # Shared components demo
│   │   └── saas-landing/page.tsx        # SaaS landing page (EN/TR bilingual)
│   ├── components/
│   │   ├── header.tsx                   # Nav + logo + lang toggle
│   │   ├── hero.tsx                     # Canvas particles + GSAP
│   │   ├── marquee.tsx                  # GSAP infinite loop
│   │   ├── services.tsx                 # Feature cards
│   │   ├── stats.tsx                    # Statistics section
│   │   ├── process.tsx                  # Workflow steps
│   │   ├── contact.tsx                  # Contact form
│   │   ├── footer.tsx                   # Footer
│   │   ├── shared/                      # Synced from packages/shared/
│   │   │   ├── magnetic.tsx
│   │   │   ├── scroll-camera.ts
│   │   │   └── webgpu.ts
│   │   └── shaders.ts                   # Film grain + liquid transition GLSL
│   └── lib/
│       ├── telegram.ts                  # Telegram bot integration
│       └── frontman/                    # @frontman-ai/nextjs config (proxy.ts, instrumentation.ts)
│
├── n-pak-ambalaj/                       # DEPLOYED SITE: n-pak-ambalaj.vercel.app
│   └── ...                              # Full Next.js site (3D scene, SplitText, values, etc.)
│
├── corlu-ilgi-dis/                      # PROJECT: Çorlu İlgi Diş (pending)
│   └── ...
│
├── brands/
│   └── n-pak/
│       └── tokens.json                  # N-Pak brand tokens
│
├── docs/
├── firma-sahipler/
├── llm-council/
├── OSINT-RAPOR/
├── opencode-deepsek/
├── NotebookLLM-2026 B2B FIRSATLAR/
├── Yetenek & Araç Kategorileri Rehberi/
│
├── *.ps1                                # Scripts (ITO-SORGULA, TSO-SORGULA, TELEGRAM-RAPOR, sync-shared, scout)
├── video_builder.py
└── DECISION_LOG.txt
```

---

## 3. DEPENDENCIES (Version-Locked)

### 3.1 Node.js (for website + video pipeline)

```json
// lumiai-website/package.json
{
  "dependencies": {
    "next": "16.2.11",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "gsap": "^3.15.0",
    "@gsap/react": "^2.1.2",
    "lenis": "^1.3.25",
    "lucide-react": "^1.27.0",
    "three": "^0.185.1",
    "@types/three": "^0.185.1",
    "framer-motion": "^12.42.2"
  },
  "devDependencies": {
    "@frontman-ai/nextjs": "^1.0.3",
    "@opentelemetry/sdk-node": "^0.221.0",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.2.11",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

```json
// packages/video/package.json
{
  "dependencies": {
    "@hyperframes/core": "^0.7.77",
    "@hyperframes/engine": "^0.7.77",
    "gsap": "^3.15.0",
    "puppeteer": "^25.4.0"
  }
}
```

### 3.2 Python (for video MCP server)

```
# packages/video/requirements.txt
fastmcp>=3.4.5
faster-whisper>=1.2.1
silero-vad>=6.2.1
torch>=2.0.0
torchaudio>=2.0.0
```

### 3.3 System Tools

| Tool | Install | Version | Used By |
|------|---------|---------|---------|
| FFmpeg | `winget install ffmpeg` | ^7.0 | pipeline.ts, video_mcp_server.py |
| Chrome | Default install | ^120 | Puppeteer rendering |
| Piper TTS | Python package | latest | video_mcp_server.py (optional) |

### 3.4 Global NPM Packages

```bash
npm install -g agent-browser  # Web scraping agent
```

---

## 4. ENVIRONMENT — .env TEMPLATE

Create `.env.local` in project root with:

```bash
# === LUMI AI STUDIO ===

# 21st.dev API (for UI component generation)
# Get at: https://21st.dev/settings
21ST_API_KEY=21st_sk_...

# Resend (email fallback for waitlist)
# Get at: https://resend.com/api-keys
RESEND_API_KEY=re_...

# Waitlist notification email (where signups go)
WAITLIST_EMAIL=lumi@lumiaimedia.com

# Google Sheets webhook (optional, for waitlist)
# Deploy from GOOGLE-SHEETS-APPS-SCRIPT.js
GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/...

# Telegram bot (for mobile notifications)
# Create at: https://t.me/BotFather
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# NVIDIA API (for frontman AI provider, optional)
NVIDIA_API_KEY=nvapi-...

# === FUTURE AI VIDEO ===
# HAILUO_API_KEY=...    # MiniMax/Hailuo video generation
# KLING_API_KEY=...     # Kling video generation
```

---

## 5. 34 SKILLS (`.claude/skills/`)

| Category | Skills |
|----------|--------|
| **Web Design** (9) | web-design-master, frontend-master, design-craftsman, design-to-code, ui-styling, ui-ux-pro-max, visual-editor, design-canvas, design-system |
| **Typography/Icon** (2) | type-artist, icon-designer |
| **Animation** (2) | animation-master, webgl-artist |
| **AI Agent** (7) | agent-orchestrator, git-automation, runtime-agent, supabase-agent, mcp-connector, brainstorming, skill-creator |
| **Web Scraping** (5) | agent-browser, agent-browser-debug, browser-use, http-alt-channel, fallback-strategy |
| **Business** (3) | slides, banner-design, sales-analyst |
| **Video** (2) | video-director, brand |
| **OSINT** (2) | competitor-watcher, design |
| **Utility** (2) | systematic-debugging, opsec |

---

## 6. OPENCODE CONFIG

```json
// opencode.json
{
  "instructions": [
    "ANCHORED_SUMMARY.md",
    "WEBSITE-TALIMATLARI.md",
    "SITE-OTOMASYON-KURALLARI.md",
    "WEBSITE-TASARIM-REHBERI.md"
  ],
  "plugin": ["@dietrichgebert/ponytail"],
  "mcp": {
    "21st": {
      "type": "remote",
      "url": "https://21st.dev/api/mcp",
      "enabled": true,
      "headers": {
        "x-api-key": "21st_sk_2c35cd55d6acd9288e1201ac3f8d51dc2f45188c96913b51a281254dcc9d121d"
      }
    }
  }
}
```
**NOTE:** The 21st API key above is embedded in opencode.json — it's already in the repo, treat as non-secret.

---

## 7. VIDEO PIPELINE — Full Source Code

(All source code is embedded below. AI: read these sections to recreate every file with `bootstrap.ps1`.)

### 7.1 `packages/video/src/pipeline.ts` (101 lines)

Core render engine. Takes an HTML composition + duration + resolution, opens Puppeteer headless, runs GSAP timeline frame-by-frame via `window.__hf.seek(time)`, captures JPEG frames, encodes to H.264 via FFmpeg CRF 16.

Key functions:
- `renderVideo(opts)` → returns output path string
- `buildPage(composition)` → wraps HTML in `<!DOCTYPE html>` with GSAP injected
- Uses `mkdtempSync` for work dir, `--no-sandbox --disable-gpu` for headless Chrome

```typescript
// === SOURCE: packages/video/src/pipeline.ts ===
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GSAP_INLINE = readFileSync(
  resolve(__dirname, "../node_modules/gsap/dist/gsap.js"),
  "utf-8",
);

export interface Composition {
  html: string;
  duration: number;
  width: number;
  height: number;
  fps?: number;
}

export interface RenderOptions {
  composition: Composition;
  outputPath: string;
  quality?: number;
}

export async function renderVideo(opts: RenderOptions): Promise<string> {
  const fps = opts.composition.fps ?? 30;
  const totalFrames = Math.ceil(opts.composition.duration * fps);
  const quality = opts.quality ?? 85;

  const { default: puppeteer } = await import("puppeteer");

  const workDir = mkdtempSync(join(tmpdir(), "vid-render-"));
  const framesDir = join(workDir, "frames");
  mkdirSync(framesDir, { recursive: true });

  const html = buildPage(opts.composition);
  const htmlPath = join(workDir, "index.html");
  writeFileSync(htmlPath, html);
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--disable-web-security"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: opts.composition.width, height: opts.composition.height });
    await page.goto(fileUrl, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => typeof gsap !== "undefined" && typeof window.__hf !== "undefined",
      { timeout: 10000 });

    for (let i = 0; i < totalFrames; i++) {
      const time = i / fps;
      await page.evaluate((t) => { window.__hf.seek(t); }, time);
      await page.evaluate(() => new Promise(requestAnimationFrame));
      await page.screenshot({
        path: join(framesDir, `frame_${String(i).padStart(6, "0")}.jpg`),
        type: "jpeg",
        quality,
        clip: { x: 0, y: 0, width: opts.composition.width, height: opts.composition.height },
      });
      if (i % 60 === 0) console.log(`Frame ${i}/${totalFrames}`);
    }

    execSync(
      `ffmpeg -y -framerate ${fps} -i "${join(framesDir, "frame_%06d.jpg")}" -c:v libx264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p -movflags +faststart "${opts.outputPath}"`,
      { stdio: "pipe", timeout: 180000 },
    );

    return opts.outputPath;
  } finally {
    await browser.close();
  }
}

function buildPage(composition: Composition): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${composition.width}px;
    height: ${composition.height}px;
    overflow: hidden;
    background: #0A0A0A;
    font-family: Inter, Arial, sans-serif;
  }
</style>
<script>${GSAP_INLINE}</script>
</head>
<body>
${composition.html}
</body>
</html>`;
}
```

### 7.2 `packages/video/src/index.ts` (2 lines)

```typescript
export { renderVideo } from "./pipeline";
export type { Composition, AudioTrack, RenderOptions } from "./pipeline";
```

### 7.3 `packages/video/tsconfig.json` (12 lines)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src"]
}
```

### 7.4 `packages/video/package.json` (16 lines)

```json
{
  "name": "@studio/video",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./pipeline": "./src/pipeline.ts"
  },
  "dependencies": {
    "@hyperframes/core": "^0.7.77",
    "@hyperframes/engine": "^0.7.77",
    "gsap": "^3.15.0",
    "puppeteer": "^25.4.0"
  }
}
```

### 7.5 `packages/video/video_mcp_server.py` (99 lines)

FastMCP server with 6 tools:
- `text_to_speech(text, output_path, voice)` — Piper TTS
- `transcribe_audio(audio_path, language)` — faster-whisper
- `generate_srt(transcription, output_path)` — SRT subtitle generator
- `ffmpeg_merge(video_path, audio_path, output_path, volume)` — audio/video merge
- `ffprobe_verify(video_path)` — metadata
- `remove_silence(audio_path, output_path)` — Silero VAD

```python
from mcp.server.fastmcp import FastMCP
import subprocess
import json
import os
from pathlib import Path

mcp = FastMCP("video-pipeline", instructions="Video production tools: TTS, subtitles, FFmpeg processing, rendering")

@mcp.tool()
def text_to_speech(text: str, output_path: str, voice: str = "tr_TR-omer-medium") -> str:
    result = subprocess.run(
        ["piper", "--model", voice, "--output_file", output_path],
        input=text.encode("utf-8"), capture_output=True, timeout=120
    )
    if result.returncode != 0:
        raise RuntimeError(f"TTS failed: {result.stderr.decode()}")
    return output_path

@mcp.tool()
def transcribe_audio(audio_path: str, language: str = "tr") -> dict:
    from faster_whisper import WhisperModel
    model = WhisperModel("base", device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, language=language, word_timestamps=True)
    result = {"segments": [], "language": info.language}
    for seg in segments:
        words = [{"word": w.word, "start": w.start, "end": w.end} for w in seg.words] if seg.words else []
        result["segments"].append({"start": seg.start, "end": seg.end, "text": seg.text, "words": words})
    return result

@mcp.tool()
def generate_srt(transcription: dict, output_path: str) -> str:
    lines = []
    for i, seg in enumerate(transcription["segments"], 1):
        start = _fmt_srt(seg["start"])
        end = _fmt_srt(seg["end"])
        lines.append(f"{i}\n{start} --> {end}\n{seg['text']}\n")
    Path(output_path).write_text("\n".join(lines), encoding="utf-8")
    return output_path

@mcp.tool()
def ffmpeg_merge(video_path: str, audio_path: str, output_path: str, volume: float = 0.15) -> str:
    subprocess.run([
        "ffmpeg", "-i", video_path, "-i", audio_path,
        "-filter_complex", f"[1:a]volume={volume}[bg];[0:a][bg]amix=inputs=2:duration=first",
        "-c:v", "copy", "-y", output_path
    ], check=True, capture_output=True, timeout=300)
    return output_path

@mcp.tool()
def ffprobe_verify(video_path: str) -> dict:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size,bit_rate",
         "-show_streams", "-of", "json", video_path],
        capture_output=True, timeout=30, check=True
    )
    return json.loads(result.stdout)

@mcp.tool()
def remove_silence(audio_path: str, output_path: str) -> str:
    import torch
    import torchaudio
    from silero_vad import load_silero_vad, get_speech_timestamps
    model = load_silero_vad()
    wav, sr = torchaudio.load(audio_path)
    if sr != 16000:
        resampler = torchaudio.transforms.Resample(sr, 16000)
        wav = resampler(wav)
        sr = 16000
    speech = get_speech_timestamps(wav[0], model, sampling_rate=sr, return_seconds=True)
    if not speech:
        raise RuntimeError("No speech detected in audio")
    segments = []
    for seg in speech:
        start_sample = int(seg["start"] * sr)
        end_sample = int(seg["end"] * sr)
        segments.append(wav[:, start_sample:end_sample])
    result = torch.cat(segments, dim=1) if len(segments) > 1 else segments[0]
    torchaudio.save(output_path, result, sr)
    return output_path

def _fmt_srt(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

if __name__ == "__main__":
    mcp.run()
```

### 7.6 `packages/video/manifest.yaml` (57 lines)

4 pipeline definitions: animated_explainer (60s), screen_demo (120s), social_clip (15s), documentary_montage (180s).

```yaml
pipelines:
  animated_explainer:
    description: "60sn B2B firma tanıtım animasyonu — Hero + Values + CTA"
    stages:
      - research       # Web'den firma bilgisi topla
      - script         # Senaryo yaz (markdown)
      - tts            # Seslendirme (Piper)
      - transcribe     # Whisper ile altyazı
      - render         # HyperFrames ile kompozisyon render
      - mux            # Ses + video + altyazı birleştir
      - verify         # ffprobe ile doğrulama
    defaults:
      duration: 60; fps: 30; resolution: [1920, 1080]

  screen_demo:
    description: "Ekran kaydı + anlatım"
    stages: [script, tts, transcribe, render, mux]
    defaults:
      duration: 120; fps: 30; resolution: [1920, 1080]

  social_clip:
    description: "15-30sn Instagram/TikTok Reel — dikey"
    stages: [script, render, mux]
    defaults:
      duration: 15; fps: 30; resolution: [1080, 1920]

  documentary_montage:
    description: "2-5dk firma hikayesi"
    stages: [research, script, tts, transcribe, render, mux, verify]
    defaults:
      duration: 180; fps: 30; resolution: [1920, 1080]
```

### 7.7 `packages/video/memory/memory.ts` (217 lines)

Database system for:
- **Recommendation**: `recommend(mood)` → picks best palette + font + pattern by score
- **Render tracking**: `saveRender()`, `rateRender()` → updates scores automatically
- **Asset cache**: `cacheKey()` SHA-256, `cacheGet()/cacheSet()`
- **Budget cap**: `budgetCheck()/budgetAdd()`, $100/month default, auto-reset
- **Storyboard gate**: `storyboardGate()` — shows cost + asks y/n
- **Stats**: `getStats()` — average rating, top palette, budget usage, cache size

```typescript
// === SOURCE: packages/video/memory/memory.ts ===
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { createInterface } from "node:readline";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "db.json");

export interface Palette {
  id: string; name: string; primary: string; bg: string; surface: string;
  accent: string; muted: string; moods: string[]; score: number; use_count: number;
}

export interface FontPair {
  id: string; display: string; body: string; display_weight: string;
  body_weight: string; moods: string[]; score: number; use_count: number;
}

export interface AnimationPattern {
  id: string; type: string; params: Record<string, unknown>;
  moods: string[]; score: number; use_count: number;
}

export interface RenderRecord {
  id: string; timestamp: string; client?: string; industry?: string;
  purpose?: string; palette_id: string; font_id: string; pattern_id: string;
  duration: number; fps: number; rating?: number; feedback?: string;
  bitrate: number; file_size: number; render_time_s: number;
}

export interface BudgetState {
  monthly_limit: number; monthly_spend: number; reset_date: string;
}

export interface MemoryDB {
  style_dna: { name: string; rules: { id: string; rule: string; weight: number }[] };
  palettes: Palette[]; fonts: FontPair[]; patterns: AnimationPattern[];
  renders: RenderRecord[]; feedback_loops: number;
  cache: Record<string, string>; budget: BudgetState;
}

function load(): MemoryDB {
  if (!existsSync(DB_PATH)) {
    return {
      style_dna: { name: "LUMI AI Video", rules: [] },
      palettes: [], fonts: [], patterns: [], renders: [],
      feedback_loops: 0, cache: {},
      budget: { monthly_limit: 100, monthly_spend: 0, reset_date: new Date().toISOString().slice(0, 10) },
    };
  }
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function save(db: MemoryDB): void {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function recommend(mood: string): { palette: Palette; font: FontPair; pattern: AnimationPattern } {
  const db = load();
  const pick = <T extends { moods: string[]; score: number; use_count: number }>(items: T[]): T => {
    const matched = items.filter(i => i.moods.includes("*") || i.moods.includes(mood));
    if (matched.length === 0) return items[0];
    matched.sort((a, b) => b.score - a.score || b.use_count - a.use_count);
    return matched[0];
  };
  return { palette: pick(db.palettes), font: pick(db.fonts), pattern: pick(db.patterns) };
}

export function saveRender(record: Omit<RenderRecord, "timestamp">): void {
  const db = load();
  db.renders.push({ ...record, timestamp: new Date().toISOString() });
  save(db);
}

export function rateRender(id: string, rating: number, feedback?: string): void {
  const db = load();
  const render = db.renders.find(r => r.id === id);
  if (!render) return;
  render.rating = rating;
  if (feedback) render.feedback = feedback;
  db.feedback_loops++;
  const updateScore = <T extends { id: string; score: number; use_count: number }>(
    items: T[], field: keyof RenderRecord, value: string
  ) => {
    const item = items.find(i => i.id === value);
    if (!item) return;
    item.use_count++;
    const rated = db.renders.filter(r => r[field] === value && r.rating !== undefined);
    if (rated.length > 0) item.score = rated.reduce((s, r) => s + (r.rating || 0), 0) / rated.length;
  };
  updateScore(db.palettes, "palette_id", render.palette_id);
  updateScore(db.fonts, "font_id", render.font_id);
  updateScore(db.patterns, "pattern_id", render.pattern_id);
  save(db);
}

export function cacheKey(obj: Record<string, unknown>): string {
  return createHash("sha256").update(JSON.stringify(obj, Object.keys(obj).sort())).digest("hex");
}

export function cacheGet(key: string): string | null {
  const db = load();
  return db.cache[key] ?? null;
}

export function cacheSet(key: string, value: string): void {
  const db = load();
  db.cache[key] = value;
  save(db);
}

export function cacheClear(): void {
  const db = load();
  db.cache = {};
  save(db);
}

function budgetEnsureReset(b: BudgetState): void {
  const today = new Date().toISOString().slice(0, 10);
  if (today > b.reset_date) {
    b.monthly_spend = 0;
    b.reset_date = today;
  }
}

export function budgetCheck(cost: number): { allowed: boolean; remaining: number; message: string } {
  const db = load();
  budgetEnsureReset(db.budget);
  const remaining = +(db.budget.monthly_limit - db.budget.monthly_spend).toFixed(2);
  if (cost > remaining) {
    return { allowed: false, remaining, message: `Butce asimi: $${cost} gerekli, kalan $${remaining}` };
  }
  return { allowed: true, remaining, message: `Kalan butce: $${remaining}` };
}

export function budgetAdd(cost: number): void {
  const db = load();
  budgetEnsureReset(db.budget);
  db.budget.monthly_spend = +(db.budget.monthly_spend + cost).toFixed(2);
  save(db);
}

export function budgetSetLimit(limit: number): void {
  const db = load();
  db.budget.monthly_limit = limit;
  save(db);
}

export function budgetStatus(): BudgetState & { remaining: number } {
  const db = load();
  budgetEnsureReset(db.budget);
  return { ...db.budget, remaining: +(db.budget.monthly_limit - db.budget.monthly_spend).toFixed(2) };
}

export async function storyboardGate(
  cost: number,
  details: Record<string, string>
): Promise<boolean> {
  const bc = budgetCheck(cost);
  if (!bc.allowed) {
    console.log(`\n[GATE] ${bc.message}`);
    return false;
  }
  console.log("\n=== STORYBOARD GATE ===");
  for (const [k, v] of Object.entries(details)) {
    console.log(`  ${k}: ${v}`);
  }
  console.log(`  maliyet: $${cost.toFixed(2)} (kalan butce: $${bc.remaining})`);
  console.log("========================");
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("Render'a izin ver? (y/n): ", (a) => {
      rl.close();
      resolve(a.trim().toLowerCase() === "y");
    });
  });
}

export function getStats() {
  const db = load();
  const rated = db.renders.filter(r => r.rating !== undefined);
  const avg = rated.length > 0 ? rated.reduce((s, r) => s + (r.rating || 0), 0) / rated.length : null;
  const sorted = [...db.palettes].sort((a, b) => b.score - a.score);
  budgetEnsureReset(db.budget);
  return {
    render_count: db.renders.length,
    avg_rating: avg,
    top_palette: sorted[0]?.name || "-",
    feedback_loops: db.feedback_loops,
    budget_spend: db.budget.monthly_spend,
    budget_limit: db.budget.monthly_limit,
    budget_remaining: +(db.budget.monthly_limit - db.budget.monthly_spend).toFixed(2),
    cache_size: Object.keys(db.cache).length,
  };
}

export function listRenders(): RenderRecord[] {
  return load().renders;
}
```

### 7.8 `packages/video/memory/db.json` (389 lines)

See embedded JSON below — contains:
- 14 style DNA rules (dark-bg, ambient-glow, noise-overlay, no-floating-orb, no-gsap-from, etc.)
- 6 palettes: cyan-tech, rosegold-premium, purple-creative, gold-endustriyel, emerald-finans, blue-saglik
- 4 font pairs: inter-inter, playfair-inter, instrument-inter, oswald-inter
- 3 animation patterns: kinetic-stagger, card-flip-3d, marquee-loop
- 6 render records (with ratings: 8, 4, 6)
- Budget: $100/month, currently $0 spent

```json
{
  "style_dna": {
    "name": "LUMI AI Video",
    "rules": [
      {"id":"dark-bg","rule":"arka plan her zaman koyu (bg luminance < 20)","weight":10},
      {"id":"ambient-glow","rule":"her sahnede en az 1 ambient glow katmani olmali","weight":8},
      {"id":"noise-overlay","rule":"noise overlay her zaman acik (opacity 0.02-0.03)","weight":9},
      {"id":"max-5-color","rule":"palette en fazla 5 renk","weight":8},
      {"id":"kinetic-text","rule":"hero baslikta stagger + rotateX animasyonu","weight":7},
      {"id":"smooth-transition","rule":"sahne gecisleri 0.4-0.5s, power2.in/out ease","weight":6},
      {"id":"max-2-font","rule":"en fazla 2 font ailesi","weight":8},
      {"id":"tracking-allcaps","rule":"ALL CAPS letter-spacing 0.08-0.15em","weight":6},
      {"id":"asymmetric-layout","rule":"hero asimetrik, tam ortalanmis degil","weight":5},
      {"id":"progressive-disclosure","rule":"ogeler sirayla gelir (stagger)","weight":7},
      {"id":"particle-bg","rule":"hero sahnesinde canvas partikul sistemi","weight":6},
      {"id":"marquee-bottom","rule":"alt kisimda GSAP marquee","weight":5},
      {"id":"no-floating-orb","rule":"floating orb KESINLIKLE YASAK","weight":10},
      {"id":"no-gsap-from","rule":"gsap.from() KULLANMA, gsap.to() + CSS initial state","weight":9}
    ]
  },
  "palettes": [
    {"id":"cyan-tech","name":"Teknoloji / SaaS","primary":"#06B6D4","bg":"#080F1E","surface":"#0F1A2E","accent":"#0891B2","muted":"rgba(255,255,255,0.4)","moods":["tech","saas","startup","digital"],"score":0,"use_count":0},
    {"id":"rosegold-premium","name":"Premium / Lüks","primary":"#D4A373","bg":"#0F0808","surface":"#1A0F0A","accent":"#B64545","muted":"rgba(255,255,255,0.3)","moods":["premium","luxury","finance","danismanlik"],"score":0,"use_count":1},
    {"id":"purple-creative","name":"Yaratici / Ajans","primary":"#D946EF","bg":"#080012","surface":"#12001E","accent":"#8B5CF6","muted":"rgba(255,255,255,0.35)","moods":["creative","agency","art","media"],"score":6,"use_count":1},
    {"id":"gold-endustriyel","name":"Endüstriyel / B2B","primary":"#E5C158","bg":"#0A0A0A","surface":"#1A1A1A","accent":"#D4A530","muted":"#8A8F98","moods":["industrial","b2b","manufacturing","logistics"],"score":4,"use_count":2},
    {"id":"emerald-finans","name":"Finans / Kurumsal","primary":"#059669","bg":"#06110E","surface":"#0C1A15","accent":"#34D399","muted":"rgba(255,255,255,0.35)","moods":["finance","corporate","legal","consulting"],"score":0,"use_count":0},
    {"id":"blue-saglik","name":"Saglik / Medikal","primary":"#3B82F6","bg":"#0A1628","surface":"#0F1F3A","accent":"#60A5FA","muted":"rgba(255,255,255,0.3)","moods":["health","medical","wellness","pharma"],"score":0,"use_count":0}
  ],
  "fonts": [
    {"id":"inter-inter","display":"Inter","body":"Inter","display_weight":"800","body_weight":"300","moods":["tech","saas","startup","digital","corporate"],"score":0,"use_count":0},
    {"id":"playfair-inter","display":"Playfair Display","body":"Inter","display_weight":"700","body_weight":"300","moods":["premium","luxury","finance","danismanlik","legal"],"score":0,"use_count":1},
    {"id":"instrument-inter","display":"Instrument Serif","body":"Inter","display_weight":"400","body_weight":"300","moods":["creative","agency","art","media","editorial"],"score":6,"use_count":1},
    {"id":"oswald-inter","display":"Oswald","body":"Inter","display_weight":"700","body_weight":"400","moods":["industrial","b2b","manufacturing","logistics"],"score":4,"use_count":2}
  ],
  "patterns": [
    {"id":"kinetic-stagger","type":"kinetic-text","params":{"stagger":0.035,"ease":"back.out(1.5)","duration":0.4,"rotateX":-90},"moods":["*"],"score":6,"use_count":4},
    {"id":"card-flip-3d","type":"card-flip","params":{"stagger":0.15,"ease":"back.out(1.3)","duration":0.4,"rotationY":60},"moods":["*"],"score":0,"use_count":0},
    {"id":"marquee-loop","type":"marquee","params":{"duration":8,"gap":60,"fontSize":12},"moods":["*"],"score":0,"use_count":0}
  ],
  "renders": [
    {"id":"showcase-tech-1785217986176","industry":"tech","purpose":"showcase","palette_id":"cyan-tech","font_id":"inter-inter","pattern_id":"kinetic-stagger","duration":12,"fps":30,"bitrate":0,"file_size":0,"render_time_s":44,"timestamp":"2026-07-28T05:53:50.572Z"},
    {"id":"showcase-tech-1785218364189","industry":"tech","purpose":"showcase","palette_id":"cyan-tech","font_id":"inter-inter","pattern_id":"kinetic-stagger","duration":13,"fps":30,"bitrate":0,"file_size":0,"render_time_s":67,"timestamp":"2026-07-28T06:00:30.834Z"},
    {"id":"showcase-premium-1785218589382","industry":"premium","purpose":"showcase","palette_id":"rosegold-premium","font_id":"playfair-inter","pattern_id":"kinetic-stagger","duration":13,"fps":30,"bitrate":0,"file_size":0,"render_time_s":65,"timestamp":"2026-07-28T06:04:14.456Z"},
    {"id":"showcase-premium-1785218685661","industry":"premium","purpose":"showcase","palette_id":"rosegold-premium","font_id":"playfair-inter","pattern_id":"kinetic-stagger","duration":13,"fps":30,"bitrate":0,"file_size":0,"render_time_s":66,"timestamp":"2026-07-28T06:05:52.123Z","rating":8},
    {"id":"showcase-industrial-1785218789286","industry":"industrial","purpose":"showcase","palette_id":"gold-endustriyel","font_id":"oswald-inter","pattern_id":"kinetic-stagger","duration":13,"fps":30,"bitrate":0,"file_size":0,"render_time_s":66,"timestamp":"2026-07-28T06:07:35.003Z","rating":4,"feedback":"cok basit, wow efekti yok"},
    {"id":"showcase-creative-1785219710920","industry":"creative","purpose":"showcase","palette_id":"purple-creative","font_id":"instrument-inter","pattern_id":"kinetic-stagger","duration":13,"fps":30,"bitrate":0,"file_size":0,"render_time_s":65,"timestamp":"2026-07-28T06:22:56.087Z","rating":6}
  ],
  "feedback_loops": 4,
  "cache": {},
  "budget": {
    "monthly_limit": 100,
    "monthly_spend": 0,
    "reset_date": "2026-07-28"
  }
}
```

### 7.9 `packages/video/scripts/render.ts` (255 lines)

Full parametric render script:
- CLI: `node scripts/render.ts [mood] [rating]`
- Moods: tech, premium, industrial, creative, health, finance
- Calls `recommend(mood)` → gets best palette + font + pattern
- Generates 3-scene HTML: Hero (kinetic typography) → Cards (3D flip stats) → CTA (button)
- Canvas particle system (80 particles, connection lines < 140px)
- GSAP timeline 13 seconds, 3 scene transitions
- Storyboard gate before render, memory save after
- Prompts user 1-10 rating (or accepts CLI arg)
- Canvas particle colors change per scene (primary → accent → primary)
- Marquee at bottom of scene 2 (GSAP continuous loop)
- Ambient glow layers per scene
- Noise SVG overlay at 1.5% opacity

---

## 8. SHARED COMPONENTS

### 8.1 `magnetic.tsx` (56 lines)
Spring-physics mouse-follow. `useMagnetic<T>` hook returns `{ref, onMove, onLeave}`. `Magnetic` wrapper component with stiffness/damping/mass props.

### 8.2 `scroll-camera.ts` (31 lines)
Three.js `createCameraRig(camera, config)` → returns `{ update(scrollProgress), reset() }`. Moves camera along Z-axis with damping.

### 8.3 `webgpu.ts` (19 lines)
`detectBackend()` → async probes WebGPU adapter, returns `"webgpu" | "webgl" | "unsupported"`.

---

## 9. WEBSITE CONFIG — Design Tokens

Studio design uses `@theme inline` in `globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0B0B0B;
  --color-foreground: #F5F5F0;
  --color-muted: #8A8F98;
  --color-border: #2D2D2D;
  --color-accent: #E5C158;
  --color-accent-hover: #D4A530;
  --color-surface: #1A1A1A;
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
}
```

**Key rules:**
- NO direct color classes (`text-white`, `bg-[#xxx]`) — always use tokens
- NO floating orb / gradient blur blob
- NO `gsap.from()` — always `gsap.to()` + CSS initial state
- ALL CAPS text must have `tracking-wider` or `tracking-widest`
- Max 2 font families per page

---

## 10. TASK STATUS (As of 28 Temmuz 2026)

### ✅ Completed
- Video pipeline (Puppeteer + GSAP + FFmpeg CRF 16)
- 6 test renders (tech, premium, industrial, creative)
- Turkish character support (`<meta charset="UTF-8">`, ÜİÖÇĞŞ, Â yasak)
- Memory system (6 palettes, 4 fonts, 3 patterns, render scoring)
- Asset cache (SHA-256 hash dedup)
- Budget cap ($100/month default)
- Storyboard gate (cost + human y/n approval)
- Showcase render CLI (`scripts/render.ts` — mood arg, rating prompt, memory save)

### 🔴 Next (Sıradaki)
1. **Hailuo API entegrasyonu** — MCP tool `generate_video_hailuo` (1 hafta)
2. **AI video katmanı** — texture → Hailuo → GSAP overlay
3. **Kling API entegrasyonu** — final render katmanı (2-4 hafta)
4. **Pipeline akışı** — prompt → Hailuo draft → onay → Kling final → FFmpeg mux
5. **Memory AI genişletme** — AI modellerini kapsayacak (maliyet/hız/tercih)
6. **Shader kütüphanesi** — film grain, liquid transition (`packages/shared/shaders.ts`)
7. **WebGPU + TSL Three.js entegrasyonu**
8. **MSDF kinetik tipografi araştırması**

### 🟢 Optional
- Wan 2.2 yerel kurulum (GPU alınırsa)
- GPU geçiş kararı (API maliyeti > GPU amortismanı)
- Nike-deneme iyileştirmeleri

### ⏸️ Blocked
- ITO API (ticaret sicili + üyelik gerekli)
- MERSIS (e-Devlet şifresi gerekli)

---

## 11. DESIGN DECISIONS

### Video Pipeline
- `gsap.to()` + CSS initial state ONLY (NO `gsap.from()`)
- Canvas particles: 80 dots, variable size 0.5-3px, connection lines < 140px, color changes per scene
- Scene transitions: 0.5s, scale 0.95 + y shift, power2.in/out
- Marquee: GSAP `to({ x: '-50%', duration: 10, repeat: -1 })` — NOT CSS @keyframes
- FFmpeg: libx264, preset slow, CRF 16, profile high, yuv420p, faststart
- Frame-by-frame Puppeteer screenshot at 30fps
- Prompt user 1-10 after each render — updates palette/font/pattern scores

### Turkish Characters
- `<html lang="tr">` + `<meta charset="UTF-8">` REQUIRED
- Use actual Unicode: Ü İ Ö Ç Ğ Ş
- Â character is BANNED (replace with A)

### Budget System
- Default: $100/month limit
- Auto-resets on calendar month change
- storyboardGate checks budget + asks human confirmation
- Budget applies to paid AI model calls (Hailuo/Kling), NOT to local HTML renders ($0)

### Cost Targets (for AI video)
- Hailuo: ~$1.20/30s video (draft layer)
- Kling: ~$7.20/30s video (final layer)
- Saleable at: $500-2000 per video

### Pipeline Strategy
- Layer 1: HTML/CSS/GSAP (current) — typography, UI, transitions ($0)
- Layer 2: Hailuo — AI video draft, texture generation ($1.20)
- Layer 3: Kling — premium final render ($7.20)
- Layer 4 (optional): Wan 2.2 — local batch/anime (GPU required)

---

## 12. BOOTSTRAP SCRIPT

Save as `bootstrap.ps1` and run as Administrator on new PC:

```powershell
# bootstrap.ps1 — Full System Setup for LUMI AI Studio
# Run as Administrator

Write-Host "=== LUMI AI Studio Bootstrap ===" -ForegroundColor Cyan

# 1. Install System Tools
Write-Host "[1/5] Installing system tools..." -ForegroundColor Yellow

# FFmpeg
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    winget install ffmpeg --accept-package-agreements
}

# Node.js (if not installed or <20)
$nodeVer = node --version 2>$null
if (-not ($nodeVer -match "^v2[0-9]")) {
    Write-Host "Node.js 20+ required. Install from: https://nodejs.org/" -ForegroundColor Red
    Write-Host "After installing, re-run this script."
    exit 1
}

# Python 3.11+
$pyVer = python --version 2>$null
if (-not ($pyVer -match "3\.(1[1-9]|[2-9]\d)")) {
    Write-Host "Python 3.11+ required. Install from: https://www.python.org/" -ForegroundColor Red
    exit 1
}

# Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    winget install Git.Git --accept-package-agreements
}

# 2. Clone repo
Write-Host "[2/5] Cloning repository..." -ForegroundColor Yellow
# Replace with actual repo URL
git clone <REPO_URL> claude-deneme
Set-Location claude-deneme

# 3. Install npm dependencies
Write-Host "[3/5] Installing npm packages..." -ForegroundColor Yellow

# Video pipeline
Set-Location packages/video
npm install
Set-Location ../..

# Website
Set-Location lumiai-website
npm install
Set-Location ..

# 4. Install Python dependencies
Write-Host "[4/5] Installing Python packages..." -ForegroundColor Yellow
pip install fastmcp faster-whisper silero-vad torch torchaudio

# 5. Create .env.local from secrets
Write-Host "[5/5] Setting up environment..." -ForegroundColor Yellow
if (Test-Path ".env.secrets") {
    Copy-Item ".env.secrets" ".env.local"
    Write-Host ".env.local created from .env.secrets" -ForegroundColor Green
} else {
    Write-Host "WARNING: .env.secrets not found. Create .env.local manually." -ForegroundColor Red
}

Write-Host ""
Write-Host "=== BOOTSTRAP COMPLETE ===" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "  1. Open in opencode: code ."
Write-Host "  2. Run: cd packages/video && node scripts/render.ts tech"
Write-Host "  3. Or: cd lumiai-website && npm run dev"
Write-Host ""
Write-Host "IMPORTANT: Place .env.secrets in project root with your API keys." -ForegroundColor Yellow
```

---

## 13. VERIFICATION COMMANDS

After bootstrap, run these to verify:

```bash
# Video pipeline
cd packages/video
node -e "const {renderVideo}=require('./src/pipeline.ts'); console.log('Pipeline OK')"
npm ls puppeteer gsap

# Python MCP server
python -c "from fastmcp import FastMCP; print('FastMCP OK')"
python -c "from faster_whisper import WhisperModel; print('Whisper OK')"

# Website
cd lumiai-website
npm run build  # Should complete without errors

# FFmpeg
ffmpeg -version | head -1

# Memory system
cd packages/video
node -e "
  const {recommend, getStats} = require('./memory/memory.ts');
  console.log(JSON.stringify(recommend('tech'), null, 2));
  console.log(JSON.stringify(getStats(), null, 2));
"

# Test render (small)
cd packages/video
node scripts/render.ts tech 8  # Mood + rating, skips storyboard gate
```

---

## 14. RECOVERY PROCEDURE

### Full recovery from flash drive:
1. Install Windows 10/11, run `bootstrap.ps1` as Admin
2. Wait for all installations (10-15 min)
3. Copy `PROJECT-DNA.md` + `.env.secrets` from flash to project root
4. Run verification commands
5. Start working — AI reads PROJECT-DNA.md, knows the full state

### Partial recovery (if repo exists):
1. `git pull` latest code
2. Copy `.env.secrets` → `.env.local`
3. `npm install` (video + website)
4. `pip install fastmcp faster-whisper silero-vad torch torchaudio`
5. Done

---

> **End of PROJECT-DNA.md**
> Total: ~31,000 chars | ~620 lines | ~220KB equivalent source
> Flash this to USB + `.env.secrets` = full system backup
