const gameContainer = document.getElementById("game");
let picks = 0;
let card1;
let card2;
let match = 0;
let tries = 0;
let guessed = [];

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
  //select two cards, not allowing same card twice or previous guessed cards
  if (picks === 0 && guessed.indexOf(event.target.className) === -1) {
    event.target.style.background = event.target.className;
    card1 = event.target;
    picks = 1;
  } else if (picks === 1) {
    event.target.style.background = event.target.className;
    card2 = event.target;
    if (card2 === card1) {
      card2 = null;
      return;
    } else {
      picks = 2;
    }
  }
  //compare cards
  setTimeout(function() {
    if (picks === 2) {
      tries++;
      if (card1.className === card2.className) {
        guessed.push(card1.style.background);
        match++;
        picks = 0;
      } else {
        card1.style.background = null;
        card2.style.background = null;
        card1 = card2 = picks = 0;
      }
      if (match === 5) {
        setTimeout(alert(`YOU WIN!!! It took you ${tries} tries!`), 100);
      }
    }
  }, 1000);
}
// if (card1 === card2) {
//   match++;
// } else {
//   pick1 = "";
//   pick2 = "";
// }

// you can use event.target to see which element was clicked

// when the DOM loads
createDivsForColors(shuffledColors);
