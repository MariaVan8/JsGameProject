'use strict';


let isRunning=false;


let playerID = 0;
class Player {
    constructor(name,element){
        this.name = name,
        this.score = 0,
        this.lives = 5,
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

}

const game = {
title:"Matching game",
isRunning :true,
players:[],
currentPayer:"",
currentDifficulty:"",
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
flagWrapper: document.querySelector('.flag-container'),


//Method to add a player
addPlayer:function(player){
this.players.push(player)
game.playerNameDisplay.value = "";
console.log(game.players)
},    

// Method to update the display with player information
  displayPlayers: function() {
    // Clear the output container before appending new player divs
  this.output.innerHTML = '';
    this.players.forEach(player => {
      // Create a new div for the player
      let newPlayerDiv = document.createElement('div');
      newPlayerDiv.classList.add('items-container');
      
      // Set the element on the player object
      player.setElement(newPlayerDiv);
      
      // Create a paragraph for the player's name
      let playerName = document.createElement('p');
      playerName.classList.add('output-name');
      playerName.textContent = player.name; // Should use player.name instead of inputValue
      
      // Append the player name to the player's div
      newPlayerDiv.appendChild(playerName);
      console.log('this whapenned once')

      // Append the player's div to the game's output container
      this.output.appendChild(newPlayerDiv);
    });
  },

 // Method to check if the game can start and to handle the play button click
 setupGameStart: function() {
    // If the game has at least one player, then we can start playing
    if (this.players.length) {
      this.playBtn.classList.add('show');
      console.log("play button show")
    }

// Add click event listener to the play button
    this.playBtn.addEventListener('click', (e) => {
        e.preventDefault()

          //Call the displayPlayers method to update the display
        
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
      },




//Method to initialize the game
initGame: function(countryData) {
    console.log('start game')
this.clearOptions();
this.displayNextFlag(countryData);
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
    let options = new Set([correctOption.country]); // Start with the correct option

    // Add wrong options
    while (options.size < 4) {
      let wrongOption = this.shuffleCountries(countryData);
      if (wrongOption.country !== correctOption.country) {
        options.add(wrongOption.country);
      }
    }

    // Convert the Set to an array and shuffle it to randomize the order of options
    let optionsArray = [...options];
    this.shuffleArray(optionsArray); // Assuming you have a shuffleArray method defined
    return optionsArray;
  },

// Method to display the next flag and options
displayNextFlag: function(countryData) {
let options = this.displayOptions(countryData);
let correctOption = options[Math.floor(Math.random() * options.length)];
let correctCountryData = countryData.find(country => country.country === correctOption);

this.displayFlag(correctCountryData);
this.displayOptionButtons(options, correctCountryData);
},


// Method to display option buttons
displayOptionButtons: function(options, correctCountryData) {
options.forEach(option => {
const optionElement = document.createElement('li');
optionElement.textContent = option;
optionElement.classList.add('country-text');
optionElement.addEventListener('click', () => {
this.guessOutput(option, correctCountryData);
});
this.flagWrapper.appendChild(optionElement);
});
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
guessOutput: function(option, correctCountryData) {
this.clearOptions(); // Clear previous options and messages
const guess = document.createElement('p');
if (option === correctCountryData.country) {
    guess.style.color = 'green';
    guess.textContent = "CORRECT";
    this.updatePlayerScore(1); 
} else {
    guess.style.color = 'red';
    guess.textContent = "WRONG";
    this.updatePlayerLives(-1); // Subtract a life here
}
this.flagWrapper.appendChild(guess);

// Move to the next flag after a short delay
setTimeout(() => {
    this.displayNextFlag(countryData);
}, 2000);
},

// Method to update the current player's score
updatePlayerScore: function(score) {
    let currentPlayer = this.players[this.players.length - 1]; 
    currentPlayer.score += score;
    // Update the score display logic here
},

// Method to update the current player's lives
updatePlayerLives: function(lives) {
    let currentPlayer = this.players[this.players.length - 1]; 
    currentPlayer.lives += lives;
    // Update the lives display logic here
    if (currentPlayer.lives <= 0) {
        // Handle game over logic here
    }
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
                player = new Player(inputValue)
                game.addPlayer(player)
                //Display method to update UI
                game.displayPlayers();
                
                //Clear input field
                game.playerNameDisplay.value = '';
            }

            //If the game has atleast one player then we can start playing
           if(game.players.length){
            game.setupGameStart(); //Will take you to the third screen
            game.initGame(countryData)
           }
    });

    

    
      

});









// game.joinButton.addEventListener('click', function(event){
//     event.preventDefault();
//     console.log("hello")

//     const inputValue = game.playerNameDisplay.value;
    

//     // Create new player instance
//     player = new Player(inputValue)
//     game.addPlayer(player)
  

//     game.players.forEach(player =>{
//         newPlayerDiv = document.createElement('div')
//         newPlayerDiv.classList.add('items-container')

//         player.setElement(newPlayerDiv);
//         console.log("player.setElemet",newPlayerDiv)
        
//         let playerName = document.createElement('p')
//         playerName.classList.add('output-name')
//         playerName.textContent = inputValue;
//         newPlayerDiv.appendChild(playerName)

        
        
//     })
//     game.output.appendChild(newPlayerDiv)

//     //If the game has atleast one player then we can start playing
//     if(game.players.length){
//         game.playBtn.classList.add('show')
//     }

// })

// game.playBtn.addEventListener('click', function(e){
//     e.preventDefault()
//    game.screenTwo.style.display = 'none';
//    game.screenThree.style.display = 'block'

// })

// function displayOptions(countryData){
//     let correctOption = shuffleCountries(countryData);
//     console.log(correctOption);
//     let options = new Set([correctOption.country]);
//     // options.add(correctOption.country)

//     //Add wrong options
//     while(options.size <4){
//         let wrongOption = shuffleCountries(countryData);
//         if(wrongOption.country !== correctOption.country){
//             options.add(wrongOption.country)
//         }
//     }

//     //Convert the Set to anarray and shuffle it to randomize the order of options
//     let optionsArray = [...options];
//     shuffleArray(optionsArray);
//     return optionsArray;
   
// }


// function shuffleArray(array){
// for (let i = array.length -1; i>0; i--){
//     const j = Math.floor(Math.random()* (i+1));
//     [array[i],array[j]] = [array[j],array[i]];
// }
// }

// function guessOutput(option,correctCountryData){
//     const guess = document.createElement('p')
   
//     if(option == correctCountryData.country){
//         guess.style.color = 'green'
//         guess.textContent = "CORRECT"

//     }else {
//         guess.style.color = 'red'
//         guess.textContent = "WRONG"
//     }
//     game.flagWrapper.appendChild(guess);
// }

// game.btnEasy.addEventListener('click',function(){
//     game.playBtn.textContent = "PLAY"
//     if(game.playBtn.textContent = "PLAY"){
//         game.playBtn.addEventListener('click',function(e){
//             e.preventDefault();
//             game.screenThree.style.display = 'none';
//             game.screenFour.style.display = 'block';

            
//             // Clear previous options
//             game.flagWrapper.innerHTML = '';

//             //Get a shuffled array of one correct and three wrong options
//             let options = displayOptions(countryData);

//             // Find the correct option from the shuffled options
//             let correctOption = options[Math.floor(Math.random() * options.length)];

//               //Find the correct flag
//               let correctCountryData = countryData.find(country => country.country === correctOption);


           

//             //Display the flag for the correct option
//             const flagImage = document.createElement('img')

          
//             flagImage.src = correctCountryData.flag; 
//             flagImage.alt = `Flag of ${correctCountryData.country}`
//             flagImage.classList.add('flag')
//             game.flagWrapper.appendChild(flagImage)

//             //Display the options
//             options.forEach(option => {
//             const optionElement = document.createElement('li')
//             optionElement.textContent = option;
//             optionElement.classList.add('country-text')
//             optionElement.addEventListener('click',function(){
//             guessOutput(option,correctCountryData)
    
//             });
//             game.flagWrapper.appendChild(optionElement)
//             });
            
//         });
//        }
//}