/*
 * Create a list that holds all of your cards
 */
 let cardsList = [
   'diamond',
   'diamond',
   'paper-plane-o',
   'paper-plane-o',
   'anchor',
   'anchor',
   'bolt',
   'bolt',
   'cube',
   'cube',
   'leaf',
   'leaf',
   'bomb',
   'bomb',
   'bicycle',
   'bicycle'
 ];

 let openCardsList = [];
 let moves = 0;
 let matches = 0;
 let rating = 3;
 let clickCounter = 0;
 let seconds = 0;
 let minutes = 0;
 let elapsedTime = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledCards = shuffle(cardsList);
function shuffleCards() {
   for (let i = 0; i < 16; i++) {
       $('.deck').append($('<li class="card"><i class="fa fa-' + shuffledCards[i] + '"></i></li>'))
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

function playGame() {
   addCardListener();
}

/**
* @description Sets the event listener for a card
* on click starts the timer, display the card symbol,
* and add card to openCardsList
*/
function addCardListener() {
   $('.card').on('click', function() {
       clickCounter++;
       if (clickCounter === 1) {
          timerOn();
    }
    let myCard=$(this);
    displayCard(myCard);
    addCardToList(myCard);
/* check if cards match
   further action according to the description above */
    if (openCardsList.length ===2) {
        if (openCardsList[0][0].firstChild.className === openCardsList[1][0].firstChild.className) {
           lockCard();
           matches++;
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
        starScore();
    };
    checkScore();
   });
}

/** @description Starts the Game
*/
playGame();
$('.restart').on('click', function() {
   playGame(location.reload());
});

/** @description Displays the card symbol
*/
function displayCard(myCard) {
   myCard.addClass('open show');
}

/** @description Hides the card symbol
*/
function hideCard() {
   $('.deck').find('.open').addClass('nomatch');
   setTimeout(function () {
     $('.deck').find('.open').removeClass('open show nomatch');
   }, 350);
}

/** @description Add card to a *list* of "open" cards
*/
function addCardToList(myCard) {
   openCardsList.push(myCard);
}

/** @description Lock matching cards into open position
*/
function lockCard() {
   $('.deck').find('.open').addClass('match');
}

/** @description Turn off mouse click to prevent
* opening more than 2 cards
*/
function turnOffClick() {
   $('.card').addClass('noclick');
}

/** @description Turn mouse click back on
*/
function turnOnClick() {
   $('.card').removeClass('noclick');
}

/** @description increment the move counter
* and display it on the page
*/
function incrementMoves() {
   moves++;
   $('.moves').text(`${moves}`);
}

/** @description check if all cards have matched
* and display the modal
*/
function checkScore() {
   if (matches === 8) {
      clearInterval(elapsedTime);
      $('.modal').css('display', 'flex');
      $('.button').on('click', function() {
        playGame(location.reload())
      });
      $('.close').on('click', function() {
        $('.modal').css('display', 'none');
        $('.deck .card').addClass('noclick');
      });
  }
}

/** @description display the star rating
*/
function starScore() {
   if (moves >= 14) {
      $('.fa-star').eq(1).css('display', 'none');
      rating = 2;
   }
   if (moves >= 20) {
      $('.fa-star').eq(2).css('display', 'none');
      rating = 1;
   };
   $('.rating').text(`${rating}`);
}

/** @description increment the time
* and display it on the page
*/
function timerOn() {
   elapsedTime = setInterval(function() {
      $('.timer').text(`${minutes}:${seconds}`);
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
   }, 1000);
}
