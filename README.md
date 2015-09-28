

#Blackjack by Donghwa Lee - Project 1

##This game implements the following technologies:
- HTML
- CSS
- Javascript
- jQuery
- Bootstrap
- Fonts from Google

##Required and optional features included in this game:
**Required**
- A way to keep track of the current player bankroll
- A way for players to make a bet
- A way for players to get more cards, or declare themselves happy with their current hand
- A way for players to bust
- A way for players to win or tie
- Game logic for the dealer to hit until a certain point

**Advanced - Implemented**
- A button on `game over` to reset the game back to initial state
- A way for players to 'double down' on a hand

**Advanced - Not implemented**
- A way for players to 'split' a hand
- Appropriate handling of 'insurance' and dealer blackjack

##Approach + how the game was coded

###Global Variables:
- **cards:** default deck of cards (ace is set to 1 point here).
- **default money, bet, and betTemp** (created to deal with double down function).
- **various buttons and message areas:** to use later for click events and to update messages, money amounts, etc.
- **functions to update money view, and buttons states** (to allow and not allow users to do certain interactions based on game status, for example, only being able to double down after one is dealt the first 2 cards).
- **listening for click events on buttons** (to control game interactions)

###Game Objects:
- **deck and shuffledDeck:** each round the deck is reset and shuffed into shuffledDeck.
- **playerCards and dealerCards:** array that holds the cards dealt to each player.
- **playerScore and dealerScore:** array with 2 slots, first as a default score if there is no Ace (in case of second slot remaining as 0), and second slot is used later on as an alternate score if there is a Ace in the hand (by adding 10 to the default score).
- **playerScoreValue and dealerScoreValue:** score values for each, in case of alternate scoring for Ace, then it'll be the higher number that is not more than 21.
- **dealerScoreText:** for messaging area use.
- **playerAce and dealerAce:** boolean value that is used to see if there is an Ace in the hand and if alternate score is needed to be calculated.
- **shuffle:** function from css-tricks.
- **resetDeck**: shuffles the cards and empties card hands.
- **dealPlayer and dealDealer:** takes one card from the shuffledDeck and gives it to the player or dealer.
- **firstDeal:** gives one card to player, then dealer, then repeats. This was originally written this way to work with the insurance function but insurance was taken out for this version. Uses the **updateFirstDealView** at the end to update the view of the cards on the table.
- **dealerGame:** logic to see how dealer plays, if dealer's hand is 16 or less, it will hit another card.
- **endGame:** compares the hand of player and dealer's hands to see who wins, and then assigns appropriate adjustments to the money. This function is not always ran as the game might end earlier before coming to this function, for example, if there is a blackjack or player / dealer busts.
- **updateFirstDealView:** updates views of player and dealer, then checks to see if either has a blackjack (**playerBlackjack**).
- **playerBlackjack:** checks to see if either player or dealer or both has a blackjack and ends the game early if needed. If no blackjack, then proceeds to next process for the hands.
- **updatePlayerCardsView and updatePlayerCardsView:** both updates the view of the cards for the player and dealer areas, reading the approriate suit and card value.
- **playerHas and dealerHas:** checks to see what the player and dealer has, then assigns the correct point values to the **playerScoreValue** and **dealerScoreValue** variables, checks for aces and see if alternate score  is needed to be tracked, it also updates the game messages with the scores, and also ends the game early if needed (for busts).
- **resetGame:** resets the entire game, gives the player 100 dollars.

##Game URL:
http://donghwalee.github.io/blackjack/

##Unsolved Problems:
**Advanced - Not implemented**
- A way for players to 'split' a hand
- Appropriate handling of 'insurance' and dealer blackjack

**Other features that I would like to implement**
- Better UI, in one area to minimize mouse movement.
- Choose multiple number of decks.
- Multiple players.
- Cash out / share to social.
- Coaching info. (including card counting?)

##Wireframes and user stories used:

![](https://app.box.com/shared/static/av0fuw805eh0xpt5rm9aa0elnuujdlzi.jpg)

![](https://app.box.com/shared/static/r5c9bvwt24vr30lqodx3fxellfur05i4.jpg)

![](https://app.box.com/shared/static/41ogme9m0apk4ngv5kz5y2cbs075bi7l.jpg)

![](https://app.box.com/shared/static/ifz3sviik6v00f4ghy8vbb70ukqxxq94.jpg)

![](https://app.box.com/shared/static/1ggx1xq9rtybnsud198btfp1liij819x.jpg)

![](https://app.box.com/shared/static/l41upbjf9qmtw4k4jke7sevcplfy8uue.jpg)

![](https://app.box.com/shared/static/qgl7o0xx5ly58tdl0xmixvw005az0tpv.jpg)
