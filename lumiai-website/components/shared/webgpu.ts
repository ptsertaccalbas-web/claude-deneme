export type RendererBackend = "webgpu" | "webgl" | "unsupported"

export async function detectBackend(): Promise<RendererBackend> {
  if (typeof navigator === "undefined") return "webgl"
  if ((navigator as any).gpu) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter()
      if (adapter) return "webgpu"
    } catch {}
  }
  return "webgl"
}

export type RendererConfig = {
  canvas: HTMLCanvasElement
  width: number
  height: number
  pixelRatio?: number
}
