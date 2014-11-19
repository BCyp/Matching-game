


function eleCreate( type, id, cl, content, child){
	var newElement = document.createElement('div');
	newElement.id = id;
	newElement.class = cl;
	newElement.textContent = content;

	return newElement;

}
function genCards(numPairs){
	var symbols = [ 1, 2 , 3 , 4 , 5, 6 , 7 , 8];
	var deck = [];
	var y = 0;
	for(var i = 0; i < numPairs*2; i++){

		if( i == numPairs) y = 0;
		var newCard = eleCreate('div', null, 'card', null, null);
		newCard.style = 'width:70px;height:70px;border:1px solid #000; display: inline-block; float: center; margin: 5px';
		newCard.setAttribute('symbol', symbols[y]+ "");
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


function main(){
	var kar = document.getElementById('numSymbols').value; 	
	if(kar > 8){
		kar = 8;
	};
	var board = eleCreate( 'div','gameBoard', null, null);
	board.style = 'width:350px;height:700px;border:1px solid #000; margin-left: auto; margin-right: auto';
	document.getElementById('game').appendChild(board);

	var deck = genCards(kar);
	placeCards(deck);

	console.log(board.attributes);



}


document.getElementById('startButton').addEventListener('click', main);
