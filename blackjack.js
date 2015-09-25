// Blackjack

// variables

var cards = [
  {Suit: 'C', Card: "A", Points: 11 },
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
  {Suit: 'D', Card: "A", Points: 11 },
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
  {Suit: 'H', Card: "A", Points: 11 },
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
  {Suit: 'S', Card: "A", Points: 11 },
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

// default money

var money = 0;
var bet = 5;

// (inefficiently) grabbing HTML elements

var startButton = $('#start-button');
var dealButton = $('#deal-button');
var hitButton = $('#hit-button');
var stayButton = $('#stay-button');

var plusButton = $('#plus-button');
var minusButton = $('#minus-button');
var betButton = $('#bet-button');

var currentMoney = $('#current-money');
var bettingMoney = $('#betting-money');

var dealerCardArea = $('#dealercard-area');
var playerCardArea = $('#playercard-area');

var moneyView = function () {
  currentMoney.text(money.toFixed(2));
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
    money = money - bet;
    moneyView();
    gameMessages.text(goodLuck);
    Game.firstDeal();
  } else {
    gameMessages.text(noMoney);
  }
});

// functions

Game = {
  deck: cards,
  shuffledDeck: [],
  playerCards: [],
  dealerCards: [],
  playerScore: [],
  playerScore: [],
  playerBJ: false,
  dealerBJ: false,
  currentMoney: $('#current-money'),
  bettingMoney: $('#betting-money'),
  // shuffling from css-tricks
  shuffle: function (o) {
  	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  	return o;
  },
  resetDeck: function () {
    for (var i = 0; i < this.deck.length; i++) {
      this.shuffledDeck[i] = this.deck[i];
      this.shuffle(this.shuffledDeck);
    }
    this.playerCards = [];
    this.dealerCards = [];
    console.log("deck has been re-shuffled and player and dealer cards are empty");
  },
  dealPlayer: function () {
    this.playerCards.push(this.shuffledDeck.pop());
    console.log("the player has " + this.playerCards);
    console.log("the deck now has " + this.shuffledDeck);
  },
  dealDealer: function () {
    this.dealerCards.push(this.shuffledDeck.pop());
    console.log("the player has " + this.dealerCards);
    console.log("the deck now has " + this.shuffledDeck);
  },
  // first cards to start the game
  firstDeal: function () {
    dealerCardArea.empty();
    playerCardArea.empty();

    for (var i = 1; i <= 2; i++) {
      this.dealPlayer();
      this.dealDealer();
    };

    this.updateFirstDealView();

  },
  playerGame: function () {

  },
  dealerGame: function () {

  },
  updateMoneyView: function () {

  },
  updateFirstDealView: function () {
    for (var j = 0; j < 2; j++) {
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

    for (var j = 0; j < 2; j++) {
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

    // check for blackjack

    this.playerBlackjack();

  },
  //
  playerBlackjack: function () {
    if (this.playerCards[0].Points + this.playerCards[1].Points === 21) {
      if (this.dealerCards[0].Points + this.dealerCards[1].Points === 21) {
        // show all cards
        var suit = this.dealerCards[j].Suit;
        for (var j = 0; j < 2; j++) {
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
        gameMessages.text(push);
        money = money + bet;
        moneyView();
        // end and wait for the next game state
        // this.nextGame();
      } else {
        gameMessages.text(winBlackjack);
        money = money + bet + (bet * 1.5);
        moneyView();
        // end and wait for the next game state
        this.nextGame();
      }

    }
    // not needed, only if insuranceelse if (this.dealerCards[1].Card === "A") {
      // run insurance
    // }

      else {
      //show all cards
      dealerCardArea.empty();
      for (var j = 0; j < 2; j++) {
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
      // then next round - player turn
    }
  },
  insurance: function () {

  },
  updatePlayerCardsView: function (arr) {

  },
  updateDealerCardsView: function (arr) {

  },
  updateMessageView: function (){

  },
  resetGame: function () {
    // reset money items
    money = 100;
    bet = 5;
    moneyView();
    gameMessages.text(defaultMessage);
    this.resetDeck();
    console.log("resetGame finished running");
    console.log("the deck now has " + this.shuffledDeck);
    dealerCardArea.empty();
    playerCardArea.empty();
  },
  nextGame: function () {
    moneyView();
    gameMessages.text(defaultMessage);
    this.resetDeck();
    console.log("resetGame finished running");
    console.log("the deck now has " + this.shuffledDeck);
    dealerCardArea.empty();
    playerCardArea.empty();
  }
};

// Game messages

var gameMessages = $('#message-area');

var noMoney = "Not enought $ to continue...";
var minimumBet = "$5 is the minimum bet at this table.";
var goodLuck = "Here are your cards.";
var defaultMessage = "PLACE YOUR BETS & GOOD LUCK!"
var push = "It's a push.";
var winBlackjack = "BLACKJACK!! YOU WIN!!";

//
