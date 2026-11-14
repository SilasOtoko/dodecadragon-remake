// The app shell: the pinned ledger of resources, the tabs (a bottom bar on phones, a sidebar on
// wide screens), achievement notices and settings.
import { useEffect, useState } from 'react';
import { format } from '../engine/format';
import { achievementNames } from '../content/text';
import {
  act,
  exportCode,
  importCode,
  newGame,
  onGameEvent,
  useGame,
  writeSave,
} from './game';
import { Icon, Leaf } from './components';
import { RESOURCES } from './model/resources';
import {
  AlchemyScreen,
  DragonScreen,
  FireScreen,
  HoardScreen,
  MagicScreen,
} from './screens';
import './theme.css';
import './app.css';

interface Tab {
  id: string;
  name: string;
  icon: string;
  unlock: number;
  Screen: () => React.JSX.Element;
}
const TABS: Tab[] = [
  {
    id: 'hoard',
    name: 'Hoard',
    icon: 'img/iconGoldCoins.png',
    unlock: 0,
    Screen: HoardScreen,
  },
  {
    id: 'dragon',
    name: 'Dragon',
    icon: 'img/iconDragon1.png',
    unlock: 1,
    Screen: DragonScreen,
  },
  {
    id: 'fire',
    name: 'Fire',
    icon: 'img/iconFire.png',
    unlock: 2,
    Screen: FireScreen,
  },
  {
    id: 'alchemy',
    name: 'Alchemy',
    icon: 'img/iconPlatinumCoins.png',
    unlock: 3,
    Screen: AlchemyScreen,
  },
  {
    id: 'magic',
    name: 'Magic',
    icon: 'img/iconMagic.png',
    unlock: 4,
    Screen: MagicScreen,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'img/iconTome.png',
    unlock: 0,
    Screen: SettingsScreen,
  },
];
/** The last unlock this interface covers so far. Later parts of the game are on the debug page. */
const COVERED_UNLOCK = 4;

function readTab(): string {
  try {
    return localStorage.getItem('dodecaRemakeTab') ?? 'hoard';
  } catch {
    return 'hoard';
  }
}

