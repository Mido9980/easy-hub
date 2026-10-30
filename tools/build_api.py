"""يبني ملفات api/ من assets/data.js"""
import json, re, os
src = open("assets/data.js", encoding="utf-8").read()
apps = json.loads(re.search(r"window\.HUB_APPS=(.*?);\n", src, re.S).group(1))
cats = json.loads(re.search(r"window\.HUB_CATS=(.*?);", src, re.S).group(1))
os.makedirs("api/apps", exist_ok=True)
base = {"name": "EASY HUB API", "version": "1.0", "owner": "Mido9980", "timezone": "Africa/Cairo"}
open("api/apps.json", "w", encoding="utf-8").write(json.dumps(
    dict(base, count=len(apps), categories=[{"id": c, "label": l} for c, l in cats], apps=apps),
    ensure_ascii=False, indent=2))
for a in apps:
    open(f"api/apps/{a['slug']}.json", "w", encoding="utf-8").write(json.dumps(
        dict(base, app=a, links={"web": a.get("url"), "repo": a.get("repo"), "api": f"/api/apps/{a['slug']}.json"}),
        ensure_ascii=False, indent=2))
open("api/health.json", "w", encoding="utf-8").write(json.dumps(dict(base, status="ok", apps=len(apps)), ensure_ascii=False, indent=2))
print(f"built {len(apps)} apps")
