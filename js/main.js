var ARRAYSIZE = 4;
var gameBoardArr = [];

var cardCount = 0;
var playerTurn = 0;

var currentIndex;
var cardArr = [
	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: false},	

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', sidesConnect: false},
];
$('document').ready(function() {
	console.log('ready');


	initHTMLArray();
	nextCard() 

	function nextCard(){
		var cardValues = ['top', 'right', 'bottom', 'left'];
		for (var i = 0; i < cardValues.length; i++) {	
			var value = cardArr[0][cardValues[i]].type							
			if (i == 1 || i == 3) {	
				$('.displayCard > .center' + '> .' + cardValues[i]).text(value);
			} else {
				$('.displayCard > .' + cardValues[i]).text(value);
			}
			//eventually change cardCount when shuffle() implemented
			//assign that value to currentIndex to be passed onto placed square
			$('.displayCard').attr('id', cardCount);
		}

		$('.draggable').draggable();
	}
	function initHTMLArray() {
		gameBoardArr = [];

		for (var i = 0; i < ARRAYSIZE; i++) {
			gameBoardArr.push([]);
			for (var j = 0; j < ARRAYSIZE; j++) {
				// JS side
				gameBoardArr[i].push(new Tile('"'+ i + ',' + j + '"'));
			}
			// HTML side
			addRow(i);
		}
		// droppable object manipulation here!
		$('.square').droppable({ drop: function(event, ui) {
			var squareId = $(this).attr('id').split(',');
			console.log(gameBoardArr[squareId[0]][squareId[1]]);

			$(this).addClass("ui-state-highlight"); //debug code
			console.log('droppable id:' + squareId);// debug code
			console.log(ui.draggable.attr('id')); //debug code
			
			$('#submitBtn').on('click', function(squareId) {
				///$(thisSquare).append('<div>test</div>');
				//console.log(squareId);
				console.log('submitBtn clicked'); //debug code
			})
		}});
		console.log(gameBoardArr); //debug code

		// var squareSelected = gameBoardArr[squareId[0]][squareId[1]];
		// squareSelected.player = playerTurn;
		// squareSelected.filled = true;
		// square.removeEventListener('click', clickSquare);
		// if (playerTurn === 0) {
		// 	square.className += ' ' + playerOneTheme + ' blocks';
		// } else if (playerTurn === 1) {
		// 	square.className += ' ' + playerTwoTheme + ' blocks';
		// }

	}

	function addRow(rowNumber) {
		$('#gameBoard').append('<div class="row row' + rowNumber + '"></div>');
		
		addTile(rowNumber);
	}
	function addTile(rowNumber) {
		for (var i = 0; i < ARRAYSIZE; i++) {
			var tileSquare = '<div class="tile square ui-droppable" id="' + rowNumber + ',' + i + '">\
							  <div class="top">top</div><div class="center"><div class="left">\
							  left</div><div class="right">right</div></div><div class="bottom">bottom\
							  </div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}

function addHTMLRow(row) {

}

function generateArray() {
	for (var i = 0; i < ARRAYSIZE; i++) {
		for (var j = 0; j < ARRAYSIZE; j++) {
			
		}
	}
}

function Tile(name, point) {
	this.name = name;
	this.type = '';
	this.top = {};
	this.right = {};
	this.bottom = {};
	this.left = {};
	this.occupied = false;
	this.occupant = '';
	this.pointValue = point;
	//connected
	//completed
}




})