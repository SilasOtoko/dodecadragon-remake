import { useRef, useState } from 'react';
import { format } from '../engine/format';
import { act, renameDragon, useGame } from './game';
import {
  Amount,
  AutoToggle,
  HoldButton,
  Icon,
  Leaf,
  Ledger,
  Progress,
} from './components';
import { minerView, nextGoldUnlock, progress } from './model/hoard';
import { dragonView } from './model/dragon';
import { fireView } from './model/fire';
import { alchemyView } from './model/alchemy';
import { magicView } from './model/magic';
import type { NextUnlock } from './model/hoard';

function UnlockCard({ unlock }: { unlock: NextUnlock }) {
  const g = useGame();
  const have = g.state[unlock.need.field];
  const p = progress(have, unlock.need.amount);
  const ready = have.gte(unlock.need.amount);
  return (
    <div className={`unlock ${ready ? 'unlock-ready' : ''}`}>
      <div className="unlock-text">
        <strong>{unlock.title}</strong>
        <span>
          Costs{' '}
          <Amount value={unlock.need.amount} resource={unlock.need.resource} />
        </span>
        <Progress
          value={p}
          label={`Progress toward ${unlock.title.toLowerCase()}`}
        />
      </div>
      <button
        type="button"
        className="price"
        disabled={!ready}
        onClick={() => act(unlock.press)}
      >
        Unlock
      </button>
    </div>
  );
}

export function HoardScreen() {
  const g = useGame();
  const s = g.state;
  const miner = minerView(s);
  const next = nextGoldUnlock(s);

  type Toast = { id: number; x: number; y: number; text: string };
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  function showMouseToast(
    e: React.MouseEvent<HTMLButtonElement>,
    text: string,
  ) {
    // Keyboard presses (Enter/Space) have no mouse position, so use the button's centre instead.
    let x = e.clientX;
    let y = e.clientY;
    if (e.detail === 0) {
      const r = e.currentTarget.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top;
    }
    const id = nextToastId.current++;
    setToasts((list) => [...list, { id, x, y, text }]);
  }

  const removeToast = (id: number) =>
    setToasts((list) => list.filter((t) => t.id !== id));

  return (
    <>
      <section className="hoard">
        <p className="text-3xl md:text-4xl">Your hoard</p>
        <p className="hoard-amount flex gap-2">
          <Icon src="img/iconGoldCoins.png" size={20} />
          {format(s.gold, 0)}
        </p>
        <p className="hoard-rate">
          <span>
            <strong>{format(s.goldPerSecond, 0)}</strong> a second
          </span>
          <span>
            <strong>{format(s.goldPerClick, 0)}</strong> a dig
          </span>
        </p>
        <HoldButton
          call="produceGold()"
          className="bg-dragon-200 dark:bg-dragon-100 rounded px-8 py-4 text-2xl mt-4 flex gap-3 text-outline hover:cursor-pointer button-shadowed--green"
          onClick={(e) => showMouseToast(e, format(s.goldPerClick, 0))}
        >
          <Icon src="img/iconGoldCoins.png" size={32} />
          Mine gold
        </HoldButton>
        {toasts.map((t) => (
          <div
            key={t.id}
            className="fixed pointer-events-none z-50 flex gap-2 animate-fade-out-up"
            style={{ left: t.x + 24, top: t.y - 12 }}
            aria-hidden="true"
            onAnimationEnd={() => removeToast(t.id)}
          >
            <Icon src="img/iconGoldCoins.png" size={20} />
            <span className="[text-shadow:0_2px_2px_rgb(0_0_0_/1)]">
              +{t.text}
            </span>
          </div>
        ))}
      </section>

      <Leaf
        title="Miners"
        aside={<span className="muted">{format(s.miners, 0)} hired</span>}
      >
        <p className="muted">Each miner digs gold for you every second.</p>
        <div className="row mt-4">
          <HoldButton
            call="buyMiner()"
            disabled={miner.disabled}
            allowed={miner.allowed}
            className={`price price-wide rounded px-8 py-4 flex gap-3 text-outline hover:not-disabled:cursor-pointer transition duration-200 ${miner.disabled ? 'button-shadowed--disabled' : 'button-shadowed'}`}
          >
            <span>Hire a miner</span>
            <Amount value={miner.cost} resource="gold" name={false} />
          </HoldButton>
          <button
            type="button"
            className="price"
            onClick={() => act('buyMaxMiners()')}
          >
            Hire max
          </button>
        </div>
        {miner.showAuto && (
          <AutoToggle call="minerAutoBuyMax()" on={miner.autoOn}>
            Hire max automatically
          </AutoToggle>
        )}
      </Leaf>

      {next && (
        <Leaf title="Next discovery">
          <UnlockCard unlock={next} />
        </Leaf>
      )}
    </>
  );
}

