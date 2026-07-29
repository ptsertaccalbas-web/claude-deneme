const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = q => new Promise(r => rl.question(q, r))

const RESEND_API_KEY = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8')
  .split('\n').find(l => l.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]?.trim()

if (!RESEND_API_KEY) { console.error('.env dosyasinda RESEND_API_KEY bulunamadi'); process.exit(1) }

const firma = process.argv[2]
const isTest = process.argv.includes('--test') || process.argv.includes('-t')
const isList = process.argv.includes('--list') || process.argv.includes('-l')
const isYes = process.argv.includes('--yes') || process.argv.includes('-y')

if (isList) {
  const dirs = fs.readdirSync(__dirname, { withFileTypes: true })
  dirs.filter(d => d.isDirectory()).forEach(d => {
    if (fs.existsSync(path.join(__dirname, d.name, `${d.name}-OUTREACH.md`)))
      console.log(`  ${d.name}`)
  })
  process.exit(0)
}

if (!firma) { console.error('Kullanim: node send.js "Firma Adi" [--test]'); process.exit(1) }

const outreachFile = path.join(__dirname, firma, `${firma}-OUTREACH.md`)
if (!fs.existsSync(outreachFile)) { console.error(`Dosya bulunamadi: ${outreachFile}`); process.exit(1) }

const content = fs.readFileSync(outreachFile, 'utf-8')
const lines = content.split('\n')

let subject = '', body = '', email = '', telefon = ''

// Markdown'dan ilk e-posta şablonunu çıkar
// `**Konu:**` ile başlayan satır ve onu takip eden ilk ```...``` bloğu
const konuLine = content.match(/^\*\*Konu:\*\* (.+)$/m)
if (konuLine) subject = konuLine[1].trim()

// İlk kod bloğunu bul (``` ile çevrili)
const codeBlock = content.match(/```[\s\S]*?\n([\s\S]*?)```/)
if (codeBlock) body = codeBlock[1].trim()

const mailMatch = content.match(/\*\*E-posta\*\*\s*\|\s*([\w.@]+)/)
if (mailMatch) email = mailMatch[1].trim()

const telMatch = content.match(/\*\*Telefon\*\*\s*\|\s*([\+\d\s]+)/)
if (telMatch) telefon = telMatch[1].trim()

console.log('=========================================')
console.log(' LUMI AI Outreach Gonderici')
console.log('=========================================')
console.log(`Firma:   ${firma}`)
console.log(`Konu:    ${subject}`)
console.log(`E-posta: ${email}`)
console.log(`Telefon: ${telefon}`)

if (!subject || !body) { console.error('\nE-posta taslagi bulunamadi.'); process.exit(1) }
if (!email) {
  // body'den ilk epostayi bul
  const mailMatch = body.match(/[\w.@]+@[\w.]+/)
  if (mailMatch) email = mailMatch[0]
}
if (!email) { console.error('\nHedef e-posta bulunamadi.'); process.exit(1) }
console.log(`\nGonderilecek: ${email}`)

if (isTest) {
  console.log('\n[TEST MODU] Gonderilmedi.')
  console.log('\n--- BODY ---')
  console.log(body)
  process.exit(0)
}

;(async () => {
  if (!isYes) {
    const onay = await ask(`\nBu e-postayi gondereyim mi? (e/h): `)
    if (onay.toLowerCase() !== 'e') { console.log('Iptal edildi.'); process.exit(0) }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `LUMI AI Media <info@lumiaimedia.com>`,
        to: [email],
        subject,
        text: body
      })
    })
    const data = await res.json()
    if (res.ok) {
      console.log(`\nGONDERILDI: ${data.id}`)
      const logLine = `${new Date().toISOString()},${firma},${email},${subject},${data.id}\n`
      fs.appendFileSync(path.join(__dirname, 'GONDERIM-GECMISI.csv'), logLine, 'utf-8')
    } else {
      console.error(`\nHATA: ${JSON.stringify(data)}`)
    }
  } catch (e) {
    console.error(`\nHATA: ${e.message}`)
  }
  rl.close()
})()
