// STRIPPED COPY of reference/original/scripts/magic.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Unlocks magic
function unlockMagic() {
  if (game.gold.gte(1e15)) {
    game.gold = game.gold.sub(1e15);
    addUnlock(); //sets unlock to 4
  }
}

//Confirmation popups for magic resets
function magicCheck() {
  if (game.magicToGet.eq(0)) {
    if (confirm("Woah, hold on! You won't gain any magic! Are you sure you want to perform a magic reset?")) magicReset();
  } else if (game.confirmations[0]) {
    if (confirm("Are you sure you want to perform a magic reset?")) magicReset();
  } else {
    magicReset();
  }
}
function magicReset(triggerLayer = "magic") {
  //Sets most pre-magic veriables back to their original states
  game.gold = new Decimal(0);
  if (game.unlockedAchievements[0] > 8) {
    game.miners = new Decimal(1);
  } else {
    game.miners = new Decimal(0);
  }
  game.minerCost = new Decimal(20);
  game.fire = new Decimal(0);
  game.fireUpgrade1Bought = new Decimal(0);
  game.fireUpgrade1Cost = new Decimal(50);
  game.fireUpgrade2Bought = new Decimal(0);
  game.fireUpgrade2Cost = new Decimal(100);
  game.fireUpgrade3Bought = new Decimal(0);
  game.fireUpgrade3Cost = new Decimal(100);
  game.fireUpgrade4Bought = new Decimal(0);
  game.fireUpgrade4Cost = new Decimal(500);
  game.fireUpgrade5Bought = new Decimal(0);
  game.fireUpgrade5Cost = new Decimal(500);
  game.fireUpgrade6Bought = new Decimal(0);
  game.fireUpgrade6Cost = new Decimal(2e7);
  game.platinum = new Decimal(0);
  game.bestPlatinumToGet = new Decimal(0);
  if (triggerLayer === "magic" && game.unlockedAchievements[3] < 5 || triggerLayer === "sigil" && game.unlockedAchievements[7] < 3 || triggerLayer == "holyPolyhedron" && game.unlockedAchievements[20] < 2) {
    for (i = 0; i < 9; i++) {
      if (i != 2 && i != 6) {
        game.platinumUpgradesBought[i] = 0;
      }
    }
  }
  game.magic = game.magic.add(game.magicToGet);
  magicHardcap = new Decimal("e5000000");
  if (game.tomeUpgradesBought[8] == true) magicHardcap = magicHardcap.pow(game.blueFireUpgradesBought[3].pow(0.7).mul(5).add(1));
  if (game.magic.gt(magicHardcap)) {
    game.magic = magicHardcap;
  }
}

//Magic upgrades
function buyMagicUpgrade(x) {
  //Checks that the magic upgrade is not bought and that the player's magic is greater/equal to the corresponding upgrade cost
  if (game.magicUpgradesBought[x - 1] != true && game.magic.gte(magicUpgradeCosts[x - 1])) {
    game.magic = game.magic.sub(magicUpgradeCosts[x - 1]);
    game.magicUpgradesBought[x - 1] = true;
    if (x == 12) {
      addUnlock(); //sets unlock to 5
    }
    if (x == 20) {
      addUnlock(); //sets unlock to 7
    }
  }
}
function magicUpgradeBuyMax() {
  for (i = 1; i < 21; i++) buyMagicUpgrade(i);
}

//Unlocks more magic upgrades lol
function unlockMoreMagicUpgrades() {
  if (game.magifolds.gte(150000) && game.magic.gte(2e8)) {
    game.magic = game.magic.sub(2e8);
    addUnlock(); //sets unlock to 6
  }
}
function unlockDarkMagicUpgrades() {
  if (game.gold.gte("e1000")) {
    game.gold = game.gold.sub("e1000");
    addUnlock(); //sets unlock to 9
  }
}

