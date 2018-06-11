/* Some areas of code from Chris Pereina*/
/* Provided Shuffle Function www.stackoverflow.com*/
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
};


/* Card Array */
var deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf","fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/* Defining Variables */
var open = [];
var matched = 0;
var moveCounter = 0;
var numStars = 3;
var timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};

/* Determines the Star & Level Difficulty */
var Difficult = 20;
var Medium= 15;
var Easy=10;


/*Win Pop-up Toggle and timer from www.Scotch.com*/

var modal = $("#win-Pop");
function showModal() {
    modal.css("display", "block");
};




var startTimer = function() {
    if (timer.seconds === 59) {
        timer.minutes++;
        timer.seconds = 0;
    } else {
        timer.seconds++;
    }

    /* "Seconds" Place Holder */
    var formattedSec = "0";
    if (timer.seconds < 10) {
        formattedSec += timer.seconds
    } else {
        formattedSec = String(timer.seconds);
    }

    var time = String(timer.minutes) + ":" + formattedSec;
    $(".timer").text(time);
};

// Resets timer state and restarts timer
function resetTimer() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    $(".timer").text("0:00");

    timer.clearTime = setInterval(startTimer, 1000);
};

/*function moveCounter(){
    moves++;
    counter.innerHTML = moves;

// setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first move
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    startGame(){...*/

// Randomizes cards
function updateCards() {
    deck = shuffle(deck);
    var index = 0;
    $.each($(".card i"), function(){
      $(this).attr("class", "fa " + deck[index]);
      index++;
    });
    resetTimer();
};



// Removes last start from remaining stars, updates modal HTML
function starRemove() {
    $(".fa-star").last().attr("class", "fa fa-star-o");
    numStars--;
    $(".num-stars").text(String(numStars));
};

// Resets stars
function resetStars() {
    $(".fa-star-o").attr("class", "fa fa-star");
    numStars = 3;
    $(".num-stars").text(String(numStars));
};

// Evaluates the Stars based on level of difficulty and moves
function moveCounterUpdater() {
    $(".moves").text(moveCounter);
/*From Javascript Book Creating Functions for the Web*/
    if (moveCounter === Difficult || moveCounter === Medium || moveCounter === Easy) {
        starRemove();
    }
};

// Checks if card is a valid move (if it not currently matched or open)
function isValid(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};

// Returns whether or not currently open cards match
function checkMatch() {
    if (open[0].children().attr("class")===open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
};

// Returns win condition
function winGame() {
    if (matched === 16) {
        return true;
    } else {
        return false;
    }
};

// Sets currently open cards to the match state, checks win condition
var setMatch = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });
    open = [];
    matched += 2;

    if (winGame()) {
        clearInterval(timer.clearTime);
        showModal();
    }
};

// Sets currently open cards back to default state
var resetOpen = function() {
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });
    open = [];
};

// Selects card to open/diabled state
/*www.stackoverflow.com*/
function openCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        open.push(card);
    }
};



// Resets all game variables

var gameReset = function() {
    open = [];
    matched = 0;
    moveCounter = 0;
    resetTimer();
    moveCounterUpdater();
    $(".card").attr("class", "card");
    updateCards();
    resetStars();
};

//
var onSelect = function() {
    if (isValid( $(this) )) {

        if (open.length === 0) {
            openCard( $(this) );

        } else if (open.length === 1) {
            openCard( $(this) );
            moveCounter++;
            moveCounterUpdater();

            if (checkMatch()) {
                setTimeout(setMatch, 300);

            } else {
                setTimeout(resetOpen, 700);

            }
        }
    }
};

// Resets after win
var playAgain = function() {
    gameReset();
    modal.css("display", "none");
};

/*
 *  Event listeners
 */

$(".card").click(onSelect);
$(".restart").click(gameReset);
$(".play-again").click(playAgain);

// Sets Cards on Load
$(updateCards);
