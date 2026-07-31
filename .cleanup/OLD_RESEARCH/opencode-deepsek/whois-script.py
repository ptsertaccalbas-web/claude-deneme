import whois
import time
import json
import sys
from datetime import datetime

domains = [
    "modern-ambalaj.com.tr",
    "gizpak.com",
    "ambalajurunleri.net",
    "gizpakambalaj.com",
    "ileribant.com",
    "ileribarkod.com",
    "olusummatbaa.com",
    "mobamatbaa.com",
    "erdeambalaj.com.tr",
    "diyarloglupaketleme.com",
    "ecopack.com.tr",
    "ecopackambalaj.com",
    "samecopack.com.tr",
    "ecoposet.com",
    "ozdenambalaj.com",
    "imsasambalaj.com",
    "ambalajfabrikasi.tr",
    "haayambalaj.com",
    "isikmatbaa.com.tr",
    "corlumatbaa.com",
    "ofsetim.com",
    "korozo.com.tr",
    "eforflexo.com",
    "istanbuloluklu.com.tr",
    "istanbulambalaj.com.tr",
    "guvenayambalaj.com",
    "ihsasambalaj.com",
    "akemirambalaj.com",
    "yilmazplastikambalaj.com",
    "yilmaz-ambalaj.com",
    "divanambalaj.com",
    "acarambalaj.com.tr",
    "sarcina.com.tr",
    "demircanambalaj.com",
    "elifambalaj.com.tr",
    "amoredesign.com.tr",
    "fulyadis.com",
    "busecolpan.com",
    "busecolpanbg.com",
    "trakyadent.com.tr",
    "beyazadsp.com",
    "dogadentcorlu.com",
    "sevgidis.com.tr",
    "corludent.com",
    "klinikaqua.com",
    "dktrdental.com",
    "corluincidis.com",
    "dtipeksahin.com",
    "corludentart.com",
    "dentarenacorlu.com",
    "akcadent.com.tr",
    "metroofset.com",
]

results = []
errors = []

for i, domain in enumerate(domains):
    print(f"[{i+1}/{len(domains)}] {domain}...", end=" ", flush=True)
    try:
        w = whois.whois(domain)
        creation = w.creation_date
        expiry = w.expiration_date
        if isinstance(creation, list):
            creation = creation[0]
        if isinstance(expiry, list):
            expiry = expiry[0]

        registrar = w.registrar
        if isinstance(registrar, list):
            registrar = "; ".join(registrar) if registrar else None

        name_servers = w.name_servers
        if isinstance(name_servers, list):
            name_servers = [ns for ns in name_servers if ns and ns.strip()]
            name_servers = "; ".join(name_servers[:5]) if name_servers else None
        else:
            name_servers = None

        org = w.org or w.name or None
        if isinstance(org, list):
            org = org[0] if org else None

        country = w.country or None
        if isinstance(country, list):
            country = country[0] if country else None

        status = w.status
        if isinstance(status, list):
            status = "; ".join(status[:3]) if status else None

        whois_private = None
        if org and ("privacy" in str(org).lower() or "whoisguard" in str(org).lower() or "protect" in str(org).lower()):
            whois_private = True
        else:
            whois_private = False

        result = {
            "domain": domain,
            "registrar": registrar,
            "creation_date": str(creation) if creation else None,
            "expiration_date": str(expiry) if expiry else None,
            "name_servers": name_servers,
            "organization": org,
            "country": country,
            "status": status,
            "whois_private": whois_private,
        }
        results.append(result)
        print(f"OK ({str(expiry)[:10] if expiry else 'N/A'})")
    except Exception as e:
        errors.append({"domain": domain, "error": str(e)})
        print(f"HATA: {str(e)[:60]}")
    
    if i < len(domains) - 1:
        time.sleep(2)

print("\n\n=== RESULTS ===")
print(json.dumps(results, indent=2, ensure_ascii=False, default=str))

if errors:
    print("\n\n=== ERRORS ===")
    print(json.dumps(errors, indent=2, ensure_ascii=False, default=str))

# Summary
total = len(domains)
ok = len(results)
err = len(errors)
with_private = sum(1 for r in results if r.get("whois_private"))
with_expiry = sum(1 for r in results if r.get("expiration_date"))

print(f"\n\n=== SUMMARY ===")
print(f"Total: {total}, OK: {ok}, Errors: {err}")
print(f"WHOIS Private: {with_private}/{ok}")
print(f"With Expiry: {with_expiry}/{ok}")
