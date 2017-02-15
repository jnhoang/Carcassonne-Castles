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
				  <div class="left"></div><div class="right"></div>\
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
	updatePlayerInfo();
	function updateGameState() {
		$('.nextBox').append(displayTile);
		cardCount += 1;
		
		if (playerTurn === 0) {
			playerOne.meeples -= 1;
		} else {
			playerTwo.meeples -= 1;
		}

		updatePlayerInfo();
		nextCard();
	}
	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);

	}

	function updateBoard(arrTile) {
		//updates board where tile was placed
		$('#' + tileDroppedOn + '> .top').text( $('.displayCard > .top').text() );
		$('#' + tileDroppedOn + '> .right').text( $('.displayCard > .right').text() );
		$('#' + tileDroppedOn + '> .bottom').text( $('.displayCard > .bottom').text() );
		$('#' + tileDroppedOn + '> .left').text( $('.displayCard > .left').text() );

		$('.displayCard').remove();

	}
	function nextCard(){
		var value = cardArr[cardCount];
		$('.displayCard > .top').text(value.top.type);
		$('.displayCard > .right').text(value.right.type);
		$('.displayCard > .bottom').text(value.bottom.type);
		$('.displayCard > .left').text(value.left.type);

		$('.draggable').draggable({ snap: ".square"});
	}
	function submitBtnListener() {
		$('#submitBtn').on('click', function() {
			//now match cardIndex with currentMove
			arrId = tileDroppedOn.split('');
			var arrTile = gameBoardArr[arrId[1]][arrId[2]];
			arrTile = cardArr[cardCount];
			
			updateBoard(arrTile);
			monitorMeepSpots(this);
			
			//reset of global variables
			rotateDeg = 0; // move this eventually

			activateMeepleBtn();
		});
	}
	function monitorMeepSpots() {
		$('#' + tileDroppedOn + '> .top').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .right').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .bottom').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .left').on('click', reserveMeepSpace);			
	}
	function reserveMeepSpace(event) {
		console.log(event.target);
		tileToMeeple = event.target;
	}
	function activateMeepleBtn() {
		$('#meepleBtn').on('click', changeMeepSpace);
		
	}
	function changeMeepSpace() {
		placeMeeple();
		$('#' + tileDroppedOn + '> .top').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .right').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .bottom').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + '> .left').off('click', reserveMeepSpace);

		console.log(gameBoardArr);

		tileDroppedOn = '';
		updateGameState();
	}
	function placeMeeple() {
		// html add
		$(tileToMeeple).append('<div class="meepleImage"></div>');

		// js add
		// arrId = tileDroppedOn.split('');
		// var arrTile = gameBoardArr[arrId[1]][arrId[2]];
		// tileMeepled = $(tileToMeeple).attr('class');
		// arrTile[tileMeepled].occupied = true;
		// arrTile[tileMeepled].occupant = playerTurn;
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
	}
							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			$(this).addClass("ui-state-highlight"); //debug code	
		}});
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
	function addRow(rowNumber) {
		$('#gameBoard').append('<div class="row row' + rowNumber + '"></div>');
		
		addTile(rowNumber);
	}
	function addTile(rowNumber) {
		for (var i = 0; i < ARRAYSIZE; i++) {
			var tileSquare = '<div class="tile square ui-droppable" id="n' + rowNumber + '' + i + '">\
							  <div class="top">top</div><div class="left">\
							  left</div><div class="right">right</div><div class="bottom">bottom\
							  </div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}







})