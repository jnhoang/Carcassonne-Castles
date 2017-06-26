var ARRAYSIZE = 5;

var cardCount   = 0;
var playerTurn  = 0;
var rotateDeg   = 0;
var tileDroppedOn;

// used to manipulate JS array
var gameBoardArr = [];
var jsArrayTile;
var arrId;
var tileToPlaceMeeple = '';


// used in check for completed castle function
var checkedCastlesArr = [];
var pOneMeepsInCastle = 0;
var pTwoMeepsInCastle = 0;


var meepleBlue  = '<div class="meepleImage meepleBlue"></div>';
var meepleRed   = '<div class="meepleImage meepleRed"></div>';
var displayTile = '<div class="tile draggable displayCard"><div class="imgBox"></div><div class="top"></div><div \
				  class="left"></div><div class="right"></div><div class="bottom"></div></div>';
var playerOne   = {
	meeples: 3,
	points: 0,
}
var playerTwo   = {
	meeples: 3,
	points: 0,
}
function Tile(name) {
  this.id               = name;
  this.type             = '';
  this.top              = {};
  this.right            = {};
  this.bottom           = {};
  this.left             = {};
  this.valueType        = '';
  this.sidesConnected   = null;
  this.paired           = false;
  this.empty            = true;
}
var messages = {
	placeTileSomwhere: { title: 'You haven\'t placed your tile', text: 'You need to place it somehwere on the board'},
	
	stayOffGrass : { title: 'Hey get off my Lawn!', text: 'No meeples allowed on the grass.',
 		timer: 1500, showConfirmButton: false, type: 'error'},

	noMeeples : { title: 'I\'m sorry I can\'t do that.', text: 'You have no meepled left.',
 		timer: 1500, showConfirmButton: false },

 	announcePOneTurn : { title: 'Player 1', text: 'It\'s your turn',
		timer: 800, showConfirmButton: false, type: 'warning' },

 	announcePTwoTurn : { title: 'Player 2', text: 'It\'s your turn',
		timer: 800, showConfirmButton: false, type: 'warning' },

	draw: { title:'Game Tied!', timer: 15000, showConfirmButton: true},

}

