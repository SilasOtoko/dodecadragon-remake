// STRIPPED COPY of reference/original/scripts/script.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//TO DO LIST
//Check that the code at the end of the reset function is updated
//Remove known bugs and to do list from changelog

//Stolen code to check if the user is on a mobile device
window.mobileCheck = function () {
  let check = false;
  /*
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  */
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
if (mobileCheck()) {
  //document.getElementById("mobileCover").style.display = "block"

  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
}

//prevents user from tab indexing

window.isDevVersion = window.location.href.indexOf('demonin.com') == -1;
if (isDevVersion) {
  //FPS stuff
  window.times = [];
  window.fps = 0;
  function refreshLoop() {}
  refreshLoop();
  setInterval(function () {}, 200);
}

//Formatting code taken from RedShark77's games
function format(ex, acc = 2, max = 9) {
  function E(x) {
    return new Decimal(x);
  }
  ex = E(ex);
  neg = ex.lt(0) ? "-" : "";
  if (ex.mag == Infinity) return neg + 'Infinity';
  if (Number.isNaN(ex.mag)) return neg + 'NaN';
  //The bit I added, this rounds the mag if it's extremely close to an integer due to rounding errors during calculations
  if (ex.layer > 0 && ex.mag % 1 > 0.9999) ex.mag = Math.ceil(ex.mag);
  if (ex.lt(0)) ex = ex.mul(-1);
  if (ex.eq(0)) return ex.toFixed(acc);
  let e = ex.log10().floor();
  if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
    let e = ex.log10().ceil();
    let m = ex.div(e.eq(-1) ? E(0.1) : E(10).pow(e));
    let be = e.mul(-1).max(1).log10().gte(9);
    return neg + (be ? '' : m.toFixed(2)) + 'e' + format(e, 0, max);
  } else if (e.lt(max)) {
    let a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
    return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else {
    if (ex.gte("eeee10")) {
      let slog = ex.slog();
      return (slog.gte(1e9) ? '' : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(), 0);
    }
    let m = ex.div(E(10).pow(e));
    let be = e.gte(10000);
    return neg + (be ? '' : m.toFixed(2)) + 'e' + format(e, 0, max);
  }
}
var autosaveStarted = false;
//Sets all variables to their base values
function reset() {
  game = {
    unlockedAchievements: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unlocks: 0,
    lastMajorChangeVersion: 3,
    //tracks what version was last played so adjustments can be made in the loading code when necessary. 
    lastUpdate: Date.now(),
    lastSave: 0,
    lastSigilReset: Date.now(),
    timePlayed: 0,
    backgroundPatternOn: true,
    confirmations: [true, true, true],
    achievementFlashActive: false,
    currentTab: 1,
    dragonName: "Unnamed dragon",
    sigilResetterActive: false,
    sigilResetterType: 0,
    sigilResetterMode: 0,
    //0 is sigil amount, 1 is gold, 2 is time since reset
    sigilResetterAmount: new Decimal(1),
    sigilResetterGold: new Decimal(1),
    sigilResetterTime: new Decimal(1),
    sigilResetterCycle: false,
    //specifies whether the resetter should cycle to next colour on each reset
    sigilResetterCycleMode: 0,
    //0 is all unlocked colours, 1 is R-O-Y only

    gold: new Decimal(0),
    goldPerSecond: new Decimal(0),
    miners: new Decimal(0),
    minerCost: new Decimal(20),
    fire: new Decimal(0),
    firePerSecond: new Decimal(1),
    //I still need to condense these into an array *cries*
    fireGoldMultiplier: new Decimal(1),
    fireAutoMaxAll: true,
    fireUpgrade1Bought: new Decimal(0),
    fireUpgrade1Cost: new Decimal(50),
    fireUpgrade2Bought: new Decimal(0),
    fireUpgrade2Cost: new Decimal(100),
    fireUpgrade3Bought: new Decimal(0),
    fireUpgrade3Cost: new Decimal(100),
    fireUpgrade4Bought: new Decimal(0),
    fireUpgrade4Cost: new Decimal(500),
    fireUpgrade5Bought: new Decimal(0),
    fireUpgrade5Cost: new Decimal(500),
    fireUpgrade6Bought: new Decimal(0),
    fireUpgrade6Cost: new Decimal(2e7),
    dragonStage: 1,
    platinumConvertCooldown: 0,
    platinumToGet: new Decimal(0),
    bestPlatinumToGet: new Decimal(0),
    platinum: new Decimal(0),
    platinumUpgradesBought: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    magic: new Decimal(0),
    magicToGet: new Decimal(0),
    magicEffect: new Decimal(1),
    goldPerClick: new Decimal(1),
    minerAutoBuyMax: true,
    magicUpgradesBought: [],
    darkMagicUpgradesBought: [],
    voidMagicUpgradesBought: [],
    selectedChallenges: [false, false, false, false],
    challengesActive: false,
    noOfSelectedChallenges: 0,
    magicScoreToGet: new Decimal(0),
    magicScore1: new Decimal(0),
    magicScore2: new Decimal(0),
    magicScore3: new Decimal(0),
    magicScore4: new Decimal(0),
    magifolds: new Decimal(1),
    uraniumConvertCooldown: 0,
    uraniumToGet: new Decimal(0),
    bestUraniumToGet: new Decimal(0),
    uranium: new Decimal(0),
    uraniumUpgradesBought: [0, 0, 0, 0, 0],
    dragonTimeSpent: new Decimal(0),
    dragonTimeCooldown: 0,
    dragonFood: new Decimal(0),
    dragonFeedCost: new Decimal(100000000),
    dragonTimeEffect: new Decimal(1),
    dragonPets: 0,
    //Sigil stuff
    cyanSigils: new Decimal(0),
    cyanSigilsToGet: new Decimal(0),
    cyanSigilPower: new Decimal(0),
    cyanSigilPowerPerSecond: new Decimal(0),
    //cyanSigilUpgrade1Bought: new Decimal(0),
    cyanSigilUpgrade1Cost: new Decimal(1),
    //cyanSigilUpgrade2Bought: new Decimal(0),
    cyanSigilUpgrade2Cost: new Decimal(20),
    //cyanSigilUpgrade3Bought: new Decimal(0),
    cyanSigilUpgrade3Cost: new Decimal(500),
    //cyanSigilUpgrade6Bought: new Decimal(0), //Actually the 4th sigil upgrade, name must stay for backwards compatibility
    cyanSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    blueSigils: new Decimal(0),
    blueSigilsToGet: new Decimal(0),
    blueSigilPower: new Decimal(0),
    blueSigilPowerPerSecond: new Decimal(0),
    //blueSigilUpgrade1Bought: new Decimal(0),
    blueSigilUpgrade1Cost: new Decimal(1),
    //blueSigilUpgrade2Bought: new Decimal(0),
    blueSigilUpgrade2Cost: new Decimal(20),
    //blueSigilUpgrade3Bought: new Decimal(0),
    blueSigilUpgrade3Cost: new Decimal(100),
    //blueSigilUpgrade6Bought: new Decimal(0), //Actually the 4th sigil upgrade, name must stay for backwards compatibility
    blueSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    indigoSigils: new Decimal(0),
    indigoSigilsToGet: new Decimal(0),
    indigoSigilPower: new Decimal(0),
    indigoSigilPowerPerSecond: new Decimal(0),
    //indigoSigilUpgrade1Bought: new Decimal(0),
    indigoSigilUpgrade1Cost: new Decimal(1),
    //indigoSigilUpgrade2Bought: new Decimal(0),
    indigoSigilUpgrade2Cost: new Decimal(20),
    //indigoSigilUpgrade4Bought: new Decimal(0), //Actually the 3rd sigil upgrade, name must stay for backwards compatibility
    indigoSigilUpgrade3Cost: new Decimal(400),
    //indigoSigilUpgrade6Bought: new Decimal(0), //Actually the 4th sigil upgrade, name must stay for backwards compatibility
    indigoSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    violetSigils: new Decimal(0),
    violetSigilsToGet: new Decimal(0),
    violetSigilPower: new Decimal(0),
    violetSigilPowerPerSecond: new Decimal(0),
    //violetSigilUpgrade1Bought: new Decimal(0),
    violetSigilUpgrade1Cost: new Decimal(1),
    //violetSigilUpgrade2Bought: new Decimal(0),
    violetSigilUpgrade2Cost: new Decimal(5),
    //violetSigilUpgrade5Bought: new Decimal(0), //Actually the 3rd sigil upgrade, name must stay for backwards compatibility
    //violetSigilUpgrade6Bought: new Decimal(0), //Actually the 4th sigil upgrade, name must stay for backwards compatibility
    violetSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    pinkSigils: new Decimal(0),
    pinkSigilsToGet: new Decimal(0),
    pinkSigilPower: new Decimal(0),
    pinkSigilPowerPerSecond: new Decimal(0),
    pinkSigilUpgrade1Cost: new Decimal(1),
    //pinkSigilUpgrade3Bought: new Decimal(0),
    pinkSigilUpgrade3Cost: new Decimal(150000),
    pinkSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledge: new Decimal(0),
    highestKnowledge: new Decimal(0),
    knowledgeTradeLevel: new Decimal(1),
    knowledgeTradeLevelCap: new Decimal(3),
    knowledgeTrade1SigilTypes: [1, 2, 3],
    knowledgeTrade1Amounts: [new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade1Multipliers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade1Reward: new Decimal(0),
    knowledgeTrade2SigilTypes: [1, 2, 3],
    knowledgeTrade2Amounts: [new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade2Multipliers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade2Reward: new Decimal(0),
    knowledgeTrade3SigilTypes: [1, 2, 3],
    knowledgeTrade3Amounts: [new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade3Multipliers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeTrade3Reward: new Decimal(0),
    knowledgeUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0)],
    knowledgeUpgradeCosts: [new Decimal(20), new Decimal(50)],
    knowledgeAutoMaxAll: true,
    tomes: new Decimal(0),
    totalTomes: new Decimal(0),
    tomeCost: new Decimal(100000),
    tomeUpgradesBought: [],
    blueFire: new Decimal(0),
    blueFirePerSecond: new Decimal(0),
    blueFireUpgradeCosts: [new Decimal(500), new Decimal(1000), new Decimal(50000), new Decimal(5e7), new Decimal(1.5e8), new Decimal(1e11)],
    blueFireUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    blueFireAutoMaxAll: true,
    blood: new Decimal(0),
    bloodPerSecond: new Decimal(0),
    currentHellLayer: 1,
    inHell: false,
    plutoniumConvertCooldown: 0,
    plutoniumToGet: new Decimal(0),
    bestPlutoniumToGet: new Decimal(0),
    plutonium: new Decimal(0),
    plutoniumUpgradesBought: [0, 0, 0, 0, 0],
    redSigils: new Decimal(0),
    redSigilsToGet: new Decimal(0),
    redSigilPower: new Decimal(0),
    redSigilPowerPerSecond: new Decimal(0),
    redSigilUpgrade1Cost: new Decimal(1),
    redSigilUpgrade2Cost: new Decimal(1500),
    redSigilUpgrade3Cost: new Decimal(50000),
    redSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    orangeSigils: new Decimal(0),
    orangeSigilsToGet: new Decimal(0),
    orangeSigilPower: new Decimal(0),
    orangeSigilPowerPerSecond: new Decimal(0),
    orangeSigilUpgrade1Cost: new Decimal(1),
    orangeSigilUpgrade2Cost: new Decimal(2500),
    orangeSigilUpgrade3Cost: new Decimal(250000),
    orangeSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    yellowSigils: new Decimal(0),
    yellowSigilsToGet: new Decimal(0),
    yellowSigilPower: new Decimal(0),
    yellowSigilPowerPerSecond: new Decimal(0),
    yellowSigilUpgrade1Cost: new Decimal(1),
    yellowSigilUpgrade2Cost: new Decimal(4000),
    yellowSigilUpgrade3Cost: new Decimal(2000000),
    yellowSigilUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    holyTetrahedrons: new Decimal(0),
    holyTetrahedronsToGet: new Decimal(0),
    holyTetrahedronUpgradesUnlocked: [true],
    holyTetrahedronUpgradesBought: [],
    holyOctahedrons: new Decimal(0),
    holyOctahedronsToGet: new Decimal(0),
    holyOctahedronUpgradesUnlocked: [true],
    holyOctahedronUpgradesBought: [],
    holyFire: new Decimal(0),
    holyFirePerSecond: new Decimal(0),
    holyFireUpgradeCosts: [new Decimal(500), new Decimal(1000), new Decimal(10000), new Decimal(50000), new Decimal(1e7), new Decimal(1)],
    holyFireUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    holyFireAutoMaxAll: true,
    holyDodecahedrons: new Decimal(0),
    holyDodecahedronsToGet: new Decimal(0),
    holyDodecahedronUpgradesUnlocked: [true],
    holyDodecahedronUpgradesBought: [],
    planets: new Decimal(0),
    planetEffect: new Decimal(1),
    planetCosts: [new Decimal(1e30), new Decimal(1e15), new Decimal(1e5)],
    planetsFormed: [new Decimal(0), new Decimal(0), new Decimal(0)],
    superclusters: new Decimal(0),
    superclusterCost: new Decimal(25),
    hypergodsDefeated: 0,
    cosmicPlague: new Decimal(0),
    cosmicPlaguePerSecond: new Decimal(0),
    spores: new Decimal(0),
    sporeCost: new Decimal("ee7500"),
    plagueUpgradeCosts: [new Decimal(25), new Decimal(100), new Decimal(100000), new Decimal(1e6), new Decimal(1e13)],
    plagueUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    plagueAutoMaxAll: true,
    oganesson: new Decimal(0),
    oganessonPerSecond: new Decimal(0),
    oganessonUpgradesBought: [0, 0, 0, 0, 0, 0, 0],
    lightEssence: new Decimal(0),
    lightEssencePerSecond: new Decimal(0),
    lightEssenceUpgradeCosts: [new Decimal(100), new Decimal(600), new Decimal(3000)],
    lightEssenceUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0)],
    darkEssence: new Decimal(0),
    darkEssencePerSecond: new Decimal(0),
    darkEssenceUpgradeCosts: [new Decimal(100), new Decimal(1000), new Decimal(10000)],
    darkEssenceUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0)],
    deathEssence: new Decimal(0),
    deathEssencePerSecond: new Decimal(0),
    deathEssenceUpgradeCosts: [new Decimal(1000), new Decimal(10000), new Decimal(200000), new Decimal(1e7), new Decimal(1e40)],
    deathEssenceUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    finalityEssence: new Decimal(0),
    finalityEssencePerSecond: new Decimal(0),
    finalityEssenceUpgradeCosts: [new Decimal(1000), new Decimal(4000), new Decimal(1e15), new Decimal(1e20)],
    finalityEssenceUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
    nuclearPasta: new Decimal(0),
    nuclearPastaCost: new Decimal("ee3.5e6"),
    nuclearPastaState: 1,
    nuclearPastaStateInfo: true,
    nuclearPastaCooldown: 30,
    nuclearPastaExtended: false,
    nuclearPastaUpgradesBought: [false, false, false, false],
    finalityCubes: new Decimal(0),
    finalityCubeCost: new Decimal("ee7.5e9"),
    finalityCubeEffect: new Decimal(1),
    finalityBoosts: new Decimal(0),
    finalityBoostCost: new Decimal("ee2.5e10"),
    finalityBoostBoosts: new Decimal(0),
    finalityBoostBoostCost: new Decimal("ee1.5e11")
  };

  //Should always be equal to the number of dragons
}
reset();

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset();
    save();
    location.reload();
  }
}
function save() {
  //console.log("saving")
  game.lastSave = Date.now();
  localStorage.setItem("dodecaSave", JSON.stringify(game));
  localStorage.setItem("dodecaLastSaved", game.lastSave);
}
function setAutoSave() {
  setInterval(save, 5000);
  autosaveStarted = true;
}
setAutoSave();
//setInterval(save(), 5000)

