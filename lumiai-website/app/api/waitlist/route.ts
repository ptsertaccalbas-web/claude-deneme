import { NextResponse } from "next/server"

const SHEET_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK || ""
const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const TO_EMAIL = process.env.TO_EMAIL || "info@lumiaimedia.com"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, surname, phone, email, company } = data

    if (!name || !surname || !phone || !email) {
      return NextResponse.json({ ok: false, error: "Eksik alanlar var" }, { status: 400 })
    }

    const payload = {
      name, surname, phone, email, company: company || "",
      timestamp: new Date().toISOString(),
      source: "lumiai-website-waitlist",
    }

    const results: string[] = []

    // Try Google Sheets webhook
    if (SHEET_WEBHOOK) {
      try {
        const r = await fetch(SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (r.ok) results.push("sheets")
        else console.warn("Sheet webhook returned", r.status)
      } catch { console.warn("Sheet webhook failed") }
    }

    // Fallback: send via Resend
    if (RESEND_API_KEY) {
      try {
        const html = `
          <h2>Yeni Bekleme Listesi Kaydı</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ad</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Soyad</td><td style="padding:8px;border:1px solid #ddd">${surname}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Firma</td><td style="padding:8px;border:1px solid #ddd">${company || "-"}</td></tr>
          </table>
        `
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "LUMI AI <info@lumiaimedia.com>",
            to: TO_EMAIL,
            subject: `Yeni bekleme listesi: ${name} ${surname}`,
            html,
          }),
        })
        results.push("email")
      } catch { console.warn("Resend failed") }
    }

    return NextResponse.json({ ok: true, channels: results })
  } catch (err) {
    console.error("Waitlist API error:", err)
    return NextResponse.json({ ok: false, error: "Sunucu hatası" }, { status: 500 })
  }
}