$('document').ready(function() {


	initArrays();
	showNextCard();
	btnListenersOn();
	updatePlayerInfo();
	toggleInstructions();

	// functions
	function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 	|| navigator.userAgent.match(/webOS/i)
	 	|| navigator.userAgent.match(/iPhone/i)
	 	|| navigator.userAgent.match(/iPad/i)
	 	|| navigator.userAgent.match(/iPod/i)
	 	|| navigator.userAgent.match(/BlackBerry/i)
	 	|| navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}

	function showMobileMessage() {
		if (detectMob()) {
      $("#mobileMessage").show();
      $('.instructToggle').attr("disabled","disabled");
    } else {
      $("#mobileMessage").hide();
    }
	}

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
	function toggleInstructions() {
		$('.instructToggle').on('click',function() {
			$('.instructions').toggleClass('hide');
		});
	}
	function btnListenersOn() {
		$('#submitBtn').on('click', submitBtn);
		$('#submitBtn').removeAttr('disabled')

		$('#rotateBtn').on('click', rotateBtn);
		$('#rotateBtn').removeAttr('disabled');
	}
	function btnListenersOff() {
		$('#submitBtn').off('click', submitBtn);
		$('#submitBtn').attr('disabled','disabled');

		$('#rotateBtn').off('click', rotateBtn);
		$('#rotateBtn').attr('disabled','disabled');
	}
	function meepleListenOn() {
		$('#meepleBtn').on('click', confirmMeeplePlacement);
		$('#meepleBtn').removeAttr('disabled');
	}
	function meepleListenOff() {
		$('#meepleBtn').off('click', confirmMeeplePlacement);
		$('#meepleBtn').attr('disabled','disabled');
	}
	function rotateBtn() {
		// HTML side
		rotateDeg += 90;
		$('.displayCard > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');

		// JS side
		var temp = cardArr[cardCount].top;
    cardArr[cardCount].top      = cardArr[cardCount].left;
    cardArr[cardCount].left     = cardArr[cardCount].bottom;
    cardArr[cardCount].bottom   = cardArr[cardCount].right;
    cardArr[cardCount].right    = temp;
	}
	function submitBtn() {
		if (!tileDroppedOn) {
			swal(messages.placeTileSomwhere);
		} else {
			logCurrentPlacement();
			updateHTMLBoard();
			monitorMeepPlacementOn(this);

			// changes what buttons are listening
			btnListenersOff();
			meepleListenOn();
		}
	}
	function logCurrentPlacement() {
		arrId = tileDroppedOn.split('');
		// updates JS board
		gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount];
	}
	function updateHTMLBoard() {
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
	}
	function reserveMeepSpace(event) {
		// removes any previously placed meeples on the board before placing a new one
		if (tileToPlaceMeeple != '') {
			$(tileToPlaceMeeple).text($(tileToPlaceMeeple).text());
		}
		tileToPlaceMeeple = event.target;

		// places meeple to the html board
		playerTurn === 0 ? $(tileToPlaceMeeple).append(meepleBlue) : $(tileToPlaceMeeple).append(meepleRed);
	}
	function confirmMeeplePlacement() {
		// permanently places a meeple, if no meeple is placed, continues on
		if (tileToPlaceMeeple){
			placeMeeple();
			monitorMeepPlacementOff();
		}
		updateGameState();
		meepleListenOff();
	}
	function placeMeeple() {
		// adds meeple to js board
		tileMeepled = $(tileToPlaceMeeple).attr('class');
		jsArrayTile = gameBoardArr[arrId[1]][arrId[2]][tileMeepled];
		jsArrayTile.occupied = true;
		jsArrayTile.occupant = playerTurn;
		
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
		
		if (cardCount === cardArr.length - 1) {
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
	function alotPoints() {
		var points = checkedCastlesArr.length;

		// compare meeples, whoever has more meeples gets the points
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
		} else if (pOneMeepsInCastle > 0 && pOneMeepsInCastle === pTwoMeepsInCastle) {
			playerOne.points += points;
			playerTwo.points += points;
		}
	}
	function returnMeeples() {
		playerOne.meeples += pOneMeepsInCastle;
		playerTwo.meeples += pTwoMeepsInCastle;
	}
	function updatePlayerTurn() {
		playerTurn = (playerTurn + 1) % 2;
		playerTurn === 0 ? swal(messages.announcePOneTurn) : swal(messages.announcePTwoTurn);
	}
	function resetGlobalVars() {
		pOneMeepsInCastle = 0;
		pTwoMeepsInCastle = 0;
		checkedCastlesArr = [];
		jsArrayTile = '';
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
		// had to leave win announcements out of messages object d/t dynamic points
		if (playerOne.points > playerTwo.points) {
			swal({ title:'Player One Wins ' + playerOne.points + ' to ' + playerTwo.points, 
				timer: 15000, showConfirmButton: true });
		} else if (playerOne.points > playerTwo.points) {
			swal({ title:'Player Two Wins ' + playerTwo.points + ' to ' + playerOne.points, 
				timer: 15000, showConfirmButton: true });
		} else {
			swal(messages.draw);
		}
	}

	function checkCastleComplete(tile) {
		// function will return true or false
		var isBroken = false;
		var indexOfTile = findTileInGameBoardArr(tile);

		// check for endless loop
		// accounts for the adjacent and connected tiles
		// setup this way so that includes() is able to read the string value in indexOfTile
		if (checkedCastlesArr.includes(indexOfTile)){
			return;
		} else {
			var indexNum = []; 
			checkedCastlesArr.push(indexOfTile);
			convertStringToNumIndex(indexOfTile, indexNum)		
			if (checkCastleSides(tile, indexNum) === false){
				return false;
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
	function convertStringToNumIndex(indexOfTile, indexNum) {
		// indexNum is the number value, so the checks in the for-in loop may properly +/- values
		indexOfTile = indexOfTile.split(',');
		indexOfTile.forEach(function(index) {
			indexNum.push(parseInt(index));
		})
	}
	function checkCastleSides(tile, indexNum) {
		for (var side in tile) {
			if (tile[side].type === 'castle') {
				var adjacentTile;
				var isConnected = false;

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
	function changeOccupancy(objA, objB, sideA, sideB) {
		if (objA[sideA].occupant === 0) {
			pOneMeepsInCastle += 1 
		} else if (objA[sideA].occupant === 1) {
			pTwoMeepsInCastle += 1;
		}
	}	




})