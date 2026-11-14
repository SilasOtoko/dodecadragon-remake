# The interface (Phase 3)

The new interface runs on the engine from Phase 1. It changes how the game looks and is navigated, never what it does.

## Built so far

The first era, unlocks 0–4:

| Tab | What's on it | From the original's panels |
|---|---|---|
| Hoard | Gold, mining, miners, the next gold-bought unlock | DodecaDragons (box 0) |
| Dragon | Your dragon, its name, growing it, fire and fire upgrades | Dragon (3), Fire upgrades (4) |
| Alchemy | Converting gold to platinum, platinum upgrades | Alchemy (5) |
| Magic | Magic resets, magic upgrades, "Unlock more magic upgrades" | Magic (6), Magic upgrades (7) |
| Settings | Save, export, import, confirmations, new game, credits | Settings (1) |

Saves past unlock 4 still load and play, with a notice pointing to the debug page (`#debug`) for the parts not built yet.

## How a screen is put together

```
src/ui/model/*.ts     what to show: visibility, labels, effects, disabled rules (from the original's page code)
src/ui/screens.tsx    how to show it
src/ui/components.tsx shared pieces: ledger entries, hold-to-repeat buttons, toggles, progress bars
src/ui/game.ts        the running engine, autosave, the redraw hook
src/ui/theme.css      design tokens (colour, type)
src/ui/app.css        layout and components
```

The original decided what's visible and clickable in its page code, which the engine doesn't include. Each `model` file re-creates those rules from the original source, with comments pointing at where they came from. **Disabled buttons are gameplay**: some functions rely on the button being disabled to stop at a limit (platinum upgrade 7 accepts up to 20 purchases, but its button disables at 10 until magic upgrade 11). So every disabled rule is copied, and held buttons re-check the rule before each repeat.

`src/parity/display.test.ts` proves the rules: it runs the original with its real page next to the port and compares every first-era button's visibility, disabled state and displayed numbers, after loading each early save and after 120 button presses.

## Matching the original's behaviour

- **Every click recalculates.** The original had `<body onclick="updateSmall()">`. A page-wide click listener does the same, after the button's own action.
- **Held buttons repeat**, like holding Enter on the original's buttons. They repeat 10 times a second after a short delay; the original's Enter repeat ran about 30 times a second, so this is never faster.
- **One-time unlocks appear only when they're next**, as in the original. Pressing one early or twice moves the unlock counter out of order and breaks the save.
- **Saves** use the original's key and format, autosave every 5 seconds, and save codes move between this and the original in both directions.

## Deliberate differences from the original's display

- **Fire upgrade 1 after loading.** The original shows its effect without magic upgrade 14's boost after a save loads, until the next purchase, although production uses the boost. The new interface shows the boosted value the game actually uses.
- **Progress bars** toward unlocks and dragon growth are new. They use a straight fraction for costs up to a billion and a log scale beyond.
- **Default dragon name.** The original shows "Unnamed dragon" until renamed; the new interface shows the stage title (for example "Elder dragon") instead.

## Not done yet

- Confirmations ("Are you sure you want to perform a magic reset?") still use the browser's own pop-up. An in-page confirmation needs the engine's confirm to become asynchronous; worth doing as one change across all resets.
- Alegreya loads from Google Fonts. To play offline, self-host it like Alagard.
- Later eras: magic challenges and uranium are next.

## Design

Pixel art set on an illuminated manuscript: parchment leaves, iron-gall ink, the original's dragon green for buying, wax-seal red for resets, gilt for gold. Alagard (the original's pixel font) for headings and the gold count; Alegreya for everything else, with tabular figures. On phones the resource ledger is pinned at the top with gold on its own line, and tabs sit at the bottom; from 900 px wide both move into a left sidebar. There's a candlelit dark version of the same palette.
