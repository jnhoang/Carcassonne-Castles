var ARRAYSIZE = 5;

var cardCount = 0;
var playerTurn = 0;
var rotateDeg = 0;
var tileDroppedOn;

// used to manipulate JS array
var gameBoardArr = [];
var arrId;
var tileToPlaceMeeple = '';


// used in check for completed castle function
var checkedCastlesArr = [];
var pOneMeepsInCastle = 0;
var pTwoMeepsInCastle = 0;
var meepleBlue = '<div class="meepleImage meepleBlue"></div>';
var meepleRed = '<div class="meepleImage meepleRed"></div>';
var displayTile = '<div class="tile draggable displayCard"><div class="imgBox"></div><div class="top"></div><div \
				  class="left"></div><div class="right"></div><div class="bottom"></div></div>';
var playerOne = {
	meeples: 4,
	points: 0,
}
var playerTwo = {
	meeples: 4,
	points: 0,
}
function Tile(name) {
	this.id = name;
	this.type = '';
	this.top = {};
	this.right = {};
	this.bottom = {};
	this.left = {};
	this.valueType = '';
	this.sidesConnected = null;
	this.paired = false;
	this.empty = true;
}
var messages = {
	stayOffGrass : { title: 'Hey get off my Lawn!', text: 'No meeples allowed on the grass.',
 		timer: 2000, showConfirmButton: false },

	noMeeples : { title: 'I\'m sorry I can\'t do that.', text: 'You have no meepled left.',
 		timer: 2000, showConfirmButton: false },

 	announcePlayerTurn : { title: 'Player ' + (playerTurn + 1), text: 'It\'s your turn',
		timer: 1000, showConfirmButton: false },

	playerOneWin: { title:'Player One Wins ' + playerOne.points + ' to' + playerTwo.points , showConfirmButton: true},
	playerTwoWin: { title:'Player Two Wins', showConfirmButton: true},
	draw: { title:'Game Tied!', showConfirmButton: true},

}
var cardArr = [
	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/topCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/rightCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/rightLeftBotCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0},
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1},
	valueType: 'normal', img: 'url("./img/rightLeftCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/rightBotCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/leftBotCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/leftCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'double', img: 'url("./img/shieldTopRightCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/leftCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/leftTopBotCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/topCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'normal', img: 'url("./img/leftTopBotCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/botCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	valueType: 'double', img: 'url("./img/shieldLeftBotCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'double', img: 'url("./img/shieldTopBotCastle.png")'},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0}, 
	valueType: 'normal', img: 'url("./img/topCastle.png")'},
  ]