const DEFAULT_DRAGON_NAME = 'Unnamed dragon';

export function DragonScreen() {
  const g = useGame();
  const s = g.state;
  const d = dragonView(s);
  const fire = fireView(s);
  const named = s.dragonName && s.dragonName !== DEFAULT_DRAGON_NAME;
  return (
    <>
      <Leaf className="dragon">
        <div>
          <Icon src={d.img} size={96} alt={d.title} />
        </div>
        <div className="dragon-text mt-2">
          <div className="flex gap-2">
            <h2 className="font-display">{named ? s.dragonName : d.title}</h2>
            <span
              className="dragon-stage inline-block rounded bg-wax w-6 aspect-square text-center font-bold"
              aria-label={`Stage ${s.dragonStage}`}
            >
              {d.numeral}
            </span>
          </div>
          {named && <p className="muted">{d.title}</p>}
          <p>{d.info}</p>
          {s.unlocks >= 2 && (
            <p>
              Your fire multiplies miner production by{' '}
              <strong>×{format(d.fireGoldMultiplier, 2)}</strong>
            </p>
          )}
          <label className="field" htmlFor="dragonName">
            Name your dragon
          </label>
          <input
            id="dragonName"
            className="text-input"
            defaultValue={named ? s.dragonName : ''}
            placeholder={DEFAULT_DRAGON_NAME}
            maxLength={40}
            onChange={(e) =>
              renameDragon(e.target.value || DEFAULT_DRAGON_NAME)
            }
          />
        </div>
      </Leaf>

      {d.ageing && (
        <Leaf title="Grow your dragon">
          <div className="unlock">
            <div className="unlock-text">
              <strong>{d.ageing.title}</strong>
              <span>{d.ageing.effect}</span>
              <span>
                Costs <Amount value={d.ageing.cost} resource="gold" />
              </span>
              <Progress
                value={progress(s.gold, d.ageing.cost)}
                label="Progress toward the next dragon stage"
              />
            </div>
            <button
              type="button"
              className="price"
              disabled={!s.gold.gte(d.ageing.cost)}
              onClick={() => act(d.ageing!.press)}
            >
              Grow
            </button>
          </div>
        </Leaf>
      )}

      {d.unlockFire && (
        <Leaf title="Fire upgrades">
          <div className="unlock">
            <div className="unlock-text">
              <strong>{d.unlockFire.title}</strong>
              <span>
                Costs <Amount value={d.unlockFire.cost} resource="gold" />
              </span>
              <Progress
                value={progress(s.gold, d.unlockFire.cost)}
                label="Progress toward fire upgrades"
              />
            </div>
            <button
              type="button"
              className="price"
              disabled={!s.gold.gte(d.unlockFire.cost)}
              onClick={() => act(d.unlockFire!.press)}
            >
              Unlock
            </button>
          </div>
        </Leaf>
      )}

      {s.unlocks >= 2 && (
        <Leaf
          title="Fire"
          aside={<Amount value={s.fire} resource="fire" name={false} />}
        >
          <p className="muted">
            <Amount value={s.firePerSecond} resource="fire" /> a second
          </p>
          <div className="mt-4">
            <Ledger upgrades={fire.upgrades} />
          </div>
          {(fire.showMaxAll || fire.showAuto) && (
            <div className="row">
              {fire.showMaxAll && (
                <button
                  type="button"
                  className="price"
                  onClick={() => act('fireMaxAll()')}
                >
                  Max all
                </button>
              )}
              {fire.showAuto && (
                <AutoToggle call="fireAutoMaxAll()" on={fire.autoOn}>
                  Max all automatically
                </AutoToggle>
              )}
            </div>
          )}
        </Leaf>
      )}
    </>
  );
}

