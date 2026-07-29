import requests
import re
import time
import json
import sys
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

DOMAINS = [
    "http://www.isikmatbaa.com.tr",
    "http://olusummatbaa.com",
    "http://mobamatbaa.com",
    "http://www.korozo.com.tr",
    "http://www.eforflexo.com",
    "https://www.istanbuloluklum.tr",
    "http://www.guvenayambalaj.com",
    "https://ihsasambalaj.com",
    "http://akemirambalaj.com",
    "http://www.yilmazplastikambalaj.com",
    "https://www.divanambalaj.com",
    "http://www.sarcina.com.tr",
    "https://www.demircanambalaj.com",
    "https://acarambalaj.com.tr",
    "https://www.diyaroglupaketleme.com",
    "https://www.ecopack.com.tr",
    "http://www.erdeambalaj.com.tr",
    "https://www.ozdenambalaj.com",
    "http://www.imsasambalaj.com",
    "https://ambalajfabrikasi.tr",
    "http://www.elifambalaj.com.tr",
    "https://www.haayambalaj.com",
    "https://amoredesign.com.tr",
    "https://modernambalaj.com",
    "https://ileribant.com",
]

PATHS = ["/iletisim", "/künye", "/hakkimizda", "/about", "/contact", "/", "/tr/iletisim", "/tr/hakkimizda"]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
}

MERSIS_RE = re.compile(r'(?:MERSİS\s*(?:NO|NUMARASI|NOLU|:?\s*))?(\d{16})', re.IGNORECASE)
MERSIS_RE2 = re.compile(r'(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})')
VERGI_RE = re.compile(r'(?:VERGİ\s*(?:NO|NUMARASI|KİMLİK|:?\s*))?\s*(\d{10})', re.IGNORECASE)
SICIL_RE = re.compile(r'(?:SİCİL\s*(?:NO|NUMARASI|:?\s*))?\s*(\d{4,8})', re.IGNORECASE)

session = requests.Session()
session.headers.update(HEADERS)

results = {}

for domain in DOMAINS:
    parsed = urlparse(domain)
    base = f"{parsed.scheme}://{parsed.netloc}"
    found = {"mersis": [], "vergi": [], "sicil": [], "pages": []}

    for path in PATHS:
        url = urljoin(base, path)
        try:
            resp = session.get(url, timeout=10, allow_redirects=True)
            if resp.status_code != 200:
                continue
            content_type = resp.headers.get("Content-Type", "")
            if "text/html" not in content_type and "text/plain" not in content_type:
                continue

            try:
                text = resp.content.decode("utf-8")
            except:
                try:
                    text = resp.content.decode("iso-8859-9")
                except:
                    text = resp.text

            soup = BeautifulSoup(text, "html.parser")
            page_text = soup.get_text(separator="\n", strip=True)

            mersis_matches = MERSIS_RE.findall(page_text)
            mersis_matches += MERSIS_RE2.findall(page_text)
            vergi_matches = VERGI_RE.findall(page_text)
            sicil_matches = SICIL_RE.findall(page_text)

            valid_mersis = [m for m in mersis_matches if m.startswith("0") and len(m) == 16]
            valid_vergi = [m for m in vergi_matches if len(m) == 10]

            if valid_mersis or valid_vergi or sicil_matches:
                found["mersis"].extend(valid_mersis)
                found["vergi"].extend(valid_vergi)
                found["sicil"].extend(sicil_matches)
                found["pages"].append(path)

        except Exception as e:
            continue

    found["mersis"] = list(set(found["mersis"]))
    found["vergi"] = list(set(found["vergi"]))
    found["sicil"] = list(set(found["sicil"]))
    results[domain] = found

    status = "BULUNDU" if (found["mersis"] or found["vergi"]) else "YOK"
    m_str = str(found['mersis'] or '-')
    v_str = str(found['vergi'] or '-')
    s_str = str(found['sicil'] or '-')
    print(f"{domain:45s} -> MERSIS:{m_str}  VERGI:{v_str}  SICIL:{s_str}  [{status}]")
    time.sleep(1.5)

print("\n\n=== ÖZET ===")
found_any = {k: v for k, v in results.items() if v["mersis"] or v["vergi"]}
print(f"Toplam domain: {len(DOMAINS)}")
print(f"MERSIS/VERGI bulunan: {len(found_any)}")
print("\nDetayli JSON ciktisi icin: kunye-sonuclari.json")

with open("kunye-sonuclari.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Done.")
