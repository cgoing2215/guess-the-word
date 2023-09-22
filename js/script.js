const guessedLettersList = document.querySelector(".guessed-letters"); 
const guessButton = document.querySelector(".guess"); 
const letterInput = document.querySelector(".letter"); 
const wordInProgress = document.querySelector(".word-in-progress"); 
const remainingGuessesDisplay = document.querySelector(".remaining"); 
const remainingSpan = document.querySelector(".remaining span"); 
const feedbackMessage = document.querySelector(".message"); 
const playAgain = document.querySelector(".play-again");

let word = "magnolia"
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function (){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();

    const wordArray = words.split("\n"); 
    const randomIndex = Math.floor(Math.random() * wordArray.length); 
    word = wordArray[randomIndex].trim(); 

    placeholder(word);
}

getWord();   


const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word){  
        console.log(letter);
        placeholderLetters.push("●"); 
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
        return input 
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase(); 

    if (guessedLetters.includes(guess)){
        feedbackMessage.innerText = "You've already guessed that letter - please try again.";
    } else {
        guessedLetters.push(guess); 
        console.log(guessedLetters);
        countGuessesRemaining(guess);
        letterListUpdate(); 
        updateWordProgress(guessedLetters);  
    }
};

const letterListUpdate = function () {
    guessedLettersList.innerHTML = ""; 

        for (const letter of guessedLetters){ 
            if(!word.split("").includes(letter.toLowerCase())) {
                const li = document.createElement("li");
                li.innerText = letter; 
                guessedLettersList.append(li);
            }
        }; 
};

const updateWordProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); 
    const revealWord = []; 
    
    for (const letter of wordArray){  
        if (guessedLetters.includes(letter)){   
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");  
        }
    }
    wordInProgress.innerText = revealWord.join(""); 
    checkIfWin();
};

const countGuessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){ 
        feedbackMessage.innerText = "Sorry, that guess was incorrect";
        remainingGuesses -= 1;
    } else {
        feedbackMessage.innerText = `Great guess! ${guess} is in the word.`;
    };

    if (remainingGuesses === 0){ 
        feedbackMessage.innerHTML = `<p class="highlight">Oh no, you ran out of guesses! The word was ${upperWord}. <br> Game over!</p>`;
        remainingGuessesDisplay.classList.add("hide");
        startOver()
    } else if (remainingGuesses === 1){ 
        remainingSpan.innerText = `${remainingGuesses} guess`
    } else {  
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
}

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText){ 
        feedbackMessage.classList.add("win");   
        feedbackMessage.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    
        startOver();
    };
}

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
    remainingSpan.innerText = `${remainingGuesses} guesses`
    guessedLettersList.innerHTML = "";
    feedbackMessage.innerText = "";
    getWord();

    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remainingGuessesDisplay.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
})