$('document').ready(function() {

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
		// creates a row, adds it to the gameboard, adds ARRAYSIZE number of tiles to the row
		$('#gameBoard').append('<div class="row row' + rowNumber + '"></div>');
		addTile(rowNumber);
	}
	function addTile(rowNumber) {
		for (var i = 0; i < ARRAYSIZE; i++) {
			var tileSquare = '<div class="tile square ui-droppable boxShadow" id="n' + rowNumber + '' + i + '">\
							  <div class="imgBox"></div><div class="top"></div><div class="left"></div>\
							  <div class="right"></div><div class="bottom"></div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}
	function showNextCard(){
		$('.nextBox > .tilePlaceHolder').append(displayTile);
		$('.displayCard > .imgBox').css('background-image', cardArr[cardCount].img);
		$('.draggable').draggable({ snap: ".square"});
	}
	function btnListenersOn() {
		$('#submitBtn').on('click', submitBtn);
		$('#rotateBtn').on('click', rotateBtn);
	}
	function btnListenersOff() {
		$('#submitBtn').off('click', submitBtn);
		$('#rotateBtn').off('click', rotateBtn);
	}
	function rotateBtn() {
		// HTML side
		rotateDeg += 90;
		$('.displayCard > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');

		// JS side
		var temp = cardArr[cardCount].top;
		cardArr[cardCount].top = cardArr[cardCount].left;
		cardArr[cardCount].left = cardArr[cardCount].bottom;
		cardArr[cardCount].bottom = cardArr[cardCount].right;
		cardArr[cardCount].right = temp;
	}
	function submitBtn() {
		logCurrentPlacement();
		updateBoard();
		monitorMeepPlacementOn(this);

		// changes what buttons are listening
		btnListenersOff();
		$('#meepleBtn').on('click', confirmMeeplePlacement);
	}
	function logCurrentPlacement() {
		arrId = tileDroppedOn.split('');
		// updates JS board
		gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount];
	}
	function updateBoard() {
		//updates HTML board where tile was placed  
		$('#' + tileDroppedOn + ' > .imgBox').css('background-image', cardArr[cardCount].img);
		$('#' + tileDroppedOn + ' > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');
		$('#' + tileDroppedOn).css('background', '0'); 

		$('.displayCard').remove();

		updatePlayerInfo();
	}

	// meeple functions START
	function monitorMeepPlacementOn() {
		// listens for clicks to place meeples down
		$('#' + tileDroppedOn + ' > .top').on('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .right').on('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .bottom').on('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .left').on('click', verifyMeeplePlacement);			
	}
	function monitorMeepPlacementOff() {
		$('#' + tileDroppedOn + ' > .top').off('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .right').off('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .bottom').off('click', verifyMeeplePlacement);
		$('#' + tileDroppedOn + ' > .left').off('click', verifyMeeplePlacement);
	}
	function verifyMeeplePlacement(event) {
		//checks for illegal moves, else places a meeple on clicked location & turns off click listener
		var userClick = gameBoardArr[arrId[1]][arrId[2]][event.target.className].type;
 		if (userClick === 'grass') {
 			swal(messages.stayOffGrass);
 		} else if ((playerTurn === 0 && playerOne.meeples < 1) || (playerTurn === 1 && playerTwo.meeples < 1)){
 			swal(messages.noMeeples);
 		} else {
	 		reserveMeepSpace(event);
 		}
	 	monitorMeepPlacementOff();
	}
	function reserveMeepSpace() {
		// removes any previously placed meeples on the board before placing a new one
		if (tileToPlaceMeeple != '') {
			$(tileToPlaceMeeple).text($(tileToPlaceMeeple).text());
		}
		tileToPlaceMeeple = event.target;

		// places meeple to the html board
		playerTurn === 0 ? $(tileToPlaceMeeple).append(meepleBlue) : $(tileToPlaceMeeple).append(meepleRed)
	}
	function confirmMeeplePlacement() {
		// permanently places a meeple, if no meeple is placed, continues on
		if (tileToPlaceMeeple){
			placeMeeple();
		}
		updateGameState();
		$('#meepleBtn').off('click', confirmMeeplePlacement);
	}
	function placeMeeple() {
		// adds meeple to js board
		tileMeepled = $(tileToPlaceMeeple).attr('class');
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupied = true;
		gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupant = playerTurn;
		
		//subtract from player meeple count
		playerTurn === 0 ? playerOne.meeples -= 1 : playerTwo.meeples -= 1;

	}
	function activateDrop() {
		// turns gameBoard tiles into droppable zones
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
		}});
	}
	function updateGameState() {
		castleComplete();
		updatePlayerTurn();
		updatePlayerInfo();
		
		if (cardCount === 2/*cardArr.length - 1*/) {
			endGame();
		} else {
			cardCount += 1;

			$('#meepleBtn').off('click', confirmMeeplePlacement);
			resetGlobalVars();
			showNextCard();
			btnListenersOn();
		}
	}
	function castleComplete() {
		var complete = checkCastleComplete(gameBoardArr[arrId[1]][arrId[2]]);
		if (complete) {
			alotPoints();
			returnMeeples();
		}
	}
	function returnMeeples() {
		playerOne.meeples += pOneMeepsInCastle;
		playerTwo.meeples += pTwoMeepsInCastle;
	}
	function alotPoints() {
		var points = checkedCastlesArr.length;

		// compare meeples, whoever has more meeples gets the points
		/////////add message that points were given!
		if (pOneMeepsInCastle > pTwoMeepsInCastle) {
			playerOne.points += points * 2;
			if (pTwoMeepsInCastle > 0) {
			 	playerTwo.points += points;
			}
		} else if (pTwoMeepsInCastle > pOneMeepsInCastle) {
			playerTwo.points += points * 2;
			if (pOneMeepsInCastle > 0) {
				playerTwo.points += points;
			}
		} else if (pOneMeepsInCastle === pTwoMeepsInCastle) {
			playerOne.points += points;
			playerTwo.points += points;
		}
	}
	function updatePlayerTurn() { // needs to be fixed
		console.log(playerTurn)
		swal(messages.announcePlayerTurn);
		console.log(playerTurn)
		playerTurn = (playerTurn + 1) % 2;
		console.log(playerTurn)
	}
	function resetGlobalVars() {
		pOneMeepsInCastle = 0;
		pTwoMeepsInCastle = 0;
		checkedCastlesArr = [];
		rotateDeg = 0;
		tileToPlaceMeeple = '';
		tileDroppedOn = '';
		arrId = '';
	}
	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);
	}
	function endGame() {
		playerOne.points > playerTwo.points ? swal(messages.playerOneWin) : swal(messages.playerTwoWin);
		if (playerOne.points > playerTwo.points) {
			swal(messages.playerOneWin);
		} else if (playerOne.points > playerTwo.points) {
			swal(messages.playerTwoWin);
		} else {
			swal(messages.draw);
		}
	}



	function checkCastleComplete(tile) {
		var isBroken = false;
		var indexOfTile = findTileInGameBoardArr(tile);

		// check for endless loop
		if (checkedCastlesArr.includes(indexOfTile)){
			return;
		} else {
			// accounts for the adjacent and connected tiles
			// setup this way so that includes is able to read the string value in indexOfTile
			// indexNum is the number value, so the checks in the for-in loop may properly +/- values
			var indexNum = []; 
			checkedCastlesArr.push(indexOfTile);
			indexOfTile = indexOfTile.split(',');
			indexOfTile.forEach(function(index) {
				indexNum.push(parseInt(index));
			})
			for (var side in tile) {
				if (tile[side].type === 'castle') {
					var adjacentTile;
					var isConnected = false;

					// refactor to clean this up (ex.)
					// if (side === 'top') {
					// 	adjacentTile = gameBoardArr[indexNum[0 -1]][indexNum[1]];
					// 	if (adjacentTile && !adjacentTile.empty && adjacentTile.bottom.type === 'castle') {
					// 		isConnected = true;
					// 		changeOccupancy(tile, adjacentTile, 'top', 'bottom');
					// 	}
					// }
					// checks that an adjacent tile exists, is not empty, and is connected
					if (side === 'top' && !(indexNum[0] === 0) && !gameBoardArr[indexNum[0] - 1][indexNum[1]].empty) {
						adjacentTile = gameBoardArr[indexNum[0] - 1][indexNum[1]];
						if (adjacentTile && adjacentTile.bottom.type === 'castle') {
							isConnected = true;
							changeOccupancy(tile, adjacentTile, 'top', 'bottom');	
						}
					} else if (side === 'right' && !(indexNum[1] === ARRAYSIZE) && !gameBoardArr[indexNum[0]][indexNum[1] + 1].empty) {
						adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] + 1];
						if (adjacentTile && adjacentTile.left.type === 'castle') {
							isConnected = true;
							changeOccupancy(tile, adjacentTile, 'right', 'left');
						}
					} else if (side === 'bottom' && !(indexNum[0] === ARRAYSIZE) && !gameBoardArr[indexNum[0] + 1][indexNum[1]].empty) {
						adjacentTile = gameBoardArr[indexNum[0] + 1][indexNum[1]];
						if (adjacentTile && adjacentTile.top.type === 'castle') {
							isConnected = true;
							changeOccupancy(tile, adjacentTile, 'bottom', 'top');
						}
					} else if (side === 'left' && !(indexNum[1] === 0) && !gameBoardArr[indexNum[0]][indexNum[1] - 1].empty) {
						adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] - 1];
						if (adjacentTile && adjacentTile.right.type === 'castle') {
							isConnected = true;
							changeOccupancy(tile, adjacentTile, 'left', 'right');
						}
					}
					if (isConnected) {
						checkCastleComplete(adjacentTile);
					}
					if (!isConnected) {
						return false
					}
				}
			}
		}
		return true
	}
	function findTileInGameBoardArr(tile) {
		var arrIndex;
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				if (gameBoardArr[i][j] === tile) {
					arrIndex = i + ',' + j;
				}
			}
		}
		return arrIndex;
	}
	function changeOccupancy(objA, objB, sideA, sideB) {
		if (objA[sideA].occupant === 0) {
			pOneMeepsInCastle += 1 
		} else if (objA[sideA].occupant === 1) {
			pTwoMeepsInCastle += 1;
		}
	}	




})