// STRIPPED COPY of reference/original/scripts/alchemy.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Unlocks alchemy
function unlockAlchemy() {
  if (game.gold.gte(2e7)) {
    game.gold = game.gold.sub(2e7);
    addUnlock(); //sets unlock to 3
  }
}

//Converts gold to platinum
function platinumConvert() {
  if (game.platinumConvertCooldown == 0 && game.platinumToGet > 0) {
    game.platinum = game.platinum.add(game.platinumToGet);
    game.gold = new Decimal(0);
    game.platinumConvertCooldown = 3;
  }
}
function buyPlatinumUpgrade(x) {
  //For each upgrade (if affordable): subtracts platinum based on cost, adds 1 to the upgrade amount bought, disables button if maximum amount is reached
  if (x == 1 && game.platinumUpgradesBought[0] < 20 && game.platinum.gte(200)) {
    game.platinum = game.platinum.sub(200);
    game.platinumUpgradesBought[0]++;
  } else if (x == 2 && game.platinumUpgradesBought[1] < 20 && game.platinum.gte(500)) {
    game.platinum = game.platinum.sub(500);
    game.platinumUpgradesBought[1]++;
  } else if (x == 3 && game.platinumUpgradesBought[2] < 1 && game.platinum.gte(750)) {
    game.platinum = game.platinum.sub(750);
    game.platinumUpgradesBought[2]++;
  } else if (x == 4 && game.platinumUpgradesBought[3] < 5 && game.platinum.gte(1500)) {
    game.platinum = game.platinum.sub(1500);
    game.platinumUpgradesBought[3]++;
    game.minerCost = new Decimal(1.1).sub(game.platinumUpgradesBought[3] * 0.005).pow(game.miners).mul(20).floor();
  } else if (x == 5 && game.platinumUpgradesBought[4] < 1 && game.platinum.gte(2000)) {
    game.platinum = game.platinum.sub(2000);
    game.platinumUpgradesBought[4]++;
  } else if (x == 6 && game.platinumUpgradesBought[5] < 4 && game.platinum.gte(15000)) {
    game.platinum = game.platinum.sub(15000);
    game.platinumUpgradesBought[5]++;
  } else if (x == 7 && game.platinumUpgradesBought[6] < 20 && game.platinum.gte(1e6)) {
    game.platinum = game.platinum.sub(1e6);
    game.platinumUpgradesBought[6]++;
  } else if (x == 8 && game.platinumUpgradesBought[7] < 5 && game.platinum.gte(1e22)) {
    game.platinum = game.platinum.sub(1e22);
    game.platinumUpgradesBought[7]++;
  } else if (x == 9 && game.platinumUpgradesBought[8] < 5 && game.platinum.gte(1e30)) {
    game.platinum = game.platinum.sub(1e30);
    game.platinumUpgradesBought[8]++;
  }
}
function platinumMaxAll() {
  //For each upgrade in order (if affordable): determines the maximum upgrades buyable, subtracts platinum based on cost, adds to the upgrade amount bought (up to the maximum), disables button if maximum amount is reached
  PU1AmountCanBuy = game.platinum.div(200).floor();
  PU1AmountToBuy = Decimal.min(PU1AmountCanBuy, 20 - game.platinumUpgradesBought[0]).toNumber();
  game.platinum = game.platinum.sub(PU1AmountToBuy * 200);
  game.platinumUpgradesBought[0] += PU1AmountToBuy;
  PU2AmountCanBuy = game.platinum.div(500).floor();
  PU2AmountToBuy = Decimal.min(PU2AmountCanBuy, 20 - game.platinumUpgradesBought[1]).toNumber();
  game.platinum = game.platinum.sub(PU2AmountToBuy * 500);
  game.platinumUpgradesBought[1] += PU2AmountToBuy;
  if (game.platinumUpgradesBought[2] < 1 && game.platinum.gte(750)) {
    game.platinum = game.platinum.sub(750);
    game.platinumUpgradesBought[2]++;
  }
  PU4AmountCanBuy = game.platinum.div(1500).floor();
  PU4AmountToBuy = Decimal.min(PU4AmountCanBuy, 5 - game.platinumUpgradesBought[3]).toNumber();
  game.platinum = game.platinum.sub(PU4AmountToBuy * 1500);
  game.platinumUpgradesBought[3] += PU4AmountToBuy;
  game.minerCost = new Decimal(1.1).sub(game.platinumUpgradesBought[3] * 0.005).pow(game.miners).mul(20).floor();
  if (game.platinumUpgradesBought[4] < 1 && game.platinum.gte(2000)) {
    game.platinum = game.platinum.sub(2000);
    game.platinumUpgradesBought[4]++;
  }
  PU6AmountCanBuy = game.platinum.div(15000).floor();
  PU6AmountToBuy = Decimal.min(PU6AmountCanBuy, 4 - game.platinumUpgradesBought[5]).toNumber();
  game.platinum = game.platinum.sub(PU6AmountToBuy * 15000);
  game.platinumUpgradesBought[5] += PU6AmountToBuy;
  if (game.magicUpgradesBought[7] || game.unlocks >= 10) {
    PU7AmountCanBuy = game.platinum.div(1e6).floor();
    if (game.magicUpgradesBought[10]) {
      PU7AmountToBuy = Decimal.min(PU7AmountCanBuy, 20 - game.platinumUpgradesBought[6]).toNumber();
    } else {
      PU7AmountToBuy = Decimal.min(PU7AmountCanBuy, 10 - game.platinumUpgradesBought[6]).toNumber();
    }
    game.platinum = game.platinum.sub(PU7AmountToBuy * 1e6);
    game.platinumUpgradesBought[6] += PU7AmountToBuy;
  }
  if (game.unlocks >= 8 || game.unlocks >= 10) {
    PU8AmountCanBuy = game.platinum.div(1e22).floor();
    PU8AmountToBuy = Decimal.min(PU8AmountCanBuy, 5 - game.platinumUpgradesBought[7]).toNumber();
    game.platinum = game.platinum.sub(PU8AmountToBuy * 1e22);
    game.platinumUpgradesBought[7] += PU8AmountToBuy;
    PU9AmountCanBuy = game.platinum.div(1e30).floor();
    PU9AmountToBuy = Decimal.min(PU9AmountCanBuy, 5 - game.platinumUpgradesBought[8]).toNumber();
    game.platinum = game.platinum.sub(PU9AmountToBuy * 1e30);
    game.platinumUpgradesBought[8] += PU9AmountToBuy;
  }
}

