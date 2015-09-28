// Blackjack

// variables

var cards = [
  {Suit: 'C', Card: "A", Points: 1 },
  {Suit: 'C', Card: 2, Points: 2 },
  {Suit: 'C', Card: 3, Points: 3 },
  {Suit: 'C', Card: 4, Points: 4 },
  {Suit: 'C', Card: 5, Points: 5 },
  {Suit: 'C', Card: 6, Points: 6 },
  {Suit: 'C', Card: 7, Points: 7 },
  {Suit: 'C', Card: 8, Points: 8 },
  {Suit: 'C', Card: 9, Points: 9 },
  {Suit: 'C', Card: 10, Points: 10 },
  {Suit: 'C', Card: "J", Points: 10 },
  {Suit: 'C', Card: "Q", Points: 10 },
  {Suit: 'C', Card: "K", Points: 10 },
  {Suit: 'D', Card: "A", Points: 1 },
  {Suit: 'D', Card: 2, Points: 2 },
  {Suit: 'D', Card: 3, Points: 3 },
  {Suit: 'D', Card: 4, Points: 4 },
  {Suit: 'D', Card: 5, Points: 5 },
  {Suit: 'D', Card: 6, Points: 6 },
  {Suit: 'D', Card: 7, Points: 7 },
  {Suit: 'D', Card: 8, Points: 8 },
  {Suit: 'D', Card: 9, Points: 9 },
  {Suit: 'D', Card: 10, Points: 10 },
  {Suit: 'D', Card: "J", Points: 10 },
  {Suit: 'D', Card: "Q", Points: 10 },
  {Suit: 'D', Card: "K", Points: 10 },
  {Suit: 'H', Card: "A", Points: 1 },
  {Suit: 'H', Card: 2, Points: 2 },
  {Suit: 'H', Card: 3, Points: 3 },
  {Suit: 'H', Card: 4, Points: 4 },
  {Suit: 'H', Card: 5, Points: 5 },
  {Suit: 'H', Card: 6, Points: 6 },
  {Suit: 'H', Card: 7, Points: 7 },
  {Suit: 'H', Card: 8, Points: 8 },
  {Suit: 'H', Card: 9, Points: 9 },
  {Suit: 'H', Card: 10, Points: 10 },
  {Suit: 'H', Card: "J", Points: 10 },
  {Suit: 'H', Card: "Q", Points: 10 },
  {Suit: 'H', Card: "K", Points: 10 },
  {Suit: 'S', Card: "A", Points: 1 },
  {Suit: 'S', Card: 2, Points: 2 },
  {Suit: 'S', Card: 3, Points: 3 },
  {Suit: 'S', Card: 4, Points: 4 },
  {Suit: 'S', Card: 5, Points: 5 },
  {Suit: 'S', Card: 6, Points: 6 },
  {Suit: 'S', Card: 7, Points: 7 },
  {Suit: 'S', Card: 8, Points: 8 },
  {Suit: 'S', Card: 9, Points: 9 },
  {Suit: 'S', Card: 10, Points: 10 },
  {Suit: 'S', Card: "J", Points: 10 },
  {Suit: 'S', Card: "Q", Points: 10 },
  {Suit: 'S', Card: "K", Points: 10 }
];



// for testing... --> var cards = [ 1, 2, 3, 4, 5, 6, 7 ];

// default money and bet amounts
var money = 0;
var bet = 5;
var betTemp = 0;


// (inefficiently) grabbing HTML elements

var startButton = $('#start-button');
var hitButton = $('#hit-button');
var stayButton = $('#stay-button');
var controlGroup = $('.control-group');

var doubleButton = $('#double-button');
var doubleGroup = $('.double-group');

var plusButton = $('#plus-button');
var minusButton = $('#minus-button');
var betButton = $('#bet-button');
var betGroup = $('.bet-group');

var currentMoney = $('#current-money');
var bettingMoney = $('#betting-money');

var dealerCardArea = $('#dealercard-area');
var playerCardArea = $('#playercard-area');


// function to update the main money view

var moneyView = function () {
  currentMoney.text(money.toFixed(2));
};

// button states

