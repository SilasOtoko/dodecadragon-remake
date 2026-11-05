# DodecaDragons (remake)

A mobile-friendly remake of [DodecaDragons](https://demonin.com/games/dodecaDragons/) by Demonin, with a fantasy/parchment interface. **The gameplay is unchanged.** Every formula, cost and unlock comes from the original v1.0.1 code, and saves move between the original and the remake in both directions.

## Status

**Phase 0 done:** project set up and the original mapped.

- [docs/unlock-order.md](docs/unlock-order.md): all 37 unlocks, what triggers each and what it reveals
- [docs/save-format.md](docs/save-format.md): how saves, export and import work, plus [every field](docs/save-fields.md)
- [docs/timing-and-quirks.md](docs/timing-and-quirks.md): the tick loops, cooldowns, randomness and other behaviour to preserve
- [reference/saves/](reference/saves/README.md): 38 test saves, from Alchemy to the ending

**Next, Phase 1:** port the game logic into `src/engine/` with no UI, proving each system against the original.

## Layout

```
src/engine/    game logic, no DOM (state.ts is generated; save.ts is ported)
src/vendor/    the original's break_eternity.js build (don't replace it with npm's)
src/           React UI (a placeholder until Phase 3)
public/        art and fonts from the original
reference/     unmodified copy of the original game, plus test saves
tools/         scripts that extract data from the original
docs/          what Phase 0 found
```

## Commands

```sh
npm install
npm run dev        # local dev server
npm test           # parity tests against the original code
npm run build      # typecheck and production build
npm run gen:state  # regenerate src/engine/state.ts and docs/save-fields.md from the original
```

## Credits

DodecaDragons was created by **Demonin**, co-developed by **Cornucanis**, with additional spriting by **Zaxolotl**. The original is MIT-licensed: [github.com/DemoninCG/DodecaDragons](https://github.com/DemoninCG/DodecaDragons). Art and fonts in `public/` and everything in `reference/original/` are theirs. break_eternity.js is by Patashu (MIT).
