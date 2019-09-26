// store all cards in class card and add it in arry
let card = document.getElementsByClassName("card");
let cardsArray = [...card];

// to git the container of all cards which called deck
let deck = document.getElementById("card-deck");

// let the moves start 0 and select the tag of class moves
let moves = 0;
let counter = document.querySelector(".moves");

// create variables for star icons
const stars = document.querySelectorAll(".fa-star");

// create variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // create variable for select all stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in popupOne
 let closeIcon = document.querySelector(".close");

 // declare popupModal
 let popupModal = document.getElementById("popupOne")

 // array for opened cards
var openedCardsArray = [];


// function for shuffle the cards 
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


// shuffles cards when page is refreshed / loads
document.body.onload = startPlay();


// function to start a new play 
function startPlay(){
 
    // empty the openedCardsArray 
    openedCardsArray = [];

    // shuffle deck
    cardsArray = shuffle(cardsArray);
    // remove all exisiting classes from each card
    for (var i = 0; i < cardsArray.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cardsArray, function(item) {
            deck.appendChild(item);
        });
        cardsArray[i].classList.remove("show", "open", "match", "disabled");
    }
    //  to reset moves
    moves = 0;
    counter.innerHTML = moves;
    // to reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    // to reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


//  function which toggles open and show class  
var showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// add opened cards to openedCardsArray list and check if cards are match or not
function open() {
    openedCardsArray.push(this);
    var len = openedCardsArray.length;
    if(len === 2){
        numMovies();
        if(openedCardsArray[0].type === openedCardsArray[1].type){
            cardsMatched();
        } else {
            cardsUnmatched();
        }
    }
};


// funtion works when match the card
function cardsMatched(){
    openedCardsArray[0].classList.add("match", "disabled");
    openedCardsArray[1].classList.add("match", "disabled");
    openedCardsArray[0].classList.remove("show", "open", "no-event");
    openedCardsArray[1].classList.remove("show", "open", "no-event");
    openedCardsArray = [];
}


//function works when cards are not matched
function cardsUnmatched(){
    openedCardsArray[0].classList.add("unmatched");
    openedCardsArray[1].classList.add("unmatched");
    disableCards();
    setTimeout(function(){
        openedCardsArray[0].classList.remove("show", "open", "no-event","unmatched");
        openedCardsArray[1].classList.remove("show", "open", "no-event","unmatched");
        enableCards();
        openedCardsArray = [];
    },1000);
}


//  function for disable cards
function disableCards(){
    Array.prototype.filter.call(cardsArray, function(card){
        card.classList.add('disabled');
    });
}


// enable and disable matched cards
function enableCards(){
    Array.prototype.filter.call(cardsArray, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// acount the numbers of player's moves
function numMovies(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
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


// for game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// message when all cards match, show modal and moves, time and rating
function message(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show message modal
        popupModal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeIcon on modal
        closeModal();
    };
}


//  close icon on modal
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        popupModal.classList.remove("show");
        startPlay();
    });
}


// for user to play Again 
function playAgain(){
    popupModal.classList.remove("show");
    startPlay();
}


// loop to add event listeners to each card
for (var i = 0; i < cardsArray.length; i++){
    card = cardsArray[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", open);
    card.addEventListener("click", message);
};
