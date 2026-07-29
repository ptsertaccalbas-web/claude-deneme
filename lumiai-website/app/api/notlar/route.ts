import { NextResponse } from "next/server"

const STORE: string[] = []

export async function GET() {
  const last10 = STORE.slice(-10).reverse()
  const text = last10.length
    ? last10.map((n, i) => `${i + 1}. ${n}`).join("\n")
    : "Henuz not yok."
  return NextResponse.json({ ok: true, notlar: last10, text })
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    if (!text) return NextResponse.json({ ok: false, error: "Bos not" }, { status: 400 })
    STORE.push(text.trim())
    return NextResponse.json({ ok: true, adet: STORE.length })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
