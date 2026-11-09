# Page reads in game logic

Statements in the original that read the page (form inputs, element state) while doing game logic. The port must replace each one with state or a function argument.

| File | Line | Statement |
|---|---|---|
| `script.js` | 6 | `window.mobileCheck = function() {` |
| `script.js` | 11 | `(function(a){if(/(android\|bb\d+\|meego).+mobile\|avantgo\|bada\/\|blackberry\|blazer\|compal\|elaine\|fennec\|hiptop\|iemobile\|ip(hone\|od)\|iris\|kindle` |
| `script.js` | 21 | `window.oncontextmenu = function(event) {` |
| `script.js` | 35 | `window.isDevVersion = window.location.href.indexOf('demonin.com') == -1` |
| `script.js` | 39 | `window.times = []` |
| `script.js` | 40 | `window.fps = 0` |
| `script.js` | 53 | `setInterval(function() {document.getElementById("fps").textContent = fps + " fps"}, 200);` |
| `script.js` | 472 | `let editable = inputField.contentEditable;` |
| `script.js` | 473 | `let readOnly = inputField.readOnly;` |
| `script.js` | 477 | `range.selectNodeContents(inputField);` |
| `script.js` | 478 | `let sel = window.getSelection();` |
| `script.js` | 494 | `let loadgame = JSON.parse(atob(document.getElementById("exportField").value));` |
| `script.js` | 913 | `newHellLayer = document.createElement("option")` |
| `script.js` | 916 | `newHellLayer = document.createElement("option")` |
| `script.js` | 952 | `redSigilAutoOption = document.createElement("option")` |
| `script.js` | 970 | `orangeSigilAutoOption = document.createElement("option")` |
| `script.js` | 987 | `yellowSigilAutoOption = document.createElement("option")` |
| `script.js` | 2518 | `function changeDragonName() {game.dragonName = document.getElementById("dragonNameBox").value}` |
| `script.js` | 2524 | `setTimeout(function() {document.body.style.filter = "grayscale(100%)"}, 500)` |
| `script.js` | 2529 | `setTimeout(function() {document.body.style.filter = "none"}, 500)` |
| `script.js` | 2542 | `panTo(window.innerWidth/2,window.innerHeight/2)` |
| `script.js` | 2569 | `setTimeout(function() {` |
| `sigils.js` | 358 | `orangeSigilAutoOption = document.createElement("option")` |
| `sigils.js` | 401 | `yellowSigilAutoOption = document.createElement("option")` |
| `sigils.js` | 652 | `let newValue = new Decimal(document.getElementById("sigilResetterAmount").value);` |
| `sigils.js` | 653 | `let newMode = document.getElementById("sigilResetterMode").value;` |
| `sigils.js` | 669 | `game.sigilResetterActive = document.getElementById("sigilResetterActive").checked;` |
| `sigils.js` | 670 | `game.sigilResetterType = sigilColours.indexOf(document.getElementById("sigilResetterType").value.toLowerCase());` |
| `sigils.js` | 671 | `game.sigilResetterCycle = document.getElementById("sigilResetterCycle").checked;` |
| `sigils.js` | 672 | `game.sigilResetterCycleMode = 0 + document.getElementById("sigilResetterCycleMode").checked; //for now this just sets to 0 or 1 based on sin` |
| `sigils.js` | 705 | `game.sigilResetterType = (game.sigilResetterType + 1) % document.getElementById("sigilResetterType").length;` |
| `knowledge.js` | 65 | `game.knowledgeTradeLevel = new Decimal(document.getElementById("knowledgeLevelRange").value)` |
| `knowledge.js` | 69 | `game.knowledgeTradeLevel = new Decimal(document.getElementById("knowledgeLevelInput").value)` |
| `knowledge.js` | 220 | `redSigilAutoOption = document.createElement("option")` |
| `knowledge.js` | 254 | `newHellLayer = document.createElement("option")` |
| `knowledge.js` | 257 | `newHellLayer = document.createElement("option")` |
| `blood.js` | 16 | `game.currentHellLayer = document.getElementById("hellLayer").selectedIndex + 1` |
| `achievements.js` | 13 | `achievementBox = document.createElement("div")` |
| `achievements.js` | 28 | `achievementRow = document.createElement("div")` |
| `achievements.js` | 316 | `setTimeout(function() {` |
