# Test saves

Split from the original repo's `savebank.txt` by `tools/split-savebank.py`. Each save is stored twice: `.txt` is the original export string (paste it into either game's Import box) and `.json` is the decoded save for tests and inspection.

"Unlocks" is `game.unlocks` (see [../../docs/unlock-order.md](../../docs/unlock-order.md)). "Version" is `lastMajorChangeVersion`; saves without one get migrated on load.

Not covered by the bank: a brand-new game (unlocks 0–2) and unlocks 18, 19, 25 and 30. Export your own saves at those points as you play.

| Save | Label | Unlocks | Version | Fields |
|---|---|---|---|---|
| `01-start-of-alchemy` | Start of alchemy | 3 | none | 40 |
| `02-start-of-magic` | Start of magic | 4 | none | 40 |
| `03-6-magic-upgrades` | 6 magic upgrades | 4 | none | 40 |
| `04-start-of-magic-challenges-12-magic-upgrades` | Start of magic challenges (12 magic upgrades) | 5 | none | 40 |
| `05-18-magic-upgrades` | 18 magic upgrades | 6 | none | 40 |
| `06-start-of-uranium-20-magic-upgrades` | Start of uranium (20 magic upgrades) | 7 | none | 43 |
| `07-3-uranium-upgrade-3s-e360-gold-e37-magic` | 3 uranium upgrade 3s (e360 gold, e37 magic) | 7 | none | 48 |
| `08-5-uranium-upgrade-3s-e420-gold-e43-magic` | 5 uranium upgrade 3s (e420 gold, e43 magic) | 7 | none | 48 |
| `09-uranium-upgrade-6-bought-e1000-gold-e100-magic` | Uranium upgrade 6 bought (e1000 gold, e100 magic) | 8 | none | 48 |
| `10-start-of-cyan-sigils-e3500-gold-e450-magic` | Start of cyan sigils (e3500 gold, e450 magic) | 9 | none | 50 |
| `11-cyan-sigil-upgrade-5-bought-10-cyan-sigils` | Cyan sigil upgrade 5 bought (10 cyan sigils) | 10 | none | 66 |
| `12-blue-sigil-upgrade-5-bought-50-cyan-sigils-7-blue-` | Blue sigil upgrade 5 bought (50 cyan sigils, 7 blue sigils) | 11 | none | 119 |
| `13-indigo-sigil-upgrade-5-bought-14-indigo-sigils` | Indigo sigil upgrade 5 bought (14 indigo sigils) | 12 | none | 98 |
| `14-violet-sigil-upgrade-5-bought-11-violet-sigils` | Violet sigil upgrade 5 bought (11 violet sigils) | 13 | none | 114 |
| `15-pink-sigil-upgrade-5-bought-11-violet-sigils` | Pink sigil upgrade 5 bought (11 violet sigils) | 14 | none | 118 |
| `16-30-000-knowledge` | 30,000 knowledge | 15 | 2 | 130 |
| `17-tome-upgrade-5-bought-3e8-knowledge` | Tome upgrade 5 bought (3e8 knowledge) | 16 | 2 | 134 |
| `18-tome-upgrade-8-bought-1e39-knowledge` | Tome upgrade 8 bought (1e39 knowledge) | 17 | 2 | 138 |
| `19-tome-upgrade-10-bought-1e114-knowledge` | Tome upgrade 10 bought (1e114 knowledge) | 17 | 2 | 138 |
| `20-dark-magic-upgrade-14-bought-100-000-000-blood` | Dark magic upgrade 14 bought (100,000,000 blood) | 20 | 2 | 146 |
| `21-start-of-red-sigils` | Start of red sigils | 21 | 3 | 192 |
| `22-200-red-sigils` | 200 red sigils | 21 | 2 | 154 |
| `23-200-orange-sigils` | 200 orange sigils | 22 | 3 | 167 |
| `24-2500-yellow-sigils-1e12-ysp` | 2500 yellow sigils (1e12 YSP) | 23 | 3 | 177 |
| `25-10-holy-tetrahedron-upgrades-bought` | 10 holy tetrahedron upgrades bought | 24 | 3 | 184 |
| `26-7-holy-octahedron-upgrades-bought` | 7 holy octahedron upgrades bought | 26 | 3 | 192 |
| `27-holy-dodecahedrons-unlocked` | Holy dodecahedrons unlocked | 27 | 3 | 194 |
| `28-fire-equalizer-ii-bought` | Fire equalizer II bought | 28 | 3 | 198 |
| `29-18-planets-e1e1000-gold` | 18 planets (e1e1000 gold) | 29 | 3 | 201 |
| `30-77-planets-e1e3000-gold` | 77 planets (e1e3000 gold) | 29 | 3 | 204 |
| `31-12-spores-hypergod-1-defeated` | 12 spores (Hypergod 1 defeated) | 31 | 3 | 212 |
| `32-oganesson-upgrade-2-bought` | Oganesson upgrade 2 bought | 32 | 3 | 215 |
| `33-1-000-000-light-dark-essences-ee1-300-000-gold` | 1,000,000 light/dark essences (ee1,300,000 gold) | 33 | 3 | 223 |
| `34-ee3-500-000-gold` | ee3,500,000 gold | 34 | 3 | 227 |
| `35-ee120-000-000-gold` | ee120,000,000 gold | 35 | 3 | 236 |
| `36-ee800-000-000-gold` | ee800,000,000 gold | 36 | 3 | 240 |
| `37-ee6e9-gold` | ee6e9 gold | 36 | 3 | 240 |
| `38-end-of-the-game-ee1e12-gold` | End of the game (ee1e12 gold) | 37 | 3 | 247 |
