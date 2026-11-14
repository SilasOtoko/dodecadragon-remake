# The engine (Phase 1)

The remake's game logic is the original's game logic, translated into TypeScript by a tool and proven identical by tests that run the original side by side with the port.

## Why a translation tool instead of a hand rewrite

The original is about 5,900 lines where almost every function mixes math with page updates, and many formulas depend on statement order and on globals left over from earlier calls. A hand rewrite would take many sessions and would be easy to get subtly wrong. So the port happens in two mechanical steps, each checked against the original:

```
reference/original/scripts   the original game, unmodified
        │  tools/strip-dom.cjs   removes the ~1,700 statements that only update the page
        ▼
reference/stripped           same logic, no page updates   ← proven identical: src/parity/stripped.test.ts
        │  tools/port-engine.cjs translates to TypeScript modules
        ▼
src/engine/generated         the engine's game logic         ← proven identical: src/parity/port.test.ts
```

Both steps regenerate from scratch:

```sh
npm run gen:engine
```

## What the translation changes

Inside every ported function:

| Original | Port |
|---|---|
| `game` | `g.state` (the engine's save data) |
| a call to another game function `fn(x)` | `fn(g, x)` |
| undeclared globals (temporaries, cached effects, even loop counters like `i`) | `g.rt.name`, so values carry over between calls exactly as before |
| `Date.now()`, `Math.random()` | `g.now()`, `g.random()` (controllable for tests) |
| `confirm()`, `alert()` | `g.confirm()`, `g.alert()` (the UI decides how to ask) |
| `document.getElementById(id).value` and similar form reads | `g.input(id, prop)` |
| `arguments[1]` | the original argument list without the engine |

Everything else (the formulas, the order, the oddities) is untouched. The generated files have type checking turned off because they're the original JavaScript; the tests are what guarantee them.

## Hand-written parts

| File | What it replaces |
|---|---|
| `src/engine/engine.ts` | The page: start-up order, the three loops, the click handler that recalculates after every action, form fields, pop-up confirmations |
| `src/engine/achievements.ts` | Achievement checks. In the original an achievement can only be earned if its box exists on the page; this models which boxes exist |
| `src/engine/format.ts` | Number formatting (tested against the original's output for 3,500+ real values) |
| `src/engine/state.ts`, `constants.ts`, `src/content/text.ts` | Generated from the original's data |

## Using the engine

```ts
import { Engine } from './engine/engine';
import { Scheduler } from './engine/scheduler';
import { buyMiner } from './engine/generated/gold';

const engine = new Engine({ confirm: (msg) => window.confirm(msg) });
engine.boot(savedJsonOrNull);           // same start-up sequence as the original page
engine.attach(scheduler);               // 150 ms / 500 ms / 100 ms loops
engine.press(buyMiner);                 // an action, plus the recalculation every click caused
engine.on((e) => { /* achievement earned, etc. */ });
```

`engine.state` holds every value the UI needs to show: amounts, rates (`goldPerSecond`), "to get" amounts, costs and upgrade counts.

Form fields: the original read some values straight from the page (hell layer dropdown, knowledge trade level slider, sigil resetter settings, dragon name). `engine.input()` returns what the original page would have shown, derived from state. When the player changes a field, the UI sets `engine.inputs[id][prop]` and then presses the matching action, as the page's change handler did.

## How parity is tested

`src/parity/port.test.ts` boots the original in jsdom and the engine on the same simulated clock and random seed, from a new game and from each of the 38 test saves. For each run it:

1. compares every field of the state after loading,
2. plays 20 seconds idle, comparing every 5 seconds,
3. makes 400 button presses, comparing after every one.

Presses are limited to what a player could actually press at that moment: buttons that are visible and enabled on the original's page (`clickable()` in `src/parity/originalGame.ts`), preferring ones not pressed yet in that run. Pressing hidden buttons isn't a fair test, because the original relies on hiding them. For example, pressing "Unlock Magic" again after unlocking it pushes the unlock counter past 37 and crashes the original. At the end the test prints how many of the original's buttons were pressed across all runs, and which never became pressable.

To check the test can fail, a 0.05% change to one gold formula was introduced on purpose; it was caught within 5 seconds of idle play.

**Not covered yet:** the form-field actions (hell layer, knowledge level, sigil resetter settings, dragon name), which the original runs on change events rather than clicks; the hotkey-only "time stop"; and very long sessions.

## Display-only behaviour left for the UI

- The original's dragon easter egg: Ctrl-click swaps the art; a plain click sent the player's IP address to db-ip.com to show a joke message. The remake should probably drop the IP lookup.
- The Achievements tab flash: the engine sets `achievementFlashActive`; `engine.setTab(3)` clears it.
- The autosave warning, sounds, panning and the camera pan in the ending.
