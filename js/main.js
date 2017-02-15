var ARRAYSIZE = 4;
var CARDSIDES = 4;

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;

// used to manipulate JS array
var gameBoardArr = [];
var arrId;
var arrTile;

var tileToMeeple = '';
var rotateDeg = 0;

var displayTile = '<div class="tile draggable displayCard"><div class="top"></div><div \
				  class="left"></div><div class="right"></div><div class="bottom"></div></div>';

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
	btnListenersOn();
	updatePlayerInfo();
	
	// functions
	function initArrays() {
		gameBoardArr = [];

		for (var i = 0; i < ARRAYSIZE; i++) {
			gameBoardArr.push([]);
			for (var j = 0; j < ARRAYSIZE; j++) {
				// JS side
				gameBoardArr[i].push(new Tile('n' + i + j));
			}
			// HTML side
			addRow(i);
		}
		activateDrop();
	}
	function addRow(rowNumber) {
		$('#gameBoard').append('<div class="row row' + rowNumber + '"></div>');
		
		addTile(rowNumber);
	}
	function addTile(rowNumber) {
		for (var i = 0; i < ARRAYSIZE; i++) {
			var tileSquare = '<div class="tile square ui-droppable" id="n' + rowNumber + '' + i + '">\
							  <div class="top">top</div><div class="left">left</div><div class="right">\
							  right</div><div class="bottom">bottom</div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}
	function nextCard(){
		var value = cardArr[cardCount];
		$('.displayCard > .top').text(value.top.type);
		$('.displayCard > .right').text(value.right.type);
		$('.displayCard > .bottom').text(value.bottom.type);
		$('.displayCard > .left').text(value.left.type);

		$('.draggable').draggable({ snap: ".square"});
	}
	function btnListenersOn() {
		$('#submitBtn').on('click', submitBtnOn);
		$('#rotateBtn').on('click', rotateBtnOn);
	}
	function btnListenersOff() {
		$('#submitBtn').off('click', submitBtnOn);
		$('#rotateBtn').off('click', rotateBtnOn);
	}
	function submitBtnOn() {
			// now match cardIndex with currentMove
			arrId = tileDroppedOn.split('');
			console.log(arrId);
			
			// updates JS board
			gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount];
			arrTile = gameBoardArr[arrId[1]][arrId[2]];
			console.log(gameBoardArr); //debug code

			updateBoard(arrTile);
			monitorMeepSpots(this);
			
			//reset of global variables
			rotateDeg = 0; // move this eventually
			btnListenersOff();
			meepleBtnOn();

	}
	function rotateBtnOn () {
			rotateDeg = (rotateDeg + 90) % 360;
			$('.displayCard').css('transform', 'rotate(' + rotateDeg + 'deg)');
			rotateTileValues();
	}
	function rotateTileValues() {		
		var temp = cardArr[cardCount].top.type;
		
		cardArr[cardCount].top.type = cardArr[cardCount].left.type;
		cardArr[cardCount].left.type = cardArr[cardCount].bottom.type;
		cardArr[cardCount].bottom.type = cardArr[cardCount].right.type;
		cardArr[cardCount].right.type = temp;
	}
	function updateBoard(arrTile) {
		//updates HTML board where tile was placed
		$('#' + tileDroppedOn + ' > .top').text( $('.displayCard > .top').text() );
		$('#' + tileDroppedOn + ' > .right').text( $('.displayCard > .right').text() );
		$('#' + tileDroppedOn + ' > .bottom').text( $('.displayCard > .bottom').text() );
		$('#' + tileDroppedOn + ' > .left').text( $('.displayCard > .left').text() );

		$('.displayCard').remove();

	}
	function monitorMeepSpots() {
		$('#' + tileDroppedOn + ' > .top').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .right').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .bottom').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .left').on('click', reserveMeepSpace);			
	}
	function reserveMeepSpace(event) {
		if (tileToMeeple != '') {
			console.log(tileToMeeple)
			console.log('should remove something')
			$(tileToMeeple).text($(tileToMeeple).text());
		} 

		tileToMeeple = event.target;			
		console.log(tileToMeeple);
 		$(tileToMeeple).append('<div class="meepleImage"></div>');
	}
	function meepleBtnOn() {
		$('#meepleBtn').on('click', changeMeepSpace);
	}
	function meepleBtnOff() {
		$('#meepleBtn').off('click', changeMeepSpace);
	}
	function changeMeepSpace() {
		placeMeeple();
		$('#' + tileDroppedOn + ' > .top').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .right').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .bottom').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .left').off('click', reserveMeepSpace);


		updateGameState();
	}
	function placeMeeple() {
		// add to html board
 		//console.log(arrId); //debug code
		// add to js board
		tileMeepled = $(tileToMeeple).attr('class');
		//console.log(tileMeepled);
		//console.log(gameBoardArr[arrId[1]][arrId[2]]);
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupied = true;
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupant = playerTurn;
		//console.log(gameBoardArr); //debug code

	}
							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			console.log('dropped on me at' + tileDroppedOn);
			$(this).addClass("ui-state-highlight"); //debug code	
		}});
	}
	
	function updateGameState() {
		$('.nextBox').append(displayTile);
		cardCount += 1;
		
		if (playerTurn === 0) {
			playerOne.meeples -= 1;
		} else {
			playerTwo.meeples -= 1;
		}
		playerTurn = (playerTurn + 1) % 2;

		// resets all global vars
		meepleBtnOff();
		resetGlobalVars();
		updatePlayerInfo();
		nextCard();
		btnListenersOn();
	}
	function resetGlobalVars() {
		tileToMeeple = '';
		tileDroppedOn = '';
		arrId = '';
		arrTile = '';
	}
	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);

	}






})