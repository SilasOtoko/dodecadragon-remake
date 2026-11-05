# Unlock order

The original tracks progress with one number, `game.unlocks`. Each unlock calls `addUnlock()`, which adds 1, so the order below is fixed. Much of the code checks `game.unlocks >= N` to decide what is visible or active. The remake should drive navigation (which tabs exist) from this number.

"Panel" is the original's window title. In the new UI each panel becomes a screen or a section of a tab.

| # | How it unlocks | Requirement | Reveals | Source |
|---|---|---|---|---|
| 0 | New game | none | DodecaDragons (gold, miners), Settings, Resources | `script.js` `reset()` |
| 1 | "Get a young dragon" | 200 gold | Dragon panel; fire resource | `dragon.js` `unlockDragon()` |
| 2 | "Unlock fire upgrades" (on the dragon panel) | 5,000 gold | Fire upgrades; first dragon-ageing button | `fire.js` `buyFireUpgrades()` |
| 3 | "Unlock Alchemy" | 2e7 gold | Alchemy (platinum) | `alchemy.js` `unlockAlchemy()` |
| 4 | "Unlock Magic" | 1e15 gold | Magic, Magic upgrades | `magic.js` `unlockMagic()` |
| 5 | Magic upgrade 12 | 400,000 magic | Magic challenges; magifolds; "Unlock more magic upgrades" button | `magic.js` `buyMagicUpgrade(12)` |
| 6 | "Unlock more magic upgrades" | 2e8 magic and 150,000 magifolds | Magic upgrades 13–20 | `magic.js` `unlockMoreMagicUpgrades()` |
| 7 | Magic upgrade 20 | 1e16 magic | Alchemy II (uranium); "Gain more platinum and uranium upgrades" button | `magic.js` `buyMagicUpgrade(20)` |
| 8 | "Gain more platinum and uranium upgrades" | e420 gold | Extra platinum and uranium upgrades | `alchemy.js` `morePUupgrades()` |
| 9 | "Unlock Dark Magic Upgrades" | e1,000 gold | Dark magic upgrades 1–8 | `magic.js` `unlockDarkMagicUpgrades()` |
| 10 | Dark magic upgrade 8 | e360 magic | Cyan sigils; "Peep the horror" side tab | `magic.js` `buyDarkMagicUpgrade(8)` |
| 11 | Cyan sigil upgrade 4 | 20,000 CSP | Blue sigils | `sigils.js` `buyCyanSigilUpgrade(4)` |
| 12 | Blue sigil upgrade 4 | 10,000 BSP | Indigo sigils | `sigils.js` `buyBlueSigilUpgrade(4)` |
| 13 | Indigo sigil upgrade 4 | 20,000 ISP | Violet sigils | `sigils.js` `buyIndigoSigilUpgrade(4)` |
| 14 | Violet sigil upgrade 4 | 1e7 VSP | Pink sigils | `sigils.js` `buyVioletSigilUpgrade(4)` |
| 15 | Pink sigil upgrade 4 | 1e8 PSP | Knowledge | `sigils.js` `buyPinkSigilUpgrade(4)` |
| 16 | Knowledge upgrade 3 | 100,000 knowledge | Tomes; next dragon-ageing button | `knowledge.js` `buyKnowledgeUpgrade(3)` |
| 17 | Tome upgrade 6 | 20 tomes | Blue fire | `knowledge.js` `buyTomeUpgrade(6)` |
| 18 | "UNLOCK BLOOD" | e5e14 gold | Blood and hell; tome upgrades 11–14 | `blood.js` `unlockBlood()` |
| 19 | "Unlock more dark magic upgrades" | e6.66e16 gold | Dark magic upgrades 9–20 | `magic.js` `moreDarkMagicUpgrades()` |
| 20 | Tome upgrade 12 | 2,250 tomes, needs dark magic upgrade 11 | Alchemy III (plutonium) | `knowledge.js` `buyTomeUpgrade(12)` |
| 21 | Tome upgrade 13 | 2,800 tomes, needs unlock 20 | Red sigils; "Red" in the sigil resetter | `knowledge.js` `buyTomeUpgrade(13)` |
| 22 | Red sigil upgrade 4 | 1e7 RSP | Orange sigils | `sigils.js` `buyRedSigilUpgrade(4)` |
| 23 | Orange sigil upgrade 4 | 1e7 OSP | Yellow sigils | `sigils.js` `buyOrangeSigilUpgrade(4)` |
| 24 | Yellow sigil upgrade 4 | 1e12 YSP | Holy tetrahedrons, tetrahedron tree | `sigils.js` `buyYellowSigilUpgrade(4)` |
| 25 | Tetrahedron upgrade 11 | 50 tetrahedrons | Holy octahedrons, octahedron tree | `holyPolyhedrons.js` `buyHolyTetrahedronUpgrade(11)` |
| 26 | Tetrahedron upgrade 12 | 2,000 tetrahedrons | Holy fire | `holyPolyhedrons.js` `buyHolyTetrahedronUpgrade(12)` |
| 27 | "Unlock Void Magic Upgrades" | e1e100 gold and 1e8 holy fire | Void magic upgrades | `magic.js` `unlockVoidMagicUpgrades()` |
| 28 | Void magic upgrade 4 | e1.65e10 magic | Holy dodecahedrons, dodecahedron tree | `magic.js` `buyVoidMagicUpgrade(4)` |
| 29 | "Unlock Planets" | e1e400 gold | Planets | `planets.js` `unlockPlanets()` |
| 30 | Automatic, checked each tick | e1e5000 gold while at unlock 29 | The Omniversal Hypergods | `script.js` `updateLarge()` |
| 31 | Void magic upgrade 16 | e4.25e13 magic | Cosmic plague; next dragon-ageing button | `magic.js` `buyVoidMagicUpgrade(16)` |
| 32 | Void magic upgrade 17 | e3.75e16 magic | Alchemy IV (oganesson); "Unlock Light and Dark Essences" button | `magic.js` `buyVoidMagicUpgrade(17)` |
| 33 | "Unlock the Light and Dark Essences" | ee500,000 gold | Light essence, dark essence | `essence.js` `unlockEssences()` |
| 34 | "Unlock Death Essence" | ee1.5e6 gold | Death essence | `essence.js` `unlockDeathEssence()` |
| 35 | "Unlock Nuclear Pasta" | ee3.5e6 gold | Nuclear pasta (states start cycling) | `nuclearPasta.js` `unlockNuclearPasta()` |
| 36 | "Unlock Finality Essence" | ee1.5e8 gold | Finality essence | `essence.js` `unlockFinalityEssence()` |
| 37 | "Unlock Finality Cubes" | ee7.5e9 gold | Finality cubes | `essence.js` `unlockFinalityCubes()` |
| end | "Become the omniverse." | ee1e12 gold | Ending screen with total time | `script.js` `bigFinish()` |

