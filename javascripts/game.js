//*Brandon Cypel Bac369@nyu.edu *//


function elemCreate( type, obj, content, child){
	var newElement = document.createElement(type);
	if(obj.id){
		newElement.id =obj.id;
	}
	if(obj.class){
		newElement.setAttribute('class', obj.class);
	}
	if(obj.style){
		newElement.setAttribute('style', obj.style);
	}
	if(child){
		newElement.appendChild(child);
	}
	newElement.textContent = content;

	return newElement;

};
function shuffleArray(arr){
	for( var i = 0; i < arr.length; i++){
		var current = Math.floor(arr.length * Math.random());
		if(i !== current){
			var temp = arr[i];
			arr[i] = arr[current];
			arr[current] = temp;
		}
	}
	return arr;

}
function genCards(numPairs){
	var symbols = [ '\u00A9', '\u265E', '\u222F', '\u05EA', '\u262F' , '\u00A5', '\u267B' ,  '\u20AC'];
	symbols = shuffleArray(symbols);
	var deck = [];
	var y = 0;
	for(var i = 0; i < numPairs*2; i++){

		if( i == numPairs) y = 0;
		var newCard = elemCreate('div', {class:'card'}, null);
		newCard.setAttribute('symbol', symbols[y]);
		newCard.setAttribute('match', 'false');
		deck.push(newCard);
		y++;
	}
	return deck;
};

var shuffle = function(deck){
	var cloneDeck = [];
	len = deck.length;
	while(cloneDeck.length != len){
		var current = Math.floor(deck.length * Math.random());
		cloneDeck.push(deck[current]);
		deck.splice(current, 1);
	}
	return cloneDeck;
};


function placeCards(deck, board){
	deck = shuffle(deck);
	for(var i = 0; i < deck.length; i++){
		board.appendChild(deck[i]);
	}
};

function game(numPairs){
	var flips = 0;
	var guesses = 0;
	var matches = 0;
	var firstCard;
	var secCard;

	var checkMatches = function(fC,sC){
			if(fC.getAttribute('symbol') === sC.getAttribute('symbol')){
				fC.setAttribute('match', 'true');
				sC.setAttribute('match', 'true');
				fC.removeEventListener('click', reveal);
				sC.removeEventListener('click', reveal);
				matches ++;
			}
			else{
				fC.textContent = " ";
				sC.textContent = " ";
				fC.addEventListener('click', reveal);
				sC.addEventListener('click', reveal);
			}
			flips = 0;
			guesses++;
			updateGuess(guesses);
			if(matches == numPairs){
				end();
			}
	};
	var reveal = function(card){
		this.textContent = this.getAttribute('symbol');
		this.removeEventListener('click', reveal);
		if(flips === 1){
			secCard = this;
			setTimeout(function() {
				checkMatches(firstCard, secCard);	
			}, 1000);
		}
		else{
			firstCard = this;
			flips = 1;
		}
	};
	var addListener = function(parent){
		for( var i = 0; i < parent.childNodes.length; i++){
			if(parent.childNodes[i].getAttribute('match') === 'false'){
				parent.childNodes[i].addEventListener('click', reveal);
			}
		}
	};
		addListener(document.getElementById('gameBoard'));
};
function guessLine(){
		var line = elemCreate('div',{id:'guessLine'}, 'You Have Made ' + 0 + ' Guesses');
	document.getElementById('game').appendChild(line);
};
function updateGuess(n){
	document.getElementById('guessLine').textContent = 'You Have Made ' + n + ' Guesses';
};
function end(){
	var endLine = elemCreate( 'div',{id: 'end', class:'ender'}, 'THANKS 4 PLYING BUD!!!')
	document.getElementById('game').parentNode.insertBefore(endLine, document.getElementById('game'));
	document.getElementById('game').remove();
};
function addCSS(){
	var newElement = elemCreate('link',{});
	newElement.rel = 'stylesheet';
	newElement.href= 'styles.css';
	document.getElementsByTagName('html')[0].insertBefore(newElement, document.getElementsByTagName('body')[0]);
};
function calcWidth(numPairs){
	if(numPairs > 4){
		wid = 4;
	}
	else{
		wid = numPairs;
	}
	return ((wid/2)*180) + '';
};

function main(){
	var numPairs = document.getElementById('numSymbols').value; 
	if(numPairs > 8){
		numPairs = 8;
	};
	document.getElementById('startForm').remove();
	guessLine();
	var board = elemCreate( 'div',{id:'gameBoard', style:'width:' + calcWidth(numPairs) + 'px'});
	document.getElementById('game').appendChild(board);

	var deck = genCards(numPairs);
	placeCards(deck, board);
	game(numPairs);
};
addCSS();
document.getElementById('startButton').addEventListener('click', main);
