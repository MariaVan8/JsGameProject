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
startGameButton: document.querySelector('.start-game'),
screenOne: document.querySelector('.screen1'),
screenTwo: document.querySelector('.screen2'),
joinButton: document.querySelector('.join-button'),
playerNameDisplay: document.querySelector('.name'),
output: document.querySelector('.output'),
toggleState(){
     if (this.isRunning) {
        this.screenOne.classList.add('hide');
        this.screenTwo.classList.add('show');
    } else {
        this.screenOne.classList.remove('hide');
        this.screenTwo.classList.remove('show');
    }
    // Toggle the running state of the game
    this.isRunning = !this.isRunning;

},
addPlayer:function(player){
this.players.push(player)
game.playerNameDisplay.value = "";
console.log(game.players)

}
};



document.addEventListener('DOMContentLoaded', function () {
    let player;
    let newPlayerDiv;

    game.startGameButton.addEventListener('click', function(){
    game.toggleState();
    })



    game.joinButton.addEventListener('click', function(event){
        event.preventDefault();

        const inputValue = game.playerNameDisplay.value;
        

        // Create new player instance
        player = new Player(inputValue)
        game.addPlayer(player)
        // game.output.textContent = inputValue;

        game.players.forEach(player =>{
            newPlayerDiv = document.createElement('div')
            newPlayerDiv.classList.add('items-container')

            player.setElement(newPlayerDiv);
            console.log("player.setElemet",newPlayerDiv)
        })

    })
});