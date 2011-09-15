/* BASIC SCRIPT - todas las tarjetas definidas en html */


function startGame(){
    // sacados de http://www.danshort.com/HTMLentities/index.php
    var chars = ['A','&infin;','C','D','&times;','&oplus;','&#x272D;'];
    var charCount = chars.length;  
    
    var board = document.getElementById('game-board');
    
    
}

function cardClicked(){
    clickedCards.push(this); // this is card 'li' element
    // play show animation
    this.className = this.className.replace('hidden','visible');
    checkClickedCards();
}

var clickedCards = []; 
var score = 0;
var cards = [];


function getContentByCard(card){
    var value;
    if(card)
        value = card.getElementsByClassName("front")[0].innerHTML;
    return value;
}

function checkClickedCards(){
    if (clickedCards.length == 2){
        // there are two cards selected
        
        // if cards match
        console.log()
        if(getContentByCard(clickedCards[0]) == getContentByCard(clickedCards[1])){
            // set cards visible anim
            clickedCards[1].className = clickedCards[0].className = clickedCards[0].className + " selected";
            score++;
           clickedCards = [];
        } else {
            setTimeout(function(){
                //if cards dont match
                score--;
                // re-hide cards anim
                for(var c in cards){
                    if(cards[c].className.indexOf("selected") == -1)
                    cards[c].className = cards[c].className.replace('visible','hidden'); 
                }
                clickedCards = [];
            },800);
            
        }   
        
        
    }
}

startGame();