var buttonStateOne = function () {
  betGroup.removeAttr('disabled');
  controlGroup.attr('disabled', 'disabled');
  doubleGroup.attr('disabled', 'disabled');
};

var buttonStateTwo = function () {
  betGroup.attr('disabled', 'disabled');
  controlGroup.removeAttr('disabled');
  doubleGroup.removeAttr('disabled');
};

var buttonStateThree = function () {
  betGroup.attr('disabled', 'disabled');
  controlGroup.removeAttr('disabled');
  doubleGroup.attr('disabled', 'disabled');
};


// (yikes) and inefficiently listening for elements

startButton.click(function () {
  console.log("start button");
  Game.resetGame();
});

plusButton.click(function () {
  console.log("plus");
  if (money > bet) {
    console.log("add five");
    bet = bet + 5;
    moneyView();
    bettingMoney.text(bet);
  } else {
    gameMessages.text(noMoney);
  }
});

minusButton.click(function () {
  console.log("minus");
  if (bet > 5) {
    console.log("minus five");
    bet = bet - 5;
    moneyView();
    bettingMoney.text(bet);
  } else {
    gameMessages.text(minimumBet);
  }
});

betButton.click(function () {
  console.log("bet");
  if (bet <= money) {
    buttonStateTwo();
    betTemp = bet
    money = money - betTemp;
    moneyView();
    gameMessages.text(goodLuck);
    Game.firstDeal();
  } else {
    gameMessages.text(noMoney);
  }
});

hitButton.click(function () {
  console.log("hit");
  buttonStateThree();
  Game.dealPlayer();
  Game.updatePlayerCardsView();
  Game.playerHas();
});

var hit = function () {
  Game.dealPlayer();
  Game.updatePlayerCardsView();
  Game.playerHas();
};

stayButton.click(function () {
  buttonStateOne();
  console.log("stay");
  // player plays until some logic...
  Game.dealerGame();
});

var stay = function () {
  Game.dealerGame();
};

doubleButton.click(function () {
  console.log("double");
  if (betTemp <= money) {
    money = money - betTemp;
    betTemp = bet * 2;
    moneyView();
    hit();
    stay();
    buttonStateOne();
  } else {
    gameMessages.text(noMoney);
  }
});


// need to create ones for Deal, Hit, and Stay



// Game functions