//Dark magic upgrades
function buyDarkMagicUpgrade(x) {
  //Checks that the magic upgrade is not bought and that the player's magic is greater/equal to the corresponding upgrade cost
  if (game.darkMagicUpgradesBought[x - 1] != true && game.magic.gte(darkMagicUpgradeCosts[x - 1])) {
    game.magic = game.magic.sub(darkMagicUpgradeCosts[x - 1]);
    game.darkMagicUpgradesBought[x - 1] = true;
    if (x == 8) {
      addUnlock(); //sets unlock to 10
    }
  }
}
function darkMagicUpgradeBuyMax() {
  for (i = 1; i < 9; i++) buyDarkMagicUpgrade(i);
  if (game.pinkSigilUpgradesBought[1].eq(1)) {
    for (i = 9; i < 21; i++) buyDarkMagicUpgrade(i);
  }
}
function moreDarkMagicUpgrades() {
  if (game.gold.gte("e6.66e16")) {
    game.gold = game.gold.sub("e6.66e16");
    addUnlock(); //sets unlock to 19
  }
}
function unlockVoidMagicUpgrades() {
  if (game.gold.gte("e1e100") && game.holyFire.gte(1e8)) {
    addUnlock(); //sets unlock to 27
  }
}

//Void magic upgrades
function buyVoidMagicUpgrade(x) {
  //Checks that the magic upgrade is not bought and that the player's magic is greater/equal to the corresponding upgrade cost
  if (game.voidMagicUpgradesBought[x - 1] != true && game.magic.gte(voidMagicUpgradeCosts[x - 1])) {
    game.voidMagicUpgradesBought[x - 1] = true;
    if (x == 4) {
      holyDodecahedronUnlockCheck();
      addUnlock(); //sets unlock to 28
    } else if (x == 8) {
      game.holyFireUpgradeCosts[5] = new Decimal(holyFireUpgradeBase[6]).pow(game.holyFireUpgradesBought[5]).mul(holyFireUpgradeInitialCosts[6]).floor();
    } else if (x == 16) {
      addUnlock(); //sets unlock to 31
    } else if (x == 17) {
      addUnlock(); //sets unlock to 32
    }
  }
}
function getMagicGain() {
  let toGet = game.gold.div(1e15).pow(0.1);
  if (game.magicUpgradesBought[3]) {
    if (game.magicUpgradesBought[9]) {
      toGet = toGet.mul(game.magic.add(1).log2().mul(4).add(1));
    } else {
      toGet = toGet.mul(game.magic.add(1).log2().mul(1.5).add(1));
    }
  }
  if (game.magicUpgradesBought[1]) toGet = toGet.mul(1.5);
  if (game.magicUpgradesBought[6]) toGet = toGet.mul(2);
  if (game.magicUpgradesBought[17]) toGet = toGet.mul(3);
  if (game.unlocks >= 10) toGet = toGet.mul(game.cyanSigils.add(1).pow(2));
  if (game.unlocks >= 11) toGet = toGet.mul(game.blueSigils.add(1).pow(3));
  if (game.unlocks >= 12) toGet = toGet.mul(game.indigoSigils.add(1).pow(4));
  if (game.unlocks >= 13) toGet = toGet.mul(game.violetSigils.add(1).pow(5));
  if (game.unlocks >= 14) toGet = toGet.mul(game.pinkSigils.add(1).pow(6));
  if (game.darkMagicUpgradesBought[9] == true) toGet = toGet.pow(1.1);
  if (game.darkMagicUpgradesBought[1]) toGet = toGet.pow(game.uranium.add(1).log10().div(30).add(1));
  magicHardcap = new Decimal("e5000000");
  if (game.tomeUpgradesBought[8] == true) magicHardcap = magicHardcap.pow(game.blueFireUpgradesBought[3].pow(0.7).mul(5).add(1));
  if (toGet.gt(magicHardcap)) toGet = magicHardcap;
  toGet = toGet.floor();
  return toGet;
}
function getNextMagicAt() {
  let nextMagic = game.magicToGet.add(1);
  if (game.magicUpgradesBought[17]) nextMagic = nextMagic.div(3);
  if (game.magicUpgradesBought[6]) nextMagic = nextMagic.div(2);
  if (game.magicUpgradesBought[1]) nextMagic = nextMagic.div(1.5);
  if (game.magicUpgradesBought[3]) {
    if (game.magicUpgradesBought[9]) {
      nextMagic = nextMagic.div(game.magic.add(1).log2().mul(4).add(1));
    } else {
      nextMagic = nextMagic.div(game.magic.add(1).log2().mul(1.5).add(1));
    }
  }
  nextMagic = nextMagic.pow(10).mul(1e15).add(1);
  if (game.unlocks >= 10) nextMagic = new Decimal(6969); //should be hidden by this point, so nobody should see this
  return nextMagic;
}