//Converts platinum to uranium
function uraniumConvert() {
  if (game.uraniumConvertCooldown == 0 && game.uraniumToGet > 0) {
    game.uranium = game.uranium.add(game.uraniumToGet);
    game.platinum = new Decimal(0);
    game.uraniumConvertCooldown = 3;
  }
}
function buyUraniumUpgrade(x) {
  //For each upgrade (if affordable): subtracts uranium based on cost, adds 1 to the upgrade amount bought, disables button if maximum amount is reached
  if (x == 1 && game.uraniumUpgradesBought[0] < 100 && game.uranium.gte(100)) {
    game.uranium = game.uranium.sub(100);
    game.uraniumUpgradesBought[0]++;
  } else if (x == 2 && game.uraniumUpgradesBought[1] < 20 && game.uranium.gte(300)) {
    game.uranium = game.uranium.sub(300);
    game.uraniumUpgradesBought[1]++;
  } else if (x == 3 && game.uraniumUpgradesBought[2] < 5 && game.uranium.gte(1000)) {
    game.uranium = game.uranium.sub(1000);
    game.uraniumUpgradesBought[2]++;
  } else if (x == 4 && game.uraniumUpgradesBought[3] < 1 && game.uranium.gte(10000)) {
    game.uranium = game.uranium.sub(10000);
    game.uraniumUpgradesBought[3]++;
  } else if (x == 5 && game.uraniumUpgradesBought[4] < 10 && game.uranium.gte(50000)) {
    game.uranium = game.uranium.sub(50000);
    game.uraniumUpgradesBought[4]++;
  }
}
function uraniumMaxAll() {
  //For each upgrade in order (if affordable): determines the maximum upgrades buyable, subtracts uranium based on cost, adds to the upgrade amount bought (up to the maximum), disables button if maximum amount is reached
  UU1AmountCanBuy = game.uranium.div(100).floor();
  UU1AmountToBuy = Decimal.min(UU1AmountCanBuy, 100 - game.uraniumUpgradesBought[0]).toNumber();
  game.uranium = game.uranium.sub(UU1AmountToBuy * 100);
  game.uraniumUpgradesBought[0] += UU1AmountToBuy;
  UU2AmountCanBuy = game.uranium.div(300).floor();
  UU2AmountToBuy = Decimal.min(UU2AmountCanBuy, 20 - game.uraniumUpgradesBought[1]).toNumber();
  game.uranium = game.uranium.sub(UU2AmountToBuy * 300);
  game.uraniumUpgradesBought[1] += UU2AmountToBuy;
  UU3AmountCanBuy = game.uranium.div(1000).floor();
  UU3AmountToBuy = Decimal.min(UU3AmountCanBuy, 5 - game.uraniumUpgradesBought[2]).toNumber();
  game.uranium = game.uranium.sub(UU3AmountToBuy * 1000);
  game.uraniumUpgradesBought[2] += UU3AmountToBuy;
  if (game.uraniumUpgradesBought[3] < 1 && game.uranium.gte(10000)) {
    game.uranium = game.uranium.sub(10000);
    game.uraniumUpgradesBought[3]++;
  }
  UU5AmountCanBuy = game.uranium.div(50000).floor();
  UU5AmountToBuy = Decimal.min(UU5AmountCanBuy, 10 - game.uraniumUpgradesBought[4]).toNumber();
  game.uranium = game.uranium.sub(UU5AmountToBuy * 50000);
  game.uraniumUpgradesBought[4] += UU5AmountToBuy;
}

