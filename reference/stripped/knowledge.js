// STRIPPED COPY of reference/original/scripts/knowledge.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
function randomizeKnowledgeTrade(trade) {
  sigilColourOptions = [1, 2, 3, 4, 5];
  sigilColourOptions.splice(Math.floor(Math.random() * 5), 1);
  sigilColourOptions.splice(Math.floor(Math.random() * 4), 1);
  if (game["knowledgeTrade" + trade + "SigilTypes"]) game["knowledgeTrade" + trade + "SigilTypes"] = sigilColourOptions;
  if (game["knowledgeTrade" + trade + "Multipliers"]) game["knowledgeTrade" + trade + "Multipliers"] = [Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5, Math.random() / 2 + 1];
  if (game["knowledgeTrade" + trade + "Amounts"]) {
    game["knowledgeTrade" + trade + "Amounts"][0] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[sigilColourOptions[0] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][0]).mul(7.5).floor().mul(100);
    game["knowledgeTrade" + trade + "Amounts"][1] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[sigilColourOptions[1] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][1]).mul(7.5).floor().mul(100);
    game["knowledgeTrade" + trade + "Amounts"][2] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[sigilColourOptions[2] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][2]).mul(7.5).floor().mul(100);
  }
  if (game["knowledgeTrade" + trade + "Reward"]) {
    game["knowledgeTrade" + trade + "Reward"] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(game["knowledgeTrade" + trade + "Multipliers"][3]);
    game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(2).pow(game.knowledgeUpgradesBought[0].pow(0.5)));
    if (game.tomeUpgradesBought[2] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(2);
    if (game.tomeUpgradesBought[6] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(game.totalTomes.pow(1.2).add(1));
    if (game.tomeUpgradesBought[8] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(1000).pow(game.blueFireUpgradesBought[5].pow(0.6)));
    if (game.holyTetrahedronUpgradesBought[7]) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(1e150);
    if (game.holyOctahedronUpgradesBought[8]) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul("e550");
    if (game.voidMagicUpgradesBought[11] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul("e12000");
    if (game.unlocks >= 33) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(10).pow(new Decimal(2).pow(game.darkEssenceUpgradesBought[2].pow(0.5)).mul(5e9)));
    game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].floor();
  }
  loadKnowledgeTrade(trade);
}
function setKnowledgeTrade(trade) {
  if (game["knowledgeTrade" + trade + "Amounts"]) {
    game["knowledgeTrade" + trade + "Amounts"][0] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[game["knowledgeTrade" + trade + "SigilTypes"][0] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][0]).mul(7.5).floor().mul(100);
    game["knowledgeTrade" + trade + "Amounts"][1] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[game["knowledgeTrade" + trade + "SigilTypes"][1] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][1]).mul(7.5).floor().mul(100);
    game["knowledgeTrade" + trade + "Amounts"][2] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(knowledgeMultipliers[game["knowledgeTrade" + trade + "SigilTypes"][2] - 1]).mul(game["knowledgeTrade" + trade + "Multipliers"][2]).mul(7.5).floor().mul(100);
  }
  if (game["knowledgeTrade" + trade + "Reward"]) {
    game["knowledgeTrade" + trade + "Reward"] = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1)).mul(game["knowledgeTrade" + trade + "Multipliers"][3]);
    game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(2).pow(game.knowledgeUpgradesBought[0].pow(0.5)));
    if (game.tomeUpgradesBought[2] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(2);
    if (game.tomeUpgradesBought[6] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(game.totalTomes.pow(1.2).add(1));
    if (game.tomeUpgradesBought[8] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(1000).pow(game.blueFireUpgradesBought[5].pow(0.6)));
    if (game.holyTetrahedronUpgradesBought[7]) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(1e150);
    if (game.holyOctahedronUpgradesBought[8]) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul("e550");
    if (game.voidMagicUpgradesBought[11] == true) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul("e12000");
    if (game.unlocks >= 33) game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].mul(new Decimal(10).pow(new Decimal(2).pow(game.darkEssenceUpgradesBought[2].pow(0.5)).mul(5e9)));
    game["knowledgeTrade" + trade + "Reward"] = game["knowledgeTrade" + trade + "Reward"].floor();
  }
  loadKnowledgeTrade(trade);
}
function resetKnowledgeTrades() {
  knowledgeTradeLevelTemp = game.knowledgeTradeLevel;
  game.knowledgeTradeLevel = new Decimal(1);
  setKnowledgeTrade(1);
  setKnowledgeTrade(2);
  setKnowledgeTrade(3);
  game.knowledgeTradeLevel = knowledgeTradeLevelTemp;
}
function loadKnowledgeTrade(trade) {}
function updateKnowledgeTradeLevel(x) {
  if (x == 1) {
    game.knowledgeTradeLevel = new Decimal(document.getElementById("knowledgeLevelRange").value);
  } else if (x == 2) {
    game.knowledgeTradeLevel = new Decimal(document.getElementById("knowledgeLevelInput").value);
    if (game.knowledgeTradeLevel.lt(0)) game.knowledgeTradeLevel = new Decimal(0);
    if (game.knowledgeTradeLevel.gt(game.knowledgeTradeLevelCap)) game.knowledgeTradeLevel = game.knowledgeTradeLevelCap;
  }
  //document.getElementById("knowledgeTradeLevel").innerHTML = game.knowledgeTradeLevel

  knowledgeRewardTemp = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1));
  knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(2).pow(game.knowledgeUpgradesBought[0].pow(0.5)));
  if (game.tomeUpgradesBought[2] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(2);
  if (game.tomeUpgradesBought[6] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(game.totalTomes.pow(1.2).add(1));
  if (game.tomeUpgradesBought[8] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(1000).pow(game.blueFireUpgradesBought[5].pow(0.6))).floor();
}
function purchaseKnowledgeTrade(trade) {
  sigilColour1 = sigilColours[game["knowledgeTrade" + trade + "SigilTypes"][0] - 1];
  sigilColour2 = sigilColours[game["knowledgeTrade" + trade + "SigilTypes"][1] - 1];
  sigilColour3 = sigilColours[game["knowledgeTrade" + trade + "SigilTypes"][2] - 1];
  if (game[sigilColour1 + "Sigils"].gte(game["knowledgeTrade" + trade + "Amounts"][0]) && game[sigilColour2 + "Sigils"].gte(game["knowledgeTrade" + trade + "Amounts"][1]) && game[sigilColour3 + "Sigils"].gte(game["knowledgeTrade" + trade + "Amounts"][2])) {
    game.knowledge = game.knowledge.add(game["knowledgeTrade" + trade + "Reward"]);
    if (game.knowledge.gte(game.highestKnowledge)) game.highestKnowledge = game.knowledge;
    game[sigilColour1 + "Sigils"] = game[sigilColour1 + "Sigils"].sub(game["knowledgeTrade" + trade + "Amounts"][0]);
    game[sigilColour2 + "Sigils"] = game[sigilColour2 + "Sigils"].sub(game["knowledgeTrade" + trade + "Amounts"][1]);
    game[sigilColour3 + "Sigils"] = game[sigilColour3 + "Sigils"].sub(game["knowledgeTrade" + trade + "Amounts"][2]);
    randomizeKnowledgeTrade(trade);
  }
}
function buyKnowledgeUpgrade(x) {
  //For each upgrade (if affordable): subtracts knowledge based on cost, adds 1 to the upgrade amount bought, updates the cost
  if (x == 1 && game.knowledge.gte(game.knowledgeUpgradeCosts[0])) {
    if (game.knowledgeUpgradeCosts[0].lt("e1e9")) game.knowledge = game.knowledge.sub(game.knowledgeUpgradeCosts[0]);
    game.knowledgeUpgradesBought[0] = game.knowledgeUpgradesBought[0].add(1);
    game.knowledgeUpgradeCosts[0] = new Decimal(2).pow(game.knowledgeUpgradesBought[0]).mul(20).floor();
  } else if (x == 2 && game.knowledge.gte(game.knowledgeUpgradeCosts[1])) {
    if (game.knowledgeUpgradeCosts[1].lt("e1e9")) game.knowledge = game.knowledge.sub(game.knowledgeUpgradeCosts[1]);
    game.knowledgeUpgradesBought[1] = game.knowledgeUpgradesBought[1].add(1);
    game.knowledgeUpgradeCosts[1] = new Decimal(5).pow(game.knowledgeUpgradesBought[1]).mul(50).floor();
    knowledgeUpgrade2Effect = new Decimal(5).pow(game.knowledgeUpgradesBought[1].pow(0.5));
    if (knowledgeUpgrade2Effect.gt(1e20)) knowledgeUpgrade2Effect = knowledgeUpgrade2Effect.mul(1e60).pow(0.25);
    if (knowledgeUpgrade2Effect.gt("e2e7")) knowledgeUpgrade2Effect = new Decimal("e2e7");
  } else if (x == 3 && game.knowledge.gte(100000)) {
    game.knowledge = game.knowledge.sub(100000);
    game.knowledgeUpgradesBought[2] = new Decimal(1);
    addUnlock(); //sets unlock to 16
  }
}
function knowledgeMaxAll() {
  //Determines the amount of upgrades the user can afford and the price, subtracts knowledge, adds to the upgrade amount, updates the cost
  KU1amountCanBuy = Decimal.affordGeometricSeries(game.knowledge.div(2), 20, 2, game.knowledgeUpgradesBought[0]);
  KU1Cost = Decimal.sumGeometricSeries(KU1amountCanBuy, 20, 2, game.knowledgeUpgradesBought[0]);
  if (KU1Cost.lt("e1e9")) game.knowledge = game.knowledge.sub(KU1Cost);
  game.knowledgeUpgradesBought[0] = game.knowledgeUpgradesBought[0].add(KU1amountCanBuy);
  game.knowledgeUpgradeCosts[0] = new Decimal(2).pow(game.knowledgeUpgradesBought[0]).mul(20).floor();
  KU2amountCanBuy = Decimal.affordGeometricSeries(game.knowledge, 50, 5, game.knowledgeUpgradesBought[1]);
  KU2Cost = Decimal.sumGeometricSeries(KU2amountCanBuy, 50, 5, game.knowledgeUpgradesBought[1]);
  if (KU2Cost.lt("e1e9")) game.knowledge = game.knowledge.sub(KU2Cost);
  game.knowledgeUpgradesBought[1] = game.knowledgeUpgradesBought[1].add(KU2amountCanBuy);
  game.knowledgeUpgradeCosts[1] = new Decimal(5).pow(game.knowledgeUpgradesBought[1]).mul(50).floor();
  knowledgeUpgrade2Effect = new Decimal(5).pow(game.knowledgeUpgradesBought[1].pow(0.5));
  if (knowledgeUpgrade2Effect.gt(1e20)) knowledgeUpgrade2Effect = knowledgeUpgrade2Effect.mul(1e60).pow(0.25);
  if (knowledgeUpgrade2Effect.gt("e2e7")) knowledgeUpgrade2Effect = new Decimal("e2e7");
}
function knowledgeAutoMaxAll() {
  if (!game.knowledgeAutoMaxAll) {
    game.knowledgeAutoMaxAll = true;
  } else {
    game.knowledgeAutoMaxAll = false;
  }
}
function buyTome() {
  if (game.knowledge.gte(game.tomeCost)) {
    if (game.unlockedAchievements[15] == 0) game.knowledge = game.knowledge.sub(game.tomeCost);
    game.tomes = game.tomes.add(1);
    game.totalTomes = game.totalTomes.add(1);
    if (game.tomeUpgradesBought[7]) {
      game.tomeCost = new Decimal(1.1).pow(game.totalTomes).mul(100000);
    } else if (game.tomeUpgradesBought[4]) {
      game.tomeCost = new Decimal(1.3).pow(game.totalTomes).mul(100000);
    } else {
      game.tomeCost = new Decimal(1.5).pow(game.totalTomes).mul(100000);
    }
  }
}
function buyMaxTomes() {
  if (game.tomeUpgradesBought[7]) {
    amtToBuy = Decimal.affordGeometricSeries(game.knowledge, 100000, 1.1, game.totalTomes);
    costToBuy = Decimal.sumGeometricSeries(amtToBuy, 100000, 1.1, game.totalTomes);
  } else if (game.tomeUpgradesBought[4]) {
    amtToBuy = Decimal.affordGeometricSeries(game.knowledge, 100000, 1.3, game.totalTomes);
    costToBuy = Decimal.sumGeometricSeries(amtToBuy, 100000, 1.3, game.totalTomes);
  } else {
    amtToBuy = Decimal.affordGeometricSeries(game.knowledge, 100000, 1.5, game.totalTomes);
    costToBuy = Decimal.sumGeometricSeries(amtToBuy, 100000, 1.5, game.totalTomes);
  }
  game.tomes = game.tomes.add(amtToBuy);
  game.totalTomes = game.totalTomes.add(amtToBuy);
  if (game.unlockedAchievements[14] <= 1) game.knowledge = game.knowledge.sub(costToBuy);
  if (game.tomeUpgradesBought[7]) {
    game.tomeCost = new Decimal(1.1).pow(game.totalTomes).mul(100000);
  } else if (game.tomeUpgradesBought[4]) {
    game.tomeCost = new Decimal(1.3).pow(game.totalTomes).mul(100000);
  } else {
    game.tomeCost = new Decimal(1.5).pow(game.totalTomes).mul(100000);
  }
}

//Tome upgrades
function buyTomeUpgrade(x) {
  //Checks that the tome upgrade is not bought and that the player's tome amount is greater/equal to the corresponding upgrade cost
  if (x == 12 && game.tomeUpgradesBought[11] != true && game.tomes.gte(tomeUpgradeCosts[11]) && game.darkMagicUpgradesBought[10]) {
    game.tomes = game.tomes.sub(tomeUpgradeCosts[11]);
    game.tomeUpgradesBought[11] = true;
    addUnlock(); //sets unlock to 20
  } else if (x == 13 && game.tomeUpgradesBought[12] != true && game.tomes.gte(tomeUpgradeCosts[12]) && game.unlocks >= 20) {
    game.tomes = game.tomes.sub(tomeUpgradeCosts[12]);
    game.tomeUpgradesBought[12] = true;
    redSigilAutoOption = document.createElement("option");
    redSigilAutoOption.text = "Red";
    addUnlock(); //sets unlock to 21
  } else if (game.tomeUpgradesBought[x - 1] != true && game.tomes.gte(tomeUpgradeCosts[x - 1]) && x != 12 && x != 13) {
    game.tomes = game.tomes.sub(tomeUpgradeCosts[x - 1]);
    game.tomeUpgradesBought[x - 1] = true;
    if (x == 5) {
      game.tomeCost = new Decimal(1.3).pow(game.totalTomes).mul(100000);
    }
    if (x == 6) {
      addUnlock(); //sets unlock to 17
    }
    if (x == 8) {
      game.tomeCost = new Decimal(1.1).pow(game.totalTomes).mul(100000);
    }
    if (x == 14) {
      newHellLayer = document.createElement("option");
      newHellLayer.text = "Greed (IV)";
      newHellLayer = document.createElement("option");
      newHellLayer.text = "Wrath (V)";
    }
  }
}

//Buy max for tome upgrades
function tomeUpgradeBuyMax() {
  for (i = 1; i < 12; i++) {
    if (i != 6 && i != 9) buyTomeUpgrade(i);
  }
}
