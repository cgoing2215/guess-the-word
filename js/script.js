// ul where the guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");
// "Guess!" button
const guessButton = document.querySelector(".guess");
// text input to guess a letter
const letterInput = document.querySelector(".letter");
// p where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// p where remaining guesses will display
const remainingGuessesDisplay = document.querySelector(".remaining");
// span inside p where the remaining guesses display
const remainingSpan = document.querySelector(".remaining span");
// p where messages will appear when a letter is guessed
const feedbackMessage = document.querySelector(".message");
// button prompting user to play again
const playAgain = document.querySelector(".play-again");

let word = "magnolia"
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function (){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();

    const wordArray = words.split("\n");    // create array of all random words
    const randomIndex = Math.floor(Math.random() * wordArray.length);       // create random number to use as index
    word = wordArray[randomIndex].trim();       // randomize new word and remove extra space

    placeholder(word);
};

getWord();              // kicks off the game with a randomized word

const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word){         // for each letter of the word
        placeholderLetters.push("●");    // placeholderletters array adds "●"
    }
    wordInProgress.innerText = placeholderLetters.join(""); // wordinprogress on screen joins ●s to show the length of the word
};

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
        countGuessesRemaining(guess);
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

const countGuessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){        // if the word does not contain the letter
        feedbackMessage.innerText = "Sorry, that guess wasn't correct";
        remainingGuesses -= 1;      // remaining guesses -1
    } else {
        feedbackMessage.innerText = `Great guess! ${guess} is in the word.`;        // otherwise, correct guess message display
    };

    if (remainingGuesses === 0){            // if player runs out of guesses, display:
        feedbackMessage.innerHTML = `<p class="highlight">Oh no, you ran out of guesses! The word was ${upperWord}. Game over!</p>`;
        startOver();

    } else if (remainingGuesses === 1){         // if player has one guess remaining, show more emphatic message
        remainingSpan.innerText = `${remainingGuesses} guess`
    } else {                                    // default message of remaining guesses
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText){       // if the guess = the word, 
        feedbackMessage.classList.add("win");                   // add the win css class & show winning message
        feedbackMessage.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    
        startOver();
    }
};

const startOver = function (){
    guessButton.classList.add("hide");
    remainingGuessesDisplay.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function (){
    feedbackMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    feedbackMessage.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remainingGuessesDisplay.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});