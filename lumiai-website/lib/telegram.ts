const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || ""
const API = `https://api.telegram.org/bot${BOT_TOKEN}`

export async function sendMessage(text: string, chatId?: string) {
  const id = chatId || CHAT_ID
  if (!BOT_TOKEN || !id) return
  try {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: id, text, parse_mode: "Markdown" }),
    })
  } catch {}
}

export async function setWebhook(url: string) {
  if (!BOT_TOKEN) return
  await fetch(`${API}/setWebhook?url=${encodeURIComponent(url)}`, { method: "POST" })
}