//Unlocks more platinum and uranium upgrades
function morePUupgrades() {
  if (game.gold.gte("e420")) {
    game.gold = game.gold.sub("e420");
    addUnlock(); //sets unlock to 8
  }
}

//Converts uranium to plutonium
function plutoniumConvert() {
  if (game.plutoniumConvertCooldown == 0 && game.plutoniumToGet > 0) {
    game.plutonium = game.plutonium.add(game.plutoniumToGet);
    game.uranium = new Decimal(0);
    game.plutoniumConvertCooldown = 3;
  }
}
function buyPlutoniumUpgrade(x) {
  //For each upgrade (if affordable): subtracts plutonium based on cost, adds 1 to the upgrade amount bought, disables button if maximum amount is reached
  if (x == 1 && game.plutoniumUpgradesBought[0] < 40 && game.plutonium.gte(200)) {
    game.plutonium = game.plutonium.sub(200);
    game.plutoniumUpgradesBought[0]++;
  } else if (x == 2 && game.plutoniumUpgradesBought[1] < 8 && game.plutonium.gte(400)) {
    game.plutonium = game.plutonium.sub(400);
    game.plutoniumUpgradesBought[1]++;
  } else if (x == 3 && game.plutoniumUpgradesBought[2] < 4 && game.plutonium.gte(800)) {
    game.plutonium = game.plutonium.sub(800);
    game.plutoniumUpgradesBought[2]++;
  } else if (x == 4 && game.plutoniumUpgradesBought[3] < 10 && game.plutonium.gte(5000)) {
    game.plutonium = game.plutonium.sub(5000);
    game.plutoniumUpgradesBought[3]++;
  } else if (x == 5 && game.plutoniumUpgradesBought[4] < 20 && game.plutonium.gte(50000)) {
    game.plutonium = game.plutonium.sub(50000);
    game.plutoniumUpgradesBought[4]++;
  }
}
function plutoniumMaxAll() {
  //For each upgrade in order (if affordable): determines the maximum upgrades buyable, subtracts plutonium based on cost, adds to the upgrade amount bought (up to the maximum), disables button if maximum amount is reached
  PU1AmountCanBuy = game.plutonium.div(200).floor();
  PU1AmountToBuy = Decimal.min(PU1AmountCanBuy, 40 - game.plutoniumUpgradesBought[0]).toNumber();
  game.plutonium = game.plutonium.sub(PU1AmountToBuy * 200);
  game.plutoniumUpgradesBought[0] += PU1AmountToBuy;
  PU2AmountCanBuy = game.plutonium.div(400).floor();
  PU2AmountToBuy = Decimal.min(PU2AmountCanBuy, 8 - game.plutoniumUpgradesBought[1]).toNumber();
  game.plutonium = game.plutonium.sub(PU2AmountToBuy * 400);
  game.plutoniumUpgradesBought[1] += PU2AmountToBuy;
  PU3AmountCanBuy = game.plutonium.div(800).floor();
  PU3AmountToBuy = Decimal.min(PU3AmountCanBuy, 4 - game.plutoniumUpgradesBought[2]).toNumber();
  game.plutonium = game.plutonium.sub(PU3AmountToBuy * 800);
  game.plutoniumUpgradesBought[2] += PU3AmountToBuy;
  PU4AmountCanBuy = game.plutonium.div(5000).floor();
  PU4AmountToBuy = Decimal.min(PU4AmountCanBuy, 10 - game.plutoniumUpgradesBought[3]).toNumber();
  game.plutonium = game.plutonium.sub(PU4AmountToBuy * 5000);
  game.plutoniumUpgradesBought[3] += PU4AmountToBuy;
  PU5AmountCanBuy = game.plutonium.div(50000).floor();
  PU5AmountToBuy = Decimal.min(PU5AmountCanBuy, 20 - game.plutoniumUpgradesBought[4]).toNumber();
  game.plutonium = game.plutonium.sub(PU5AmountToBuy * 50000);
  game.plutoniumUpgradesBought[4] += PU5AmountToBuy;
}
function buyOganessonUpgrade(x) {
  //For each upgrade (if affordable): subtracts oganesson based on cost, adds 1 to the upgrade amount bought, disables button if maximum amount is reached
  if (x == 1 && game.oganessonUpgradesBought[0] < 10 && game.oganesson.gte(100)) {
    game.oganesson = game.oganesson.sub(100);
    game.oganessonUpgradesBought[0]++;
  } else if (x == 2 && game.oganessonUpgradesBought[1] < 10 && game.oganesson.gte(1000)) {
    game.oganesson = game.oganesson.sub(1000);
    game.oganessonUpgradesBought[1]++;
  } else if (x == 3 && game.oganessonUpgradesBought[2] < 10 && game.oganesson.gte(2000)) {
    game.oganesson = game.oganesson.sub(2000);
    game.oganessonUpgradesBought[2]++;
  } else if (x == 4 && game.oganessonUpgradesBought[3] < 1 && game.oganesson.gte(5000)) {
    game.oganesson = game.oganesson.sub(5000);
    game.oganessonUpgradesBought[3]++;
  } else if (x == 5 && game.oganessonUpgradesBought[4] < 5 && game.oganesson.gte(10000)) {
    game.oganesson = game.oganesson.sub(10000);
    game.oganessonUpgradesBought[4]++;
  } else if (x == 6 && game.oganessonUpgradesBought[5] < 10 && game.oganesson.gte(100000)) {
    game.oganesson = game.oganesson.sub(100000);
    game.oganessonUpgradesBought[5]++;
  } else if (x == 7 && game.oganessonUpgradesBought[6] < 10 && game.oganesson.gte(5e6)) {
    game.oganesson = game.oganesson.sub(5e6);
    game.oganessonUpgradesBought[6]++;
  }
}
