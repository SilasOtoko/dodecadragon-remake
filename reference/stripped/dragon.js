// STRIPPED COPY of reference/original/scripts/dragon.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Unlocks dragon
function unlockDragon() {
  if (game.gold.gte(200)) {
    game.gold = game.gold.sub(200);
    addUnlock(); //sets unlock to 1
  }
}

//Handles buying new dragon stages
function upgradeDragon(x) {
  if (x == 1 && game.gold.gte(2500000)) {
    game.gold = game.gold.sub(2500000);
    game.dragonStage = 2;
  } else if (x == 2 && game.gold.gte(1e12)) {
    game.gold = game.gold.sub(1e12);
    game.dragonStage = 3;
  } else if (x == 3 && game.gold.gte(1e25)) {
    game.gold = game.gold.sub(1e25);
    game.dragonStage = 4;
  } else if (x == 4 && game.gold.gte(1e150)) {
    game.gold = game.gold.sub(1e150);
    game.dragonStage = 5;
    game.dragonTimeEffect = new Decimal(1.2).pow(game.dragonTimeSpent.pow(0.3));
    if (game.dragonTimeEffect.gt(2)) game.dragonTimeEffect = game.dragonTimeEffect.add(2).pow(0.5);
    if (game.dragonTimeEffect.gt(2.5)) {
      game.dragonTimeEffect = new Decimal(2.5);
    }
  } else if (x == 5 && game.gold.gte("e1.5e11")) {
    game.dragonStage = 6;
  } else if (x == 6 && game.gold.gte("e1e55")) {
    game.dragonStage = 7;
  } else if (x == 7 && game.gold.gte("e1e200")) {
    game.dragonStage = 8;
  } else if (x == 8 && game.gold.gte("ee35000")) {
    game.dragonStage = 9;
  } else if (x == 9 && game.gold.gte("ee1.75e6")) {
    game.dragonStage = 10;
  } else if (x == 10 && game.gold.gte("ee1.5e9")) {
    game.dragonStage = 11;
  }
}

//Spending time with your dragon
function dragonSpendTime() {
  if (game.dragonTimeCooldown == 0 && !game.challengesActive) {
    let dragonTimeToGet = new Decimal(1 + Math.floor((Date.now() - game.lastUpdate) / 30000));
    if (game.darkMagicUpgradesBought[2]) {
      dragonTimeToGet = dragonTimeToGet.mul(10);
    }
    if (game.unlocks >= 12) dragonTimeToGet = dragonTimeToGet.mul(new Decimal(2).pow(game.indigoSigilUpgradesBought[2].pow(0.6)));
    game.dragonTimeSpent = game.dragonTimeSpent.add(dragonTimeToGet.floor());
    game.dragonTimeCooldown = 30;
    game.dragonTimeEffect = new Decimal(1.2).pow(game.dragonTimeSpent.pow(0.3));
    if (game.dragonTimeEffect.gt(2)) game.dragonTimeEffect = game.dragonTimeEffect.add(2).pow(0.5);
    dragonTimeEffectCap = new Decimal(2.5);
    if (game.tomeUpgradesBought[8] == true) dragonTimeEffectCap = dragonTimeEffectCap.mul(game.blueFireUpgradesBought[4].pow(0.7).div(5).add(1));
    if (game.unlocks >= 26) dragonTimeEffectCap = dragonTimeEffectCap.mul(game.holyFireUpgradesBought[2].pow(0.7).mul(5).add(1));
    if (game.voidMagicUpgradesBought[8] == true) dragonTimeEffectCap = dragonTimeEffectCap.mul(10000);
    if (game.dragonTimeEffect.gt(dragonTimeEffectCap)) {
      game.dragonTimeEffect = dragonTimeEffectCap;
    }
  }
}

//Feeding your dragon
function dragonFeed() {
  if (game.magifolds.gte(game.dragonFeedCost) && !game.challengesActive) {
    if (game.unlockedAchievements[10] > 0) {
      maxDragonFeedsBuyable = new Decimal(game.magifolds).log10().log10().div(0.301).sub(3).floor().add(1);
      // game.dragonFood = game.dragonFood.add(maxDragonFeedsBuyable);
      game.dragonFood = Decimal.max(game.dragonFood, maxDragonFeedsBuyable);
      game.dragonFeedCost = new Decimal(10).pow(new Decimal(2).pow(game.dragonFood).mul(8).round());
    } else {
      game.dragonFood = game.dragonFood.add(1);
      game.dragonFeedCost = new Decimal(10).pow(new Decimal(2).pow(game.dragonFood).mul(8).round());
    }
    //Resetting all the score and magifold stuff
    if (game.unlockedAchievements[7] > 0) {
      //do nothing :D
    } else if (game.unlockedAchievements[6] > 1) {
      game.magicScore1 = game.magicScore1.sqrt();
      game.magicScore2 = game.magicScore2.sqrt();
      game.magicScore3 = game.magicScore3.sqrt();
      game.magicScore4 = game.magicScore4.sqrt();
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
  }
}

//Petting your dragon
//This code could probably be shortened a lot!
function dragonPet() {
  if (game.dragonPets == 0 && game.cyanSigils.gte(250)) {
    game.cyanSigils = game.cyanSigils.sub(250);
    game.dragonPets++;
  } else if (game.dragonPets == 1 && game.blueSigils.gte(250)) {
    game.blueSigils = game.blueSigils.sub(250);
    game.dragonPets++;
  } else if (game.dragonPets == 2 && game.indigoSigils.gte(250)) {
    game.indigoSigils = game.indigoSigils.sub(250);
    game.dragonPets++;
  } else if (game.dragonPets == 3 && game.violetSigils.gte(250)) {
    game.violetSigils = game.violetSigils.sub(250);
    game.dragonPets++;
  } else if (game.dragonPets == 4 && game.pinkSigils.gte(250)) {
    game.pinkSigils = game.pinkSigils.sub(250);
    game.dragonPets++;
  }
}

//Hypergod stuff is here because I don't want to make another script file only for this
function defeatHypergod() {
  if (game.gold.gte(hypergodDefeatCosts[game.hypergodsDefeated])) {
    game.hypergodsDefeated++;
  }
}