function exportGame() {
  save();
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    let editable = inputField.contentEditable;
    let readOnly = inputField.readOnly;
    range.selectNodeContents(inputField);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
function importGame() {
  //loadgame = JSON.parse(atob(prompt("Input your save here:")))
  let loadgame = JSON.parse(atob(document.getElementById("exportField").value));
  if (loadgame && loadgame != null && loadgame != "") {
    reset();
    loadGame(loadgame);
    save();
  }
}
function load() {
  reset();
  let loadgame = JSON.parse(localStorage.getItem("dodecaSave"));
  //loadgame.kkkgl();
  if (loadgame != null) {
    loadGame(loadgame);
  }
}

//load()

function loadGame(loadgame) {
  let shouldCheckVersion = false; //check if we need to implement a fix for version differences
  let oldVersion = loadgame.lastMajorChangeVersion; //save old version since we'll be overwriting as part of the load process, but we don't want to execute the fix until after loading
  if (oldVersion === undefined || oldVersion < game.lastMajorChangeVersion) {
    shouldCheckVersion = true;
  }
  loadgame.lastMajorChangeVersion = game.lastMajorChangeVersion; //set loadgame version to current version so save has proper version going forward

  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  let loadKeys = Object.keys(loadgame);
  for (i = 0; i < loadKeys.length; i++) {
    if (loadgame[loadKeys[i]] != "undefined") {
      let thisKey = loadKeys[i];
      if (typeof loadgame[thisKey] == "string" && thisKey != "dragonName") {
        game[thisKey] = new Decimal(loadgame[thisKey]);
      } else if (Array.isArray(loadgame[thisKey]) && game[loadKeys[i]]) {
        // If the value is an array and the corresponding key exists in the game object
        for (j = 0; j < loadgame[thisKey].length; j++) {
          // Iterate through the array elements
          //if (typeof loadgame[thisKey][j] == "string" && !isNaN(parseFloat(loadgame[thisKey][j]))) { // If the array element is a string that can be converted to a Decimal, do so
          if (typeof loadgame[thisKey][j] == "string") {
            game[loadKeys[i]][j] = new Decimal(loadgame[thisKey][j]);
          } else {
            // Otherwise, copy the value directly
            game[loadKeys[i]][j] = loadgame[thisKey][j];
          }
        }
      }
      //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
      else {
        game[loadKeys[i]] = loadgame[loadKeys[i]];
      }
    }
  }
  game.lastUpdate = Date.now(); // set last update to current time, will want to tweak this if offline progress is ever added!

  if (shouldCheckVersion) fixSaveVersion(oldVersion);

  //All of these change what's visible/available based on game progress

  //Make the sigil confirmation toggle "true" if it's not defined
  if (game.confirmations[1] != true && game.confirmations[1] != false) game.confirmations[1] = true;
  //Disables the background pattern if the toggle is off

  //Desperate check to make sure people aren't ahead at the holy fire point
  if (!game.holyTetrahedronUpgradesBought[11] && game.unlocks >= 26) game.unlocks = 25;

  //achievement stuff
  for (let i = 0; i < achievementNames.length; i++) {
    game.unlockedAchievements[i] = game.unlockedAchievements[i] || 0;
  } //ensure unlocked achievement array doesn't break when new categories are added
  showAchievements(game.unlocks); //load appropriate achievements in to the DOM
  processAchievementRewards();
  game.achievementFlashActive = false; // make sure flash isn't still set to true through reload
  game.currentTab = 1; // reset current tab to 1 to ensure achievement flash properly triggers

  if (game.pinkSigilUpgradesBought.length == 3) game.pinkSigilUpgradesBought[3] = new Decimal(0); //Adds the 4th pink sigil upgrade

  //Dragon box stuff

  //Fire stuff

  //Platinum stuff
  if (game.unlocks >= 3) {
    //Ugh, this is what happens when you keep adding new platinum upgrades
    if (game.platinumUpgradesBought.length < 6) game.platinumUpgradesBought[5] = 0;
    if (game.platinumUpgradesBought.length < 7) game.platinumUpgradesBought[6] = 0;
    if (game.platinumUpgradesBought.length < 8) game.platinumUpgradesBought[7] = 0;
    if (game.platinumUpgradesBought.length < 9) game.platinumUpgradesBought[8] = 0;

    //Could be shortened

    if (!game.magicUpgradesBought[10] && game.platinumUpgradesBought[6] > 10) game.platinumUpgradesBought[6] = 10;
  }
  //Hide confirmation toggle box if importing save before magic

  //Magic and magic upgrade stuff

  //Magic challenge stuff

  //More magic upgrade stuff

  //Uranium stuff
  if (game.unlocks >= 7) {
    //Ugh, this is what happens when you keep adding new uranium upgrades
    while (game.uraniumUpgradesBought.length < 5) game.uraniumUpgradesBought.push(0);

    //Could be shortened
  }
  //More platinum and uranium upgrades

  //Dark magic upgrade stuff

  //Cyan sigil stuff

  //Blue sigil stuff

  //Indigo sigil stuff

  //Violet sigil stuff

  //Pink sigil stuff

  //Knowledge stuff
  if (game.unlocks >= 15) {
    //document.getElementById("knowledgeTradeLevel").innerHTML = game.knowledgeTradeLevel

    knowledgeUpgrade2Effect = new Decimal(5).pow(game.knowledgeUpgradesBought[1].pow(0.5));
    if (knowledgeUpgrade2Effect.gt(1e20)) knowledgeUpgrade2Effect = knowledgeUpgrade2Effect.mul(1e60).pow(0.25);
    if (knowledgeUpgrade2Effect.gt("e2e7")) knowledgeUpgrade2Effect = new Decimal("e2e7");
    knowledgeRewardTemp = new Decimal(1.5).pow(game.knowledgeTradeLevel.sub(1));
    knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(2).pow(game.knowledgeUpgradesBought[0].pow(0.5)));
    if (game.tomeUpgradesBought[2] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(2);
    if (game.tomeUpgradesBought[6] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(game.totalTomes.pow(1.2).add(1));
    if (game.tomeUpgradesBought[8] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(1000).pow(game.blueFireUpgradesBought[5].pow(0.6))).floor();
    loadKnowledgeTrade(1);
    loadKnowledgeTrade(2);
    loadKnowledgeTrade(3);
  }
  //Tome stuff

  //Blue fire stuff
  if (game.unlocks >= 17) {
    for (i = 1; i < 7; i++) {
      if (game.blueFireUpgradeCosts[i - 1].eq(0)) game.blueFireUpgradeCosts[i - 1] = new Decimal(blueFireUpgradeBase[i]).pow(game.blueFireUpgradesBought[i - 1]).mul(blueFireUpgradeInitialCosts[i]).floor();
    }
  }
  //Blood stuff
  if (game.unlocks >= 18) {
    if (game.tomeUpgradesBought[13]) {
      newHellLayer = document.createElement("option");
      newHellLayer.text = "Greed (IV)";
      newHellLayer = document.createElement("option");
      newHellLayer.text = "Wrath (V)";
    }
  }
  //More dark magic upgrades

  //Plutonium stuff

  //Red sigil stuff
  if (game.unlocks >= 21) {
    redSigilAutoOption = document.createElement("option");
    redSigilAutoOption.text = "Red";
    if (game.redSigilUpgrade2Cost.eq(2500)) game.redSigilUpgrade2Cost = new Decimal(1500);
  }
  //Orange sigil stuff
  if (game.unlocks >= 22) {
    orangeSigilAutoOption = document.createElement("option");
    orangeSigilAutoOption.text = "Orange";
  }
  //Yellow sigil stuff
  if (game.unlocks >= 23) {
    yellowSigilAutoOption = document.createElement("option");
    yellowSigilAutoOption.text = "Yellow";
  }
  //Holy tetrahedron stuff
  if (game.unlocks >= 24) {
    holyTetrahedronUnlockCheck();
  }
  //Holy octahedron stuff
  if (game.unlocks >= 25) {
    holyOctahedronUnlockCheck();
  }
  //Holy fire stuff
  if (game.unlocks >= 26) {
    for (i = 1; i < 7; i++) {
      if (game.holyFireUpgradeCosts[i - 1].eq(0)) game.holyFireUpgradeCosts[i - 1] = new Decimal(holyFireUpgradeBase[i]).pow(game.holyFireUpgradesBought[i - 1]).mul(holyFireUpgradeInitialCosts[i]).floor();
    }
  }
  //Void magic upgrade stuff

  //Holy dodecahedron stuff
  if (game.unlocks >= 28) {
    holyDodecahedronUnlockCheck();
  }
  //Planet stuff

  //Omniversal hypergod stuff

  //Cosmic plague stuff

  //if (game.plagueUpgradeCosts.length == 4) game.plagueUpgradeCosts[4] = new Decimal(1e13)
  //if (game.plagueUpgradesBought.length == 4) game.plagueUpgradesBought[4] = new Decimal(0)
  //Oganesson stuff

  //Essence stuff

  //Death essence stuff

  //Nuclear pasta stuff

  //Finality essence stuff
  if (game.unlocks >= 36) {
    if (game.finalityEssenceUpgradeCosts[2].gt(9e15) && game.finalityEssenceUpgradeCosts[2].lt(1.1e16)) game.finalityEssenceUpgradeCosts[2] = new Decimal(1e15); //Upgrade 3 cost used to be 1e16, should now be 1e15
  }
  //Finality cube stuff

  //Dragon stage stuff

  if (game.dragonStage >= 5) {
    game.dragonTimeEffect = new Decimal(1.2).pow(game.dragonTimeSpent.pow(0.3));
    if (game.dragonTimeEffect.gt(2)) game.dragonTimeEffect = game.dragonTimeEffect.add(2).pow(0.5);
    dragonTimeEffectCap = new Decimal(2.5);
    if (game.tomeUpgradesBought[8] == true) dragonTimeEffectCap = dragonTimeEffectCap.mul(game.blueFireUpgradesBought[4].pow(0.7).div(5).add(1));
    if (game.unlocks >= 26) dragonTimeEffectCap = dragonTimeEffectCap.mul(game.holyFireUpgradesBought[2].pow(0.7).mul(5).add(1));
    if (game.dragonTimeEffect.gt(dragonTimeEffectCap)) {
      game.dragonTimeEffect = dragonTimeEffectCap;
    }
    //The dragon feed cost used to be higher, this changes it for old players with the old cost
    if (game.dragonFeedCost.eq(new Decimal(10).pow(new Decimal(2).pow(game.dragonFood).mul(10)))) game.dragonFeedCost = new Decimal(10).pow(new Decimal(2).pow(game.dragonFood).mul(8).round());
  }
  //sigil resetter stuff, needs to be after unlocks so the sigil resetter types can all be properly prefilled
  //set input field for sigil resetter amount

  let currentResetterType = sigilColours[game.sigilResetterType];
  if (document.getElementById("sigilResetterType").value === '') {
    game.sigilResetterType = 0;
  }
  populateTabPositions();
}
function fixSaveVersion(oldVersion) {
  if (oldVersion === undefined) {
    //v 0.5.0, addressing sigil upgrade changes for achievement update
    if (game.cyanSigilUpgrade1Bought) game.cyanSigilUpgradesBought = [game.cyanSigilUpgrade1Bought, game.cyanSigilUpgrade2Bought, game.cyanSigilUpgrade3Bought, game.cyanSigilUpgrade6Bought];
    if (game.blueSigilUpgrade1Bought) game.blueSigilUpgradesBought = [game.blueSigilUpgrade1Bought, game.blueSigilUpgrade2Bought, game.blueSigilUpgrade3Bought, game.blueSigilUpgrade6Bought];
    if (game.indigoSigilUpgrade1Bought) game.indigoSigilUpgradesBought = [game.indigoSigilUpgrade1Bought, game.indigoSigilUpgrade2Bought, game.indigoSigilUpgrade4Bought, game.indigoSigilUpgrade6Bought];
    if (game.violetSigilUpgrade1Bought) game.violetSigilUpgradesBought = [game.violetSigilUpgrade1Bought, game.violetSigilUpgrade2Bought, game.violetSigilUpgrade5Bought, game.violetSigilUpgrade6Bought];
    if (game.pinkSigilUpgrade3Bought || typeof game.pinkSigilUpgradesBought[0] === 'number') game.pinkSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0)];
    let keysToDelete = ["cyanSigilUpgrade1Bought", "cyanSigilUpgrade2Bought", "cyanSigilUpgrade3Bought", "cyanSigilUpgrade4Bought", "cyanSigilUpgrade5Bought", "cyanSigilUpgrade6Bought", "blueSigilUpgrade1Bought", "blueSigilUpgrade2Bought", "blueSigilUpgrade3Bought", "blueSigilUpgrade4Bought", "blueSigilUpgrade5Bought", "blueSigilUpgrade6Bought", "indigoSigilUpgrade1Bought", "indigoSigilUpgrade2Bought", "indigoSigilUpgrade3Bought", "indigoSigilUpgrade4Bought", "indigoSigilUpgrade5Bought", "indigoSigilUpgrade6Bought", "violetSigilUpgrade1Bought", "violetSigilUpgrade2Bought", "violetSigilUpgrade3Bought", "violetSigilUpgrade4Bought", "violetSigilUpgrade5Bought", "violetSigilUpgrade6Bought", "pinkSigilUpgrade3Bought"];
    for (let i = 0; i < keysToDelete.length; i++) {
      delete game[keysToDelete[i]];
    }
    oldVersion = 0;
  }
  if (oldVersion < 2) {
    //v 0.5.0 hotfix, addressing dark magic upgrade retainment issues
    if (game.pinkSigilUpgradesBought[1].gt(0)) {
      game.darkMagicUpgradesBought = game.darkMagicUpgradesBought.slice(0, 10);
    } else {
      game.darkMagicUpgradesBought = game.darkMagicUpgradesBought.slice(0, 8);
    }
  }
  if (oldVersion < 3) {
    //v 0.7.3, addressing unlock order issues arising from an unlock being skippable
    if (game.tomeUpgradesBought[11]) game.unlocks = 20;
    if (game.tomeUpgradesBought[12]) game.unlocks = 21;
  }
}
timeStopped = false;
timeStopSound = new Audio("img/timeStop.mp3");
timeStopSound.volume = 0.2;
timeResumeSound = new Audio("img/timeResume.mp3");
timeResumeSound.volume = 0.2;

