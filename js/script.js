// ul where the guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");
// "Guess!" button
const guessButton = document.querySelector(".guess");
// text input to guess a letter
const letterInput = document.querySelector(".letter");
// p where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// p where remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
// span inside p where the remaining guesses display
const remainingSpan = document.querySelector(".remaining span");
// p where messages will appear when a letter is guessed
const feedbackMessage = document.querySelector(".message");
// button prompting user to play again
const playAgain = document.querySelector(".play-again");

// test word
const word = "magnolia";
// array to contain guessed letters
const guessedLetters = [];


// placeholder for chosen word's letters
const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word){         // for each letter of the word
        console.log(letter);
        placeholderLetters.push("●");    // placeholderletters array adds "●"
    }
    wordInProgress.innerText = placeholderLetters.join(""); // wordinprogress on screen joins ●s to show the length of the word
};

placeholder(word);

// --- GUESS BUTTON EVENT HANDLER --- //
guessButton.addEventListener("click", function (e){
    e.preventDefault();         // to prevent reloading the page after each event

    feedbackMessage.innerText = ""; // empty the feedback message value

    const guess = letterInput.value; 
    const goodGuess = guessValidation(guess);   // if all conditions are met in guessValidation below, the letter is returned ("goodGuess")
    
    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";     // reset input box to empty
});

const guessValidation = function (input){
    const acceptedLetter = /[a-zA-Z]/        // regular expression to ensure the input is a letter

    if (input.length === 0){
        feedbackMessage.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        feedbackMessage.innerText = "Please enter only one letter at a time.";
    } else if (!input.match(acceptedLetter)){
        feedbackMessage.innerText = "Please enter a letter from A to Z.";
    } else {
        return input        // if all conditions are met, the letter is returned (declared as "goodGuess" above)
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();        // mitigates case sensitivity

    if (guessedLetters.includes(guess)){
        feedbackMessage.innerText = "You've already guessed that letter - please try again.";
    } else {
        guessedLetters.push(guess);     // adds letter to array of guessedLetters
        console.log(guessedLetters);
        letterListUpdate();             // tracks letters guessed (function below)
        updateWordProgress(guessedLetters);     // displays letters guessed (function below)
    }
};

const letterListUpdate = function () {
    guessedLettersList.innerHTML = "";      // initially clears the list of guessed letters

    for (const letter of guessedLetters){       // for each letter in the guessedLetters array
    const li = document.createElement("li");    // create a list item
    li.innerText = letter;                      // populate each list item with the letter
    guessedLettersList.append(li);              // and add it to the guessedLettersList
    }                                           // note: HTML element (append) vs. array (push)
};

const updateWordProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");      // split creates an array of the letters in the word
    const revealWord = [];                      // creates empty array for when the word comes together
    
    for (const letter of wordArray){               // for each letter in the array of letters created from the word
        if (guessedLetters.includes(letter)){       // if it is included in the list of letters guessed, 
            revealWord.push(letter.toUpperCase());  // update the ● with the (capitalized) letter
        } else {
            revealWord.push("●");                   // otherwise, hold the ●
        }
    }
    wordInProgress.innerText = revealWord.join("");     // show the letters and ●'s joined & being updated
    checkIfWin();
};

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText){
        feedbackMessage.classList.add("win");
        feedbackMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };
}
