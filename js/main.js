var ARRAYSIZE = 4;

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;

// used to manipulate JS array
var gameBoardArr = [];
var arrId;

var tileToMeeple = '';
var rotateDeg = 0;

var displayTile = '<div class="tile draggable displayCard"><div class="imgBox"></div><div class="top"></div><div \
				  class="left"></div><div class="right"></div><div class="bottom"></div></div>';

var playerOne = {
	meeples: 2,
	points: 0,
}
var playerTwo = {
	meeples: 2,
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
	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/topCastle.png")'},

  	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false},
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false},
	valueType: 'normal', sidesConnect: true, img: 'url("./img/rightLeftCastle.png")'},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightCastle.png")'},
  ]
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
			var tileSquare = '<div class="tile square ui-droppable boxShadow" id="n' + rowNumber + '' + i + '">\
							  <div class="imgBox"></div><div class="top">top</div><div class="left">left</div>\
							  <div class="right">right</div><div class="bottom">bottom</div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}
	function showNextCard(){
		var value = cardArr[cardCount];
		$('.displayCard > .top').text(value.top.type);
		$('.displayCard > .right').text(value.right.type);
		$('.displayCard > .bottom').text(value.bottom.type);
		$('.displayCard > .left').text(value.left.type);
		$('.displayCard > .imgBox').css('background-image', cardArr[cardCount].img);


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
			// updates JS board
			arrId = tileDroppedOn.split('');
			gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount]; 

			updateBoard(gameBoardArr[arrId[1]][arrId[2]]);

			monitorMeepPlacementOn(this);

			// changes what buttons are listening
			btnListenersOff();
			meepleBtnOn();

	}
	function updateBoard(arrTile) {
		//updates HTML board where tile was placed  
		// change .displayCard to gameBoardArr (the updated values) 
		$('#' + tileDroppedOn + ' > .top').text( $('.displayCard > .top').text());
		$('#' + tileDroppedOn + ' > .right').text( $('.displayCard > .right').text());
		$('#' + tileDroppedOn + ' > .bottom').text( $('.displayCard > .bottom').text());
		$('#' + tileDroppedOn + ' > .left').text( $('.displayCard > .left').text());
		$('#' + tileDroppedOn + ' > .imgBox').css('background-image', cardArr[cardCount].img);
		$('#' + tileDroppedOn + ' > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');

		$('.displayCard').remove();

		//castlePairCheck();
		checkCastleComplete();
		
		updatePlayerInfo();
	}
	// eventually, function that will add score will run checkCastleComplete
	function checkCastleComplete(tileJustPlaced) { 	// tileJustPlaced == gameBoardArr[arrId[1]][arrId[2]]

		// check for attr**

		// find number of sides with castle piece on MAIN-TILE
		// if only one -> castlePairCheck()
		if (checkTileForSidesWithCastles(tileJustPlaced) === 1) {
			castlePairCheck(tileJustPlaced);
			// if paired, assignPoints() <---- delete castleCheck and make this one
			// need to see if castle is complete before assigning points
			
		// if #sides with castles on MAIN-TILE > 1
		} else {
			castlePairCheck(tileJustPlaced);
		}

		
	function castlePairCheck(tileJustPlaced) {
		
		// must call checkForPair on each side-possible that castle on multiple sides
		checkTopSide();
		// checkRightSide(i, j);
		// checkBottomSide(i, j);
		// checkLeftSide(i, j);

	}
	function checkTopSide() {
		arrId = tileDroppedOn.split('');
		var topTile = gameBoardArr[arrId[1]][arrId[2]];
		var botTile = gameBoardArr[arrId[1] - 1][arrId[2]];
		
		// this check is to make sure fx doesn't try to check for a non-existent square
		if (arrId[1] === 0) {
			return;
		} else if (topTile.top.type === 'castle' && botTile.bot.type === 'castle') {
			topObj.top.paired = true;
			botObj.bottom.paired = true;

			changeOccupancy(topTile, botTile, 'top', 'bot');
			// if occupied, flips paired castle's occupant to match that of its pair's occupant
			
		}
	}
	function changeOccupancy(objA, objB, sideA, sideB) {
		if (objA[sideA].occupied) {
			objB[sideB].occupied = objA[sideA].occupied;
			objB[sideB].occupant = objA[sideA].occupant;
		} else if (objB[sideB].occupied) {
			objA[sideA].occupied = objB[sideB].occupied;
			objA[sideA].occupant = objB[sideB].occupant;
		}
	}
			// castlePairCheck() -> check if all sides on MAIN-TILE are paired
				// if one side on MAIN-TILE is unpaired, return false!! (castle is incomplete)
				// if all sides on MAIN-TILE are paired, add their paired tile to an array
					// mark this MAIN-TILE with an attr** that checkCastleComplete() knows to avoid it
						// flip something on?
					// check 2NDARY-TILES for attr**
						// attr** == false -> add to an array 
						// attr** == true -> do not add to array
					// run checkCastleComplete() on all tiles in the array
						// return true if all pass 


			// if one is incomplete, return false, this tile is incomplete by association

			// if 


	}
	function checkTileForSidesWithCastles(tile) {
	// looks at given tile and checks for 'castle' type
		var sidesWithCastles = 0;
		var sidesArr = ['top', 'right', 'bottom', 'left'];

		for (var i = 0; i < sidesArr.length; i++) {
			if (tile[sidesArr[i]].type === 'castle') {
				sidesWithCastles += 1;
			}
		}
		return sidesWithCastles;
	}

	function rotateBtnOn () {
			// HTML side
			rotateDeg += 90;
			$('.displayCard > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');

			rotateTileValues();
	}
	function rotateTileValues() {
		// JS side
		var temp = cardArr[cardCount].top;
		cardArr[cardCount].top = cardArr[cardCount].left;
		cardArr[cardCount].left = cardArr[cardCount].bottom;
		cardArr[cardCount].bottom = cardArr[cardCount].right;
		cardArr[cardCount].right = temp;

		// HTML side
		temp = $('.displayCard > .top').text();
		$('.displayCard > .top').text($('.displayCard > .left').text());
		$('.displayCard > .left').text($('.displayCard > .bottom').text());
		$('.displayCard > .bottom').text($('.displayCard > .right').text());
		$('.displayCard > .right').text(temp);

	}

