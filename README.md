# DodecaDragons (remake)

A mobile-friendly remake of [DodecaDragons](https://demonin.com/games/dodecaDragons/) by Demonin, with a fantasy/parchment interface. **The gameplay is unchanged.** Every formula, cost and unlock comes from the original v1.0.1 code, and saves move between the original and the remake in both directions.

## Status

**Phase 0 done:** project set up and the original mapped.

- [docs/unlock-order.md](docs/unlock-order.md): all 37 unlocks, what triggers each and what it reveals
- [docs/save-format.md](docs/save-format.md): how saves, export and import work, plus [every field](docs/save-fields.md)
- [docs/timing-and-quirks.md](docs/timing-and-quirks.md): the tick loops, cooldowns, randomness and other behaviour to preserve
- [reference/saves/](reference/saves/README.md): 38 test saves, from Alchemy to the ending

**Phase 1 (engine) working:** the whole game runs in `src/engine/` with no page, and matches the original exactly in side-by-side tests from a new game and all 38 saves. See [docs/engine.md](docs/engine.md) for how it's built and tested, and what's not covered yet.

**Phase 3 (interface) started:** the first era (gold, dragon, fire, alchemy, magic) is playable in the new parchment interface, checked screen by screen against the original's own page. See [docs/ui.md](docs/ui.md).

**Play it:** `npm run dev`, then open the address it prints. The engine debug page is at `#debug` (for example http://localhost:5173/#debug) and covers the whole game, including the parts the new interface doesn't have yet.

## Layout

```
src/engine/            the game engine (no page)
  engine.ts            start-up, loops, actions, form fields (hand-written)
  achievements.ts      achievement checks (hand-written)
  generated/           the original's game logic, translated by tools/port-engine.cjs
  state.ts, constants.ts, format.ts, save.ts
src/content/text.ts    names and descriptions from the original
src/parity/            the original-vs-port test harness
src/ui/                the new interface (see docs/ui.md)
src/debug/             the engine debug page (#debug)
src/vendor/            the original's break_eternity.js build (don't replace it with npm's)
src/main.tsx           app entry: the game, or the debug page at #debug
public/                art and fonts from the original
reference/original/    unmodified copy of the original game
reference/stripped/    the original minus page updates (generated, for reading)
reference/saves/       test saves
tools/                 scripts that extract and translate the original
docs/                  findings and design notes
```

## Commands

```sh
npm install
npm run dev        # local dev server
npm test           # everything, including the full parity runs (slow: tens of minutes)
npm run test:quick # engine unit tests only (seconds)
npm run build      # typecheck and production build
npm run gen:state  # regenerate src/engine/state.ts and docs/save-fields.md from the original
npm run gen:engine # regenerate constants, reference/stripped and src/engine/generated
```

## Credits

DodecaDragons was created by **Demonin**, co-developed by **Cornucanis**, with additional spriting by **Zaxolotl**. The original is MIT-licensed: [github.com/DemoninCG/DodecaDragons](https://github.com/DemoninCG/DodecaDragons). Art and fonts in `public/` and everything in `reference/original/` are theirs. break_eternity.js is by Patashu (MIT).
