// ul where the guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
// "Guess!" button
const guessButton = document.querySelector(".guess");
// text input to guess a letter
const input = document.querySelector(".letter");
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

//test word
const word = "magnolia";


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

guessButton.addEventListener("click", function (e){
    e.preventDefault();

    const guess = input.value;
    console.log(guess);
    input.value = "";
})
