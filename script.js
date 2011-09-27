/* con la estructura mas basica posible */

function showInstructions(){
    // Esconder todas las vistas
    // Mostrar instrucciones
    // set back to menu handler
}

function showScore(){
    // Esconder todas las vistas
    // Mostrar score
    // set play again handler
}

function startGame(){
    // Esconder todas las vistas
    // Mostrar game view
    initBoard();  
}

function randOrd(){
	return (0.5 - Math.random()); 
}

var chars = ['A','&infin;','C','D','&times;','&oplus;','&#x272D;', '&hearts;'];
var board = document.getElementById('game-board');

function initBoard(){
    // sacados de http://www.danshort.com/HTMLentities/index.php
   
    var charCount = chars.length;  
    
    // remove all current cards
    board.innerHTML = '';
    cards = [];
    
    for (var u = 0; u<2; u++){
    	
    	chars.sort(randOrd);
        
        for (var i = 0; i < charCount; i++){
            var card = document.createElement('li');
            card.className = "hidden";  // class names store card id
            
            var back = document.createElement('div');
            back.className = 'back';
            back.innerHTML = 'Zemoga';
            
            var front = document.createElement('div');
            front.className= 'front';
            front.innerHTML = chars[i];
           
            
            
            card.appendChild(back);
            card.appendChild(front);
            
            // add listener
            card.addEventListener('click',cardClicked,true);
            
            cards.push(card);
            board.appendChild(card); 
        }

     }
     
}

var limit = "1:30";
var parseLimit = [];
var finalTime = 0;
var currentMin = 0;
var currentSec = 0;
var currentTime = "";
var firstCardClicked = false;

function cardClicked(){
	if(!firstCardClicked){
		parseLimit = limit.split(":");
		finalTime = (parseLimit[0] * 60) + (parseLimit[1] * 1);
		beginTimer();
		firstCardClicked = true;
	}
    clickedCards.push(this); // this is card 'li' element
    // play show animation
    this.className = this.className.replace('hidden','visible');
    checkClickedCards();
}

function beginTimer(){
	if(currentTime == "00"){
		resetGame("lose");
		return;
	}
	if(matched == chars.length){
		resetGame("win");
		return;
	}
	finalTime-=1;
	currentMin = Math.floor(finalTime / 60);
	currentSec = finalTime % 60;
	currentSec = (currentSec < 10) ? "0" + currentSec : currentSec;
	if(currentMin != 0){
		currentTime = "0" + currentMin + ":" + currentSec;
	}else{
		currentTime = currentSec;
	}
	document.getElementById("counter").innerHTML = "TIEMPO RESTANTE " + currentTime;
	setTimeout("beginTimer()", 1000);
}

var clickedCards = []; 
var score = 0;
var cards = [];
var matched = 0;


function getContentByCard(card){
    var value;
    if(card)
        value = card.getElementsByClassName("front")[0].innerHTML;
    return value;
}

function resetGame(status){
	switch(status){
		case "win":
			alert("FELICITACIONES\rJuega de nuevo");
			break;
		case "lose":
			alert("PERDISTE\rIntenta de nuevo");
			break;
	}
	removeCards();
 	matched = 0;
 	parseLimit = [];
 	finalTime = 0;
 	currentMin = 0;
 	currentSec = 0;
 	currentTime = "";
 	firstCardClicked = false;
 	document.getElementById("counter").innerHTML = "";
}

function removeCards(){
	for(var i = cards.length - 1; i > -1; i--){
		board.removeChild(board.children[i]);
	}
	initBoard();
}

function checkClickedCards(){
    if (clickedCards.length == 2){
        // there are two cards selected
        
        // if cards match
        // console.log()
        if(getContentByCard(clickedCards[0]) == getContentByCard(clickedCards[1])){
            // set cards visible anim
            clickedCards[1].className = clickedCards[0].className = clickedCards[0].className + " selected";
            score++;
            matched++;
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


/* Interface handlers */
document.getElementById("init-button").addEventListener('click', 
				function(){
					document.getElementById('sections-container').style.left = '-640px';
				}, false);
				
document.getElementById("instructions-button").addEventListener('click', 
				function(){
					document.getElementById('sections-container').style.left = '-320px';
				}, false);
				
document.getElementById("score-button").addEventListener('click', 
				function(){
					document.getElementById('sections-container').style.left = '-960px';
				}, false);
				



var backButtons = document.getElementsByClassName('back-button'); 

for(var i = 0; i < backButtons.length; i++){
	backButtons[i].addEventListener('click', function(){
		document.getElementById('sections-container').style.left = '0';			
	}, false);
}


window.addEventListener('load', function(){
	window.scrollTo(0,0);
	startGame();
}, false);