Requirements for unlocks bought as upgrades come from the upgrade cost tables (`constants.js` and the cost text in `index.html`). Spot-check them against the code during the Phase 1 port.

## Panels not tied to the counter

- The original has a row of side tabs that overlay the map: Resources, Settings, Achievements, Info/credits, and "Peep the horror" (LIVE HORROR CAM), which appears at unlock 10 (`changeTab()` in `script.js`). All but the horror cam are always available.
- **Sigil Automation** appears once achievement row 10 reaches tier 2 (`unlockedAchievements[10] > 1`, `achievements.js`).
- Many automation features (auto max-all, auto-gaining resources) are gated by **achievement tiers**, not by unlocks. Those checks look like `game.unlockedAchievements[row] > tier` and are spread through `updateSmall()` and `updateLarge()`. The Phase 1 port has to keep each one.

## Known quirk

In older versions unlocks 20 and 21 could be reached out of order. `fixSaveVersion()` repairs those saves (version < 3). The port keeps that repair (`src/engine/save.ts`).

## Panel index map (for reading the original code)

The original shows and hides panels with `getElementsByClassName("box")[n]`. This is what each index means:

| n | Panel | n | Panel | n | Panel |
|---|---|---|---|---|---|
| 0 | DodecaDragons (main) | 16 | Pink sigils | 32 | Octahedron tree |
| 1 | Settings | 17 | Achievements | 33 | Holy fire |
| 2 | Resources | 18 | Achievement popup | 34 | Void magic |
| 3 | Dragon | 19 | Knowledge | 35 | Holy dodecahedrons |
| 4 | Fire upgrades | 20 | Sigil automation | 36 | Dodecahedron tree |
| 5 | Alchemy (platinum) | 21 | Tomes | 37 | Planets |
| 6 | Magic | 22 | Blue fire | 38 | Hypergods |
| 7 | Magic upgrades | 23 | Blood | 39 | Cosmic plague |
| 8 | Magic challenges | 24 | Alchemy III (plutonium) | 40 | Alchemy IV (oganesson) |
| 9 | Alchemy II (uranium) | 25 | Red sigils | 41 | Light essence |
| 10 | Dark magic | 26 | Orange sigils | 42 | Dark essence |
| 11 | Cyan sigils | 27 | Info/credits | 43 | Death essence |
| 12 | Blue sigils | 28 | Yellow sigils | 44 | Nuclear pasta |
| 13 | Indigo sigils | 29 | Holy tetrahedrons | 45 | Finality essence |
| 14 | Violet sigils | 30 | Tetrahedron tree | 46 | Finality cubes |
| 15 | LIVE HORROR CAM | 31 | Holy octahedrons | | |
