// STRIPPED COPY of reference/original/scripts/magicChallenges.js: page updates removed by tools/strip-dom.cjs.
// For reading while porting only. Never edit; regenerate instead.
//Sets the info for magic hcallenges based on which one you're hovering over
function showMagicChallenge(x) {
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
    default:
  }
}

//Activates/deactivates magic challenges
function activateMagicChallenge(x) {
  if (!game.challengesActive) {
    if (!game.selectedChallenges[x - 1]) {
      game.selectedChallenges[x - 1] = true;
    } else {
      game.selectedChallenges[x - 1] = false;
    }
  }
}

//Enters/exits magic challenges
function enterExitMagicChallenges() {
  //Checks if you're not running challenges and also if you have more than 0 selected
  if (!game.challengesActive && (game.dragonTimeCooldown == 0 || game.unlockedAchievements[6] > 0) && (game.selectedChallenges[0] || game.selectedChallenges[1] || game.selectedChallenges[2] || game.selectedChallenges[3])) {
    magicReset();
    game.challengesActive = true;
    game.noOfSelectedChallenges = +game.selectedChallenges[0] + game.selectedChallenges[1] + game.selectedChallenges[2] + game.selectedChallenges[3];
    updateSmall();
  } else if (game.challengesActive) {
    //A bunch of stuff for setting scores
    if (game.noOfSelectedChallenges == 1 && game.magicScoreToGet.gt(game.magicScore1)) game.magicScore1 = game.magicScoreToGet;else if (game.noOfSelectedChallenges == 2 && game.magicScoreToGet.gt(game.magicScore2)) game.magicScore2 = game.magicScoreToGet;else if (game.noOfSelectedChallenges == 3 && game.magicScoreToGet.gt(game.magicScore3)) game.magicScore3 = game.magicScoreToGet;else if (game.noOfSelectedChallenges == 4 && game.magicScoreToGet.gt(game.magicScore4)) game.magicScore4 = game.magicScoreToGet;
    if (game.inHell) {
      game.magifolds = new Decimal(1);
    } else {
      game.magifolds = game.magicScore1.add(1).mul(game.magicScore2.add(1)).mul(game.magicScore3.add(1)).mul(game.magicScore4.add(1));
    }
    magicReset();
    game.challengesActive = false;
    game.noOfSelectedChallenges = +game.selectedChallenges[0] + game.selectedChallenges[1] + game.selectedChallenges[2] + game.selectedChallenges[3];
  }
}