export function FireScreen() {
  const g = useGame();
  const s = g.state;
  const fire = fireView(s);
  return (
    <>
      {s.unlocks >= 2 && (
        <Leaf
          title="Fire"
          aside={<Amount value={s.fire} resource="fire" name={false} />}
        >
          <p className="muted">
            <Amount value={s.firePerSecond} resource="fire" /> a second
          </p>
          <div className="mt-4">
            <Ledger upgrades={fire.upgrades} />
          </div>
          {(fire.showMaxAll || fire.showAuto) && (
            <div className="row">
              {fire.showMaxAll && (
                <button
                  type="button"
                  className="price"
                  onClick={() => act('fireMaxAll()')}
                >
                  Max all
                </button>
              )}
              {fire.showAuto && (
                <AutoToggle call="fireAutoMaxAll()" on={fire.autoOn}>
                  Max all automatically
                </AutoToggle>
              )}
            </div>
          )}
        </Leaf>
      )}
    </>
  );
}

export function AlchemyScreen() {
  const g = useGame();
  const a = alchemyView(g);
  return (
    <>
      <Leaf
        title="Alchemy"
        aside={<Amount value={a.platinum} resource="platinum" name={false} />}
      >
        <p>
          Turn your gold into platinum. Your gold is spent; everything else
          stays.
        </p>
        <button
          type="button"
          className="reset"
          disabled={a.convertDisabled}
          onClick={() => act('platinumConvert()')}
        >
          <span>Convert all gold</span>
          <span>
            into <Amount value={a.toGet} resource="platinum" />
          </span>
          {a.cooldown > 0 && (
            <span className="muted">Ready in {format(a.cooldown, 0)}</span>
          )}
        </button>
        <p className="muted">
          You also gain <Amount value={a.extraPerSecond} resource="platinum" />{' '}
          every second.
        </p>
      </Leaf>
      <Leaf title="Platinum upgrades">
        <Ledger upgrades={a.upgrades} />
        {a.showMaxAll && (
          <div className="row">
            <button
              type="button"
              className="price"
              onClick={() => act('platinumMaxAll()')}
            >
              Max all
            </button>
          </div>
        )}
      </Leaf>
    </>
  );
}

export function MagicScreen() {
  const g = useGame();
  const m = magicView(g);
  return (
    <>
      <Leaf
        title="Magic"
        aside={<Amount value={m.magic} resource="magic" name={false} />}
      >
        {m.hardcapped && (
          <p className="warn">Your magic has hit its hardcap.</p>
        )}
        <p>
          Your magic multiplies gold gain by{' '}
          <strong>×{format(m.effect, 2)}</strong>
          {m.softcapped && <span className="muted"> (softcapped)</span>}.
        </p>
        <button
          type="button"
          className="reset reset-wax"
          onClick={() => act('magicCheck()')}
        >
          <span>Reset all previous resources and upgrades</span>
          <span>
            to gain <Amount value={m.toGet} resource="magic" />
          </span>
        </button>
        {m.nextAt && (
          <p className="muted">
            Next magic at <Amount value={m.nextAt} resource="gold" />
          </p>
        )}
      </Leaf>

      {m.moreUpgrades && (
        <Leaf title="Next discovery">
          <div className="unlock">
            <div className="unlock-text">
              <strong>Unlock more magic upgrades</strong>
              <span>
                Costs <Amount value={m.moreUpgrades.magic} resource="magic" />{' '}
                and needs{' '}
                <Amount value={m.moreUpgrades.magifolds} resource="magifolds" />
              </span>
            </div>
            <button
              type="button"
              className="price"
              onClick={() => act(m.moreUpgrades!.press)}
            >
              Unlock
            </button>
          </div>
        </Leaf>
      )}

      <Leaf title="Magic upgrades">
        <Ledger upgrades={m.upgrades} />
        {m.showBuyMax && (
          <div className="row">
            <button
              type="button"
              className="price"
              onClick={() => act('magicUpgradeBuyMax()')}
            >
              Buy all affordable
            </button>
          </div>
        )}
      </Leaf>
    </>
  );
}
