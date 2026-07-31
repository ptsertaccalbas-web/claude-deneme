import json, os, subprocess, time, urllib.request, urllib.error, datetime

LOG = r"C:\Users\asus\Desktop\claude-deneme\bot.log"
TOKEN = open(r"C:\Users\asus\Desktop\claude-deneme\lumiai-website\.env.local", encoding="utf-8").read().splitlines()
TOKEN = [l for l in TOKEN if "TELEGRAM_BOT_TOKEN=" in l][0].replace("TELEGRAM_BOT_TOKEN=", "").strip()
CHAT_ID = [l for l in open(r"C:\Users\asus\Desktop\claude-deneme\lumiai-website\.env.local", encoding="utf-8").read().splitlines() if "TELEGRAM_CHAT_ID=" in l][0].replace("TELEGRAM_CHAT_ID=", "").strip()
API = f"https://api.telegram.org/bot{TOKEN}"
NOTLAR = r"C:\Users\asus\Desktop\claude-deneme\NOTLAR.md"
BASE = r"C:\Users\asus\Desktop\claude-deneme"
OFFSET = 0
PENDING = {}

def log(msg):
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(f"{datetime.datetime.now()} {msg}\n")

def tel(method, data):
    req = urllib.request.Request(f"{API}/{method}", json.dumps(data).encode("utf-8"), {"Content-Type": "application/json; charset=utf-8"})
    resp = urllib.request.urlopen(req).read().decode("utf-8")
    return json.loads(resp)

try:
    urllib.request.urlopen(urllib.request.Request(f"{API}/deleteWebhook", b"")).read()
except: pass

def send(msg):
    tel("sendMessage", {"chat_id": CHAT_ID, "text": msg})

def save_note(text):
    ts = datetime.datetime.now().strftime("%d %b %Y %H:%M")
    with open(NOTLAR, "a", encoding="utf-8") as f:
        f.write(f"\n## Telegram \u2014 {ts}\n- {text}\n")
    log(f"NOTE SAVED: {text[:80]}")
    send(f"\u2705 Not kaydedildi")

log("BOT STARTED")
while True:
    try:
        updates = tel("getUpdates", {"offset": OFFSET, "timeout": 30})
        for u in updates.get("result", []):
            OFFSET = u["update_id"] + 1
            msg = u.get("message", {}).get("text", "").strip()
            uid = str(u.get("message", {}).get("from", {}).get("id"))
            log(f"MSG: {msg[:100]}")
            if not msg or uid != CHAT_ID: continue

            if uid in PENDING:
                if msg.lower() in ("evet", "yes", "e", "y", "tamam", "calistir"):
                    log(f"EXEC: {PENDING[uid]}")
                    send(f"Calistiriliyor: {PENDING[uid]}")
                    subprocess.Popen(["powershell", "-Command", f"cd '{BASE}'; {PENDING[uid]}"])
                else:
                    send("Iptal edildi.")
                del PENDING[uid]
                continue

            if msg.startswith("/not "):
                save_note(msg[5:])
            elif msg.startswith("/"):
                cmd = msg[1:]
                PENDING[uid] = cmd
                send(f"Su komut calistirilsin mi?\n\n`{cmd[:200]}`\n\n(evet/hayir)")
                log(f"PENDING: {cmd[:100]}")
            else:
                save_note(msg)
    except Exception as e:
        log(f"ERROR: {e}")
        time.sleep(5)