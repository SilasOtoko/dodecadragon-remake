# Timing, randomness and quirks

Keeping gameplay identical means copying how the original advances time, including its oddities. Everything here comes from `reference/original/scripts/script.js` unless noted.

## The loops

| Loop | Interval | What it does |
|---|---|---|
| `updateLarge()` | 500 ms | Adds resources (see "Two kinds of gain" below), counts down cooldowns, runs auto-buyers, cycles nuclear pasta, checks unlock 30, then calls `updateSmall()` and `checkAchievements()`. |
| `updateSmall()` | 150 ms, at the end of every `updateLarge`, and after **every click anywhere on the page** (`<body onclick="updateSmall()">`) | Recalculates every rate and multiplier (gold/s, fire/s, "to get" amounts, effects), sets `game.lastUpdate = Date.now()`, and updates the page. Most of the formula code is here. |
| `timePlayedUp()` | 100 ms | Adds real elapsed time to `game.timePlayed`. |
| `save()` | 5 s | Writes `localStorage.dodecaSave` and `dodecaLastSaved`. |

The engine runs the ported loops on the same schedule (`Engine.attach`), and `Engine.press()` runs the extra `updateSmall` after every action, like the page's body click handler. Order matters: some formulas read values the previous recalculation produced. For example, gold/s uses `platinumUpgrade6Effect`, which is only computed further down `updateSmall`, so it's always the previous pass's value.

## Two kinds of gain

Most resources grow by **rate × real time**: `amount += perSecond / timeDivider`, where `timeDivider = 1000 / ms since the last updateLarge`. Gold, fire, magic (with the 100% achievement), sigil power, blue fire, blood, holy fire, plague, the essences, oganesson, and auto-gained uranium, plutonium, red/orange/yellow sigils and polyhedrons work this way.

Some gains are a **fixed amount per tick**, whatever time passed:

| Gain per `updateLarge` | Condition |
|---|---|
| Platinum: `max(bestPlatinumToGet / 20, 2)` | unlock 3+ |
| Uranium: `max(bestUraniumToGet / 20, 1)` | unlock 7+ |
| Plutonium: `max(bestPlutoniumToGet / 20, 0)` | unlock 20+ |
| Magic: `magicToGet / 100` | magic achievement tier 6–7 |
| Cyan to pink sigils: `toGet / 20` | blue fire achievement tier 1+ |
| Knowledge: a full trade's reward / 2 | plutonium achievement tier 1+ |
| Holy tetrahedrons: 0.5 | octahedron upgrade 5 |

So when a browser throttles a background tab, these slow down while rate-based gains keep up.

## Cooldowns count ticks, not seconds

Cooldowns drop by a fixed 0.5 on every `updateLarge` call, whatever time actually passed:

| Cooldown | Starts at | Field |
|---|---|---|
| Platinum convert | 3 | `platinumConvertCooldown` |
| Uranium convert | 3 | `uraniumConvertCooldown` |
| Plutonium convert | 3 | `plutoniumConvertCooldown` |
| Spend time with dragon | 30 | `dragonTimeCooldown` |
| Nuclear pasta state change | 30 (resets to 30, then picks a new state) | `nuclearPastaCooldown` |

When a browser throttles background tabs to about one tick per second, a 30 s cooldown takes about 60 s while gold still accrues correctly. Keep both behaviours.

## No offline progress

Loading a save sets `lastUpdate` to now (`loadGame`, with the comment "will want to tweak this if offline progress is ever added!"). Time with the tab closed earns nothing. The remake must not add offline gains.

The original also calls nothing on `visibilitychange`, so a backgrounded tab keeps ticking at whatever rate the browser allows. Rate-based gains keep roughly full speed there; per-tick gains and cooldowns slow down.

## Randomness

Only two systems use `Math.random()`:

- **Knowledge trades** (`knowledge.js` `randomizeKnowledgeTrade`): picks which three sigil colours a trade costs and four random multipliers.
- **Nuclear pasta** (`nuclearPasta.js` `setNuclearPastaState`): picks the next pasta state, re-rolling until it differs from the current one.

For the parity harness, inject a seeded random function into both the original (by stubbing `Math.random`) and the port, so runs are reproducible.

## Wall-clock reads

- `dragon.js` "Spend time with your dragon": `1 + floor((Date.now() - game.lastUpdate) / 30000)`. Since `updateSmall` sets `lastUpdate` every 150 ms, this is effectively always 1 (then multiplied by bonuses). Keep the formula as written.
- `sigils.js` sigil resetter "Seconds since reset" mode reads `Date.now() - game.lastSigilReset`.
- The "auto save not detected" warning appears when `dodecaLastSaved` is more than 60 s old.

## Save-format quirks

- Arrays load element by element into the default array, so they can only grow. `unlockedAchievements` starts with 11 slots in `reset()`, but late saves have 25.
- Older saves keep legacy keys (`cyanSigilUpgrade1Bought` and similar, `knowledgeTrade4Amounts`, `nuclearPastaStateInfoTime`, even a key literally named `undefined`). The loader copies them through, and they're re-exported. The port does the same so exports stay compatible both ways.
- The v0.5 migration writes a 3-slot `pinkSigilUpgradesBought` into a 4-slot default, so a migrated save gains a 4th slot on its next load. Harmless, and the port matches it.
- `dragonName` is the only string field. Every other string in a save becomes a Decimal.

## Number library

The original bundles an older build of break_eternity.js whose math differs from the current npm release (v2.1.3). Some functions even have opposite signs in their approximation terms. The remake vendors the original file unchanged in `src/vendor/break_eternity.js`. Don't swap it for the npm package.

## Desktop-only behaviour to rethink for mobile

These are input or UI behaviours, not gameplay, so they can change:

- Hold Enter to repeat the last button pressed. This is the browser re-pressing the focused button, mentioned in the Info panel; there's no code for it.
- Hotkeys for most actions (`hotkeys.js`, via Mousetrap; the list is built by `generateHotkeyText`).
- Tab key disabled globally.
- The original detects mobile and shows on-screen arrow buttons to pan the map.
- Hover tooltips for challenges and achievements.
