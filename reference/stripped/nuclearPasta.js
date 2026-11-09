// STRIPPED COPY of reference/original/scripts/nuclearPasta.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Spaghetti code
function unlockNuclearPasta() {
  if (game.gold.gte("ee3.5e6")) {
    addUnlock(); //sets unlock to 35
    setNuclearPastaState();
  }
}
function displayNuclearPastaInfo() {
  game.nuclearPastaStateInfo = true;
  let noOfPastaLines = 0;
  if (!game.nuclearPastaUpgradesBought[0]) {
    noOfPastaLines = 3;
  } else if (!game.nuclearPastaUpgradesBought[1]) {
    noOfPastaLines = 4;
  } else {
    noOfPastaLines = 5;
  }
}
function hideNuclearPastaInfo() {
  game.nuclearPastaStateInfo = false;
}
function setNuclearPastaState() {
  let nuclearPastaStateTemp = game.nuclearPastaState;
  if (!game.nuclearPastaUpgradesBought[0]) {
    while (nuclearPastaStateTemp == game.nuclearPastaState) game.nuclearPastaState = Math.ceil(Math.random() * 3);
  } else if (!game.nuclearPastaUpgradesBought[1]) {
    while (nuclearPastaStateTemp == game.nuclearPastaState) game.nuclearPastaState = Math.ceil(Math.random() * 3) + 1;
  } else if (!game.nuclearPastaUpgradesBought[2]) {
    while (nuclearPastaStateTemp == game.nuclearPastaState) game.nuclearPastaState = Math.ceil(Math.random() * 3) + 2;
  } else if (!game.nuclearPastaUpgradesBought[3]) {
    while (nuclearPastaStateTemp == game.nuclearPastaState) game.nuclearPastaState = Math.ceil(Math.random() * 2) + 3;
  } else {
    game.nuclearPastaState = 5;
  }
}
function extendNuclearPasta() {
  if (!game.nuclearPastaExtended) {
    game.nuclearPastaCooldown += 60;
    game.nuclearPastaExtended = true;
  }
}
function gainNuclearPasta() {
  if (game.gold.gte(game.nuclearPastaCost)) {
    game.nuclearPasta = game.nuclearPasta.add(1);
    game.nuclearPastaCost = new Decimal(10).pow(new Decimal(10).pow(game.nuclearPasta.mul(250000).add(3.5e6)));
  }
}
function gainMaxPasta() {
  if (game.gold.gte(game.nuclearPastaCost)) {
    let maxPasta = game.gold.log10().log10().div(250000).sub(game.nuclearPasta).sub(13).floor();
    game.nuclearPasta = game.nuclearPasta.add(maxPasta);
    game.nuclearPastaCost = new Decimal(10).pow(new Decimal(10).pow(game.nuclearPasta.mul(250000).add(3.5e6)));
  }
}
function buyNuclearPastaUpgrade(x) {
  if (game.gold.gte(nuclearPastaUpgradeCosts[x - 1])) {
    game.nuclearPastaUpgradesBought[x - 1] = true;
  }
}
