var ARRAYSIZE = 4;
var CARDSIDES = 4;
var gameBoardArr = [];

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;
var tileToMeeple;
var rotateDeg = 0;

var displayTile = '<div class="tile draggable displayCard"><div class="top"></div>\
				  <div class="center"><div class="left"></div><div class="right"></div></div>\
				  <div class="bottom"></div></div>';

var playerOne = {
	meeples: 7,
	points: 0,
}
var playerTwo = {
	meeples: 7,
	points: 0,
}
function Tile(name, point) {
	this.id = name;
	this.type = '';
	this.top = {};
	this.right = {};
	this.bottom = {};
	this.left = {};
	this.valueType = '';
	this.sidesConnected = null;
	//connected
	//completed
}
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


	initArrays();
	nextCard();
	submitBtnListener();
	rotateBtnListener();
	submitMeepleBtn();
	updatePlayerInfo();

	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);

	}

	function updateBoard(arrTile) {
		//updates board where tile was placed
		var arrId = document.getElementById(tileDroppedOn); //jQuery does not like $('# + varName');
		arrId.childNodes[1].innerText = arrTile.top.type;
		arrId.childNodes[2].childNodes[0].innerText = arrTile.left.type;
		arrId.childNodes[2].childNodes[1].innerText = arrTile.right.type;
		arrId.childNodes[3].innerText = arrTile.bottom.type;
		//add background image for arrId

		$('.displayCard').remove();
		$('.nextBox').append(displayTile);
		cardCount += 1;

		nextCard();
	}
	function nextCard(){
		var cardValues = ['top', 'right', 'bottom', 'left'];
		for (var i = 0; i < cardValues.length; i++) {	
			var value = cardArr[cardCount][cardValues[i]].type							
			if (i == 1 || i == 3) {	
				$('.displayCard > .center' + '> .' + cardValues[i]).text(value);
			} else {
				$('.displayCard > .' + cardValues[i]).text(value);
			}
			//eventually change cardCount when shuffle() implemented
			//assign that value to currentIndex to be passed onto placed square
			$('.displayCard').attr('id', cardCount);
		}

		$('.draggable').draggable({ snap: ".square"});
	}
	function submitBtnListener() {
		$('#submitBtn').on('click', function() {
			//now match cardIndex with currentMove
			//console.log(tileDroppedOn)
			var tileId = document.getElementById(tileDroppedOn);
			arrId = tileDroppedOn.split(',');
			var arrTile = gameBoardArr[arrId[1]][arrId[2]];
			arrTile = cardArr[cardCount];
			
			updateBoard(arrTile);
			
			//JS d/t JQuery issues
			tileId.childNodes[1].addEventListener('click', function() {addMeeple(this)});
			tileId.childNodes[2].childNodes[0].addEventListener('click', function() {addMeeple(this)});
			tileId.childNodes[2].childNodes[1].addEventListener('click', function() {addMeeple(this)});
			tileId.childNodes[3].addEventListener('click', function() {addMeeple(this)});			
			
			//reset of global variables
			rotateDeg = 0; // move this eventually
		});
	}
	function addMeeple(clicked) {
		tileToMeeple = $(clicked).context;
		//tileToMeeple = tileToMeeple.context;

		console.log(tileToMeeple);
	}
	function submitMeepleBtn() {
		$('#meepleBtn').on('click', function() {
			$(tileToMeeple).append('<div class="meepleImage"></div>');
			var tileId = document.getElementById(tileDroppedOn);
			tileId.childNodes[1].removeEventListener('click', addMeeple);
			tileId.childNodes[2].childNodes[0].removeEventListener('click', addMeeple);
			tileId.childNodes[2].childNodes[1].removeEventListener('click', addMeeple);
			tileId.childNodes[3].removeEventListener('click', addMeeple);
		})
		tileDroppedOn = '';
	}
	function rotateBtnListener() {
		$('#rotateBtn').on('click', function() {
			rotateDeg = (rotateDeg + 90) % 360;
			$('.displayCard').css('transform', 'rotate(' + rotateDeg + 'deg)');
			rotateTileValues();
		})
	}
	function rotateTileValues() {		
		var temp = cardArr[cardCount].top.type;
		
		cardArr[cardCount].top.type = cardArr[cardCount].left.type;
		cardArr[cardCount].left.type = cardArr[cardCount].bottom.type;
		cardArr[cardCount].bottom.type = cardArr[cardCount].right.type;
		cardArr[cardCount].right.type = temp;

		
		// unending loop -> figure out later
		// for (var i = 1, j = 0; i <= .length; i++, j++) {
		// 	[i] = [j];
		// }


	}
	function initArrays() {
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
		
		activateDrop();

		
	}
							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			$(this).addClass("ui-state-highlight"); //debug code	
		}});
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







})