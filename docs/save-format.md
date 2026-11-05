# Save format

The remake reads and writes saves exactly like DodecaDragons v1.0.1, so players can move a save between the original and the remake in either direction.

## Where saves live

| Key | Contents |
|---|---|
| `localStorage.dodecaSave` | `JSON.stringify(game)`. Decimals serialize to strings via break_eternity's `toJSON`. |
| `localStorage.dodecaLastSaved` | Timestamp of the last save, used for the "auto save not detected" warning. |

Autosave runs every 5 seconds.

## Export and import

- **Export** = `btoa(JSON.stringify(game))`, a base64 string.
- **Import** = `JSON.parse(atob(text))`, then the same load routine as a normal load.

## Load rules (`loadGame` in the original, `loadSave` in `src/engine/save.ts`)

1. Start from a brand-new game (`reset()` / `createInitialState()`).
2. Remember the save's `lastMajorChangeVersion`, then set it to 3.
3. For every key in the save (skipping values equal to the string `"undefined"`):
   - a string, except `dragonName`, becomes a Decimal
   - an array that also exists in the new game is copied element by element (strings become Decimals), so arrays keep extra elements
   - anything else is copied as-is, including keys the game no longer declares
4. Set `lastUpdate` to now. There is no offline progress.
5. If the save's version was missing or below 3, run `fixSaveVersion` (three migrations from v0.5.0 to v0.7.3).

After this the original also refreshes the whole page to match the loaded state. In the remake that's the UI's job: it reads state and renders it.

## Fields

All 237 fields, grouped by system with defaults: [save-fields.md](save-fields.md). The typed version is `GameState` in `src/engine/state.ts`. Both files are generated from the original `reset()` by `tools/gen-state.cjs`. Regenerate them rather than editing by hand:

```sh
node tools/extract-reset.cjs reference/original > tools/reset-fields.json
node tools/gen-state.cjs tools/reset-fields.json src/engine/state.ts docs/save-fields.md
```

The grouping by system lives in `SYSTEMS` in `tools/gen-state.cjs`. A field that matches no group stops the generator with an error.

## Proof

`src/engine/save.test.ts` evaluates the original's own `reset()`, `loadGame()` and `fixSaveVersion()` source and checks the port against it for all 38 saves in `reference/saves/`. It also checks that our export re-imports the same way the original would. All tests pass.