// meeple functions START

	function meepleBtnOn() {
		$('#meepleBtn').on('click', changeMeepSpace);
	}
	function meepleBtnOff() {
		$('#meepleBtn').off('click', changeMeepSpace);
	}
	function monitorMeepPlacementOn() {
		$('#' + tileDroppedOn + ' > .top').on('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .right').on('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .bottom').on('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .left').on('click', determineMeeplePlacement);			
	}
	function monitorMeepPlacementOff() {
		$('#' + tileDroppedOn + ' > .top').off('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .right').off('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .bottom').off('click', determineMeeplePlacement);
		$('#' + tileDroppedOn + ' > .left').off('click', determineMeeplePlacement);
	}
	function determineMeeplePlacement(event) {
		console.log(event.target.className)
		if (playerTurn === 0 && playerOne.meeples < 1) {
			console.log('no more meeples left :\'\(, click Next');
			monitorMeepPlacementOff();
		} else if (playerTurn === 1 && playerTwo.meeples < 1){
			console.log('no more meeples left :\'\(, click Next');
			monitorMeepPlacementOff();
	 	} else {
	 		// trying to target placement & check if occupied
	 		if (gameBoardArr[arrId[1]][arrId[2]][event.target.className].occupied) {
	 			console.log('aready occupied');
	 		} else if (gameBoardArr[arrId[1]][arrId[2]][event.target.className].type === 'grass') {
	 			console.log('get off my lawn! Meeples can\' be placed on grass');
	 		} else{
		 		reserveMeepSpace(event);
	 		}
	 	}
	 	console.log(gameBoardArr)
	}
	function reserveMeepSpace() {
		if (tileToMeeple != '') {
			$(tileToMeeple).text($(tileToMeeple).text());
		} 
		tileToMeeple = event.target;

			if (playerTurn === 0) {
				$(tileToMeeple).append('<div class="meepleImage meepleBlue"></div>');
			} else {
				$(tileToMeeple).append('<div class="meepleImage meepleRed"></div>');
			}
	}
	function changeMeepSpace() {
		if (!tileToMeeple) {
			updateGameState(); // can you just move this out of the if statement & remove other one?
		} else {
			placeMeeple();
			monitorMeepPlacementOff();

			updateGameState();
		}
	}
	function placeMeeple() {
	// add to html board

	// add to js board
	tileMeepled = $(tileToMeeple).attr('class');
	gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupied = true;
	gameBoardArr[arrId[1]][arrId[2]][tileMeepled].occupant = playerTurn;
		if (playerTurn === 0) {
			playerOne.meeples -= 1;
		} else {
			playerTwo.meeples -= 1;
		}
	}

