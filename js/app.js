/*
 * Create a list that holds all of your cards
 */
 let cardsList = [
   "diamond",
   "diamond",
   "paper-plane-o",
   "paper-plane-o",
   "anchor",
   "anchor",
   "bolt",
   "bolt",
   "cube",
   "cube",
   "leaf",
   "leaf",
   "bomb",
   "bomb",
   "bicycle",
   "bicycle"
 ];

 let openCardsList = [];
 let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledCards = shuffle(cardsList);
function shuffleCards() {
   for (let i = 0; i < 16; i++) {
       $(".deck").append($('<li class="card"><i class="fa fa-' + shuffledCards[i] + '"></i></li>'))
   };
}
shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame() {
  addCardListener();
}



function addCardListener() {
  $(".card").on("click", function() {
    const myCard=$(this);
    displayCard(myCard);
    addCardToList(myCard);

    if (openCardsList.length ===2) {
        if (openCardsList[0][0].firstChild.className === openCardsList[1][0].firstChild.className) {
          lockCard();
          openCardsList=[];
        } else {
            turnOffClick();
            setTimeout(function () {
              turnOnClick();
              hideCard();
            }, 500);
            openCardsList=[];
        };
        incrementMoves();
    };
  });
}




startGame();

function displayCard(myCard) {
  myCard.addClass("open show");
}
function hideCard() {
  $('.deck').find('.open').removeClass('open show');
}
function addCardToList(myCard) {
  openCardsList.push(myCard);
}
function lockCard() {
  $('.deck').find('.open').addClass('match');
}


function turnOffClick() {
  $(".card").addClass("noclick");
}
function turnOnClick() {
  $(".card").removeClass("noclick");
}
function incrementMoves() {
  moves++;
  $('.moves').text(`${moves}`);
}
