


function eleCreate( type, id, cl, content, child){
	var newElement = document.createElement('div');
	newElement.id = id;
	newElement.setAttribute('class', cl);
	newElement.textContent = content;

	return newElement;

}

function genCards(numPairs){
	var symbols = [ '\u00A9', '\u265E', '\u222F', '\u05EA', '\u262F' , '\u1C16', '\u267B' ,  '\u3037'];
	var deck = [];
	var y = 0;
	for(var i = 0; i < numPairs*2; i++){

		if( i == numPairs) y = 0;
		var newCard = eleCreate('div', '', 'card', null, null);
		newCard.style = 'width:70px;height:70px;border-radius: 25px;text-align: center;vertical-align:center;line-height: 70px; box-shadow: 10px 10px 5px #888888;border:3px solid #000; display: inline-block; float: left; margin: 5px; background-color : #ff0';
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
			guesses++;
			updateGuess(guesses);
			console.log('Matches = ' + matches);
			console.log('numPairs= ' + numPairs);
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
function end(){
	var endLine = eleCreate( 'div', 'end', 'ender', 'THANKS 4 PALLYING BUD!!!')
	document.getElementById('game').parentNode.insertBefore(endLine, document.getElementById('game'));
	document.getElementById('game').remove();
};
function addCSS(){
	var newElement = document.createElement('link');
	newElement.rel = 'stylesheet';
	newElement.href= 'styles.css';
	document.getElementsByTagName('html')[0].insertBefore(newElement, document.getElementsByTagName('body')[0]);
};

function main(){
	var kar = document.getElementById('numSymbols').value; 	
	var wid = 0;
	if(kar > 8){
		kar = 8;
	};
	if(kar > 4){
		wid = 4;
	}
	else{
		wid = kar;
	}
	var hei = (50 * kar) + ''; 
	var boardW = ((wid/2)*180) + '';
	console.log(boardW);
	document.getElementById('startForm').remove();
	guessLine();
	var board = eleCreate( 'div','gameBoard', null, null);
	board.style = 'width:' + boardW + 'px;height:'+hei+'px;border:1px solid #000; border-radius: 25px; margin-left: auto; margin-right: auto';
	document.getElementById('game').appendChild(board);

	var deck = genCards(kar);
	placeCards(deck);
	game(kar);

	console.log(board.attributes);



};

addCSS();

document.getElementById('startButton').addEventListener('click', main);