//Small update (occurs every 150ms)
function updateSmall() {
  if (timeStopped) return;

  //Gold/second formula and multipliers
  let diff = Date.now() - game.lastUpdate;
  diff = diff / 1000;
  game.lastUpdate = Date.now();
  game.goldPerSecond = game.miners.mul(game.fire.div(10).add(1).log10().mul(2).add(1));
  if (game.unlocks >= 2) {
    if (game.darkMagicUpgradesBought[5]) {
      game.goldPerSecond = game.goldPerSecond.mul(new Decimal(5).pow(game.fireUpgrade2Bought.pow(0.8)));
    } else if (game.magicUpgradesBought[8]) {
      game.goldPerSecond = game.goldPerSecond.mul(new Decimal(1.6).pow(game.fireUpgrade2Bought.pow(0.8)));
    } else {
      game.goldPerSecond = game.goldPerSecond.mul(new Decimal(1.25).pow(game.fireUpgrade2Bought.pow(0.8)));
    }
    if (game.platinumUpgradesBought[8] > 0) {
      game.goldPerSecond = game.goldPerSecond.mul(game.fireUpgrade4Bought.pow(game.miners.pow(0.3)).pow(game.platinumUpgradesBought[8] / 4).add(1));
    } else {
      game.goldPerSecond = game.goldPerSecond.mul(game.fireUpgrade4Bought.pow(1.5).mul(game.miners).div(50).add(1));
    }
  }
  if (game.unlocks >= 3) game.goldPerSecond = game.goldPerSecond.mul(1 + game.platinumUpgradesBought[0] * 0.2);
  if (game.platinumUpgradesBought[5] > 0) game.goldPerSecond = game.goldPerSecond.mul(platinumUpgrade6Effect);
  if (game.challengesActive && game.selectedChallenges[3]) game.goldPerSecond = game.goldPerSecond.div(1e25);
  if (game.unlocks >= 4) game.goldPerSecond = game.goldPerSecond.mul(game.magicEffect);
  if (game.magicUpgradesBought[0]) game.goldPerSecond = game.goldPerSecond.mul(game.gold.add(1).log10().add(1));
  if (game.magicUpgradesBought[2]) game.goldPerSecond = game.goldPerSecond.mul(55.5);
  if (game.magicUpgradesBought[5]) {
    if (game.magicUpgradesBought[9]) {
      game.goldPerSecond = game.goldPerSecond.mul(game.miners.pow(3).add(1));
    } else {
      game.goldPerSecond = game.goldPerSecond.mul(game.miners.pow(1.5).add(1));
    }
  }
  if (game.unlocks >= 5) {
    if (game.violetSigilUpgradesBought[2].eq(1)) {
      game.goldPerSecond = game.goldPerSecond.mul(game.magifolds.pow(game.magifolds.add(10).log10().log10().add(8)));
    } else if (game.darkMagicUpgradesBought[3]) {
      game.goldPerSecond = game.goldPerSecond.mul(game.magifolds.pow(8));
    } else if (game.magicUpgradesBought[18]) {
      game.goldPerSecond = game.goldPerSecond.mul(game.magifolds.pow(6));
    } else {
      game.goldPerSecond = game.goldPerSecond.mul(game.magifolds.pow(4));
    }
  }
  if (game.dragonStage >= 5) game.goldPerSecond = game.goldPerSecond.pow(game.dragonTimeEffect);
  if (game.unlocks >= 10) {
    if (!game.inHell || game.currentHellLayer < 2) game.goldPerSecond = game.goldPerSecond.pow(new Decimal(1.2).pow(game.cyanSigilUpgradesBought[2].pow(0.4)));
  }
  if (game.tomeUpgradesBought[3]) game.goldPerSecond = game.goldPerSecond.pow(game.platinum.add(1e10).slog().div(2));
  if (game.holyDodecahedronUpgradesBought[4]) game.goldPerSecond = game.goldPerSecond.pow(game.redSigils.pow(0.2).add(1));
  if (game.challengesActive && game.selectedChallenges[1]) game.goldPerSecond = game.goldPerSecond.pow(0.25);
  if (game.inHell) {
    //Can definitely be made better using a switch
    if (game.currentHellLayer == 1) game.goldPerSecond = game.goldPerSecond.add(1).log10().pow(5);else if (game.currentHellLayer == 2) game.goldPerSecond = game.goldPerSecond.add(1).log10().pow(2);else if (game.currentHellLayer == 3) game.goldPerSecond = game.goldPerSecond.add(1).log10();else if (game.currentHellLayer == 4) game.goldPerSecond = game.goldPerSecond.add(1).log10().pow(0.5);else if (game.currentHellLayer == 5) game.goldPerSecond = game.goldPerSecond.add(1).log10().pow(0.2);
    if (game.holyOctahedronUpgradesBought[1]) game.goldPerSecond = game.goldPerSecond.mul(1e250);
    if (game.tomeUpgradesBought[10]) game.goldPerSecond = game.goldPerSecond.pow(game.blood.add(1).log10().add(1));
  }

  //Gold/click formula and multipliers
  if (game.magicUpgradesBought[8]) {
    game.goldPerClick = game.fireUpgrade3Bought.pow(12).mul(4).add(1);
  } else {
    game.goldPerClick = game.fireUpgrade3Bought.pow(2.6).mul(4).add(1);
  }
  if (game.unlocks >= 4) game.goldPerClick = game.goldPerClick.mul(game.magicEffect);
  if (game.magicUpgradesBought[0]) game.goldPerClick = game.goldPerClick.mul(game.gold.add(1).log10().add(1));
  if (game.magicUpgradesBought[2]) game.goldPerClick = game.goldPerClick.mul(55.5);
  if (game.unlocks >= 5) {
    if (game.violetSigilUpgradesBought[2].eq(1)) {
      game.goldPerClick = game.goldPerClick.mul(game.magifolds.pow(game.magifolds.add(10).log10().log10().add(8)));
    } else if (game.darkMagicUpgradesBought[3]) {
      game.goldPerClick = game.goldPerClick.mul(game.magifolds.pow(8));
    } else if (game.magicUpgradesBought[18]) {
      game.goldPerClick = game.goldPerClick.mul(game.magifolds.pow(6));
    } else {
      game.goldPerClick = game.goldPerClick.mul(game.magifolds.pow(4));
    }
  }
  if (game.dragonStage >= 5) game.goldPerClick = game.goldPerClick.pow(game.dragonTimeEffect);
  if (game.challengesActive && game.selectedChallenges[1]) game.goldPerClick = game.goldPerClick.pow(0.25);
  if (game.challengesActive && game.selectedChallenges[3]) game.goldPerClick = new Decimal(20);
  if (game.inHell) {
    //Can definitely be made better using a switch
    if (game.currentHellLayer == 1) game.goldPerClick = game.goldPerClick.add(1).log10().pow(5);else if (game.currentHellLayer == 2) game.goldPerClick = game.goldPerClick.add(1).log10().pow(2);else if (game.currentHellLayer == 3) game.goldPerClick = game.goldPerClick.add(1).log10();else if (game.currentHellLayer == 4) game.goldPerClick = game.goldPerClick.add(1).log10().pow(0.5);else if (game.currentHellLayer == 5) game.goldPerClick = game.goldPerClick.add(1).log10().pow(0.2);
    if (game.holyOctahedronUpgradesBought[1]) game.goldPerClick = game.goldPerClick.mul(1e250);
    if (game.tomeUpgradesBought[10]) game.goldPerClick = game.goldPerClick.pow(game.blood.add(1).log10().add(1));
  }

  //Enables/disables buy miner button based on whether the user's gold is higher than the cost

  //Fire/second formula and multipliers
  if (game.voidMagicUpgradesBought[5]) {
    game.firePerSecond = game.gold;
  } else if (game.voidMagicUpgradesBought[4]) {
    game.firePerSecond = game.gold.pow("1e-10");
  } else {
    if (game.magicUpgradesBought[13]) {
      game.firePerSecond = new Decimal(3.5).pow(game.fireUpgrade1Bought.pow(0.7));
    } else {
      game.firePerSecond = new Decimal(2).pow(game.fireUpgrade1Bought.pow(0.6));
    }
    if (game.unlocks >= 2) game.firePerSecond = game.firePerSecond.mul(game.fireUpgrade5Bought.pow(1.5).mul(game.gold.add(1).log10()).div(5).add(1));
    if (game.unlocks >= 3) game.firePerSecond = game.firePerSecond.mul(1 + game.platinumUpgradesBought[1] * 0.2);
    if (game.magicUpgradesBought[2]) game.firePerSecond = game.firePerSecond.mul(55.5);
    if (game.magicUpgradesBought[4]) game.firePerSecond = game.firePerSecond.mul(game.gold.add(1).log2().add(1));
    if (game.dragonStage == 5) game.firePerSecond = game.firePerSecond.mul(1e15);else if (game.dragonStage == 4) game.firePerSecond = game.firePerSecond.mul(1e8);else if (game.dragonStage == 3) game.firePerSecond = game.firePerSecond.mul(10000);else if (game.dragonStage == 2) game.firePerSecond = game.firePerSecond.mul(100);
    if (game.dragonStage >= 5) game.firePerSecond = game.firePerSecond.pow(new Decimal(1.3).pow(game.dragonFood));
    if (game.unlocks >= 17) game.firePerSecond = game.firePerSecond.pow(game.blueFireUpgradesBought[1].add(1).log10().div(4).add(1));
    if (game.holyTetrahedronUpgradesBought[9]) game.firePerSecond = game.firePerSecond.pow(10000);
    if (game.challengesActive && game.selectedChallenges[2]) {
      if (game.magicUpgradesBought[14]) {
        game.firePerSecond = game.firePerSecond.pow(0.3);
      } else {
        game.firePerSecond = game.firePerSecond.pow(0.1);
      }
    }
    if (game.inHell) {
      //Can definitely be made better using a switch
      if (game.currentHellLayer == 2 || game.currentHellLayer == 3) game.firePerSecond = game.firePerSecond.add(1).log10();else if (game.currentHellLayer >= 4) game.firePerSecond = new Decimal(0);
    }
  }
  //Fire gold multiplier formula and multipliers
  if (game.darkMagicUpgradesBought[5]) {
    game.fireGoldMultiplier = game.fire.div(10).add(1).log10().mul(2).add(1).mul(new Decimal(5).pow(game.fireUpgrade2Bought.pow(0.8)));
  } else if (game.magicUpgradesBought[8]) {
    game.fireGoldMultiplier = game.fire.div(10).add(1).log10().mul(2).add(1).mul(new Decimal(1.6).pow(game.fireUpgrade2Bought.pow(0.8)));
  } else {
    game.fireGoldMultiplier = game.fire.div(10).add(1).log10().mul(2).add(1).mul(new Decimal(1.25).pow(game.fireUpgrade2Bought.pow(0.8)));
  }
  if (game.unlocks >= 3) {
    //Determines the amount of platinum to get when converting gold
    game.platinumToGet = game.gold.add(1).log2().mul(new Decimal(3).pow(game.fireUpgrade6Bought.pow(0.6)));
    if (game.unlocks >= 7) game.platinumToGet = game.platinumToGet.mul(1.2 ** game.uraniumUpgradesBought[0]);
    if (game.unlocks >= 8) game.platinumToGet = game.platinumToGet.mul(10 ** game.uraniumUpgradesBought[4]);
    if (game.unlocks >= 11) game.platinumToGet = game.platinumToGet.mul(new Decimal(1e15).pow(game.blueSigilUpgradesBought[1].pow(0.6)));
    if (game.holyTetrahedronUpgradesBought[4]) game.platinumToGet = game.platinumToGet.mul(1e20);
    if (game.unlocks >= 17) game.platinumToGet = game.platinumToGet.pow(game.blueFireUpgradesBought[2].add(1).log2().add(1));
    if (game.darkMagicUpgradesBought[12]) game.platinumToGet = game.platinumToGet.pow(666);
    if (game.challengesActive && game.selectedChallenges[1]) game.platinumToGet = game.platinumToGet.pow(0.25);
    if (game.inHell) {
      //Can definitely be made better using a switch
      if (game.currentHellLayer == 1) game.platinumToGet = game.platinumToGet.pow(0.1);else if (game.currentHellLayer == 2) game.platinumToGet = game.platinumToGet.pow(0.01);else if (game.currentHellLayer == 3 || game.currentHellLayer == 4) game.platinumToGet = game.platinumToGet.add(1).log10();else if (game.currentHellLayer == 5) game.platinumToGet = game.platinumToGet.add(1).log10().pow(0.5);
    }
    game.platinumToGet = game.platinumToGet.floor();
    if (game.platinumToGet.gt(game.bestPlatinumToGet)) game.bestPlatinumToGet = game.platinumToGet;
    if (game.uraniumUpgradesBought[3]) {
      platinumUpgrade6Effect = game.platinum.add(1).pow(game.platinumUpgradesBought[5] * 1.2);
    } else {
      platinumUpgrade6Effect = game.platinum.add(1).log10().add(1).pow(game.platinumUpgradesBought[5] * 1.2);
    }
    if (game.challengesActive && game.selectedChallenges[3]) platinumUpgrade6Effect = platinumUpgrade6Effect.div(1e25);
  }
  if (game.unlocks >= 4) {
    //Determines the amount of magic to get when doing a magic reset
    //game.magicToGet = game.gold.div(1e15).pow(0.1)
    //if (game.magicUpgradesBought[3]) {
    //if (game.magicUpgradesBought[9]) {game.magicToGet = game.magicToGet.mul(game.magic.add(1).log2().mul(4).add(1))}
    //else {game.magicToGet = game.magicToGet.mul(game.magic.add(1).log2().mul(1.5).add(1))}
    //}
    //if (game.magicUpgradesBought[1]) game.magicToGet = game.magicToGet.mul(1.5)
    //if (game.magicUpgradesBought[6]) game.magicToGet = game.magicToGet.mul(2)
    //if (game.magicUpgradesBought[17]) game.magicToGet = game.magicToGet.mul(3)
    //if (game.unlocks >= 10) game.magicToGet = game.magicToGet.mul(game.cyanSigils.add(1).pow(2))
    //if (game.unlocks >= 11) game.magicToGet = game.magicToGet.mul(game.blueSigils.add(1).pow(3))
    //if (game.unlocks >= 12) game.magicToGet = game.magicToGet.mul(game.indigoSigils.add(1).pow(4))
    //if (game.unlocks >= 13) game.magicToGet = game.magicToGet.mul(game.violetSigils.add(1).pow(5))
    //if (game.unlocks >= 14) game.magicToGet = game.magicToGet.mul(game.pinkSigils.add(1).pow(6))
    //if (game.darkMagicUpgradesBought[9] == true) game.magicToGet = game.magicToGet.pow(1.1)
    //if (game.darkMagicUpgradesBought[1]) game.magicToGet = game.magicToGet.pow(game.uranium.add(1).log10().div(30).add(1))
    game.magicToGet = getMagicGain();
    //document.getElementById("nextMagic").innerHTML = "Next magic at " + format(getNextMagicAt(), 0) + " gold<br>"

    game.magicEffect = game.magic.mul(3).mul(new Decimal(1.5).pow(game.platinumUpgradesBought[6])).add(1);
    if (game.magicUpgradesBought[15]) game.magicEffect = game.magicEffect.pow(2);
    if (game.plutoniumUpgradesBought[1] > 0) game.magicEffect = game.magicEffect.pow((game.plutoniumUpgradesBought[1] * 100000) ** 0.8 + 1);
    if (game.inHell && game.currentHellLayer >= 5) game.magicEffect = game.magicEffect.add(1).log10();
    if (game.challengesActive && game.selectedChallenges[0]) game.magicEffect = game.magic.pow(0.2).div(1e15);
    if (game.magicEffect.gt("e1000")) {
      game.magicEffect = game.magicEffect.mul("e1000").pow(0.5);
    }
    if (game.magicEffect.gt("e100000")) {
      game.magicEffect = game.magicEffect.mul("e900000").pow(0.1);
    }
  }
  if (game.unlocks >= 5) {
    //Sets the magic score to get from exiting magic challenges
    game.magicScoreToGet = game.gold.add(1).multiply(game.fire.add(1)).log10();
    if (game.magicUpgradesBought[12]) game.magicScoreToGet = game.magicScoreToGet.mul(2);
    if (game.magicUpgradesBought[16]) game.magicScoreToGet = game.magicScoreToGet.mul(game.magifolds.log10().add(1).div(3));
    if (game.unlocks >= 7) game.magicScoreToGet = game.magicScoreToGet.mul(2 ** game.uraniumUpgradesBought[2]);
    if (game.darkMagicUpgradesBought[6]) game.magicScoreToGet = game.magicScoreToGet.mul(2);
    if (game.unlocks >= 10) game.magicScoreToGet = game.magicScoreToGet.mul(game.cyanSigils.add(1).pow(2));
    if (game.unlocks >= 11) game.magicScoreToGet = game.magicScoreToGet.mul(game.blueSigils.add(1).pow(3));
    if (game.unlocks >= 13) game.magicScoreToGet = game.magicScoreToGet.mul(game.violetSigils.add(1).pow(5));
    if (game.unlocks >= 21) game.magicScoreToGet = game.magicScoreToGet.mul(new Decimal(10).pow(game.redSigils.pow(0.5).mul(400)));
    if (game.unlocks >= 22) game.magicScoreToGet = game.magicScoreToGet.mul(new Decimal(10).pow(game.orangeSigils.pow(0.5).mul(800)));
    if (game.unlocks >= 23) game.magicScoreToGet = game.magicScoreToGet.mul(new Decimal(10).pow(game.yellowSigils.pow(0.5).mul(1600)));
    if (game.unlocks >= 14) {
      game.magicScoreToGet = game.magicScoreToGet.mul(game.pinkSigils.add(1).pow(6));
      game.magicScoreToGet = game.magicScoreToGet.pow(new Decimal(1.5).pow(game.pinkSigilUpgradesBought[2].pow(0.5)));
    }
    if (game.darkMagicUpgradesBought[0]) game.magicScoreToGet = game.magicScoreToGet.pow(1.3);
    if (game.holyTetrahedronUpgradesBought[1]) game.magicScoreToGet = game.magicScoreToGet.pow(2);
    if (game.holyOctahedronUpgradesBought[5]) game.magicScoreToGet = game.magicScoreToGet.pow(100);
    game.magicScoreToGet = game.magicScoreToGet.floor();
    if (game.unlockedAchievements[7] > 1) {
      game.magicScore1 = Decimal.max(game.magicScoreToGet, game.magicScore1);
      game.magicScore2 = Decimal.max(game.magicScoreToGet, game.magicScore2);
      game.magicScore3 = Decimal.max(game.magicScoreToGet, game.magicScore3);
      game.magicScore4 = Decimal.max(game.magicScoreToGet, game.magicScore4);
      if (game.inHell) {
        game.magifolds = new Decimal(1);
      } else {
        game.magifolds = game.magicScore1.add(1).mul(game.magicScore2.add(1)).mul(game.magicScore3.add(1)).mul(game.magicScore4.add(1));
      }
    }
    if (game.challengesActive) {} else {
      game.magicScoreToGet = new Decimal(0);
    }
  }
  if (game.unlocks >= 7) {
    game.uraniumToGet = game.platinum.add(1).log2().mul(1 + 0.1 * game.uraniumUpgradesBought[1]);
    if (game.unlocks >= 8) game.uraniumToGet = game.uraniumToGet.mul(2 ** game.platinumUpgradesBought[7]);
    if (game.darkMagicUpgradesBought[4]) game.uraniumToGet = game.uraniumToGet.mul(100);
    if (game.unlocks >= 10) game.uraniumToGet = game.uraniumToGet.mul(game.cyanSigilUpgradesBought[1].add(1).pow(1.5));
    if (game.holyTetrahedronUpgradesBought[5]) game.uraniumToGet = game.uraniumToGet.mul(100);
    if (game.unlocks >= 15) {
      knowledgeUpgrade2Effect = new Decimal(5).pow(game.knowledgeUpgradesBought[1].pow(0.5));
      if (knowledgeUpgrade2Effect.gt(1e20)) knowledgeUpgrade2Effect = knowledgeUpgrade2Effect.mul(1e60).pow(0.25);
      if (knowledgeUpgrade2Effect.gt("e2e7")) knowledgeUpgrade2Effect = new Decimal("e2e7");
      game.uraniumToGet = game.uraniumToGet.pow(knowledgeUpgrade2Effect);
    }
    if (game.voidMagicUpgradesBought[12] == true) game.uraniumToGet = game.uraniumToGet.pow(1e30);
    if (game.unlocks >= 34 && game.deathEssenceUpgradesBought[2].gt(0)) {
      let deathEssenceUpgrade3Effect = new Decimal(2).pow(game.deathEssenceUpgradesBought[2].pow(0.7)).mul(10000);
      if (deathEssenceUpgrade3Effect.gt(500000)) deathEssenceUpgrade3Effect = deathEssenceUpgrade3Effect.mul(500000).pow(0.5);
      if (deathEssenceUpgrade3Effect.gt(1e9)) deathEssenceUpgrade3Effect = new Decimal(1e9);
      deathEssenceUpgrade3Effect = new Decimal(10).pow(deathEssenceUpgrade3Effect);
      game.uraniumToGet = game.uraniumToGet.pow(deathEssenceUpgrade3Effect);
    }
    if (game.inHell) {
      //Can definitely be made better using a switch
      if (game.currentHellLayer == 1) game.uraniumToGet = game.uraniumToGet.pow(0.1);else if (game.currentHellLayer == 2) game.uraniumToGet = game.uraniumToGet.pow(0.01);else if (game.currentHellLayer == 3 || game.currentHellLayer == 4) game.uraniumToGet = game.uraniumToGet.add(1).log10();else if (game.currentHellLayer == 5) game.uraniumToGet = game.uraniumToGet.add(1).log10().pow(0.5);
    }
    game.uraniumToGet = game.uraniumToGet.floor();
    if (game.uraniumToGet.gt(game.bestUraniumToGet)) game.bestUraniumToGet = game.uraniumToGet;
  }
  if (game.unlocks >= 10) {
    game.cyanSigilsToGet = game.gold.add(1).log10().div(new Decimal(3000).sub(game.blueSigilUpgradesBought[2].mul(100))).floor();
    if (game.darkMagicUpgradesBought[8] == true) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(3);
    game.cyanSigilsToGet = game.cyanSigilsToGet.mul(new Decimal(5).pow(game.dragonPets ** 0.5));
    if (game.unlocks >= 15) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(game.highestKnowledge.div(3).pow(0.7).add(1));
    if (game.unlocks >= 18) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(game.blood.pow(2).add(1));
    if (game.plutoniumUpgradesBought[2] > 0) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(game.plutonium.add(1).pow(0.5).mul(10).pow(game.plutoniumUpgradesBought[2]));
    if (game.holyTetrahedronUpgradesBought[2]) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(1e50);
    if (game.unlocks >= 34 && game.deathEssenceUpgradesBought[1].gt(0)) game.cyanSigilsToGet = game.cyanSigilsToGet.mul(new Decimal(10).pow(new Decimal(2).pow(game.deathEssenceUpgradesBought[1].pow(0.5)).mul(1e10)));
    game.cyanSigilsToGet = game.cyanSigilsToGet.round();
    game.cyanSigilPowerPerSecond = game.cyanSigils.pow(2).div(100).mul(game.cyanSigilUpgradesBought[0].add(1));
    if (game.unlocks >= 12) game.cyanSigilPowerPerSecond = game.cyanSigilPowerPerSecond.pow(Decimal.min(new Decimal(1.15).pow(game.indigoSigilUpgradesBought[1].pow(0.5)), 30));
    if (game.voidMagicUpgradesBought[2]) game.cyanSigilPowerPerSecond = game.cyanSigilPowerPerSecond.pow(2);
  }
  if (game.unlocks >= 11) {
    game.blueSigilsToGet = game.gold.add(1).log10().div(8000).floor();
    if (game.darkMagicUpgradesBought[8] == true) game.blueSigilsToGet = game.blueSigilsToGet.mul(3);
    game.blueSigilsToGet = game.blueSigilsToGet.mul(new Decimal(5).pow(game.dragonPets ** 0.5));
    if (game.unlocks >= 15) game.blueSigilsToGet = game.blueSigilsToGet.mul(game.highestKnowledge.div(3).pow(0.7).add(1));
    if (game.unlocks >= 18) game.blueSigilsToGet = game.blueSigilsToGet.mul(game.blood.pow(2).add(1));
    if (game.plutoniumUpgradesBought[2] > 0) game.blueSigilsToGet = game.blueSigilsToGet.mul(game.plutonium.add(1).pow(0.5).mul(10).pow(game.plutoniumUpgradesBought[2]));
    game.blueSigilsToGet = game.blueSigilsToGet.round();
    game.blueSigilPowerPerSecond = game.blueSigils.pow(2).div(100).mul(game.blueSigilUpgradesBought[0].add(1));
    if (game.unlocks >= 13) game.blueSigilPowerPerSecond = game.blueSigilPowerPerSecond.pow(new Decimal(1.3).pow(game.violetSigilUpgradesBought[1].pow(0.5)));
  }
  if (game.unlocks >= 12) {
    game.indigoSigilsToGet = game.gold.add(1).log10().div(16000).floor();
    game.indigoSigilsToGet = game.indigoSigilsToGet.mul(new Decimal(5).pow(game.dragonPets ** 0.5));
    if (game.unlocks >= 15) game.indigoSigilsToGet = game.indigoSigilsToGet.mul(game.highestKnowledge.div(3).pow(0.7).add(1));
    if (game.unlocks >= 18) game.indigoSigilsToGet = game.indigoSigilsToGet.mul(game.blood.pow(2).add(1));
    if (game.plutoniumUpgradesBought[2] > 0) game.indigoSigilsToGet = game.indigoSigilsToGet.mul(game.plutonium.add(1).pow(0.5).mul(10).pow(game.plutoniumUpgradesBought[2]));
    game.indigoSigilsToGet = game.indigoSigilsToGet.round();
    game.indigoSigilPowerPerSecond = game.indigoSigils.pow(2).div(100).mul(game.indigoSigilUpgradesBought[0].add(1));
    if (game.tomeUpgradesBought[0]) game.indigoSigilPowerPerSecond = game.indigoSigilPowerPerSecond.pow(1.3);
  }
  if (game.unlocks >= 13) {
    game.violetSigilsToGet = game.gold.add(1).log10().div(30000).floor();
    game.violetSigilsToGet = game.violetSigilsToGet.mul(new Decimal(5).pow(game.dragonPets ** 0.5));
    if (game.unlocks >= 15) game.violetSigilsToGet = game.violetSigilsToGet.mul(game.highestKnowledge.div(3).pow(0.7).add(1));
    if (game.unlocks >= 18) game.violetSigilsToGet = game.violetSigilsToGet.mul(game.blood.pow(2).add(1));
    if (game.plutoniumUpgradesBought[2] > 0) game.violetSigilsToGet = game.violetSigilsToGet.mul(game.plutonium.add(1).pow(0.5).mul(10).pow(game.plutoniumUpgradesBought[2]));
    game.violetSigilsToGet = game.violetSigilsToGet.round();
    game.violetSigilPowerPerSecond = game.violetSigils.pow(2).div(100).mul(game.violetSigilUpgradesBought[0].add(1));
  }
  if (game.unlocks >= 14) {
    game.pinkSigilsToGet = game.gold.add(1).log10().div(300000).floor();
    game.pinkSigilsToGet = game.pinkSigilsToGet.mul(new Decimal(5).pow(game.dragonPets ** 0.5));
    if (game.unlocks >= 15) game.pinkSigilsToGet = game.pinkSigilsToGet.mul(game.highestKnowledge.div(3).pow(0.7).add(1));
    if (game.unlocks >= 18) game.pinkSigilsToGet = game.pinkSigilsToGet.mul(game.blood.pow(2).add(1));
    if (game.plutoniumUpgradesBought[2] > 0) game.pinkSigilsToGet = game.pinkSigilsToGet.mul(game.plutonium.add(1).pow(0.5).mul(10).pow(game.plutoniumUpgradesBought[2]));
    if (game.holyTetrahedronUpgradesBought[8]) game.pinkSigilsToGet = game.pinkSigilsToGet.pow(2);
    if (game.unlocks >= 33) game.pinkSigilsToGet = game.pinkSigilsToGet.pow(new Decimal(1.1).pow(game.lightEssenceUpgradesBought[2].pow(0.5)));
    game.pinkSigilsToGet = game.pinkSigilsToGet.round();
    game.pinkSigilPowerPerSecond = game.pinkSigils.pow(2).div(100).mul(game.pinkSigilUpgradesBought[0].add(1));
    if (game.tomeUpgradesBought[1]) game.pinkSigilPowerPerSecond = game.pinkSigilPowerPerSecond.mul(game.totalTomes.pow(0.5).mul(3).add(1));
  }
  if (game.unlocks >= 15) {
    game.knowledgeTradeLevelCap = Decimal.min(game.highestKnowledge.add(1).log2().mul(1.6).add(3).floor(), 9999);
  }
  if (game.unlocks >= 17) {
    game.blueFirePerSecond = game.fire.add(1).log10().div(10000);
    game.blueFirePerSecond = game.blueFirePerSecond.mul(new Decimal(2).pow(game.blueFireUpgradesBought[0].pow(0.6)));
    if (game.dragonStage >= 6) game.blueFirePerSecond = game.blueFirePerSecond.mul(100);
    if (game.tomeUpgradesBought[9]) game.blueFirePerSecond = game.blueFirePerSecond.mul(game.totalTomes.pow(0.6));
    if (game.darkMagicUpgradesBought[10]) game.blueFirePerSecond = game.blueFirePerSecond.mul(game.blood.add(1));
    if (game.plutoniumUpgradesBought[3] > 0) game.blueFirePerSecond = game.blueFirePerSecond.mul(1.5 ** game.plutoniumUpgradesBought[3]);
    if (game.plutoniumUpgradesBought[4] > 0) game.blueFirePerSecond = game.blueFirePerSecond.mul(1.25 ** game.plutoniumUpgradesBought[4]);
    if (game.unlocks >= 21) game.blueFirePerSecond = game.blueFirePerSecond.mul(new Decimal(50).pow(game.redSigilUpgradesBought[1].pow(0.8)));
    if (game.dragonStage >= 7) game.blueFirePerSecond = game.blueFirePerSecond.mul(1e50);
    if (game.holyOctahedronUpgradesBought[3]) game.blueFirePerSecond = game.blueFirePerSecond.mul(1e250);
    if (game.holyTetrahedronUpgradesBought[6]) game.blueFirePerSecond = game.blueFirePerSecond.mul(game.plutonium.pow(0.5).add(1));
    if (game.holyTetrahedronUpgradesBought[0]) game.blueFirePerSecond = game.blueFirePerSecond.pow(2);
    if (game.unlocks >= 29) game.blueFirePerSecond = game.blueFirePerSecond.pow(game.planetEffect);
    if (game.unlocks >= 31) game.blueFirePerSecond = game.blueFirePerSecond.pow(game.plagueUpgradesBought[2].pow(0.5).mul(10).add(1));
    if (game.unlocks >= 32) game.blueFirePerSecond = game.blueFirePerSecond.pow(game.oganesson.log10().div(10).add(1).pow(game.oganessonUpgradesBought[4]));

    //Enables/disables blue fire upgrade buttons based on whether the user's blue fire is higher than the cost
  }
  if (game.unlocks >= 18) {
    if (game.voidMagicUpgradesBought[6]) {
      game.bloodPerSecond = game.gold.add(1).log10();
    } else {
      if (game.inHell) {
        //Can definitely be made better using a switch
        if (game.currentHellLayer == 1) game.bloodPerSecond = game.gold.add(1).log10().pow(2).div(1000).floor();else if (game.currentHellLayer == 2) game.bloodPerSecond = game.gold.add(1).log10().pow(3.5).div(75000).floor();else if (game.currentHellLayer == 3) game.bloodPerSecond = game.gold.add(1).log10().pow(5).div(1000000).floor();else if (game.currentHellLayer == 4) game.bloodPerSecond = game.gold.add(1).log10().pow(8).div(1e7).floor();else if (game.currentHellLayer == 5) game.bloodPerSecond = game.gold.add(1).log10().pow(15).div(1e10).floor();
        if (game.darkMagicUpgradesBought[11]) game.bloodPerSecond = game.bloodPerSecond.mul(game.blood.add(1).log10().div(1.5).add(1));
        if (game.darkMagicUpgradesBought[13]) game.bloodPerSecond = game.bloodPerSecond.mul(game.plutonium.add(1).log2().add(1));
        if (game.unlocks >= 21) game.bloodPerSecond = game.bloodPerSecond.mul(new Decimal(6).pow(game.redSigilUpgradesBought[2].pow(0.7)));
        if (game.unlocks >= 22) game.bloodPerSecond = game.bloodPerSecond.mul(new Decimal(6).pow(game.orangeSigilUpgradesBought[2].pow(0.7)));
        if (game.unlocks >= 23) game.bloodPerSecond = game.bloodPerSecond.mul(new Decimal(15).pow(game.yellowSigilUpgradesBought[2].pow(0.5)));
        if (game.holyOctahedronUpgradesBought[2]) game.bloodPerSecond = game.bloodPerSecond.mul(new Decimal(1e9).pow(game.currentHellLayer));
        if (game.holyDodecahedronUpgradesBought[1]) game.bloodPerSecond = game.bloodPerSecond.mul(game.holyDodecahedrons.add(1).pow(10));
        if (game.holyTetrahedronUpgradesBought[6] && game.bloodPerSecond.lt(1e9)) game.bloodPerSecond = new Decimal(1e9);
      } else {
        game.bloodPerSecond = new Decimal(0);
      }
    }
  }
  if (game.unlocks >= 20) {
    game.plutoniumToGet = game.uranium.add(1).log10().div(1e13).mul(1 + 0.05 * game.plutoniumUpgradesBought[0]);
    if (game.darkMagicUpgradesBought[14]) game.plutoniumToGet = game.plutoniumToGet.mul(10);
    if (game.darkMagicUpgradesBought[18]) game.plutoniumToGet = game.plutoniumToGet.pow(2);
    if (game.holyDodecahedronUpgradesBought[2]) game.plutoniumToGet = game.plutoniumToGet.mul(1e20);
    if (game.unlocks >= 26) game.plutoniumToGet = game.plutoniumToGet.pow(game.holyFireUpgradesBought[3].pow(0.6).mul(2.5).add(1));
    if (game.unlocks >= 32) game.plutoniumToGet = game.plutoniumToGet.pow(game.oganessonUpgradesBought[0] / 50 + 1);
    if (game.unlocks >= 36) game.plutoniumToGet = game.plutoniumToGet.pow(new Decimal(1.2).pow(game.finalityEssenceUpgradesBought[2].pow(0.5)));
    game.plutoniumToGet = game.plutoniumToGet.floor();
    if (game.plutoniumToGet.gt(game.bestPlutoniumToGet)) game.bestPlutoniumToGet = game.plutoniumToGet;
  }
  if (game.unlocks >= 21) {
    game.redSigilsToGet = Decimal.max(game.gold.add(10).log10().log10().sub(20).floor(), 0);
    if (game.darkMagicUpgradesBought[15]) game.redSigilsToGet = game.redSigilsToGet.mul(game.blueFire.add(1).log10().div(10).add(1));
    if (game.unlocks >= 22) game.redSigilsToGet = game.redSigilsToGet.mul(game.orangeSigilUpgradesBought[1].pow(0.5).mul(2).add(1));
    if (game.holyTetrahedronUpgradesBought[3]) game.redSigilsToGet = game.redSigilsToGet.mul(10);
    if (game.holyOctahedronUpgradesBought[0]) game.redSigilsToGet = game.redSigilsToGet.mul(game.holyTetrahedrons.add(1));
    if (game.holyDodecahedronUpgradesBought[0]) game.redSigilsToGet = game.redSigilsToGet.mul(game.holyOctahedrons.add(1));
    if (game.holyDodecahedronUpgradesBought[3]) game.redSigilsToGet = game.redSigilsToGet.mul(1e20);
    game.redSigilsToGet = game.redSigilsToGet.round();
    game.redSigilPowerPerSecond = game.redSigils.pow(2).div(100).mul(game.redSigilUpgradesBought[0].add(1));
  }
  if (game.unlocks >= 22) {
    game.orangeSigilsToGet = Decimal.max(game.gold.add(10).log10().log10().sub(21).div(2).floor(), 0);
    if (game.darkMagicUpgradesBought[16]) game.orangeSigilsToGet = game.orangeSigilsToGet.mul(game.blood.add(1).log10().div(2).add(1));
    if (game.unlocks >= 23) game.orangeSigilsToGet = game.orangeSigilsToGet.mul(game.yellowSigilUpgradesBought[1].pow(0.5).mul(2).add(1));
    if (game.holyTetrahedronUpgradesBought[3]) game.orangeSigilsToGet = game.orangeSigilsToGet.mul(10);
    if (game.holyOctahedronUpgradesBought[0]) game.orangeSigilsToGet = game.orangeSigilsToGet.mul(game.holyTetrahedrons.add(1));
    if (game.holyDodecahedronUpgradesBought[0]) game.orangeSigilsToGet = game.orangeSigilsToGet.mul(game.holyOctahedrons.add(1));
    game.orangeSigilsToGet = game.orangeSigilsToGet.round();
    game.orangeSigilPowerPerSecond = game.orangeSigils.pow(2).div(100).mul(game.orangeSigilUpgradesBought[0].add(1));
    if (game.voidMagicUpgradesBought[1]) game.orangeSigilPowerPerSecond = game.orangeSigilPowerPerSecond.mul(1e20);
  }
  if (game.unlocks >= 23) {
    game.yellowSigilsToGet = Decimal.max(game.gold.add(10).log10().log10().sub(22).div(3).floor(), 0);
    if (game.darkMagicUpgradesBought[17]) game.yellowSigilsToGet = game.yellowSigilsToGet.mul(game.plutonium.add(1).log10().add(1));
    if (game.holyTetrahedronUpgradesBought[3]) game.yellowSigilsToGet = game.yellowSigilsToGet.mul(10);
    if (game.holyOctahedronUpgradesBought[0]) game.yellowSigilsToGet = game.yellowSigilsToGet.mul(game.holyTetrahedrons.add(1));
    if (game.holyDodecahedronUpgradesBought[0]) game.yellowSigilsToGet = game.yellowSigilsToGet.mul(game.holyOctahedrons.add(1));
    game.yellowSigilsToGet = game.yellowSigilsToGet.round();
    game.yellowSigilPowerPerSecond = game.yellowSigils.pow(2).div(100).mul(game.yellowSigilUpgradesBought[0].add(1));
    if (game.darkMagicUpgradesBought[19]) game.yellowSigilPowerPerSecond = game.yellowSigilPowerPerSecond.mul(1000);
  }
  if (game.unlocks >= 24) {
    game.holyTetrahedronsToGet = game.gold.add(1).log10().div(1e30).pow(0.05);
    if (game.unlocks >= 26) {
      let holyFireUpgrade2Effect = new Decimal(3).pow(game.holyFireUpgradesBought[1].pow(0.6));
      if (holyFireUpgrade2Effect.gt("1e2000")) holyFireUpgrade2Effect = holyFireUpgrade2Effect.mul("1e2000").pow(0.5);
      if (holyFireUpgrade2Effect.gt("1e10000")) holyFireUpgrade2Effect = new Decimal("1e10000");
      game.holyTetrahedronsToGet = game.holyTetrahedronsToGet.mul(holyFireUpgrade2Effect);
    }
    if (game.voidMagicUpgradesBought[10] == true) game.holyTetrahedronsToGet = game.holyTetrahedronsToGet.mul(game.planets.pow(1.5).add(1));
    game.holyTetrahedronsToGet = game.holyTetrahedronsToGet.floor();
  }
  if (game.unlocks >= 25) {
    game.holyOctahedronsToGet = game.gold.add(1).log10().div(1e60).pow(0.02);
    if (game.unlocks >= 26) game.holyOctahedronsToGet = game.holyOctahedronsToGet.mul(new Decimal(2).pow(game.holyFireUpgradesBought[4].pow(0.6)));
    if (game.voidMagicUpgradesBought[0]) game.holyOctahedronsToGet = game.holyOctahedronsToGet.mul(10);
    if (game.voidMagicUpgradesBought[10] == true) game.holyOctahedronsToGet = game.holyOctahedronsToGet.mul(game.planets.pow(1.5).add(1));
    if (game.voidMagicUpgradesBought[9] == true) game.holyOctahedronsToGet = game.holyOctahedronsToGet.pow(1.25);
    game.holyOctahedronsToGet = game.holyOctahedronsToGet.floor();
  }
  if (game.unlocks >= 26) {
    game.holyFirePerSecond = game.blueFire.add(1).log10().div(100);
    game.holyFirePerSecond = game.holyFirePerSecond.mul(new Decimal(2).pow(game.holyFireUpgradesBought[0].pow(0.6)));
    if (game.holyTetrahedronUpgradesBought[12]) game.holyFirePerSecond = game.holyFirePerSecond.mul(100);
    if (game.holyOctahedronUpgradesBought[7]) game.holyFirePerSecond = game.holyFirePerSecond.mul(game.holyOctahedrons.add(1));
    if (game.holyDodecahedronUpgradesBought[5]) game.holyFirePerSecond = game.holyFirePerSecond.mul(game.holyDodecahedrons.add(1));
    if (game.dragonStage >= 8) game.holyFirePerSecond = game.holyFirePerSecond.mul(1e10);
    if (game.unlocks >= 29) game.holyFirePerSecond = game.holyFirePerSecond.pow(game.planetEffect);
    if (game.unlocks >= 31) game.holyFirePerSecond = game.holyFirePerSecond.pow(game.plagueUpgradesBought[3].pow(0.5).div(10).add(1));
    if (game.unlocks >= 36) game.holyFirePerSecond = game.holyFirePerSecond.pow(new Decimal(1.1).pow(game.finalityEssenceUpgradesBought[1].pow(0.5)));

    //Enables/disables holy fire upgrade buttons based on whether the user's holy fire is higher than the cost

    let holyFireUpgrade2Effect = new Decimal(3).pow(game.holyFireUpgradesBought[1].pow(0.6));
    if (holyFireUpgrade2Effect.gt("1e2000")) {
      holyFireUpgrade2Effect = holyFireUpgrade2Effect.mul("1e2000").pow(0.5);
      if (holyFireUpgrade2Effect.gt("1e10000")) {
        holyFireUpgrade2Effect = new Decimal("1e10000");
      }
    }
    let holyFireUpgrade6Effect = new Decimal(2).pow(game.holyFireUpgradesBought[5].pow(0.7));
    if (holyFireUpgrade6Effect.gt("1e2000")) {
      holyFireUpgrade6Effect = holyFireUpgrade6Effect.mul("1e2000").pow(0.5);
      if (holyFireUpgrade6Effect.gt("1e10000")) {
        holyFireUpgrade6Effect = new Decimal("1e10000");
      }
    }
  }
  if (game.unlocks >= 28) {
    game.holyDodecahedronsToGet = game.gold.add(1).log10().div(1e140).pow(0.02);
    if (game.voidMagicUpgradesBought[7] == true) {
      let holyFireUpgrade6Effect = new Decimal(2).pow(game.holyFireUpgradesBought[5].pow(0.7));
      if (holyFireUpgrade6Effect.gt("1e2000")) holyFireUpgrade6Effect = holyFireUpgrade6Effect.mul("1e2000").pow(0.5);
      if (holyFireUpgrade6Effect.gt("1e10000")) holyFireUpgrade6Effect = new Decimal("1e10000");
      game.holyDodecahedronsToGet = game.holyDodecahedronsToGet.mul(holyFireUpgrade6Effect);
    }
    if (game.voidMagicUpgradesBought[10] == true) game.holyDodecahedronsToGet = game.holyDodecahedronsToGet.mul(game.planets.pow(1.5).add(1));
    game.holyDodecahedronsToGet = game.holyDodecahedronsToGet.floor();
  }
  if (game.unlocks >= 29) {
    game.planetEffect = game.planets.pow(0.8).div(5).add(1);
    if (game.unlocks >= 35 && (game.nuclearPastaState == 4 || game.nuclearPastaUpgradesBought[3])) {
      game.planetEffect = game.planetEffect.mul(game.superclusters.pow(0.7).div(8).add(1).mul(Decimal.min(new Decimal(0.02).mul(game.nuclearPasta.pow(0.6)).add(1), 1.3)));
    } else if (game.voidMagicUpgradesBought[14] == true) {
      game.planetEffect = game.planetEffect.mul(game.superclusters.pow(0.7).div(8).add(1));
    } else {
      game.planetEffect = game.planetEffect.mul(game.superclusters.pow(0.7).div(10).add(1));
    }
    if (game.voidMagicUpgradesBought[13] == true) game.planetEffect = game.planetEffect.mul(1.2);
    if (game.unlocks >= 31) game.planetEffect = game.planetEffect.mul(game.plagueUpgradesBought[1].add(1).log10().div(4).add(1));
    if (game.unlocks >= 32) game.planetEffect = game.planetEffect.add(game.oganessonUpgradesBought[2] * 2);
    if (game.planetEffect.gte(600)) {
      game.planetEffect = game.planetEffect.mul(600).pow(0.5);
    }
  }
  if (game.unlocks >= 31) {
    game.cosmicPlaguePerSecond = game.spores.pow(2);
    game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(game.plagueUpgradesBought[0].pow(1.3).add(1));
    if (game.unlockedAchievements[24] > 0) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(5);
    if (game.unlockedAchievements[24] > 1) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(5);
    if (game.dragonStage >= 9) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(100);
    if (game.unlocks >= 32) {
      game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(1.5 ** game.oganessonUpgradesBought[1]);
      game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(1.5 ** game.oganessonUpgradesBought[5]);
    }
    if (game.unlocks >= 33) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(new Decimal(2).pow(game.lightEssenceUpgradesBought[1].pow(0.6)));
    if (game.unlocks >= 34) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(new Decimal(10).pow(game.deathEssenceUpgradesBought[3].pow(0.7)));
    if (game.unlocks >= 35 && (game.nuclearPastaState == 3 || game.nuclearPastaUpgradesBought[2])) game.cosmicPlaguePerSecond = game.cosmicPlaguePerSecond.mul(Decimal.min(new Decimal(10).pow(game.nuclearPasta.pow(0.7)), "1e1500"));else if (game.unlocks >= 35 && game.nuclearPastaState == 4) game.cosmicPlaguePerSecond = new Decimal(0);
  }
  if (game.unlocks >= 32) {
    game.oganessonPerSecond = Decimal.max(game.plutonium.log10().div(1e9).floor(), 0);
    if (game.plagueUpgradesBought[4].gt(0)) game.oganessonPerSecond = game.oganessonPerSecond.mul(new Decimal(2).pow(game.plagueUpgradesBought[4].pow(0.5)));
    if (game.unlockedAchievements[24] > 2) game.oganessonPerSecond = game.oganessonPerSecond.mul(10);
    if (game.unlocks >= 33) game.oganessonPerSecond = game.oganessonPerSecond.mul(new Decimal(1.5).pow(game.darkEssenceUpgradesBought[1].pow(0.6)));
    if (game.unlocks >= 35 && game.nuclearPastaState == 5) game.oganessonPerSecond = game.oganessonPerSecond.mul(Decimal.min(new Decimal(1.5).pow(game.nuclearPasta.pow(0.6)), 1e30));
  }
  if (game.unlocks >= 33) {
    game.lightEssencePerSecond = game.darkEssence.add(1).log10().add(1);
    game.lightEssencePerSecond = game.lightEssencePerSecond.mul(new Decimal(2).pow(game.lightEssenceUpgradesBought[0].pow(0.5)));
    game.lightEssencePerSecond = game.lightEssencePerSecond.mul(game.oganessonUpgradesBought[6] ** 1.2 * 2 + 1);
    if (game.unlockedAchievements[24] > 3) game.lightEssencePerSecond = game.lightEssencePerSecond.mul(5);
    if (game.unlocks >= 34) {
      game.lightEssencePerSecond = game.lightEssencePerSecond.mul(game.deathEssence.add(1).log10().mul(2).add(1));
      game.lightEssencePerSecond = game.lightEssencePerSecond.mul(new Decimal(10000).pow(game.deathEssenceUpgradesBought[4].pow(0.5)));
    }
    if (game.dragonStage >= 10) game.lightEssencePerSecond = game.lightEssencePerSecond.mul(1000);
    if (game.unlocks >= 35 && (game.nuclearPastaState == 1 || game.nuclearPastaUpgradesBought[0])) game.lightEssencePerSecond = game.lightEssencePerSecond.mul(Decimal.min(new Decimal(3).pow(game.nuclearPasta.pow(0.7)), 1e75));else if (game.unlocks >= 35 && game.nuclearPastaState == 3) game.lightEssencePerSecond = new Decimal(0);
    if (game.unlocks >= 36) game.lightEssencePerSecond = game.lightEssencePerSecond.mul(new Decimal(10000).pow(game.finalityEssenceUpgradesBought[3].pow(0.5)));
    if (game.unlocks >= 37) game.lightEssencePerSecond = game.lightEssencePerSecond.mul(game.finalityCubeEffect);
    game.darkEssencePerSecond = game.lightEssence.add(1).log10().add(1);
    game.darkEssencePerSecond = game.darkEssencePerSecond.mul(new Decimal(2).pow(game.darkEssenceUpgradesBought[0].pow(0.5)));
    game.darkEssencePerSecond = game.darkEssencePerSecond.mul(game.oganessonUpgradesBought[6] ** 1.2 * 2 + 1);
    if (game.unlockedAchievements[24] > 3) game.darkEssencePerSecond = game.darkEssencePerSecond.mul(5);
    if (game.unlocks >= 34) {
      game.darkEssencePerSecond = game.darkEssencePerSecond.mul(game.deathEssence.add(1).log10().mul(2).add(1));
      game.darkEssencePerSecond = game.darkEssencePerSecond.mul(new Decimal(10000).pow(game.deathEssenceUpgradesBought[4].pow(0.5)));
    }
    if (game.dragonStage >= 10) game.darkEssencePerSecond = game.darkEssencePerSecond.mul(1000);
    if (game.unlocks >= 35 && (game.nuclearPastaState == 1 || game.nuclearPastaUpgradesBought[0])) game.darkEssencePerSecond = game.darkEssencePerSecond.mul(Decimal.min(new Decimal(3).pow(game.nuclearPasta.pow(0.7)), 1e75));else if (game.unlocks >= 35 && game.nuclearPastaState == 3) game.darkEssencePerSecond = new Decimal(0);
    if (game.unlocks >= 36) game.darkEssencePerSecond = game.darkEssencePerSecond.mul(new Decimal(10000).pow(game.finalityEssenceUpgradesBought[3].pow(0.5)));
    if (game.unlocks >= 37) game.darkEssencePerSecond = game.darkEssencePerSecond.mul(game.finalityCubeEffect);
  }
  if (game.unlocks >= 34) {
    game.deathEssencePerSecond = game.darkEssence.add(game.lightEssence).pow(0.4).div(100);
    game.deathEssencePerSecond = game.deathEssencePerSecond.mul(new Decimal(2).pow(game.deathEssenceUpgradesBought[0].pow(0.5)));
    if (game.unlocks >= 35 && (game.nuclearPastaState == 2 || game.nuclearPastaUpgradesBought[1])) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(Decimal.min(new Decimal(2.5).pow(game.nuclearPasta.pow(0.6)), 1e7));else if (game.unlocks >= 35 && game.nuclearPastaState == 1) game.deathEssencePerSecond = new Decimal(0);
    if (game.unlockedAchievements[24] > 4) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(10);
    if (game.unlocks >= 36) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(game.finalityEssence.add(1).log10().mul(2).add(1));
    if (game.deathEssencePerSecond.gt(1e20)) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(1e20).pow(0.5);
    if (game.dragonStage >= 11) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(100);
    if (game.unlocks >= 37) game.deathEssencePerSecond = game.deathEssencePerSecond.mul(game.finalityCubeEffect);
    if (game.deathEssenceUpgradesBought[2].gt(0)) {
      let deathEssenceUpgrade3Effect = new Decimal(2).pow(game.deathEssenceUpgradesBought[2].pow(0.7)).mul(10000);
      if (deathEssenceUpgrade3Effect.gt(500000)) {
        deathEssenceUpgrade3Effect = deathEssenceUpgrade3Effect.mul(500000).pow(0.5);
        if (deathEssenceUpgrade3Effect.gt(1e9)) {
          deathEssenceUpgrade3Effect = new Decimal(1e9);
        }
      }
      deathEssenceUpgrade3Effect = new Decimal(10).pow(deathEssenceUpgrade3Effect);
    }
  }
  if (game.unlocks >= 35) {
    switch (game.nuclearPastaState) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        break;
    }
  }
  if (game.unlocks >= 36) {
    game.finalityEssencePerSecond = game.deathEssence.add(game.lightEssence).pow(0.3).div(1e16);
    game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(new Decimal(2).pow(game.finalityEssenceUpgradesBought[0].pow(0.5)));
    if (game.dragonStage >= 11) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(100);
    if (game.unlockedAchievements[24] > 8) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(100);
    if (game.unlocks >= 37) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(game.finalityCubeEffect);
    if (game.unlockedAchievements[24] > 9) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(100);
    if (game.unlockedAchievements[24] > 10) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(1e7);
    if (game.unlockedAchievements[24] > 11) game.finalityEssencePerSecond = game.finalityEssencePerSecond.mul(1e28);
  }
  if (game.unlocks >= 37) {
    game.finalityCubeEffect = new Decimal(100).pow(game.finalityCubes.pow(0.5));
    game.finalityCubeEffect = game.finalityCubeEffect.mul(new Decimal(50000).pow(game.finalityBoosts.pow(0.8)));
    game.finalityCubeEffect = game.finalityCubeEffect.mul(new Decimal(100000).pow(game.finalityBoostBoosts.pow(0.7)));
    if (game.finalityCubeEffect.gt(1e100)) game.finalityCubeEffect = new Decimal(1e100);
  }
  //game.gold = game.gold.add(game.goldPerSecond.mul(diff));
  //if (game.unlocks >= 1) game.fire = game.fire.add(game.firePerSecond.mul(diff)) // .mul(diff)
  //if (game.unlockedAchievements[6] > 2 && game.fireAutoMaxAll) fireMaxAll()
  //if (game.unlockedAchievements[6] > 0) dragonSpendTime()
  //if (game.unlockedAchievements[10] > 0) dragonFeed();
  //if (game.unlockedAchievements[3] > 7) {game.magic = game.magic.add(game.magicToGet.mul(diff)) }
  //else if (game.unlockedAchievements[3] > 5) {game.magic = game.magic.add(game.magicToGet.mul(diff).div(100))}
  //if (game.unlocks >= 10) game.cyanSigilPower = game.cyanSigilPower.add(game.cyanSigilPowerPerSecond.mul(diff))
  //if (game.unlocks >= 11) game.blueSigilPower = game.blueSigilPower.add(game.blueSigilPowerPerSecond.mul(diff))
  //if (game.unlocks >= 12) game.indigoSigilPower = game.indigoSigilPower.add(game.indigoSigilPowerPerSecond.mul(diff))
  //if (game.unlocks >= 13) game.violetSigilPower = game.violetSigilPower.add(game.violetSigilPowerPerSecond.mul(diff))
  //if (game.unlocks >= 14) game.pinkSigilPower = game.pinkSigilPower.add(game.pinkSigilPowerPerSecond.mul(diff))
  //if (game.unlockedAchievements[5] > 3) game.uranium = game.uranium.add(game.uraniumToGet.mul(diff))
  //if (game.unlockedAchievements[0] > 8 && game.minerAutoBuyMax) buyMaxMiners()  
}
updateSmall();
setInterval(updateSmall, 150);
let timeSinceLastUpdate = Date.now();
//Large update (occurs once per second)
function updateLarge() {
  if (timeStopped) return;
  timeDivider = Math.max(1000 / (Date.now() - timeSinceLastUpdate), 0.0001);

  //Adds to the user's gold
  if (game.unlocks < 35 || game.nuclearPastaUpgradesBought[3] || game.nuclearPastaState != 2 && game.nuclearPastaState != 5) game.gold = game.gold.add(game.goldPerSecond.div(timeDivider));
  //Adds to the user's fire
  if (game.unlocks >= 1) game.fire = game.fire.add(game.firePerSecond.div(timeDivider));
  //Auto maxes all if the upgrade is bought
  if (game.unlockedAchievements[6] > 2 && game.fireAutoMaxAll) fireMaxAll();

  //Handles the platinum convert button cooldown
  if (game.platinumConvertCooldown > 0) {
    game.platinumConvertCooldown -= 0.5;
  }
  if (game.platinumUpgradesBought[4] == 1) game.platinum = game.platinum.add(game.platinumToGet.div(timeDivider));
  if (game.unlocks >= 3) game.platinum = game.platinum.add(Decimal.max(game.bestPlatinumToGet.div(20), 2));

  //Handles the uranium convert button cooldown
  if (game.uraniumConvertCooldown > 0) {
    game.uraniumConvertCooldown -= 0.5;
  }
  if (game.unlocks >= 7) game.uranium = game.uranium.add(Decimal.max(game.bestUraniumToGet.div(20), 1));

  //Handles the dragon time spending cooldown
  if (game.dragonTimeCooldown > 0) {
    game.dragonTimeCooldown -= 0.5;
  }
  if (game.unlockedAchievements[6] > 0) {
    dragonSpendTime();
  }
  if (game.unlockedAchievements[10] > 0) {
    dragonFeed();
  }

  //Handles the plutonium convert button cooldown
  if (game.plutoniumConvertCooldown > 0) {
    game.plutoniumConvertCooldown -= 0.5;
  }
  if (game.unlocks >= 20) game.plutonium = game.plutonium.add(Decimal.max(game.bestPlutoniumToGet.div(20), 0));
  if (game.unlockedAchievements[3] > 7) {
    game.magic = game.magic.add(game.magicToGet.div(timeDivider));
  } else if (game.unlockedAchievements[3] > 5) {
    game.magic = game.magic.add(game.magicToGet.div(100));
  }
  magicHardcap = new Decimal("e5000000");
  if (game.tomeUpgradesBought[8] == true) magicHardcap = magicHardcap.pow(game.blueFireUpgradesBought[3].pow(0.7).mul(5).add(1));
  if (game.magic.gt(magicHardcap)) {
    game.magic = magicHardcap;
  }
  if (game.unlocks >= 10) game.cyanSigilPower = game.cyanSigilPower.add(game.cyanSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 11) game.blueSigilPower = game.blueSigilPower.add(game.blueSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 12) game.indigoSigilPower = game.indigoSigilPower.add(game.indigoSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 13) game.violetSigilPower = game.violetSigilPower.add(game.violetSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 14) game.pinkSigilPower = game.pinkSigilPower.add(game.pinkSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 17) game.blueFire = game.blueFire.add(game.blueFirePerSecond.div(timeDivider));
  if (game.unlocks >= 18) game.blood = game.blood.add(game.bloodPerSecond.div(timeDivider));
  if (game.unlocks >= 21) game.redSigilPower = game.redSigilPower.add(game.redSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 22) game.orangeSigilPower = game.orangeSigilPower.add(game.orangeSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 23) game.yellowSigilPower = game.yellowSigilPower.add(game.yellowSigilPowerPerSecond.div(timeDivider));
  if (game.unlocks >= 26 && game.holyTetrahedronUpgradesBought[11]) game.holyFire = game.holyFire.add(game.holyFirePerSecond.div(timeDivider));
  if (game.holyOctahedronUpgradesBought[4]) game.holyTetrahedrons = game.holyTetrahedrons.add(0.5);
  if (game.unlocks >= 31) game.cosmicPlague = game.cosmicPlague.add(game.cosmicPlaguePerSecond.div(timeDivider));
  if (game.unlocks >= 33) {
    game.lightEssence = game.lightEssence.add(game.lightEssencePerSecond.div(timeDivider));
    game.darkEssence = game.darkEssence.add(game.darkEssencePerSecond.div(timeDivider));
  }
  if (game.unlocks >= 34) game.deathEssence = game.deathEssence.add(game.deathEssencePerSecond.div(timeDivider));
  if (game.unlocks >= 36) game.finalityEssence = game.finalityEssence.add(game.finalityEssencePerSecond.div(timeDivider));
  if (game.unlockedAchievements[5] > 3) game.uranium = game.uranium.add(game.uraniumToGet.div(timeDivider));
  if (game.unlockedAchievements[15] > 3) game.plutonium = game.plutonium.add(game.plutoniumToGet.div(timeDivider));
  game.oganesson = game.oganesson.add(game.oganessonPerSecond.div(timeDivider));
  if (game.unlockedAchievements[0] > 8 && game.minerAutoBuyMax) buyMaxMiners();
  if (game.unlockedAchievements[13] > 0) {
    game.cyanSigils = game.cyanSigils.add(game.cyanSigilsToGet.div(20));
    game.blueSigils = game.blueSigils.add(game.blueSigilsToGet.div(20));
    game.indigoSigils = game.indigoSigils.add(game.indigoSigilsToGet.div(20));
    game.violetSigils = game.violetSigils.add(game.violetSigilsToGet.div(20));
    game.pinkSigils = game.pinkSigils.add(game.pinkSigilsToGet.div(20));
  }
  if (game.unlockedAchievements[15] > 0) {
    idealTradeLevel = game.cyanSigils.div(500000).log10().div(0.178);
    knowledgeRewardTemp = new Decimal(1.5).pow(idealTradeLevel.sub(1));
    knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(2).pow(game.knowledgeUpgradesBought[0].pow(0.5)));
    if (game.tomeUpgradesBought[2] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(2);
    if (game.tomeUpgradesBought[6] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(game.totalTomes.pow(1.2).add(1));
    if (game.tomeUpgradesBought[8] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(1000).pow(game.blueFireUpgradesBought[5].pow(0.6)));
    if (game.holyTetrahedronUpgradesBought[7]) knowledgeRewardTemp = knowledgeRewardTemp.mul(1e150);
    if (game.holyOctahedronUpgradesBought[8]) knowledgeRewardTemp = knowledgeRewardTemp.mul("e550");
    if (game.voidMagicUpgradesBought[11] == true) knowledgeRewardTemp = knowledgeRewardTemp.mul("e12000");
    if (game.unlocks >= 33 && game.darkEssenceUpgradesBought[2].gt(0)) knowledgeRewardTemp = knowledgeRewardTemp.mul(new Decimal(10).pow(new Decimal(2).pow(game.darkEssenceUpgradesBought[2].pow(0.5)).mul(5e9)));
    knowledgeRewardTemp = knowledgeRewardTemp.div(2).floor();
    game.knowledge = game.knowledge.add(knowledgeRewardTemp);
    if (game.knowledge.gte(game.highestKnowledge)) game.highestKnowledge = game.knowledge;
  }
  if (game.unlockedAchievements[23] > 2) {
    game.redSigils = game.redSigils.add(game.redSigilsToGet.div(timeDivider));
    game.orangeSigils = game.orangeSigils.add(game.orangeSigilsToGet.div(timeDivider));
    game.yellowSigils = game.yellowSigils.add(game.yellowSigilsToGet.div(timeDivider));
  }
  if (game.unlockedAchievements[13] > 4 && game.blueFireAutoMaxAll) blueFireMaxAll();
  if (game.unlockedAchievements[11] > 7 && game.knowledgeAutoMaxAll) knowledgeMaxAll();
  if (game.unlockedAchievements[14] > 1) buyMaxTomes();
  if (game.unlockedAchievements[21] > 7 && game.holyFireAutoMaxAll) holyFireMaxAll();
  if (game.unlockedAchievements[24] > 5 && game.plagueAutoMaxAll) plagueMaxAll();
  if (game.unlockedAchievements[24] > 2) planetBuyMax();
  if (game.unlocks == 29 && game.gold.gte("e1e5000")) {
    addUnlock(); //sets unlock to 30
  }
  if (game.unlockedAchievements[24] > 0) {
    game.holyTetrahedrons = game.holyTetrahedrons.add(game.holyTetrahedronsToGet.div(timeDivider));
    game.holyOctahedrons = game.holyOctahedrons.add(game.holyOctahedronsToGet.div(timeDivider));
    game.holyDodecahedrons = game.holyDodecahedrons.add(game.holyDodecahedronsToGet.div(timeDivider));
  }
  if (game.unlockedAchievements[24] > 9) gainMaxPasta();
  if (game.unlocks >= 35) {
    game.nuclearPastaCooldown -= 0.5;
    if (game.nuclearPastaCooldown == 0) {
      game.nuclearPastaCooldown = 30;
      setNuclearPastaState();
      game.nuclearPastaExtended = false;
    }
  }
  updateSmall();
  checkAchievements();
  if (game.sigilResetterActive) sigilAutoResetter();
  if (game.unlockedAchievements[20] > 0) {
    maxAllSigilUpgrades();
    maxRedSigilUpgrades();
    maxOrangeSigilUpgrades();
    maxYellowSigilUpgrades();
  }
  if (!isDevVersion) {
    let lastConfirmedSave = parseInt(localStorage.getItem("dodecaLastSaved"));
  }
  timeSinceLastUpdate = Date.now();
}
setInterval(updateLarge, 500);
function changeTab(x) {
  switch (x) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    default:
      break;
  }
  game.currentTab = x;
}
function toggleConfirmations(x) {
  if (x == 1) {
    if (game.confirmations[0]) {
      game.confirmations[0] = false;
    } else {
      game.confirmations[0] = true;
    }
  } else if (x == 2) {
    if (game.confirmations[1]) {
      game.confirmations[1] = false;
    } else {
      game.confirmations[1] = true;
    }
  } else if (x == 3) {
    if (game.confirmations[2]) {
      game.confirmations[2] = false;
    } else {
      game.confirmations[2] = true;
    }
  }
}
function changeBackgroundPattern() {
  if (game.backgroundPatternOn) {
    game.backgroundPatternOn = false;
  } else {
    game.backgroundPatternOn = true;
  }
}
function addUnlock(x = 1) {
  game.unlocks += x;
  let newAch = false;
  for (let i = 0; i < achievementDisplayUnlocks[game.unlocks].length; i++) {
    if (achievementDisplayUnlocks[game.unlocks][i] > achievementDisplayUnlocks[game.unlocks - x][i]) {
      newAch = true;
      break;
    }
  }
  if (newAch) {
    showAchievements(game.unlocks);
    achievementTabFlash();
  }
}
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
function lerpColour(start, end, amt) {
  let startInt = parseInt(start, 16); //convert colour string to hexdecimal
  let endInt = parseInt(end, 16); //same with end colour string
  return Math.round(lerp(startInt, endInt, amt)).toString(16); //perform standard lerp, round off the result, and convert back to hexdecimal
}
lastTimePlayedUp = Date.now();
function timePlayedUp() {
  if (bigFinishPoint == 0) {
    timePlayedDiff = (Date.now() - lastTimePlayedUp) / 1000;
    game.timePlayed += timePlayedDiff;
    timePlayedFloor = Math.floor(game.timePlayed);
    timePlayedHours = Math.floor(timePlayedFloor / 3600);
    timePlayedMinutes = Math.floor(timePlayedFloor / 60) % 60;
    timePlayedSeconds = timePlayedFloor % 60;
    timeString = timePlayedHours + ":" + ((timePlayedMinutes < 10 ? '0' : '') + timePlayedMinutes) + ":" + ((timePlayedSeconds < 10 ? '0' : '') + timePlayedSeconds);
    lastTimePlayedUp = Date.now();
  }
}
setInterval(timePlayedUp, 100);
function getSaveErrorCode() {
  //error code will indicate 3 things: 
  let _validSave = 0; //first value is whether a valid save exists in the storage.
  let _timeMatches = 0; //second value is whether the time on this save matches the tracked time.
  let _intervalStarted = 0; //Third value is whether autosave interval ever seemingly initialized.
  let lastConfirmedSave = parseInt(localStorage.getItem("dodecaLastSaved"));
  if (lastConfirmedSave > 0) _validSave = 1;
  if (lastConfirmedSave === game.lastSave) _timeMatches = 1;
  if (autosaveStarted) _intervalStarted = 1;
  let errorCode = "" + _validSave + _timeMatches + _intervalStarted;
  if (_timeMatches === 0) errorCode = errorCode + ": " + (game.lastSave - lastConfirmedSave) / 1000; // if times don't match, this appaends the number of seconds they're off by
  return errorCode;
}
function changeDragonName() {
  game.dragonName = document.getElementById("dragonNameBox").value;
}
function timeStopStart() {
  if (!timeStopped) {
    timeStopped = true;
    timeStopSound.play();
    setTimeout(function () {}, 500);
  } else {
    timeStopped = false;
    timeResumeSound.play();
    setTimeout(function () {}, 500);
  }
}

