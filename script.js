const gameContainer = document.getElementById("game");
let flipped = [];
let cardOne = null;
let cardTwo = null;
let clicked = 0;
let scoreBoard = document.getElementById("score");
let score = 0;
scoreBoard.innerHTML = localStorage.getItem("score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  clicked++;
  score += 1;
  scoreBoard.innerText = `Score: ${score}`;

  if (clicked <= 2) {
    // the clicked card will change color and be assigned to an array
    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList.value;
    flipped.push(currentCard);
    cardOne = flipped[0];

    function failedMatch() {
      cardOne.style.backgroundColor = "white";
      cardTwo.style.backgroundColor = "white";
      cardOne = null;
      cardTwo = null;
      clicked = 0;
    }

    if (flipped.length === 2) {
      cardTwo = flipped[1];
      //Match not found
      if (cardOne.classList.value !== cardTwo.classList.value) {
        cardOne.addEventListener("click", handleCardClick);
        setTimeout(failedMatch, 1000);
      //Match found!!
      } else {
        cardOne.removeEventListener("click", handleCardClick);
        cardTwo.removeEventListener("click", handleCardClick);
        clicked = 0;
      }
      if (clicked === 1){
        cardOne.removeEventListener("click", handleCardClick);
      }
      if (flipped.length >= 2) {
        flipped = [];
        // cardOne.addEventListener("click", handleCardClick);
      }
    }

  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  localStorage.setItem("score", scoreBoard.innerHTML);
}

// when the DOM loads
createDivsForColors(shuffledColors);