// meeple functions END

							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			$(this).removeClass('boxShadow');
		}});
	}
	
	function updateGameState() {
		$('.nextBox').append(displayTile);
		cardCount += 1;
		
		updatePlayerTurn();

		castlePairCheck();

		meepleBtnOff();
		resetGlobalVars();
		showNextCard();
		btnListenersOn();
	}
	function updatePlayerTurn() {
		playerTurn = (playerTurn + 1) % 2;
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

				checkTopSide(i, j);
				checkRightSide(i, j);
				checkBottomSide(i, j);
				checkLeftSide(i, j);
						
			}
		}
	}
	// currently unused, planned for use in checkCastlecomplete
	function tileCastleCheck(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].occupied === false) {
				return false;
			}
		}
		return true;
	}

	function oldcheckCastleComplete() {
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				var castleArr = [];
				var arrObj = gameBoardArr[i][j];

			// check squares that have multi-sides that are connected
				// checks if a tile has > 1 castle side
				if (arrObj.sidesConnect === true) {
					// for tile, find all sides with castle & adds them to the array
					lookForCastleSides(arrObj, castleArr);

					

					if (castleArr.length > 0) {
						//console.log(castleArr);
					}
				} else {
					// check all other squares
					checkCastleSide(arrObj, 'top');
					checkCastleSide(arrObj, 'right');
					checkCastleSide(arrObj, 'bottom');
					checkCastleSide(arrObj, 'left');
				}




			}
		}
	}
	// if meeple present, remove taht div and meeplecount++
	
	function checkCastleSide(arrObj, side) {
		if (arrObj[side].paired && arrObj[side].complete === false) {
			arrObj[side].complete = true;
			console.log(side + ': castle complete'); //debug code
			if (arrObj[side].occupied) {
				if (arrObj[side].occupant === 0) {
					playerOne.points += (arrObj[side].pointValue * 2);
				} else {
					playerTwo.points += (arrObj[side].pointValue * 2);
				}
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
		} else if (gameBoardArr[i][j].top.type === 'castle' && gameBoardArr[i - 1][j].bottom.type === 'castle') {
			var topObj = gameBoardArr[i][j];
			var botObj = gameBoardArr[i - 1][j];
			
			topObj.top.paired = true;
			botObj.bottom.paired = true;
			// if occupied, flips paired castle's occupant to match that of its pair's occupant
			if (topObj.top.occupied) {
				botObj.bottom.occupied = topObj.top.occupied;
				botObj.bottom.occupant = topObj.top.occupant;
			} else if (botObj.bottom.occupied) {
				topObj.top.occupied = botObj.bottom.occupied;
				topObj.top.occupant = botObj.bottom.occupant;
			}
		}
	}
	function checkRightSide(i, j) {

		if (j === 3) {
			return;
		} else if (gameBoardArr[i][j].right.type === 'castle' && gameBoardArr[i][j + 1].left.type === 'castle') {
			var rightObj = gameBoardArr[i][j];
			var leftObj = gameBoardArr[i][j + 1];
			
			rightObj.right.paired = true;
			leftObj.left.paired = true;
				
			if (rightObj.right.occupied) {
				leftObj.left.occupied = rightObj.right.occupied;
				leftObj.left.occupant = rightObj.right.occupant;
			} else if (leftObj.left.occupied) {
				rightObj.right.occupied = leftObj.left.occupied;
				rightObj.right.occupant = leftObj.left.occupant;
			}
		}
	}
	function checkBottomSide(i, j) {
		if (i === 3) {
			return;
		} else if (gameBoardArr[i][j].bottom.type === 'castle' && gameBoardArr[i + 1][j].top.type === 'castle') {
			var botObj = gameBoardArr[i][j];
			var topObj = gameBoardArr[i + 1][j];
			
			botObj.bottom.paired = true;
			topObj.top.paired = true;

			if (botObj.bottom.occupied) {
				topObj.top.occupied = botObj.bottom.occupied;
				topObj.top.occupant = botObj.bottom.occupant;
			} else if (topObj.top.occupied) {
				botObj.bottom.occupied = topObj.top.occupied;
				botObj.bottom.occupant = topObj.top.occupant;

			}
			
		}
	}
	function checkLeftSide(i, j) {
		if (j === 0) {
			return;
		} else if (gameBoardArr[i][j].left.type === 'castle' && gameBoardArr[i][j - 1].right.type === 'castle') {
			var leftObj = gameBoardArr[i][j];
			var rightObj = gameBoardArr[i][j - 1];

			leftObj.left.paired = true;
			rightObj.right.paired = true;

			if (leftObj.left.occupied) {
				rightObj.right.occupied = leftObj.left.occupied;
				rightObj.right.occupant = leftObj.left.occupant;
			} else if (rightObj.right.occupied) {
				leftObj.left.occupied = rightObj.right.occupied;
				leftObj.left.occupant = rightObj.right.occupant;
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