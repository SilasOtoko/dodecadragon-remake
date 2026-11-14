// STRIPPED COPY of reference/original/scripts/sigils.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Confirmation popups for magic resets\
function sigilCheck(x) {
  if (game[sigilColours[x - 1] + "SigilsToGet"].eq(0)) {
    if (confirm("Woah, hold on! You won't gain any sigils! Are you sure you want to perform a sigil reset?")) sigilReset(x);
  } else if (game.confirmations[1]) {
    if (confirm("Are you sure you want to perform a sigil reset?")) sigilReset(x);
  } else {
    sigilReset(x);
  }
}
function sigilReset(x, triggerLayer = "sigil") {
  if (x <= 8 && x > 0) {
    let sigilName = sigilColours[x - 1] + "Sigils";
    let sigilsGained = game[sigilName + "ToGet"];
    if (sigilsGained.isNan()) {
      console.error("Warning! Sigil reset is attempting to reset for NaN!");
      return;
    }
    game[sigilName] = game[sigilName].add(sigilsGained);
  }
  //switch(x) {
  //case 1: game.cyanSigils = game.cyanSigils.add(game.cyanSigilsToGet); break
  //case 2: game.blueSigils = game.blueSigils.add(game.blueSigilsToGet); break
  //case 3: game.indigoSigils = game.indigoSigils.add(game.indigoSigilsToGet); break
  //case 4: game.violetSigils = game.violetSigils.add(game.violetSigilsToGet); break
  //case 5: game.pinkSigils = game.pinkSigils.add(game.pinkSigilsToGet); break
  //}
  checkAchievements();
  magicReset(triggerLayer);
  if (triggerLayer == "holyPolyhedron" && game.unlockedAchievements[20] < 2 || game.unlockedAchievements[7] <= 2) {
    for (i = 0; i < 9; i++) {
      if (i != 2) {
        game.platinumUpgradesBought[i] = 0;
      }
    }
  }
  if (triggerLayer == "holyPolyhedron" && game.unlockedAchievements[20] < 2 || game.unlockedAchievements[8] == 0) {
    for (i = 0; i < 5; i++) {
      game.uraniumUpgradesBought[i] = 0;
    }
  }
  game.magic = new Decimal(0);
  if (triggerLayer != "holyPolyhedron" && game.unlockedAchievements[7] > 1) {
    //do nothing :D
  } else {
    game.magicScore1 = new Decimal(0);
    game.magicScore2 = new Decimal(0);
    game.magicScore3 = new Decimal(0);
    game.magicScore4 = new Decimal(0);
  }
  if (game.inHell) {
    game.magifolds = new Decimal(1);
  } else {
    game.magifolds = game.magicScore1.add(1).mul(game.magicScore2.add(1)).mul(game.magicScore3.add(1)).mul(game.magicScore4.add(1));
  }
  if (triggerLayer == "holyPolyhedron" && game.unlockedAchievements[22] < 1 || game.unlockedAchievements[10] <= 2) {
    for (i = 0; i < 19; i++) {
      if (i != 1 && i != 4 && i != 7 && i != 10 && i != 11) {
        game.magicUpgradesBought[i] = false;
      }
      if (game.unlockedAchievements[7] <= 2) {
        game.magicUpgradesBought[10] = false;
      }
    }
    for (i = 0; i < 20; i++) {
      if (i != 7) {
        game.darkMagicUpgradesBought[i] = false;
      }
    }
  }
  game.uranium = new Decimal(0);
  game.bestUraniumToGet = new Decimal(0);
  game.dragonTimeSpent = new Decimal(0);
  game.dragonTimeEffect = new Decimal(1.2).pow(game.dragonTimeSpent.pow(0.3));
  //if (game.unlockedAchievements[10] === 0) {
  game.dragonFood = new Decimal(0);
  game.dragonFeedCost = new Decimal(10).pow(new Decimal(2).pow(game.dragonFood).mul(8).round());
  //}
  game.lastSigilReset = Date.now();
  updateSmall();
}
function buyCyanSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts cyan sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.cyanSigilPower.gte(game.cyanSigilUpgrade1Cost)) {
    if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = Decimal.max(game.cyanSigilPower.sub(game.cyanSigilUpgrade1Cost), 0);
    game.cyanSigilUpgradesBought[0] = game.cyanSigilUpgradesBought[0].add(1);
    game.cyanSigilUpgrade1Cost = new Decimal(1.5).pow(game.cyanSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.cyanSigilPower.gte(game.cyanSigilUpgrade2Cost)) {
    if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = Decimal.max(game.cyanSigilPower.sub(game.cyanSigilUpgrade2Cost), 0);
    game.cyanSigilUpgradesBought[1] = game.cyanSigilUpgradesBought[1].add(1);
    game.cyanSigilUpgrade2Cost = new Decimal(1.5).pow(game.cyanSigilUpgradesBought[1]).mul(20).floor();
  } else if (x == 3 && game.cyanSigilPower.gte(game.cyanSigilUpgrade3Cost)) {
    if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = Decimal.max(game.cyanSigilPower.sub(game.cyanSigilUpgrade3Cost), 0);
    game.cyanSigilUpgradesBought[2] = game.cyanSigilUpgradesBought[2].add(1);
    game.cyanSigilUpgrade3Cost = new Decimal(2).pow(game.cyanSigilUpgradesBought[2]).mul(500).round();
  } else if (x == 4 && game.cyanSigilPower.gte(20000)) {
    game.cyanSigilPower = game.cyanSigilPower.sub(20000);
    game.cyanSigilUpgradesBought[3] = new Decimal(1);
    addUnlock(); //sets unlock to 11
  }
}
function buyBlueSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts blue sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.blueSigilPower.gte(game.blueSigilUpgrade1Cost)) {
    if (game.blueSigilPower.lt("e1e10")) game.blueSigilPower = Decimal.max(game.blueSigilPower.sub(game.blueSigilUpgrade1Cost), 0);
    game.blueSigilUpgradesBought[0] = game.blueSigilUpgradesBought[0].add(1);
    game.blueSigilUpgrade1Cost = new Decimal(1.5).pow(game.blueSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.blueSigilPower.gte(game.blueSigilUpgrade2Cost)) {
    if (game.blueSigilPower.lt("e1e10")) game.blueSigilPower = Decimal.max(game.blueSigilPower.sub(game.blueSigilUpgrade2Cost), 0);
    game.blueSigilUpgradesBought[1] = game.blueSigilUpgradesBought[1].add(1);
    game.blueSigilUpgrade2Cost = new Decimal(1.5).pow(game.blueSigilUpgradesBought[1]).mul(20).floor();
  } else if (x == 3 && game.blueSigilPower.gte(game.blueSigilUpgrade3Cost) && game.blueSigilUpgradesBought[2].lt(10)) {
    game.blueSigilPower = Decimal.max(game.blueSigilPower.sub(game.blueSigilUpgrade3Cost), 0);
    game.blueSigilUpgradesBought[2] = game.blueSigilUpgradesBought[2].add(1);
    game.blueSigilUpgrade3Cost = new Decimal(2).pow(game.blueSigilUpgradesBought[2]).mul(100).round();
  } else if (x == 4 && game.blueSigilPower.gte(10000)) {
    game.blueSigilPower = game.blueSigilPower.sub(10000);
    game.blueSigilUpgradesBought[3] = new Decimal(1);
    addUnlock(); //sets unlock to 12
  }
}
function buyIndigoSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts indigo sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.indigoSigilPower.gte(game.indigoSigilUpgrade1Cost)) {
    if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = Decimal.max(game.indigoSigilPower.sub(game.indigoSigilUpgrade1Cost), 0);
    game.indigoSigilUpgradesBought[0] = game.indigoSigilUpgradesBought[0].add(1);
    game.indigoSigilUpgrade1Cost = new Decimal(1.5).pow(game.indigoSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.indigoSigilPower.gte(game.indigoSigilUpgrade2Cost)) {
    if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = Decimal.max(game.indigoSigilPower.sub(game.indigoSigilUpgrade2Cost), 0);
    game.indigoSigilUpgradesBought[1] = game.indigoSigilUpgradesBought[1].add(1);
    game.indigoSigilUpgrade2Cost = new Decimal(1.5).pow(game.indigoSigilUpgradesBought[1]).mul(20).floor();
  } else if (x == 3 && game.indigoSigilPower.gte(game.indigoSigilUpgrade3Cost)) {
    if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = Decimal.max(game.indigoSigilPower.sub(game.indigoSigilUpgrade3Cost), 0);
    game.indigoSigilUpgradesBought[2] = game.indigoSigilUpgradesBought[2].add(1);
    game.indigoSigilUpgrade3Cost = new Decimal(2.5).pow(game.indigoSigilUpgradesBought[2]).mul(400).floor();
  } else if (x == 4 && game.indigoSigilPower.gte(20000)) {
    game.indigoSigilPower = game.indigoSigilPower.sub(20000);
    game.indigoSigilUpgradesBought[3] = new Decimal(1);
    addUnlock(); //sets unlock to 13
  }
}
function buyVioletSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts violet sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.violetSigilPower.gte(game.violetSigilUpgrade1Cost)) {
    if (game.violetSigilPower.lt("e1e10")) game.violetSigilPower = Decimal.max(game.violetSigilPower.sub(game.violetSigilUpgrade1Cost), 0);
    game.violetSigilUpgradesBought[0] = game.violetSigilUpgradesBought[0].add(1);
    game.violetSigilUpgrade1Cost = new Decimal(1.5).pow(game.violetSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.violetSigilPower.gte(game.violetSigilUpgrade2Cost)) {
    if (game.violetSigilPower.lt("e1e10")) game.violetSigilPower = Decimal.max(game.violetSigilPower.sub(game.violetSigilUpgrade2Cost), 0);
    game.violetSigilUpgradesBought[1] = game.violetSigilUpgradesBought[1].add(1);
    game.violetSigilUpgrade2Cost = new Decimal(1.5).pow(game.violetSigilUpgradesBought[1]).mul(5).floor();
  } else if (x == 3 && game.violetSigilPower.gte(5000)) {
    game.violetSigilPower = game.violetSigilPower.sub(5000);
    game.violetSigilUpgradesBought[2] = new Decimal(1);
  } else if (x == 4 && game.violetSigilPower.gte(1e7)) {
    game.violetSigilPower = game.violetSigilPower.sub(1e7);
    game.violetSigilUpgradesBought[3] = new Decimal(1);
    addUnlock(); //sets unlock to 14
  }
}
function buyPinkSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts pink sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.pinkSigilPower.gte(game.pinkSigilUpgrade1Cost)) {
    if (game.pinkSigilPower.lt("e1e10")) game.pinkSigilPower = Decimal.max(game.pinkSigilPower.sub(game.pinkSigilUpgrade1Cost), 0);
    game.pinkSigilUpgradesBought[0] = game.pinkSigilUpgradesBought[0].add(1);
    game.pinkSigilUpgrade1Cost = new Decimal(1.5).pow(game.pinkSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.pinkSigilPower.gte(100000)) {
    game.pinkSigilPower = game.pinkSigilPower.sub(100000);
    game.pinkSigilUpgradesBought[1] = new Decimal(1);
  } else if (x == 3 && game.pinkSigilPower.gte(game.pinkSigilUpgrade3Cost)) {
    if (game.pinkSigilPower.lt("e1e10")) game.pinkSigilPower = Decimal.max(game.pinkSigilPower.sub(game.pinkSigilUpgrade3Cost), 0);
    game.pinkSigilUpgradesBought[2] = game.pinkSigilUpgradesBought[2].add(1);
    game.pinkSigilUpgrade3Cost = new Decimal(2).pow(game.pinkSigilUpgradesBought[2]).mul(500000).round();
  } else if (x == 4 && game.pinkSigilPower.gte(1e8)) {
    game.pinkSigilPower = game.pinkSigilPower.sub(1e8);
    game.pinkSigilUpgradesBought[3] = new Decimal(1);
    randomizeKnowledgeTrade(1);
    randomizeKnowledgeTrade(2);
    randomizeKnowledgeTrade(3);
    knowledgeUpgrade2Effect = new Decimal(5).pow(game.knowledgeUpgradesBought[1].pow(0.5));
    if (knowledgeUpgrade2Effect.gt(1e20)) knowledgeUpgrade2Effect = knowledgeUpgrade2Effect.mul(1e60).pow(0.25);
    addUnlock(); //sets unlock to 15
  }
}
function buyRedSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts red sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.redSigilPower.gte(game.redSigilUpgrade1Cost)) {
    if (game.redSigilPower.lt("e1e10")) game.redSigilPower = Decimal.max(game.redSigilPower.sub(game.redSigilUpgrade1Cost), 0);
    game.redSigilUpgradesBought[0] = game.redSigilUpgradesBought[0].add(1);
    game.redSigilUpgrade1Cost = new Decimal(1.5).pow(game.redSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.redSigilPower.gte(game.redSigilUpgrade2Cost)) {
    if (game.redSigilPower.lt("e1e10")) game.redSigilPower = Decimal.max(game.redSigilPower.sub(game.redSigilUpgrade2Cost), 0);
    game.redSigilUpgradesBought[1] = game.redSigilUpgradesBought[1].add(1);
    game.redSigilUpgrade2Cost = new Decimal(1.5).pow(game.redSigilUpgradesBought[1]).mul(1500).floor();
  } else if (x == 3 && game.redSigilPower.gte(game.redSigilUpgrade3Cost)) {
    if (game.redSigilPower.lt("e1e10")) game.redSigilPower = Decimal.max(game.redSigilPower.sub(game.redSigilUpgrade3Cost), 0);
    game.redSigilUpgradesBought[2] = game.redSigilUpgradesBought[2].add(1);
    game.redSigilUpgrade3Cost = new Decimal(2.5).pow(game.redSigilUpgradesBought[2]).mul(50000).floor();
  } else if (x == 4 && game.redSigilPower.gte(1e7)) {
    game.redSigilPower = game.redSigilPower.sub(1e7);
    game.redSigilUpgradesBought[3] = new Decimal(1);
    orangeSigilAutoOption = document.createElement("option");
    orangeSigilAutoOption.text = "Orange";
    addUnlock(); //sets unlock to 22
  }
}
function buyOrangeSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts orange sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.orangeSigilPower.gte(game.orangeSigilUpgrade1Cost)) {
    if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = Decimal.max(game.orangeSigilPower.sub(game.orangeSigilUpgrade1Cost), 0);
    game.orangeSigilUpgradesBought[0] = game.orangeSigilUpgradesBought[0].add(1);
    game.orangeSigilUpgrade1Cost = new Decimal(1.5).pow(game.orangeSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.orangeSigilPower.gte(game.orangeSigilUpgrade2Cost)) {
    if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = Decimal.max(game.orangeSigilPower.sub(game.orangeSigilUpgrade2Cost), 0);
    game.orangeSigilUpgradesBought[1] = game.orangeSigilUpgradesBought[1].add(1);
    game.orangeSigilUpgrade2Cost = new Decimal(2).pow(game.orangeSigilUpgradesBought[1]).mul(2500).floor();
  } else if (x == 3 && game.orangeSigilPower.gte(game.orangeSigilUpgrade3Cost)) {
    if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = Decimal.max(game.orangeSigilPower.sub(game.orangeSigilUpgrade3Cost), 0);
    game.orangeSigilUpgradesBought[2] = game.orangeSigilUpgradesBought[2].add(1);
    game.orangeSigilUpgrade3Cost = new Decimal(3).pow(game.orangeSigilUpgradesBought[2]).mul(250000).floor();
  } else if (x == 4 && game.orangeSigilPower.gte(1e7)) {
    game.orangeSigilPower = game.orangeSigilPower.sub(1e7);
    game.orangeSigilUpgradesBought[3] = new Decimal(1);
    yellowSigilAutoOption = document.createElement("option");
    yellowSigilAutoOption.text = "Yellow";
    addUnlock(); //sets unlock to 23
  }
}
function buyYellowSigilUpgrade(x) {
  //For each upgrade (if affordable): subtracts yellow sigil power based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.yellowSigilPower.gte(game.yellowSigilUpgrade1Cost)) {
    if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = Decimal.max(game.yellowSigilPower.sub(game.yellowSigilUpgrade1Cost), 0);
    game.yellowSigilUpgradesBought[0] = game.yellowSigilUpgradesBought[0].add(1);
    game.yellowSigilUpgrade1Cost = new Decimal(1.5).pow(game.yellowSigilUpgradesBought[0]).floor();
  } else if (x == 2 && game.yellowSigilPower.gte(game.yellowSigilUpgrade2Cost)) {
    if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = Decimal.max(game.yellowSigilPower.sub(game.yellowSigilUpgrade2Cost), 0);
    game.yellowSigilUpgradesBought[1] = game.yellowSigilUpgradesBought[1].add(1);
    game.yellowSigilUpgrade2Cost = new Decimal(2).pow(game.yellowSigilUpgradesBought[1]).mul(4000).floor();
  } else if (x == 3 && game.yellowSigilPower.gte(game.yellowSigilUpgrade3Cost)) {
    if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = Decimal.max(game.yellowSigilPower.sub(game.yellowSigilUpgrade3Cost), 0);
    game.yellowSigilUpgradesBought[2] = game.yellowSigilUpgradesBought[2].add(1);
    game.yellowSigilUpgrade3Cost = new Decimal(3).pow(game.yellowSigilUpgradesBought[2]).mul(2000000).floor();
  } else if (x == 4 && game.yellowSigilPower.gte(1e12)) {
    game.yellowSigilPower = game.yellowSigilPower.sub(1e12);
    game.yellowSigilUpgradesBought[3] = new Decimal(1);
    game.confirmations[2] = true;
    holyTetrahedronUnlockCheck();
    addUnlock(); //sets unlock to 24
  }
}
function maxAllSigilUpgrades() {
  cyanSigilPowerTemp = game.cyanSigilPower.div(3);
  SU1amountCanBuy = Decimal.affordGeometricSeries(cyanSigilPowerTemp, 1, 1.5, game.cyanSigilUpgradesBought[0]);
  SU1Cost = Decimal.sumGeometricSeries(SU1amountCanBuy, 1, 1.5, game.cyanSigilUpgradesBought[0]);
  if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = game.cyanSigilPower.sub(SU1Cost), 0;
  game.cyanSigilUpgradesBought[0] = game.cyanSigilUpgradesBought[0].add(SU1amountCanBuy);
  game.cyanSigilUpgrade1Cost = new Decimal(1.5).pow(game.cyanSigilUpgradesBought[0]).floor();
  SU2amountCanBuy = Decimal.affordGeometricSeries(cyanSigilPowerTemp, 20, 1.5, game.cyanSigilUpgradesBought[1]);
  SU2Cost = Decimal.sumGeometricSeries(SU2amountCanBuy, 20, 1.5, game.cyanSigilUpgradesBought[1]);
  if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = game.cyanSigilPower.sub(SU2Cost);
  game.cyanSigilUpgradesBought[1] = game.cyanSigilUpgradesBought[1].add(SU2amountCanBuy);
  game.cyanSigilUpgrade2Cost = new Decimal(1.5).pow(game.cyanSigilUpgradesBought[1]).mul(20).floor();
  SU3amountCanBuy = Decimal.affordGeometricSeries(cyanSigilPowerTemp, 100, 2, game.cyanSigilUpgradesBought[2]);
  SU3Cost = Decimal.sumGeometricSeries(SU3amountCanBuy, 100, 2, game.cyanSigilUpgradesBought[2]);
  if (game.cyanSigilPower.lt("e1e10")) game.cyanSigilPower = game.cyanSigilPower.sub(SU3Cost);
  game.cyanSigilUpgradesBought[2] = game.cyanSigilUpgradesBought[2].add(SU3amountCanBuy);
  game.cyanSigilUpgrade3Cost = new Decimal(2).pow(game.cyanSigilUpgradesBought[2]).mul(500).round();
  if (game.cyanSigilPower.lt(0)) game.cyanSigilPower = new Decimal(0);
  blueSigilPowerTemp = game.blueSigilPower.div(2);
  SU4amountCanBuy = Decimal.affordGeometricSeries(blueSigilPowerTemp, 1, 1.5, game.blueSigilUpgradesBought[0]);
  SU4Cost = Decimal.sumGeometricSeries(SU4amountCanBuy, 1, 1.5, game.blueSigilUpgradesBought[0]);
  if (game.blueSigilPower.lt("e1e10")) game.blueSigilPower = game.blueSigilPower.sub(SU4Cost);
  game.blueSigilUpgradesBought[0] = game.blueSigilUpgradesBought[0].add(SU4amountCanBuy);
  game.blueSigilUpgrade1Cost = new Decimal(1.5).pow(game.blueSigilUpgradesBought[0]).floor();
  SU5amountCanBuy = Decimal.affordGeometricSeries(blueSigilPowerTemp, 20, 1.5, game.blueSigilUpgradesBought[1]);
  SU5Cost = Decimal.sumGeometricSeries(SU5amountCanBuy, 20, 1.5, game.blueSigilUpgradesBought[1]);
  if (game.blueSigilPower.lt("e1e10")) game.blueSigilPower = game.blueSigilPower.sub(SU5Cost);
  game.blueSigilUpgradesBought[1] = game.blueSigilUpgradesBought[1].add(SU5amountCanBuy);
  game.blueSigilUpgrade2Cost = new Decimal(1.5).pow(game.blueSigilUpgradesBought[1]).mul(20).floor();
  if (game.blueSigilPower.lt(0)) game.blueSigilPower = new Decimal(0);
  indigoSigilPowerTemp = game.indigoSigilPower.div(3);
  SU6amountCanBuy = Decimal.affordGeometricSeries(indigoSigilPowerTemp, 1, 1.5, game.indigoSigilUpgradesBought[0]);
  SU6Cost = Decimal.sumGeometricSeries(SU6amountCanBuy, 1, 1.5, game.indigoSigilUpgradesBought[0]);
  if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = game.indigoSigilPower.sub(SU6Cost);
  game.indigoSigilUpgradesBought[0] = game.indigoSigilUpgradesBought[0].add(SU6amountCanBuy);
  game.indigoSigilUpgrade1Cost = new Decimal(1.5).pow(game.indigoSigilUpgradesBought[0]).floor();
  SU7amountCanBuy = Decimal.affordGeometricSeries(indigoSigilPowerTemp, 20, 1.5, game.indigoSigilUpgradesBought[1]);
  SU7Cost = Decimal.sumGeometricSeries(SU7amountCanBuy, 20, 1.5, game.indigoSigilUpgradesBought[1]);
  if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = game.indigoSigilPower.sub(SU7Cost);
  game.indigoSigilUpgradesBought[1] = game.indigoSigilUpgradesBought[1].add(SU7amountCanBuy);
  game.indigoSigilUpgrade2Cost = new Decimal(1.5).pow(game.indigoSigilUpgradesBought[1]).mul(20).floor();
  SU8amountCanBuy = Decimal.affordGeometricSeries(indigoSigilPowerTemp, 400, 2.5, game.indigoSigilUpgradesBought[2]);
  SU8Cost = Decimal.sumGeometricSeries(SU8amountCanBuy, 400, 2.5, game.indigoSigilUpgradesBought[2]);
  if (game.indigoSigilPower.lt("e1e10")) game.indigoSigilPower = game.indigoSigilPower.sub(SU8Cost);
  game.indigoSigilUpgradesBought[2] = game.indigoSigilUpgradesBought[2].add(SU8amountCanBuy);
  game.indigoSigilUpgrade3Cost = new Decimal(2.5).pow(game.indigoSigilUpgradesBought[2]).mul(400).floor();
  if (game.indigoSigilPower.lt(0)) game.indigoSigilPower = new Decimal(0);
  violetSigilPowerTemp = game.violetSigilPower.div(2);
  SU9amountCanBuy = Decimal.affordGeometricSeries(violetSigilPowerTemp, 1, 1.5, game.violetSigilUpgradesBought[0]);
  SU9Cost = Decimal.sumGeometricSeries(SU9amountCanBuy, 1, 1.5, game.violetSigilUpgradesBought[0]);
  if (game.violetSigilPower.lt("e1e10")) game.violetSigilPower = game.violetSigilPower.sub(SU9Cost);
  game.violetSigilUpgradesBought[0] = game.violetSigilUpgradesBought[0].add(SU9amountCanBuy);
  game.violetSigilUpgrade1Cost = new Decimal(1.5).pow(game.violetSigilUpgradesBought[0]).floor();
  SU10amountCanBuy = Decimal.affordGeometricSeries(violetSigilPowerTemp, 5, 1.5, game.violetSigilUpgradesBought[1]);
  SU10Cost = Decimal.sumGeometricSeries(SU10amountCanBuy, 5, 1.5, game.violetSigilUpgradesBought[1]);
  if (game.violetSigilPower.lt("e1e10")) game.violetSigilPower = game.violetSigilPower.sub(SU10Cost);
  game.violetSigilUpgradesBought[1] = game.violetSigilUpgradesBought[1].add(SU10amountCanBuy);
  game.violetSigilUpgrade2Cost = new Decimal(1.5).pow(game.violetSigilUpgradesBought[1]).mul(5).floor();
  if (game.violetSigilPower.lt(0)) game.violetSigilPower = new Decimal(0);
  pinkSigilPowerTemp = game.pinkSigilPower.div(2);
  SU11amountCanBuy = Decimal.affordGeometricSeries(pinkSigilPowerTemp, 1, 1.5, game.pinkSigilUpgradesBought[0]);
  SU11Cost = Decimal.sumGeometricSeries(SU11amountCanBuy, 1, 1.5, game.pinkSigilUpgradesBought[0]);
  if (game.pinkSigilPower.lt("e1e10")) game.pinkSigilPower = game.pinkSigilPower.sub(SU11Cost);
  game.pinkSigilUpgradesBought[0] = game.pinkSigilUpgradesBought[0].add(SU11amountCanBuy);
  game.pinkSigilUpgrade1Cost = new Decimal(1.5).pow(game.pinkSigilUpgradesBought[0]).floor();
  SU12amountCanBuy = Decimal.affordGeometricSeries(pinkSigilPowerTemp, 500000, 2, game.pinkSigilUpgradesBought[2]);
  SU12Cost = Decimal.sumGeometricSeries(SU12amountCanBuy, 500000, 2, game.pinkSigilUpgradesBought[2]);
  if (game.pinkSigilPower.lt("e1e10")) game.pinkSigilPower = game.pinkSigilPower.sub(SU12Cost);
  game.pinkSigilUpgradesBought[2] = game.pinkSigilUpgradesBought[2].add(SU12amountCanBuy);
  game.pinkSigilUpgrade3Cost = new Decimal(2).pow(game.pinkSigilUpgradesBought[2]).mul(500000).round();
  if (game.pinkSigilPower.lt(0)) game.pinkSigilPower = new Decimal(0);
}
function maxRedSigilUpgrades() {
  redSigilPowerTemp = game.redSigilPower.div(3);
  SU1amountCanBuy = Decimal.affordGeometricSeries(redSigilPowerTemp, 1, 1.5, game.redSigilUpgradesBought[0]);
  SU1Cost = Decimal.sumGeometricSeries(SU1amountCanBuy, 1, 1.5, game.redSigilUpgradesBought[0]);
  if (game.redSigilPower.lt("e1e10")) game.redSigilPower = game.redSigilPower.sub(SU1Cost);
  game.redSigilUpgradesBought[0] = game.redSigilUpgradesBought[0].add(SU1amountCanBuy);
  game.redSigilUpgrade1Cost = new Decimal(1.5).pow(game.redSigilUpgradesBought[0]).floor();
  SU2amountCanBuy = Decimal.affordGeometricSeries(redSigilPowerTemp, 1500, 1.5, game.redSigilUpgradesBought[1]);
  SU2Cost = Decimal.sumGeometricSeries(SU2amountCanBuy, 1500, 1.5, game.redSigilUpgradesBought[1]);
  if (game.redSigilPower.lt("e1e10")) game.redSigilPower = game.redSigilPower.sub(SU2Cost);
  game.redSigilUpgradesBought[1] = game.redSigilUpgradesBought[1].add(SU2amountCanBuy);
  game.redSigilUpgrade2Cost = new Decimal(1.5).pow(game.redSigilUpgradesBought[1]).mul(1500).floor();
  SU3amountCanBuy = Decimal.affordGeometricSeries(redSigilPowerTemp, 50000, 2.5, game.redSigilUpgradesBought[2]);
  SU3Cost = Decimal.sumGeometricSeries(SU3amountCanBuy, 50000, 2.5, game.redSigilUpgradesBought[2]);
  if (game.redSigilPower.lt("e1e10")) game.redSigilPower = game.redSigilPower.sub(SU3Cost);
  game.redSigilUpgradesBought[2] = game.redSigilUpgradesBought[2].add(SU3amountCanBuy);
  game.redSigilUpgrade3Cost = new Decimal(2.5).pow(game.redSigilUpgradesBought[2]).mul(50000).floor();
  if (game.redSigilPower.lt(0)) game.redSigilPower = new Decimal(0);
}
function maxOrangeSigilUpgrades() {
  orangeSigilPowerTemp = game.orangeSigilPower.div(3);
  SU1amountCanBuy = Decimal.affordGeometricSeries(orangeSigilPowerTemp, 1, 1.5, game.orangeSigilUpgradesBought[0]);
  SU1Cost = Decimal.sumGeometricSeries(SU1amountCanBuy, 1, 1.5, game.orangeSigilUpgradesBought[0]);
  if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = game.orangeSigilPower.sub(SU1Cost);
  game.orangeSigilUpgradesBought[0] = game.orangeSigilUpgradesBought[0].add(SU1amountCanBuy);
  game.orangeSigilUpgrade1Cost = new Decimal(1.5).pow(game.orangeSigilUpgradesBought[0]).floor();
  SU2amountCanBuy = Decimal.affordGeometricSeries(orangeSigilPowerTemp, 1500, 2, game.orangeSigilUpgradesBought[1]);
  SU2Cost = Decimal.sumGeometricSeries(SU2amountCanBuy, 1500, 2, game.orangeSigilUpgradesBought[1]);
  if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = game.orangeSigilPower.sub(SU2Cost);
  game.orangeSigilUpgradesBought[1] = game.orangeSigilUpgradesBought[1].add(SU2amountCanBuy);
  game.orangeSigilUpgrade2Cost = new Decimal(2).pow(game.orangeSigilUpgradesBought[1]).mul(2500).floor();
  SU3amountCanBuy = Decimal.affordGeometricSeries(orangeSigilPowerTemp, 150000, 3, game.orangeSigilUpgradesBought[2]);
  SU3Cost = Decimal.sumGeometricSeries(SU3amountCanBuy, 150000, 3, game.orangeSigilUpgradesBought[2]);
  if (game.orangeSigilPower.lt("e1e10")) game.orangeSigilPower = game.orangeSigilPower.sub(SU3Cost);
  game.orangeSigilUpgradesBought[2] = game.orangeSigilUpgradesBought[2].add(SU3amountCanBuy);
  game.orangeSigilUpgrade3Cost = new Decimal(3).pow(game.orangeSigilUpgradesBought[2]).mul(250000).floor();
  if (game.orangeSigilPower.lt(0)) game.orangeSigilPower = new Decimal(0);
}
function maxYellowSigilUpgrades() {
  yellowSigilPowerTemp = game.yellowSigilPower.div(3);
  SU1amountCanBuy = Decimal.affordGeometricSeries(yellowSigilPowerTemp, 1, 1.5, game.yellowSigilUpgradesBought[0]);
  SU1Cost = Decimal.sumGeometricSeries(SU1amountCanBuy, 1, 1.5, game.yellowSigilUpgradesBought[0]);
  if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = game.yellowSigilPower.sub(SU1Cost);
  game.yellowSigilUpgradesBought[0] = game.yellowSigilUpgradesBought[0].add(SU1amountCanBuy);
  game.yellowSigilUpgrade1Cost = new Decimal(1.5).pow(game.yellowSigilUpgradesBought[0]).floor();
  SU2amountCanBuy = Decimal.affordGeometricSeries(yellowSigilPowerTemp, 4000, 2, game.yellowSigilUpgradesBought[1]);
  SU2Cost = Decimal.sumGeometricSeries(SU2amountCanBuy, 4000, 2, game.yellowSigilUpgradesBought[1]);
  if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = game.yellowSigilPower.sub(SU2Cost);
  game.yellowSigilUpgradesBought[1] = game.yellowSigilUpgradesBought[1].add(SU2amountCanBuy);
  game.yellowSigilUpgrade2Cost = new Decimal(2).pow(game.yellowSigilUpgradesBought[1]).mul(4000).floor();
  SU3amountCanBuy = Decimal.affordGeometricSeries(yellowSigilPowerTemp, 2000000, 3, game.yellowSigilUpgradesBought[2]);
  SU3Cost = Decimal.sumGeometricSeries(SU3amountCanBuy, 2000000, 3, game.yellowSigilUpgradesBought[2]);
  if (game.yellowSigilPower.lt("e1e10")) game.yellowSigilPower = game.yellowSigilPower.sub(SU3Cost);
  game.yellowSigilUpgradesBought[2] = game.yellowSigilUpgradesBought[2].add(SU3amountCanBuy);
  game.yellowSigilUpgrade3Cost = new Decimal(3).pow(game.yellowSigilUpgradesBought[2]).mul(2000000).floor();
  if (game.yellowSigilPower.lt(0)) game.yellowSigilPower = new Decimal(0);
}
function updateSigilResetter(modeHasChanged = false) {
  let newValue = new Decimal(document.getElementById("sigilResetterAmount").value);
  let newMode = document.getElementById("sigilResetterMode").value;
  game.sigilResetterMode = sigilResetterModesFull.indexOf(newMode);
  switch (newMode) {
    case "Potential Sigil Amount":
      if (!modeHasChanged && !newValue.isNan() && newValue.gte(1)) game.sigilResetterAmount = newValue.round();
      break;
    case "Gold Amount":
      if (!modeHasChanged && !newValue.isNan() && newValue.gte(1)) game.sigilResetterGold = newValue.round();
      break;
    case "Seconds Since Reset":
      if (!modeHasChanged && !newValue.isNan() && newValue.gte(0)) game.sigilResetterTime = newValue;
      break;
  }
  game.sigilResetterActive = document.getElementById("sigilResetterActive").checked;
  game.sigilResetterType = sigilColours.indexOf(document.getElementById("sigilResetterType").value.toLowerCase());
  game.sigilResetterCycle = document.getElementById("sigilResetterCycle").checked;
  game.sigilResetterCycleMode = 0 + document.getElementById("sigilResetterCycleMode").checked; //for now this just sets to 0 or 1 based on single tickbox. will need to be changed if new modes are added
}
function sigilAutoResetter() {
  if (!game.sigilResetterActive) return;
  let currentColour = sigilColours[game.sigilResetterType];
  let resetConfirmed = false;
  switch (game.sigilResetterMode) {
    case 0:
      if (game[currentColour + "SigilsToGet"].gte(game.sigilResetterAmount)) {
        //console.log("auto sigil amount")
        sigilReset(game.sigilResetterType + 1);
        resetConfirmed = true;
      }
      break;
    case 1:
      if (game[currentColour + "SigilsToGet"].gte(1) && game.gold.gte(game.sigilResetterGold)) {
        //console.log("auto sigil gold")
        sigilReset(game.sigilResetterType + 1);
        resetConfirmed = true;
      }
      break;
    case 2:
      let timeSinceReset = new Decimal((Date.now() - game.lastSigilReset) / 1000);
      if (game[currentColour + "SigilsToGet"].gte(1) && timeSinceReset.gte(game.sigilResetterTime)) {
        console.log("auto sigil time");
        sigilReset(game.sigilResetterType + 1);
        resetConfirmed = true;
      }
      break;
  }
  if (game.sigilResetterCycle && resetConfirmed) {
    if (game.sigilResetterCycleMode === 0) {
      game.sigilResetterType = (game.sigilResetterType + 1) % document.getElementById("sigilResetterType").length;
    } else if (game.sigilResetterCycleMode === 1) {
      let newResetType = (game.sigilResetterType - 4) % 3 + 5; //cycles between 5,6,7
      newResetType = Math.max(newResetType, 5); //revert to red if outside the scope of this reset mode, due to being on a different setting previously
      newResetType = Math.min(newResetType, 7); //shouldn't ever be needed, but just to be safe
      game.sigilResetterType = newResetType;
    }
    let currentResetterType = sigilColours[game.sigilResetterType];
  }
}
