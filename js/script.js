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
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// --- GUESS BUTTON EVENT HANDLER --- //
guessButton.addEventListener("click", function (e){
    e.preventDefault();

    feedbackMessage.innerText = "";

    const guess = letterInput.value;
    const goodGuess = guessValidation(guess);
    
    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";
});

const guessValidation = function (input){
    const acceptedLetter = /[a-zA-Z]/

    if (input.length === 0){
        feedbackMessage.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        feedbackMessage.innerText = "Please enter only one letter at a time.";
    } else if (!input.match(acceptedLetter)){
        feedbackMessage.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(guess) {

    if (guessedLetters.includes(guess)){
        feedbackMessage.innerText = "You have already guessed that letter, please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}