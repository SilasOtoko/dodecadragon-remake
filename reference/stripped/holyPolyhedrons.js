// STRIPPED COPY of reference/original/scripts/holyPolyhedrons.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Confirmation popups for holy polyhedron resets (could probably be optimised)
function holyPolyhedronCheck(x) {
  if (x == 1) {
    if (game.holyTetrahedronsToGet.eq(0)) {
      if (confirm("Woah, hold on! You won't gain any holy tetrahedrons! Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else if (game.confirmations[2]) {
      if (confirm("Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else {
      holyPolyhedronReset(x);
    }
  } else if (x == 2) {
    if (game.holyOctahedronsToGet.eq(0)) {
      if (confirm("Woah, hold on! You won't gain any holy octahedrons! Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else if (game.confirmations[2]) {
      if (confirm("Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else {
      holyPolyhedronReset(x);
    }
  } else if (x == 3) {
    if (game.holyDodecahedronsToGet.eq(0)) {
      if (confirm("Woah, hold on! You won't gain any holy dodecahedrons! Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else if (game.confirmations[2]) {
      if (confirm("Are you sure you want to ascend?")) holyPolyhedronReset(x);
    } else {
      holyPolyhedronReset(x);
    }
  }
}
function holyPolyhedronReset(x) {
  if (x == 1) {
    game.holyTetrahedrons = game.holyTetrahedrons.add(game.holyTetrahedronsToGet);
  } else if (x == 2) {
    game.holyOctahedrons = game.holyOctahedrons.add(game.holyOctahedronsToGet);
  } else if (x == 3) {
    game.holyDodecahedrons = game.holyDodecahedrons.add(game.holyDodecahedronsToGet);
  }
  sigilReset(0, triggerLayer = "holyPolyhedron");
  game.cyanSigils = new Decimal(0);
  game.cyanSigilPower = new Decimal(0);
  game.cyanSigilPowerPerSecond = new Decimal(0);
  game.cyanSigilUpgrade1Cost = new Decimal(1);
  game.cyanSigilUpgrade2Cost = new Decimal(20);
  game.cyanSigilUpgrade3Cost = new Decimal(500);
  game.cyanSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(1)];
  game.blueSigils = new Decimal(0);
  game.blueSigilPower = new Decimal(0);
  game.blueSigilPowerPerSecond = new Decimal(0);
  game.blueSigilUpgrade1Cost = new Decimal(1);
  game.blueSigilUpgrade2Cost = new Decimal(20);
  game.blueSigilUpgrade3Cost = new Decimal(100);
  game.blueSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(10), new Decimal(1)];
  game.indigoSigils = new Decimal(0);
  game.indigoSigilPower = new Decimal(0);
  game.indigoSigilPowerPerSecond = new Decimal(0);
  game.indigoSigilUpgrade1Cost = new Decimal(1);
  game.indigoSigilUpgrade2Cost = new Decimal(20);
  game.indigoSigilUpgrade3Cost = new Decimal(400);
  game.indigoSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(1)];
  game.violetSigils = new Decimal(0);
  game.violetSigilPower = new Decimal(0);
  game.violetSigilPowerPerSecond = new Decimal(0);
  game.violetSigilUpgrade1Cost = new Decimal(1);
  game.violetSigilUpgrade2Cost = new Decimal(5);
  game.violetSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(1), new Decimal(1)];
  game.pinkSigils = new Decimal(0);
  game.pinkSigilPower = new Decimal(0);
  game.pinkSigilPowerPerSecond = new Decimal(0);
  game.pinkSigilUpgrade1Cost = new Decimal(1);
  game.pinkSigilUpgrade3Cost = new Decimal(150000);
  game.pinkSigilUpgradesBought = [new Decimal(0), new Decimal(1), new Decimal(0), new Decimal(1)];
  game.redSigils = new Decimal(0);
  game.redSigilPower = new Decimal(0);
  game.redSigilPowerPerSecond = new Decimal(0);
  game.redSigilUpgrade1Cost = new Decimal(1);
  game.redSigilUpgrade2Cost = new Decimal(1500);
  game.redSigilUpgrade3Cost = new Decimal(50000);
  game.redSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(1)];
  game.orangeSigils = new Decimal(0);
  game.orangeSigilPower = new Decimal(0);
  game.orangeSigilPowerPerSecond = new Decimal(0);
  game.orangeSigilUpgrade1Cost = new Decimal(1);
  game.orangeSigilUpgrade2Cost = new Decimal(2500);
  game.orangeSigilUpgrade3Cost = new Decimal(250000);
  game.orangeSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(1)];
  game.yellowSigils = new Decimal(0);
  game.yellowSigilPower = new Decimal(0);
  game.yellowSigilPowerPerSecond = new Decimal(0);
  game.yellowSigilUpgrade1Cost = new Decimal(1);
  game.yellowSigilUpgrade2Cost = new Decimal(4000);
  game.yellowSigilUpgrade3Cost = new Decimal(2000000);
  game.yellowSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(1)];
  game.knowledge = new Decimal(0);
  game.highestKnowledge = new Decimal(0);
  game.knowledgeUpgradesBought[0] = new Decimal(0);
  game.knowledgeUpgradesBought[1] = new Decimal(0);
  game.knowledgeUpgradeCosts = [new Decimal(20), new Decimal(50)];
  game.tomes = new Decimal(0);
  game.totalTomes = new Decimal(0);
  if (game.unlockedAchievements[19] < 5) {
    for (i = 0; i < 14; i++) {
      if (i != 5 && i != 8 && i != 11 && i != 12 && i != 13) {
        game.tomeUpgradesBought[i] = false;
      }
    }
  }
  game.plutonium = new Decimal(0);
  game.bestPlutoniumToGet = new Decimal(0);
  if (game.unlockedAchievements[20] < 2) {
    for (i = 0; i < 5; i++) {
      game.plutoniumUpgradesBought[i] = 0;
    }
  }
  game.blueFire = new Decimal(0);
  game.blueFirePerSecond = new Decimal(0);
  game.blueFireUpgradeCosts = [new Decimal(500), new Decimal(1000), new Decimal(50000), new Decimal(5e7), new Decimal(1.5e8), new Decimal(0)];
  game.blueFireUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
  game.blood = new Decimal(0);
  resetKnowledgeTrades();
}
function buyHolyTetrahedronUpgrade(x) {
  if (!game.holyTetrahedronUpgradesBought[x - 1] && game.holyTetrahedrons.gte(holyTetrahedronUpgradeCosts[x - 1])) {
    game.holyTetrahedrons = game.holyTetrahedrons.sub(holyTetrahedronUpgradeCosts[x - 1]);
    game.holyTetrahedronUpgradesBought[x - 1] = true;
    if (x == 11) {
      holyOctahedronUnlockCheck();
      addUnlock(); //sets unlock to 25
    }
    if (x == 12) {
      addUnlock(); //sets unlock to 26
    }
  }
  holyTetrahedronUnlockCheck();
}
function holyTetrahedronUnlockCheck() {
  if (game.holyTetrahedronUpgradesBought[0]) {
    game.holyTetrahedronUpgradesUnlocked[1] = true;
    game.holyTetrahedronUpgradesUnlocked[2] = true;
    game.holyTetrahedronUpgradesUnlocked[3] = true;
  }
  if (game.holyTetrahedronUpgradesBought[1]) game.holyTetrahedronUpgradesUnlocked[4] = true;
  if (game.holyTetrahedronUpgradesBought[2]) game.holyTetrahedronUpgradesUnlocked[5] = true;
  if (game.holyTetrahedronUpgradesBought[3]) game.holyTetrahedronUpgradesUnlocked[6] = true;
  if (game.holyTetrahedronUpgradesBought[4] && game.holyTetrahedronUpgradesBought[5]) game.holyTetrahedronUpgradesUnlocked[7] = true;
  if (game.holyTetrahedronUpgradesBought[5] && game.holyTetrahedronUpgradesBought[6]) game.holyTetrahedronUpgradesUnlocked[8] = true;
  if (game.holyTetrahedronUpgradesBought[7] && game.holyTetrahedronUpgradesBought[8]) game.holyTetrahedronUpgradesUnlocked[9] = true;
  if (game.holyTetrahedronUpgradesBought[9]) game.holyTetrahedronUpgradesUnlocked[10] = true;
  if (game.holyTetrahedronUpgradesBought[10]) game.holyTetrahedronUpgradesUnlocked[11] = true;
  if (game.holyTetrahedronUpgradesBought[11]) game.holyTetrahedronUpgradesUnlocked[12] = true;
}
function buyHolyOctahedronUpgrade(x) {
  if (!game.holyOctahedronUpgradesBought[x - 1] && game.holyOctahedrons.gte(holyOctahedronUpgradeCosts[x - 1])) {
    game.holyOctahedrons = game.holyOctahedrons.sub(holyOctahedronUpgradeCosts[x - 1]);
    game.holyOctahedronUpgradesBought[x - 1] = true;
  }
  holyOctahedronUnlockCheck();
}
function holyOctahedronUnlockCheck() {
  if (game.holyOctahedronUpgradesBought[0]) {
    game.holyOctahedronUpgradesUnlocked[1] = true;
    game.holyOctahedronUpgradesUnlocked[2] = true;
  }
  if (game.holyOctahedronUpgradesBought[1]) game.holyOctahedronUpgradesUnlocked[3] = true;
  if (game.holyOctahedronUpgradesBought[1] && game.holyOctahedronUpgradesBought[2]) game.holyOctahedronUpgradesUnlocked[4] = true;
  if (game.holyOctahedronUpgradesBought[2]) game.holyOctahedronUpgradesUnlocked[5] = true;
  if (game.holyOctahedronUpgradesBought[3] && game.holyOctahedronUpgradesBought[4] && game.holyOctahedronUpgradesBought[5]) game.holyOctahedronUpgradesUnlocked[6] = true;
  if (game.holyOctahedronUpgradesBought[6]) game.holyOctahedronUpgradesUnlocked[7] = true;
  if (game.holyOctahedronUpgradesBought[7]) game.holyOctahedronUpgradesUnlocked[8] = true;
}
function buyHolyDodecahedronUpgrade(x) {
  if (!game.holyDodecahedronUpgradesBought[x - 1] && game.holyDodecahedrons.gte(holyDodecahedronUpgradeCosts[x - 1])) {
    game.holyDodecahedrons = game.holyDodecahedrons.sub(holyDodecahedronUpgradeCosts[x - 1]);
    game.holyDodecahedronUpgradesBought[x - 1] = true;
  }
  holyDodecahedronUnlockCheck();
}
function holyDodecahedronUnlockCheck() {
  if (game.holyDodecahedronUpgradesBought[0]) game.holyDodecahedronUpgradesUnlocked[1] = true;
  if (game.holyDodecahedronUpgradesBought[1]) game.holyDodecahedronUpgradesUnlocked[2] = true;
  if (game.holyDodecahedronUpgradesBought[2]) game.holyDodecahedronUpgradesUnlocked[3] = true;
  if (game.holyDodecahedronUpgradesBought[3]) game.holyDodecahedronUpgradesUnlocked[4] = true;
  if (game.holyDodecahedronUpgradesBought[4]) game.holyDodecahedronUpgradesUnlocked[5] = true;
}
