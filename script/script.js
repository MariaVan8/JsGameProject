'use strict';


let isRunning=false;
let currentSelections = {
    country: null,
    capital: null
  };
  


let playerID = 0;
class Player {
    constructor(name,element){
        this.name = name,
        this.score = 0,
        this.lives = 3,
        this.id = playerID++,
        this.element = element
    }
    sayHello(){
        console.log("hello")
    }
    setElement(element){
        this.element = element;
        console.log("I used this TO SET THE ELEMENT!!!")
    }


    increaseScore(amount = 1) {
      this.score += amount;
      // Update the DOM with the new score if necessary
      const scoreElement = document.querySelector(`.screen4 #player-score-${this.id}`);
        if (scoreElement) {
          scoreElement.textContent = this.score; // Update the DOM with the new score
        }else {
          console.log("not found")
        }
  }
    


decreaseLives(amount = 1) {
  this.lives -= amount;

  // Update the heart images based on the current number of lives
  for (let i = 1; i <= 3; i++) {
      let heartImage = document.querySelector(`.screen4 #player-life-${i}-${this.id}`);
      console.log(heartImage);
      if (heartImage) {
          if (i > this.lives) {
              // Change the heart to an "empty" heart image to indicate the lost life
              heartImage.src = "../images/gray-heart.png"; // Replace with your path to the empty heart image
          } else {
              heartImage.src = "../images/heart.png"; 
          }
      } else {
          console.error(`Heart image not found for player ${this.id} life ${i}`);
      }
  }

  if (this.lives <= 0) {
      console.log("GAME OVER!!!"); 
      game.flagWrapper.style.display = 'none';
      const gameOverMessage = document.createElement('div');
        gameOverMessage.textContent = "Game Over!";
        console.log(gameOverMessage)
        gameOverMessage.classList.add('game-over-message');
        game.screenFour.appendChild(gameOverMessage);

  }
}

}

