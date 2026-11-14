// STRIPPED COPY of reference/original/scripts/blood.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
function unlockBlood() {
  if (game.gold.gte("e5e14")) {
    game.gold = game.gold.sub("e5e14");
    addUnlock(); //sets unlock to 18
  }
}
function updateHellLayer() {
  game.currentHellLayer = document.getElementById("hellLayer").selectedIndex + 1;
}
function enterExitHell() {
  if (game.unlocks >= 18 && game.currentHellLayer <= 5) {
    if (!game.inHell) {
      game.inHell = true;
      sigilReset(666);
    } else {
      game.inHell = false;
      sigilReset(666);
    }
  }
}
