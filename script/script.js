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

addPlayer:function(player){
this.players.push(player)
game.playerNameDisplay.value = "";
console.log(game.players)

}
};



document.addEventListener('DOMContentLoaded', function () {
    let player;
    let newPlayerDiv;
    let ShuffledOptions;
    let WrongOptions;

    function shuffleCountries(countryData){
     return countryData[Math.floor(Math.random() * countryData.length)];
    }

    function WrongCountries(){
        return countryData[Math.floor((Math.random())* countryData.length)];
    }



    game.startGameButton.addEventListener('click', function(){
        game.screenOne.style.display = 'none'
        game.screenTwo.style.display = 'block'
    })

    game.playerNameDisplay.addEventListener('keyup', function(){
        
    })

    game.joinButton.addEventListener('click', function(event){
        event.preventDefault();
        console.log("hello")

        const inputValue = game.playerNameDisplay.value;
        

        // Create new player instance
        player = new Player(inputValue)
        game.addPlayer(player)
      

        game.players.forEach(player =>{
            newPlayerDiv = document.createElement('div')
            newPlayerDiv.classList.add('items-container')

            player.setElement(newPlayerDiv);
            console.log("player.setElemet",newPlayerDiv)
            
            let playerName = document.createElement('p')
            playerName.classList.add('output-name')
            playerName.textContent = inputValue;
            newPlayerDiv.appendChild(playerName)

            
            
        })
        game.output.appendChild(newPlayerDiv)

        //If the game has atleast one player then we can start playing
        if(game.players.length){
            game.playBtn.classList.add('show')
        }

    })

    game.playBtn.addEventListener('click', function(e){
        e.preventDefault()
       game.screenTwo.style.display = 'none';
       game.screenThree.style.display = 'block'
  
    })

    function displayOptions(countryData){
        let correctOption = shuffleCountries(countryData);
        let options = new Set();
        options.add(correctOption.country)

        while(options.size <4){
            let WrongOption = shuffleCountries(countryData);
            if(WrongOption.country !== correctOption.country){
                WrongOptions.add(WrongOption.country)
            }
        }
        return [...options].sort(()=> Math.random()* - 0.5);
    }
    // function displayOptions(countryData){
    //     ShuffledOptions = shuffleCountries(countryData)
    //     WrongOptions = WrongCountries(countryData)
    //     return[ShuffledOptions.country,WrongOptions.country]
    // }
    game.btnEasy.addEventListener('click',function(){
        game.playBtn.textContent = "PLAY"
        if(game.playBtn.textContent = "PLAY"){
            game.playBtn.addEventListener('click',function(e){
                e.preventDefault();
                game.screenThree.style.display = 'none';
                game.screenFour.style.display = 'block';

                //Get a shuffled array of one correct and three wrong options
                let options = displayOptions(countryData);

                //Display the flag for the correct option
                let correctOption = shuffleCountries(countryData)
                const flagImage = document.createElement('img')
                flagImage.src = country.flag; 
                flagImage.alt = `Flag of ${country,country}`
                game.flagWrapper.appendChild(flagImage)

                //Display the options
                options.forEach(option => {
                const optionElement = document.createElement('li')
                optionElement.textContent = option;
                optionElement.addEventListener('click',function(){
                //Check if option is correct
                if(option == correctOption.country){
                    console.log('correct')
                } else{
                    console.log('wrong!')
                }
                });
                game.flagWrapper.appendChild(optionElement)


                })

                // ShuffledOptions = shuffleCountries(countryData)
                // flagImage.src = ShuffledOptions.flag; 
                // flagImage.alt = `Flag of ${ShuffledOptions.country}`
               

                ShuffledOptions = shuffleCountries(countryData)
                country.textContent = ShuffledOptions.country; 
                game.flagWrapper.appendChild(country)

                const test = displayOptions(countryData);
                const test1 = displayOptions(countryData);
                const test2 = displayOptions(countryData);
                let myArray =[test+test1+test2]
                console.log("test",test,"test1",test1,"test2",test2,"my array",myArray)

                // myArray.forEach((country,i) => {
                // const country = document.createElement('p')
                // country.textContent = myArray[i]
                // game.flagWrapper.appendChild(country)
                //   }
                // )
                

                const wrong = document.createElement('p')
                wrong.textContent = test
                game.flagWrapper.appendChild(wrong)
                
            })
           }
    })
  


//   countryData.forEach(country => {
//     const flagImage = document.createElement('img')
//     flagImage.src = country.flag; 
//     flagImage.alt = `Flag of ${country,country}`
//     const OptionChoice = document.createElement('li')
//     OptionChoice.classList.add('flag_country')
//     OptionChoice.textContent = country.country
//     game.flagWrapper.appendChild(OptionChoice);
//     game.flagWrapper.appendChild(flagImage)
    
//   })


// const shuffled = countryData[CorrectOptions]









});