const game = {
title:"Matching game",
isRunning :true,
players:[],
currentSelections: {
    country: null,
    capital: null
  },
currentPlayerIndex:0,
isMultiplayer: false,
currentDifficulty:'EASY', //Easy default
startGameButton: document.querySelector('.start-game'),
playBtn: document.querySelector('.title-btn'),
screenOne: document.querySelector('.screen1'),
screenTwo: document.querySelector('.screen2'),
screenThree: document.querySelector('.screen3'),
screenFour: document.querySelector('.screen4'),
joinButton: document.querySelector('.join-button'),
btnEasy:document.querySelector('.btn-easy'),
btnHard:document.querySelector('.btn-hard'),
playerNameDisplay: document.querySelector('.name'),
output: document.querySelector('.output'),
countriesList: document.querySelector('countries_list'),
capitalsList: document.querySelector('capitals_list'),
flagWrapper: document.querySelector('.flag-container'),
  
// Example of adding a new player
addPlayer: function(name) {
  // Create a new player instance
  let newPlayer = new Player(name);
  // Add the new player to the array
  this.players.push(newPlayer);
  console.log(newPlayer);
},

nextPlayer: function(){
  if(this.isMultiplayer){
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }
},
 // Method to get the current player
 getCurrentPlayer: function() {
  return this.players[this.currentPlayerIndex];
},

// Method to update the display with player information
displayPlayers: function(targetScreen) {
  let outputContainer;

  // Determine which screen's output container to use
  if (targetScreen === 'screen2') {
      outputContainer = this.output; // Existing container for screen2
  } else if (targetScreen === 'screen4') {
      outputContainer = document.querySelector('.screen4 .player-info-container'); // Container for screen4
  }

  // Proceed only if a valid container is selected
  if (outputContainer) {
      outputContainer.innerHTML = ''; // Clear the container

        // If it's a multiplayer game, add the "Switch Player" button
    if(this.players.length > 1) {
        this.isMultiplayer = true;
        const switchBtn = document.createElement('button');
        switchBtn.textContent = 'Switch Player';
        switchBtn.classList.add('switch-player-btn');
        switchBtn.addEventListener('click', this.nextPlayer.bind(this)); 
        outputContainer.appendChild(switchBtn);
      }

      this.players.forEach(player => {
          let newPlayerDiv = document.createElement('div');
          newPlayerDiv.classList.add('player-info');
          console.log("this is happening",newPlayerDiv);

          let playerName = document.createElement('p');
          playerName.classList.add('player-name');
          playerName.textContent = player.name;
          console.log("this is happening again", playerName);

          let playerScore = document.createElement('p');
          playerScore.id = `player-score-${player.id}`;
          playerScore.classList.add('player-score');
          playerScore.textContent = player.score;
          console.log("this is player score", playerScore);
          console.log(player.score)

          // Player.id is available and unique for each player
          let playerLives = document.createElement('img');
          playerLives.id = `player-life-1-${player.id}`;
          playerLives.classList.add('player-lives');
          playerLives.src = "../images/heart.png";

          let playerLivesTwo = document.createElement('img');
          playerLivesTwo.id = `player-life-2-${player.id}`;
          playerLivesTwo.classList.add('player-lives');
          playerLivesTwo.src = "../images/heart.png";

          let playerLivesThree = document.createElement('img');
          playerLivesThree.id = `player-life-3-${player.id}`;
          playerLivesThree.classList.add('player-lives');
          playerLivesThree.src = "../images/heart.png";
          
          newPlayerDiv.appendChild(playerName);
          newPlayerDiv.appendChild(playerScore);
          newPlayerDiv.appendChild(playerLives);
          newPlayerDiv.appendChild(playerLivesTwo);
          newPlayerDiv.appendChild(playerLivesThree);

          outputContainer.appendChild(newPlayerDiv);
      });

  }
},

 // Method to check if the game can start and to handle the play button click
 setupGameStart: function() {
    // If the game has at least one player, then we can start playing
    if (this.players.length) {
      this.playBtn.classList.add('show');
      console.log("play button show");
    }

// Add click event listener to the play button
    this.playBtn.addEventListener('click', (e) => {
        e.preventDefault()

        // Update players on screen4
        this.displayPlayers('screen4');

        //Switch the game to screen three
        this.screenTwo.style.display = 'none';
        this.screenThree.style.display = 'block';
    
         // Set up the difficulty buttons
         this.setupDifficultyButtons();
         
         //Switch no text screen 4
         if (this.playBtn.textContent === "PLAY") {
                console.log("test")
                game.screenThree.style.display = 'none';
                game.screenFour.style.display = 'block';
            }
        
    });
  },


   // Method to set up the difficulty buttons
   setupDifficultyButtons: function() {
    // Set up the 'Easy' button
    this.btnEasy.addEventListener('click', () => {
      this.setPlayButton("EASY");
    });

    // Set up the 'Hard' button, assuming you have a reference to it similar to btnEasy
    this.btnHard.addEventListener('click', () => {
      this.setPlayButton("HARD");
    });
  },

    // Method to set the play button and difficulty level
    setPlayButton: function(difficulty) {
        this.playBtn.textContent = "PLAY";
        console.log("button changes to PLAY")
        this.playBtn.style.color = 'yellow';
        this.currentDifficulty = difficulty; // Store the chosen difficulty
        console.log(difficulty)
      },




//Method to initialize the game
initGame: function(countryData) {
    console.log('start game')
this.clearOptions();
// this.displayNextFlag(countryData);
},
// Method to clear previous options and messages
 clearOptions: function() {
this.flagWrapper.innerHTML = '';
},

//Shuffle countries
shuffleCountries: function(countryData) {
    return countryData[Math.floor(Math.random() * countryData.length)];
},

WrongCountries: function(countryData) {
    return countryData[Math.floor(Math.random() * countryData.length)];
},

shuffleArray: function(array){
for (let i = array.length -1; i>0; i--){
    const j = Math.floor(Math.random()* (i+1));
    [array[i],array[j]] = [array[j],array[i]];
}
},


displayOptions: function(countryData) {
    let correctOption = this.shuffleCountries(countryData);
    let optionsSet = new Set();
    
    // Add the correct option in the format needed
    if (this.currentDifficulty === 'HARD') {
        optionsSet.add(`${correctOption.country} - ${correctOption.capital}`);
    } else {
        optionsSet.add(correctOption.country);
    }

    // Add wrong options
    while (optionsSet.size < 4) {
        let wrongOption = this.shuffleCountries(countryData);
        if (this.currentDifficulty === 'HARD') {
            // In HARD mode, ensure not to add the correct capital with a wrong country or vice versa
            if (wrongOption.country !== correctOption.country && wrongOption.capital !== correctOption.capital) {
                optionsSet.add(`${wrongOption.country} - ${wrongOption.capital}`);
            }
        } else {
            if (wrongOption.country !== correctOption.country) {
                optionsSet.add(wrongOption.country);
            }
        }
    }

    // Convert the Set to an array and shuffle it to randomize the order of options
    let optionsArray = [...optionsSet];
    console.log('BEFORE SHUFFLE',optionsArray)
    this.shuffleArray(optionsArray);
    console.log('AFTER SHUFFLE',optionsArray)
    return optionsArray;
},


// Method to display the next flag and options
displayNextFlag: function(countryData) {
let options = this.displayOptions(countryData);
console.log(options)
let correctOption = options[Math.floor(Math.random() * options.length)];

// If HARD mode, split the option to extract just the country name
let countryName = this.currentDifficulty === 'HARD' ? correctOption.split(' - ')[0] : correctOption;

// Find the correct country data based on the country name
let correctCountryData = countryData.find(country => country.country === countryName);

//let correctCountryData = countryData.find(country => country.country === correctOption);
console.log("CORRECT COUNTRY DATA",correctCountryData)

this.displayFlag(correctCountryData);
this.displayOptionButtons(options, correctCountryData);
},



// Method to display option buttons
displayOptionButtons: function(options, correctCountryData) {
    // Create main containers for countries and capitals
    const mainCountryContainer = document.createElement('div');
    mainCountryContainer.classList.add('main-country-container');
    
    const mainCapitalContainer = document.createElement('div');
    mainCapitalContainer.classList.add('main-capital-container');

    // Loop through each option and create elements for country and capital
    options.forEach(option => {
        let country, capital;
        [country, capital] = option.split(' - ');

        // Create country element and add to mainCountryContainer
        const countryElement = document.createElement('div');
        countryElement.textContent = country;
        countryElement.classList.add('country-box');
        countryElement.addEventListener('click', () => {
            game.currentSelections.country = country; // Set the current country selection
            game.checkAndEvaluateGuess(correctCountryData); // Check if both selections are made
        });
        mainCountryContainer.appendChild(countryElement);

        // Create capital element and add to mainCapitalContainer if difficulty is HARD
        if (this.currentDifficulty === 'HARD') {
            const capitalElement = document.createElement('div');
            capitalElement.textContent = capital;
            capitalElement.classList.add('capital-box');
            capitalElement.addEventListener('click', () => {
                game.currentSelections.capital = capital; // Set the current capital selection
                game.checkAndEvaluateGuess(correctCountryData); // Check if both selections are made
            });
            mainCapitalContainer.appendChild(capitalElement);
        }
    });

    // Create a wrapper for both country and capital containers
    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('options-wrapper');
    
    // Append the main country and capital containers to the options wrapper
    optionsWrapper.appendChild(mainCountryContainer);
    if (this.currentDifficulty === 'HARD') {
        optionsWrapper.appendChild(mainCapitalContainer);
    }

    // Append the options wrapper to the flag wrapper
    this.flagWrapper.appendChild(optionsWrapper);
},

checkAndEvaluateGuess: function(correctCountryData) {
    // Use `this.currentSelections` to access the selections
    if (this.currentDifficulty === 'HARD' && this.currentSelections.country && this.currentSelections.capital) {
      this.guessOutput(this.currentSelections.country, this.currentSelections.capital, correctCountryData);
      this.currentSelections = { country: null, capital: null }; // Reset the selections for the next guess
    } else if (this.currentDifficulty === 'EASY' && this.currentSelections.country) {
      // In EASY mode, check only the country
      this.guessOutput(this.currentSelections.country, null, correctCountryData);
      this.currentSelections.country = null; // Reset the country selection for the next guess
    }
  },





// Method to display the flag for the correct option
displayFlag: function(correctCountryData) {
this.clearOptions();
const flagImage = document.createElement('img');
flagImage.src = correctCountryData.flag;
flagImage.alt = `Flag of ${correctCountryData.country}`;
flagImage.classList.add('flag');
this.flagWrapper.appendChild(flagImage);
},

// Method to handle guesses and output results
guessOutput: function(country, capital, correctCountryData) {
    this.clearOptions(); // Clear previous options and messages
    let currentPlayer = this.getCurrentPlayer();
    const guess = document.createElement('p');
    
    // Check if the guess is correct based on the difficulty
    let isCorrect = false;
    if (this.currentDifficulty === 'EASY') {
        isCorrect = country === correctCountryData.country;
    } else if (this.currentDifficulty === 'HARD') {
        isCorrect = country === correctCountryData.country && capital === correctCountryData.capital;
    }

    // Update guess result based on whether it's correct
    if (isCorrect) {
        guess.style.color = 'green';
        guess.textContent = "CORRECT";
        currentPlayer.increaseScore(1);
    } else {
        guess.style.color = 'red';
        guess.textContent = "WRONG";
        currentPlayer.decreaseLives(1);
    }
    
    this.flagWrapper.appendChild(guess);
    console.log(currentPlayer);

    // Move to the next flag after a short delay
    setTimeout(() => {
        this.displayNextFlag(countryData);
    }, 500);
},



// Method to update the current player's score
updatePlayerScore: function(score) {
    let currentPlayer = this.getCurrentPlayer(); 
    currentPlayer.increaseScore(score);
  
},

};