Game = {
  deck: cards,
  shuffledDeck: [],
  playerCards: [],
  dealerCards: [],
  playerScore: [0, 0],
  dealerScore: [0, 0],
  playerScoreValue: 0,
  dealerScoreValue: 0,
  dealerScoreText: "",
  playerAce: false,
  dealerAce: false,

  // shuffling from css-tricks
  shuffle: function (o) {
  	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  	return o;
  },

  // takes the array of cards and places them shuffled in the Game's shuffledDeck
  resetDeck: function () {
    for (var i = 0; i < this.deck.length; i++) {
      this.shuffledDeck[i] = this.deck[i];
      this.shuffle(this.shuffledDeck);
    }
    // empties out the player and dealer's hands
    this.playerCards = [];
    this.dealerCards = [];
    console.log("deck has been re-shuffled and player and dealer cards are empty");
  },

  // deals one card to the player
  dealPlayer: function () {
    this.playerCards.push(this.shuffledDeck.pop());
    // console.log("the player has " + this.playerCards);
    // console.log("the deck now has " + this.shuffledDeck);
  },

  // deals one card to the dealer
  dealDealer: function () {
    this.dealerCards.push(this.shuffledDeck.pop());
    // console.log("the player has " + this.dealerCards);
    // console.log("the deck now has " + this.shuffledDeck);
  },

  // first 2 cards to start the game - was written separately for insurance but in this version insurance is currently not enabled
  firstDeal: function () {

    this.resetDeck();

    // empty the view area for cards
    dealerCardArea.empty();
    playerCardArea.empty();

    // empthy the scores
    this.playerScore = [0, 0];
    this.dealerScore = [0, 0];
    this.playerScoreValue = 0;
    this.dealerScoreValue = 0;
    this.dealerScoreText = ""
    this.playerAce = false;
    this.dealerAce = false;

    // one card to the player, dealer and repeats
    for (var i = 1; i <= 2; i++) {
      this.dealPlayer();
      this.dealDealer();
    };




    this.updateFirstDealView();

  },

  // maybe not needed?
  playerGame: function () {

  },

  // double doubleDown

  // dealer plays until some logic
  dealerGame: function () {
    if (this.dealerScoreValue > 16) {
      this.endGame();
    } else {
      this.dealDealer();
      this.updateDealerCardsView();
      this.playerHas();
      console.log("hitting the dealer")
      console.log(Game.dealerScoreValue);
      this.dealerGame();
    };
  },

  endGame: function () {
    if (this.dealerScoreValue > 21) {
      buttonStateOne();
      gameMessages.text("You won! You had " + this.playerScoreValue + " and the dealer bust");
      money = money + betTemp + betTemp;
      moneyView();
    }
        else if (this.playerScoreValue === this.dealerScoreValue) {
        buttonStateOne();
        gameMessages.text(push);
        money = money + betTemp;
        moneyView();
      } else if (this.playerScoreValue > this.dealerScoreValue) {
        buttonStateOne();
        gameMessages.text("You won! You had " + this.playerScoreValue + " and the dealer had " + this.dealerScoreValue);
        money = money + betTemp + betTemp;
        moneyView();
      } else {
        buttonStateOne();
        gameMessages.text("You lost. You had " + this.playerScoreValue + " and the dealer had " + this.dealerScoreValue);money = money;
        moneyView();
      }
    },

  // written instead outside the Game's scope
  updateMoneyView: function () {

  },

  // updates the view of what player and dealer has - for the first 2 cards - was written this way initially for insurance but insurance was taken out for now.
  updateFirstDealView: function () {
    this.updatePlayerCardsView();

    this.updateDealerCardsView();

    // below only for insurance

    // var firstDealerCard = "<div class='cards'>?</div>";
    // dealerCardArea.append(firstDealerCard);
    //
    // var suit = this.dealerCards[1].Suit;
    // if (suit === "C") {
    //   var temp = "<div class='cards'>&#9824;" + this.dealerCards[1].Card + "</div>";
    //   dealerCardArea.append(temp);
    // } else if (suit === "S") {
    //   var temp = "<div class='cards'>&#9827;" + this.dealerCards[1].Card + "</div>";
    //   dealerCardArea.append(temp);
    // } else if (suit === "H") {
    //   var temp = "<div class='cards' id='red-font'>&#9829;" + this.dealerCards[1].Card + "</div>";
    //   dealerCardArea.append(temp);
    // } else {
    //   var temp = "<div class='cards' id='red-font'>&#9830;" + this.dealerCards[1].Card + "</div>";
    //   dealerCardArea.append(temp);
    // }


    // updating the first 2 cards are done, now let's check for blackjack
    this.playerBlackjack();

  },

  //
  playerBlackjack: function () {
    if ((this.playerCards[0].Points === 1 && this.playerCards[1].Points === 10) || (this.playerCards[1].Points === 1 && this.playerCards[0].Points === 10)) {
      if ((this.dealerCards[0].Points === 1 && this.dealerCards[1].Points === 10) || (this.dealerCards[1].Points === 1 && this.dealerCards[0].Points === 10)) {

        // show all cards

        this.updateDealerCardsView();

        // if both dealer and player has 21 to start, then show push message
        gameMessages.text(push);

        // money goes back to original amount
        buttonStateOne();
        money = money + betTemp;
        moneyView();
        // end and wait for the next game state
        // this.nextGame();
      } else {

        // if player only has blackjack, then player wins and gets 1.5 times the bet amount
        buttonStateOne();
        gameMessages.text(winBlackjack);
        money = money + betTemp + (betTemp * 1.5);
        moneyView();

        // end and wait for the next game state - maybe not needed with disabling the bet button and having that reset to the next game...
        // this.nextGame();
      }

    }

    // not needed, only if insurance
    // else if (this.dealerCards[1].Card === "A") {
      // run insurance
    // }

    // let's see if the dealer has a blackjack
      else if ((this.dealerCards[0].Points === 1 && this.dealerCards[1].Points === 10) || (this.dealerCards[1].Points === 1 && this.dealerCards[0].Points === 10)) {
        buttonStateOne();
        gameMessages.text(loseBlackjack);
        money = money;
        moneyView();

        // end and wait for the next game state - maybe not needed with disabling the bet button and having that reset to the next game...
        // this.nextGame();
      }

       else {
      //show all dealer's cards
      dealerCardArea.empty();

      this.updateDealerCardsView();

      // not blackjack, then next is player's turn

      this.playerHas();
    }
  },

  // not needed for now
  insurance: function () {

  },

  // update the view of the cards that the player has
  updatePlayerCardsView: function () {
    playerCardArea.empty();
    for (var j = 0; j < this.playerCards.length; j++) {
      var suit = this.playerCards[j].Suit;
      if (suit === "C") {
        var temp = "<div class='cards'>&#9824;" + this.playerCards[j].Card + "</div>";
        playerCardArea.append(temp);
      } else if (suit === "S") {
        var temp = "<div class='cards'>&#9827;" + this.playerCards[j].Card + "</div>";
        playerCardArea.append(temp);
      } else if (suit === "H") {
        var temp = "<div class='cards' id='red-font'>&#9829;" + this.playerCards[j].Card + "</div>";
        playerCardArea.append(temp);
      } else {
        var temp = "<div class='cards' id='red-font'>&#9830;" + this.playerCards[j].Card + "</div>";
        playerCardArea.append(temp);
      }
    }
  },

  // update the view of the cards that the dealer has
  updateDealerCardsView: function () {
    dealerCardArea.empty();
    for (var j = 0; j < this.dealerCards.length; j++) {
      var suit = this.dealerCards[j].Suit;
      if (suit === "C") {
        var temp = "<div class='cards'>&#9824;" + this.dealerCards[j].Card + "</div>";
        dealerCardArea.append(temp);
      } else if (suit === "S") {
        var temp = "<div class='cards'>&#9827;" + this.dealerCards[j].Card + "</div>";
        dealerCardArea.append(temp);
      } else if (suit === "H") {
        var temp = "<div class='cards' id='red-font'>&#9829;" + this.dealerCards[j].Card + "</div>";
        dealerCardArea.append(temp);
      } else {
        var temp = "<div class='cards' id='red-font'>&#9830;" + this.dealerCards[j].Card + "</div>";
        dealerCardArea.append(temp);
      }
    }
  },

  // player score
  playerHas: function () {

    this.dealerHas();

    var playerTemp1 = 0;

    for (var p = 0; p < this.playerCards.length; p++) {
      playerTemp1 = playerTemp1 + this.playerCards[p].Points;
    };

    this.playerScore[0] = playerTemp1;

    // check to see if one of them is an ace
    for (var l = 0; l < this.playerCards.length; l++) {
      if (this.playerCards[l].Card === "A") {
        this.playerAce = true;
      }
    };

    if (this.playerAce === true) {
      this.playerScore[1] = playerTemp1 + 10;
    }

    if (this.playerScore[1] !== 0) {

        if (this.playerScore[0] === 21 || this.playerScore[1] === 21) {
        gameMessages.text("You have 21 and the dealer has " + this.dealerScoreText);
        this.playerScoreValue = 21;
        // move onto the dealer
        this.dealerGame();
        } else if (this.playerScore[0] > 21 && this.playerScore[1] > 21) {
        gameMessages.text("Sorry, you bust!");
        // game over for you
        money = money;
        moneyView();
        buttonStateOne();
        } else if (this.playerScore[0] < 21 && this.playerScore[1] < 21) {
        gameMessages.text("You have " + this.playerScore[0] + " or " + this.playerScore[1] + " and the dealer has " + this.dealerScoreText);
          if (this.playerScore[0] > this.playerScore[1]) {
            this.playerScoreValue = this.playerScore[0];
          } else {
            this.playerScoreValue = this.playerScore[1];
          };
        } else if (this.playerScore[0] < 21 && this.playerScore[1] > 21) {
        gameMessages.text("You have " + this.playerScore[0] + " and the dealer has " + this.dealerScoreText);
        this.playerScoreValue = this.playerScore[0];
        } else {
        gameMessages.text("You have " + this.playerScore[1] + " and the dealer has " + this.dealerScoreText);
        this.playerScoreValue = this.playerScore[1];
        }
    }
    // if no ace then,

    else {

      if (this.playerScore[0] === 21) {
        gameMessages.text("You have 21 and the dealer has " + this.dealerScoreText);
        this.playerScoreValue = 21;
        // move onto the dealer
        buttonStateOne();
        this.dealerGame();
      } else if (this.playerScore[0] > 21) {
        gameMessages.text("Sorry, you bust!");
        // game over for you
        money = money;
        moneyView();
        buttonStateOne();
      } else {
        gameMessages.text("You have " +  this.playerScore[0] + " and the dealer has " + this.dealerScoreText);
        this.playerScoreValue = this.playerScore[0];
      }
    }

},

  // dealer score
  dealerHas: function () {

    var dealerTemp1 = 0;

    // get the score as if ace is 1
    for (var p = 0; p < this.dealerCards.length; p++) {
      dealerTemp1 = dealerTemp1 + this.dealerCards[p].Points;
    };

    this.dealerScore[0] = dealerTemp1;

    // check to see if one of them is an ace
    for (var l = 0; l < this.dealerCards.length; l++) {
      if (this.dealerCards[l].Card === "A") {
        this.dealerAce = true;
      };
    };

    if (this.dealerAce === true) {
      this.dealerScore[1] = dealerTemp1 + 10;
    };

    if (this.dealerScore[1] !== 0) {
      if (this.dealerScore[0] === 21 || this.dealerScore[1] === 21) {
        this.dealerScoreText = "21";
        this.dealerScoreValue = 21;
      } else if (this.dealerScore[0] < 21 && this.dealerScore[1] < 21) {
        this.dealerScoreText = this.dealerScore[0] + " or " + this.dealerScore[1];
        if (this.dealerScore[0] > this.dealerScore[1]) {
          this.dealerScoreValue = this.dealerScore[0];
        } else {
          this.dealerScoreValue = this.dealerScore[1];
        }
      } else if (this.dealerScore[0] < 21 && this.dealerScore[1] > 21) {
        this.dealerScoreText = this.dealerScore[0];
        this.dealerScoreValue = this.dealerScore[0];
      } else {
        this.dealerScoreText = this.dealerScore[1];
        this.dealerScoreValue = this.dealerScore[1];
      }
    } else {
      if (this.dealerScore[0] === 21) {
        this.dealerScoreText = "21";
        this.dealerScoreValue = 21;

      } else if (this.dealerScore[0] > 21) {
        this.dealerScoreText = "bust. You won!";
        this.dealerScoreValue = this.dealerScore[0];
        buttonStateOne();

      } else {

        this.dealerScoreText = this.dealerScore[0];
        this.dealerScoreValue = this.dealerScore[0];
      }
    }
    },

  updateMessageView: function (){

  },

  // resets the whole game
  resetGame: function () {
    // reset money items
    money = 100;
    bet = 5;
    moneyView();
    bettingMoney.text(bet);
    gameMessages.text(defaultMessage);
    this.resetDeck();
    console.log("resetGame finished running");
    console.log("the deck now has " + this.shuffledDeck);
    dealerCardArea.empty();
    playerCardArea.empty();
    buttonStateOne();
  },

  // after a hand has finished, next hand - NOT NEEDED
  nextGame: function () {
    console.log("somebody has tripped the nextGame function");
    moneyView();
    gameMessages.text(defaultMessage);
    this.resetDeck();
    console.log("resetGame finished running");
    console.log("the deck now has " + this.shuffledDeck);
    dealerCardArea.empty();
    playerCardArea.empty();
  }
};



// Game messages for the message area

var gameMessages = $('#message-area');

var noMoney = "Not enought $ to continue...";
var minimumBet = "$5 is the minimum bet at this table.";
var goodLuck = "Here are your cards.";
var defaultMessage = "PLACE YOUR BETS & GOOD LUCK!"

var push = "It's a push.";
var winBlackjack = "BLACKJACK!! YOU WIN!!";
var loseBlackjack = "Sorry, the dealer has a Blackjack, you lose.";
