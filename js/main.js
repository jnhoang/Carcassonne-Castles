var ARRAYSIZE = 4;
var CARDSIDES = 4;

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;

// used to manipulate JS array
var gameBoardArr = [];
var arrId;

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
	this.paired = false;
	//completed
}
var cardArr = [
	/*test*/{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false},
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false},
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},	

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false},
];
$('document').ready(function() {
	//console.log('ready');


	initArrays();
	showNextCard();
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
	function showNextCard(){
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
	function meepleBtnOn() {
		$('#meepleBtn').on('click', changeMeepSpace);
	}
	function meepleBtnOff() {
		$('#meepleBtn').off('click', changeMeepSpace);
	}
	function submitBtnOn() {
			// now match cardIndex with currentMove
			arrId = tileDroppedOn.split('');
			//console.log(arrId); // debug code
			//console.log(cardArr[cardCount]); // debug code
			// updates JS board
			gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount]; 
			//console.log(gameBoardArr[arrId[1]][arrId[2]]) //debug code
			//console.log(gameBoardArr); //debug code

			updateBoard(gameBoardArr[arrId[1]][arrId[2]]);
			monitorMeepPlacementOn(this);
			
			//reset of global variables
			btnListenersOff();
			meepleBtnOn();

	}
	function rotateBtnOn () {
			rotateDeg += 90;
			$('.displayCard').css('transform', 'rotate(' + rotateDeg + 'deg)');
			rotateTileValues();
	}
	function rotateTileValues() {		
		var temp = cardArr[cardCount].top.type;
		//console.log(temp); //debug code
		cardArr[cardCount].top.type = cardArr[cardCount].left.type;
		cardArr[cardCount].left.type = cardArr[cardCount].bottom.type;
		cardArr[cardCount].bottom.type = cardArr[cardCount].right.type;
		cardArr[cardCount].right.type = temp;
		//console.log(cardArr[cardCount]); //debug code
	}
	function updateBoard(arrTile) {
		//updates HTML board where tile was placed  ******issue is here with the rotate bug
		// change .displayCard to gameBoardArr (the updated values) 
		$('#' + tileDroppedOn + ' > .top').text( cardArr[cardCount].top.type );
		$('#' + tileDroppedOn + ' > .right').text( cardArr[cardCount].right.type );
		$('#' + tileDroppedOn + ' > .bottom').text( cardArr[cardCount].bottom.type );
		$('#' + tileDroppedOn + ' > .left').text( cardArr[cardCount].left.type );

		$('.displayCard').remove();

	}
	function monitorMeepPlacementOn() {
		$('#' + tileDroppedOn + ' > .top').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .right').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .bottom').on('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .left').on('click', reserveMeepSpace);			
	}
	function monitorMeepPlacementOff() {
		$('#' + tileDroppedOn + ' > .top').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .right').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .bottom').off('click', reserveMeepSpace);
		$('#' + tileDroppedOn + ' > .left').off('click', reserveMeepSpace);
	}
	function reserveMeepSpace(event) {
		if (tileToMeeple != '') {
			//console.log(tileToMeeple) //debug code
			//console.log('should remove something') // debug code
			$(tileToMeeple).text($(tileToMeeple).text());
		} 

		tileToMeeple = event.target;			
		//console.log(tileToMeeple); // debug code
 		$(tileToMeeple).append('<div class="meepleImage"></div>');
	}
	function changeMeepSpace() {
		placeMeeple();
		monitorMeepPlacementOff();

		updateGameState();
	}
	function placeMeeple() {
		// add to html board
 		//console.log(arrId); //debug code
		// add to js board
		tileMeepled = $(tileToMeeple).attr('class');
		//console.log(tileMeepled); //debug code
		//console.log(gameBoardArr[arrId[1]][arrId[2]]); //debug code
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupied = true;
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupant = playerTurn;
		//console.log(gameBoardArr); //debug code

	}
							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			console.log('dropped on me at' + tileDroppedOn); // debig code
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

		castlePairCheck();
		castleCompleteCheck();

		meepleBtnOff();
		resetGlobalVars();
		updatePlayerInfo();
		showNextCard();
		btnListenersOn();
	}
	function resetGlobalVars() {
		rotateDeg = 0;
		tileToMeeple = '';
		tileDroppedOn = '';
		arrId = '';
	}
	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);

	}
	//ArrayCheck(); // debug code

	// checks if castles are paired and changes side.occupied = true
	function castlePairCheck() {
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				// must call checkForPair on each side-possible that castle on multiple sides
				//console.log(gameBoardArr[i][j]); // debug code

				checkTopSide(i, j);
				checkRightSide(i, j);
				checkBottomSide(i, j);
				checkLeftSide(i, j);
						
			}
		}
		console.log(gameBoardArr) // debug code
	}
	function tileCastleCheck(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].occupied === false) {
				return false;
			}
		}
		return true;
	}
	function castleCompleteCheck() {
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				var castleArr = [];
				var arrObj = gameBoardArr[i][j];
				// console.log(arrObj); //debug code

			// check squares that have multi-sides that are connected
				// checks if a tile has > 1 castle side
				if (arrObj.sidesConnect === true) {
					// for tile, find all sides with castle & adds them to the array
					lookForCastleSides(arrObj, castleArr);

				} else {

			// check all other squares

					checkCompleteCastle(arrObj, 'top');
					checkCompleteCastle(arrObj, 'right');
					checkCompleteCastle(arrObj, 'bottom');
					checkCompleteCastle(arrObj, 'left');

				}


				if (castleArr.length > 0) {
					//console.log(castleArr);
				}


			}
		}
	}
	function checkCompleteCastle(arrObj, side) {
		if (arrObj[side].paired && arrObj[side].complete === false) {
			arrObj[side].complete = true;
			console.log(side + ': castle complete'); //debug code
			if (arrObj[side].occupied) {
				// add points
			}
		}

	}
	function lookForCastleSides(arrObj, castleArr) {
		for (sides in arrObj) {
			for (types in arrObj[sides]) {
				if (arrObj[sides][types] === 'castle') {
					castleArr.push(arrObj[sides]);
				}
			}
		}

	}
	function checkTopSide(i, j) {
		if (i === 0) {
			return;
		} else if (gameBoardArr[i][j].top.type === 'castle') {
			if (gameBoardArr[i - 1][j].bottom.type === 'castle') {
				gameBoardArr[i][j].top.paired = true;
				gameBoardArr[i - 1][j].bottom.paired = true;
			}
		}
	}
	function checkRightSide(i, j) {
		if (j === 3) {
			return;
		} else if (gameBoardArr[i][j].right.type === 'castle') {
			if (gameBoardArr[i][j + 1].left.type === 'castle') {
				gameBoardArr[i][j].right.paired = true;
				gameBoardArr[i][j + 1].left.paired = true;
			}
		}

	}
	function checkBottomSide(i, j) {
		if (i === 3) {
			return;
		} else if (gameBoardArr[i][j].bottom.type === 'castle') {
			if (gameBoardArr[i + 1][j].top.type === 'castle') {
				gameBoardArr[i][j].bottom.paired = true;
				gameBoardArr[i + 1][j].top.paired = true;
			}
		}
	}
	function checkLeftSide(i, j) {
		if (j === 0) {
			return;
		} else if (gameBoardArr[i][j].left.type === 'castle') {
			if (gameBoardArr[i][j - 1].right.type === 'castle') {
				gameBoardArr[i][j].left.paired = true;
				gameBoardArr[i][j - 1].right.paired = true;
			}
		}
	}

	//debug code
	// var testObj = { 
	//  top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, side: 'top'}, 
	// right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, side: 'right'}, 
	// bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, side: 'bottom'}, 
	// left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, side: 'left'}, 
	// valueType: 'normal', sidesConnect: false}



















})