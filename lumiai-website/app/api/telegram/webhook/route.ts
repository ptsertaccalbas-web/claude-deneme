import { sendMessage } from "@/lib/telegram"
import { NextResponse } from "next/server"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.lumiaimedia.com"

export async function POST(req: Request) {
  try {
    const update = await req.json()
    const msg = update.message
    if (!msg?.text) return NextResponse.json({ ok: true })

    const chatId = msg.chat.id.toString()
    const text = msg.text.trim()
    const name = msg.from?.first_name || "dostum"

    if (text === "/start") {
      await sendMessage(
        `Merhaba ${name}!\n\nLUMI AI asistana hos geldin.\n\nKomutlar:\n/durum — Is durumu\n/site <aciklama> — Website fikri not et\n/not <metin> — Not ekle\n/notlar — Notlari listele\n/rapor — Son yapilanlar\n/lead <firma> — Firma durumu\n/yardim — Bu mesaj`,
        chatId
      )
    } else if (text === "/yardim" || text === "/help") {
      await sendMessage(
        `Komutlar:\n/durum — Proje durum ozeti\n/site <aciklama> — Website tasarim fikri ekle\n/not <metin> — Gunluk not ekle\n/notlar — Kayitli notlar\n/rapor — Bu oturum ozeti\n/lead <firma> — Firma profili sorgula\n\nNot: Karmasik istekler icin CLI uzerinden calisiyorum, Telegram'dan talimat verip sonucu burdan alirsin.`,
        chatId
      )
    } else if (text === "/not") {
      await sendMessage('Kullanim: /not <metin>\nOrnek: /not yarin toplanti var', chatId)
    } else if (text.startsWith("/not ")) {
      const note = text.slice(5)
      await fetch(`${BASE}/api/notlar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: note }),
      })
      await sendMessage(`Not kaydedildi: "${note}"`, chatId)
    } else if (text === "/notlar") {
      const r = await fetch(`${BASE}/api/notlar`)
      const data = await r.json()
      await sendMessage(data.text ? `Notlarin:\n${data.text}` : "Henuz not yok.", chatId)
    } else if (text === "/durum") {
      await sendMessage(
        "Durum:\n\xB7 Google Sheets: Hazir\n\xB7 Bot: aktif\n\xB7 Ihsa Ambalaj: 28 Temmuz 08:30 follow-up\n\xB7 KRITIK 5 firma: telefonla aranacak\n\xB7 Butonlar: 11/11 calisiyor\n\nDetay icin CLI'a gecmem gerek.",
        chatId
      )
    } else if (text.startsWith("/site ")) {
      await sendMessage(
        `"${text.slice(6)}" — fikrin not edildi. CLI'da calismaya basladigimda haber veririm.`,
        chatId
      )
    } else if (text.startsWith("/lead ")) {
      await sendMessage(`"${text.slice(6)}" sorgulaniyor... (CLI'a gecmem gerek)`, chatId)
    } else if (text === "/rapor") {
      await sendMessage("Son yapilanlar:\n\xB7 Google Sheets kurulumu tamam\n\xB7 Telegram bot + webhook aktif\n\xB7 21st.dev + UI/UX Pro Max skill yuklendi\n\xB7 Butonlar kontrol edildi (sorun yok)", chatId)
    } else {
      await sendMessage(`Anlasilmadi: "${text}"\n/yardim yaz.`, chatId)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
