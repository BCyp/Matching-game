


function eleCreate( type, id, cl, content, child){
	var newElement = document.createElement('div');
	newElement.id = id;
	newElement.class = cl;
	newElement.textContent = content;

	return newElement;

}

function genCards(numPairs){
	var symbols = [ '\u00A9', 2 , 3 , 4 , 5, 6 , 7 , 8];
	var deck = [];
	var y = 0;
	for(var i = 0; i < numPairs*2; i++){

		if( i == numPairs) y = 0;
		var newCard = eleCreate('div', null, 'card', null, null);
		newCard.style = 'width:70px;height:70px;border:1px solid #000; display: inline-block; float: left; margin: 5px; background-color : #305';
		newCard.setAttribute('symbol', symbols[y]);
		newCard.setAttribute('match', 'false');
		var copyCard = newCard;
		deck.push(newCard);
		y++;
	}
	console.log(deck);
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


function placeCards(deck){
	deck = shuffle(deck);
	for(var i = 0; i < deck.length; i++){
		document.getElementById('gameBoard').appendChild(deck[i]);
		console.log(deck[i]);
	}
};

function game(numPairs){
	var flips = 0;
	var guesses = 0;
	var matches = 0;
	var firstCard;
	var secCard;

	var checkMatches = function(fC,sC){
			console.log(fC);
			if(fC.getAttribute('symbol') === sC.getAttribute('symbol')){
				console.log(fC);
				console.log(sC);
				fC.setAttribute('match', 'true');
				sC.setAttribute('match', 'true');
				fC.removeEventListener('click', reveal);
				sC.removeEventListener('click', reveal);
				matches ++;
			}
			else{
				console.log('NO match');
				fC.textContent = " ";
				sC.textContent = " ";
				fC.addEventListener('click', reveal);
				sC.addEventListener('click', reveal);
			}
			flips = 0;
			if(matches === numPairs){
				clearFinish();
			}
			guesses++;
			updateGuess(guesses);
	};
	var reveal = function(card){
		this.textContent = this.getAttribute('symbol');
		this.removeEventListener('click', reveal);
		if(flips === 1){
			secCard = this;
			checkMatches(firstCard, secCard);
		}
		else{
			firstCard = this;
			flips = 1;
		}
		console.log(flips);
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
		var line = document.createElement('div');
	line.id = 'guessLine';
	line.textContent = 'You Have Made ' + 0 + ' Guesses';
	document.getElementById('game').appendChild(line);
};
function updateGuess(n){
	document.getElementById('guessLine').textContent = 'You Have Made ' + n + ' Guesses';
};

function main(){
	var kar = document.getElementById('numSymbols').value; 	
	if(kar > 8){
		kar = 8;
	};
	document.getElementById('startForm').remove();
	guessLine();
	var board = eleCreate( 'div','gameBoard', null, null);
	board.style = 'width:350px;height:700px;border:1px solid #000; margin-left: auto; margin-right: auto';
	document.getElementById('game').appendChild(board);

	var deck = genCards(kar);
	placeCards(deck);
	game(kar);

	console.log(board.attributes);



};


document.getElementById('startButton').addEventListener('click', main);