export default function App() {
  const g = useGame();
  const s = g.state;
  const [tabId, setTabId] = useState(readTab);
  const [notices, setNotices] = useState<{ id: number; text: string }[]>([]);
  const tabs = TABS.filter((t) => s.unlocks >= t.unlock);
  const tab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  useEffect(() => {
    let id = 0;
    return onGameEvent((e) => {
      const name = achievementNames[e.category]?.[e.index] ?? 'Achievement';
      const n = ++id;
      setNotices((list) => [...list.slice(-1), { id: n, text: name }]);
      setTimeout(
        () => setNotices((list) => list.filter((x) => x.id !== n)),
        3000,
      );
    });
  }, []);

  function choose(id: string) {
    setTabId(id);
    try {
      localStorage.setItem('dodecaRemakeTab', id);
    } catch {
      /* storage blocked */
    }
    window.scrollTo({ top: 0 });
  }

  const resources = Object.entries(RESOURCES).filter(
    ([, r]) => s.unlocks >= r.unlock,
  );

  return (
    <div className="app lining-nums">
      <header className="strip" aria-label="Resources">
        <h1 className="font-display text-2xl md:text-3xl">DodecaDragons</h1>
        <ul className="mt-4">
          {resources.map(([key, r]) => (
            <li key={key} className="flex space-y-1 py-1 justify-between">
              <span className="flex justify-start">
                <span className="w-6">
                  <Icon src={r.icon} size="24" />
                </span>
                <span className="strip-amount text-gilt-200 dark:text-gilt-100 ml-3">
                  {format(s[r.field], 0)}
                </span>
                <span className="sr-only">{r.name}</span>
              </span>
              {r.rate && (
                <span className="pl-4 text-dragon-200 dark:text-dragon-100">
                  +{format(s[r.rate], 0)}/s
                </span>
              )}
            </li>
          ))}
        </ul>
      </header>

      <nav className="tabs" aria-label="Screens">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="tab rounded hover:cursor-pointer border-2 border-transparent hover:border-slate-600 transition-all duration-200 bg-transparent aria-[current=page]:bg-slate-800"
            aria-current={t.id === tab.id ? 'page' : undefined}
            onClick={() => choose(t.id)}
          >
            <Icon
              src={
                t.id === 'dragon'
                  ? `img/iconDragon${Math.min(s.dragonStage, 12)}.png`
                  : t.icon
              }
              size={24}
            />
            <span>{t.name}</span>
          </button>
        ))}
      </nav>

      <main className="screen">
        {s.unlocks > COVERED_UNLOCK && tab.id !== 'settings' && (
          <p className="notice">
            This save is past the parts of the game built so far. Screens for
            magic challenges onward are coming; until then you can keep playing
            on the <a href="#debug">debug page</a>.
          </p>
        )}
        <tab.Screen />
      </main>

      <div className="toasts" role="status" aria-live="polite">
        {notices.map((n) => (
          <p key={n.id} className="toast">
            <img src="img/starFilled.png" width={16} height={16} alt="" />{' '}
            Achievement: {n.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen() {
  const g = useGame();
  const s = g.state;
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const confirmations = [
    { n: 1, label: 'Ask before a magic reset', unlock: 4 },
    { n: 2, label: 'Ask before a sigil reset', unlock: 10 },
    { n: 3, label: 'Ask before a polyhedron reset', unlock: 24 },
  ].filter((c) => s.unlocks >= c.unlock);

  return (
    <>
      <Leaf title="Save">
        <p className="muted">
          Your game saves itself every 5 seconds in this browser. Save codes
          work in both this version and the original game.
        </p>
        <div className="row">
          <button
            type="button"
            className="price"
            onClick={() =>
              setMessage(
                writeSave()
                  ? 'Saved.'
                  : "Couldn't save: this browser is blocking storage.",
              )
            }
          >
            Save now
          </button>
          <button
            type="button"
            className="price"
            onClick={() => {
              setCode(exportCode());
              setMessage(
                'Your save code is in the box below. Copy it somewhere safe.',
              );
            }}
          >
            Export
          </button>
        </div>
        <label className="field" htmlFor="saveCode">
          Save code
        </label>
        <textarea
          id="saveCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={4}
          spellCheck={false}
        />
        <div className="row">
          <button
            type="button"
            className="price"
            onClick={() => {
              try {
                importCode(code);
                setMessage('Save loaded.');
              } catch {
                setMessage(
                  "That isn't a DodecaDragons save code. Copy it from Export, here or in the original game.",
                );
              }
            }}
          >
            Import
          </button>
        </div>
        {message && (
          <p className="muted" role="status">
            {message}
          </p>
        )}
      </Leaf>

      {confirmations.length > 0 && (
        <Leaf title="Confirmations">
          {confirmations.map((c) => (
            <button
              key={c.n}
              type="button"
              role="switch"
              aria-checked={Boolean(s.confirmations[c.n - 1])}
              className={`toggle ${s.confirmations[c.n - 1] ? 'on' : ''}`}
              onClick={() => act(`toggleConfirmations(${c.n})`)}
            >
              <span className="toggle-track">
                <span className="toggle-knob" />
              </span>
              {c.label}
            </button>
          ))}
        </Leaf>
      )}

      <Leaf title="Start over">
        {!confirmReset ? (
          <button
            type="button"
            className="reset reset-wax"
            onClick={() => setConfirmReset(true)}
          >
            <span>Start a new game</span>
          </button>
        ) : (
          <>
            <p className="warn">
              This deletes your save in this browser. Export it first if you
              want to keep it.
            </p>
            <div className="row">
              <button
                type="button"
                className="reset reset-wax"
                onClick={() => {
                  newGame();
                  setConfirmReset(false);
                  setMessage('New game started.');
                }}
              >
                <span>Delete my save and start over</span>
              </button>
              <button
                type="button"
                className="price"
                onClick={() => setConfirmReset(false)}
              >
                Keep playing
              </button>
            </div>
          </>
        )}
      </Leaf>

      <Leaf title="About">
        <p>
          A remake of{' '}
          <a href="https://demonin.com/games/dodecaDragons/">DodecaDragons</a>{' '}
          with the same gameplay and a new interface. The original was made by
          Demonin, co-developed by Cornucanis, with spriting by Zaxolotl, and is
          MIT-licensed.
        </p>
        <p className="muted">
          Developer tools: the <a href="#debug">engine debug page</a>. Time
          played: {Math.floor(s.timePlayed / 3600)} h{' '}
          {Math.floor((s.timePlayed % 3600) / 60)} min.
        </p>
      </Leaf>
    </>
  );
}
