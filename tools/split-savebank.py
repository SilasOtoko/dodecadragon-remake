# Splits savebank.txt into one JSON file per labeled save and prints a stage summary.
import base64, json, re, sys, pathlib
src, outdir = sys.argv[1], pathlib.Path(sys.argv[2])
outdir.mkdir(parents=True, exist_ok=True)
lines = [l.strip() for l in open(src, encoding='utf-8') if l.strip()]
rows = []; label = None; n = 0
for l in lines[1:]:
    if re.fullmatch(r'[A-Za-z0-9+/=]{200,}', l):
        n += 1
        data = json.loads(base64.b64decode(l + '=' * (-len(l) % 4)).decode('utf-8'))
        slug = re.sub(r'[^a-z0-9]+', '-', (label or 'save').lower()).strip('-')[:50]
        name = f"{n:02d}-{slug}"
        (outdir / f"{name}.json").write_text(json.dumps(data, indent=1))
        (outdir / f"{name}.txt").write_text(l)  # original export string, importable as-is
        rows.append((name, label, data.get('unlocks'), data.get('lastMajorChangeVersion'), len(data)))
        label = None
    else:
        label = l
for r in rows: print(f"| `{r[0]}` | {r[1]} | {r[2]} | {r[3]} | {r[4]} |")