document.addEventListener('DOMContentLoaded', function (){

    //Variables
    let player;
    let newPlayerDiv;

    // Start game button event listener
    game.startGameButton.addEventListener('click', function(){
    game.screenOne.style.display = 'none';
    game.screenTwo.style.display = 'block';
});

    game.playerNameDisplay.addEventListener('keyup', function(){
    // Enable the "Join Game" button if the input field is not empty
    if (this.value.trim() !== '') {
        game.joinButton.disabled = false;
    } else {
        game.joinButton.disabled = true; 
    }
    });

    game.joinButton.addEventListener('click', function(event){
            event.preventDefault();
            console.log("hello")
        
            const inputValue = game.playerNameDisplay.value.trim();
            if (inputValue){
                // Create new player instance
                // player = new Player(inputValue)
                game.addPlayer(inputValue)
                //Display method to update UI
                //Display players screen2
                game.displayPlayers('screen2');
                
                //Clear input field
                game.playerNameDisplay.value = '';
            }

            //If the game has atleast one player then we can start playing
           if(game.players.length){
            game.setupGameStart(); //Will take you to the third screen
            game.initGame(countryData)
           }
          
    });

    game.playBtn.addEventListener('click', function(){
        if (this.textContent === 'PLAY'){
            console.log("surprise!!!!")
            game.displayNextFlag(countryData)
        }
    })

    
    $(document).ready(function(){
       
        $('.help-button').on('click', function(){
            $('#helpModal').modal('show');
        });
        $('#moreInfo').on('click', function(){
            $('#info').modal('show')
        })
    
        $('#close').on('click', function(){
            $('#info').modal('hide')
            $('#helpModal').modal('hide');
        });
    
    });

    
      

});

