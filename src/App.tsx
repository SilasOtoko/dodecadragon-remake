// Phase 0 placeholder: proves the vendored number library and save loader work in the browser.
// Paste an export from the original game to see it load. Replaced by the real UI in Phase 3.
import { useState } from 'react';
import { createInitialState } from './engine/state';
import { importSave } from './engine/save';

export default function App() {
  const [text, setText] = useState('');
  const [game, setGame] = useState(() => createInitialState());
  const [error, setError] = useState('');

  function load() {
    try {
      setGame(importSave(text));
      setError('');
    } catch {
      setError("That isn't a DodecaDragons save code. Copy it from Settings → Export in the game.");
    }
  }

  return (
    <main>
      <h1>DodecaDragons</h1>
      <p className="muted">Remake in progress. Paste a save to check it loads.</p>
      <label htmlFor="save">Save code</label>
      <textarea id="save" value={text} onChange={(e) => setText(e.target.value)} />
      <p><button type="button" onClick={load}>Load save</button></p>
      {error && <p className="error" role="alert">{error}</p>}
      <dl>
        <dt>Dragon</dt><dd>{game.dragonName}, stage {game.dragonStage}</dd>
        <dt>Unlocks</dt><dd>{game.unlocks} of 37</dd>
        <dt>Gold</dt><dd>{game.gold.toString()}</dd>
        <dt>Magic</dt><dd>{game.magic.toString()}</dd>
        <dt>Time played</dt><dd>{Math.floor(game.timePlayed / 3600)} h</dd>
      </dl>
    </main>
  );
}
