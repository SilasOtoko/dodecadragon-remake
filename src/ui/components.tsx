// Shared pieces for every screen.
import { useEffect, useRef, type ReactNode } from 'react';
import type Decimal from '../vendor/break_eternity.js';
import { format } from '../engine/format';
import { RESOURCES } from './model/resources';
import type { UpgradeView } from './model/types';
import { act, actRepeat } from './game';

export function Icon({
  src,
  size = 16,
  alt = '',
}: {
  src: string;
  size?: number;
  alt?: string;
}) {
  return <img className="px" src={src} width={size} height={size} alt={alt} />;
}

/** An amount with its resource icon, e.g. [coin] 1.23e45 gold. */
export function Amount({
  value,
  resource,
  acc = 0,
  name = true,
}: {
  value: Decimal | number;
  resource: string;
  acc?: number;
  name?: boolean;
}) {
  const r = RESOURCES[resource];
  return (
    <span className="amount">
      {r && <Icon src={r.icon} />}
      <span className="num">{format(value, acc)}</span>
      {name && r && <span className="unit"> {r.name}</span>}
    </span>
  );
}

/** A section of a screen: a parchment leaf with an optional heading. */
export function Leaf({
  title,
  aside,
  children,
  className = '',
}: {
  title?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`leaf bg-vellum-800 fantasy-border ${className}`}>
      <div className="fantasy-border__inner">
        {(title || aside) && (
          <header className="flex justify-between">
            {title && <h2 className="font-display text-dragon-ink">{title}</h2>}
            {aside && <div className="leaf-aside">{aside}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * A button that repeats while held, like holding Enter on the original's buttons (the browser's key
 * repeat, about 30 presses a second). Pointer holds repeat at 10 a second, after a short delay.
 */
export function HoldButton({
  call,
  disabled,
  allowed,
  className = '',
  children,
  label,
  onClick,
}: {
  call: string;
  disabled?: boolean;
  allowed?: () => boolean;
  className?: string;
  children: ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);
  // Each repeat re-checks the original's disabled rule first: some actions (like platinum upgrade 7)
  // rely on the button being disabled, not on the function, to stop at their limit.
  const repeat = (delay: number) => {
    timer.current = setTimeout(() => {
      if (allowed && !allowed()) {
        stop();
        return;
      }
      actRepeat(call);
      repeat(100);
    }, delay);
  };
  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      aria-label={label}
      onClick={(e) => {
        if (!allowed || allowed()) act(call);
        onClick?.(e);
      }}
      onPointerDown={(e) => {
        if (e.button === 0) repeat(400);
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

/** One entry in an upgrade ledger: what it does on the left, the price to pay on the right. */
export function UpgradeRow({ u }: { u: UpgradeView }) {
  const state = u.owned
    ? 'owned'
    : u.disabled
      ? 'maxed'
      : u.short
        ? 'short'
        : 'ready';
  return (
    <li className={`entry entry-${state}`}>
      <div className="entry-text">
        <span className="entry-name">{u.name}</span>
        {u.effect && <span className="entry-effect">{u.effect}</span>}
      </div>
      {u.count && (
        <span
          className="tally"
          aria-label={`${u.count.bought}${u.count.max !== undefined ? ` of ${u.count.max}` : ''} bought`}
        >
          {u.count.bought}
          {u.count.max !== undefined && (
            <span className="tally-max">/{u.count.max}</span>
          )}
        </span>
      )}
      <div className="entry-actions">
        {u.owned ? (
          <span className="seal">Owned</span>
        ) : (
          <HoldButton
            call={u.press}
            disabled={u.disabled}
            allowed={u.allowed}
            className="price"
            label={`${u.name}${u.cost ? `, costs ${format(u.cost.amount, 0)} ${RESOURCES[u.cost.resource]?.name ?? ''}` : ''}`}
          >
            {u.disabled && u.count?.max !== undefined ? (
              'Maxed'
            ) : u.cost ? (
              <Amount
                value={u.cost.amount}
                resource={u.cost.resource}
                name={false}
              />
            ) : (
              'Buy'
            )}
          </HoldButton>
        )}
        {u.buyMax && !u.owned && (
          <button
            type="button"
            className="price price-max"
            onClick={() => act(u.buyMax!)}
          >
            Max
          </button>
        )}
      </div>
    </li>
  );
}

export function Ledger({ upgrades }: { upgrades: UpgradeView[] }) {
  return (
    <ul className="ledger">
      {upgrades.map((u) => (
        <UpgradeRow key={u.key} u={u} />
      ))}
    </ul>
  );
}

/** A progress bar on a log scale (amounts span hundreds of orders of magnitude). */
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <i style={{ width: `${value * 100}%` }} />
    </div>
  );
}

/** An on/off switch for the original's automation buttons. */
export function AutoToggle({
  call,
  on,
  children,
}: {
  call: string;
  on: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`toggle ${on ? 'on' : ''}`}
      onClick={() => act(call)}
    >
      <span className="toggle-track">
        <span className="toggle-knob" />
      </span>
      {children}
    </button>
  );
}