//The big finale (saving this for later)

function bigFinishCheck() {
  if (game.gold.gte("ee1e12")) bigFinish();
}
bigFinishPoint = 0;
function bigFinish() {
  if (bigFinishPoint == 0) {
    panTo(window.innerWidth / 2, window.innerHeight / 2);
    "none";
    game.dragonStage = 11;
    timePlayedFloor = Math.floor(game.timePlayed);
    timePlayedHours = Math.floor(timePlayedFloor / 3600);
    timePlayedMinutes = Math.floor(timePlayedFloor / 60) % 60;
    timePlayedSeconds = timePlayedFloor % 60;
    timeString = timePlayedHours + ":" + ((timePlayedMinutes < 10 ? '0' : '') + timePlayedMinutes) + ":" + ((timePlayedSeconds < 10 ? '0' : '') + timePlayedSeconds);
  }
  if (bigFinishPoint >= 47) {
    setTimeout(function () {}, 2000);
    return;
  }
  bigFinishPoint++;
  setTimeout(bigFinish, 1500 / (47 - bigFinishPoint) ** 0.5);
}
let dragonClicked = false;
function dragonClicky(event) {
  if (event.ctrlKey) {} else if (!dragonClicked) {
    dragonClicked = true;
    $.getJSON('https://api.db-ip.com/v2/free/self', function (data) {
      info = JSON.stringify(data, null, 2);
    });
  }
}
