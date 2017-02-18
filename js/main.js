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
	this.empty = true;
}
var cardArr = [
	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/topCastle.png")', empty: false},

  	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false},
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false},
	valueType: 'normal', sidesConnect: true, img: 'url("./img/rightLeftCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightLeftBotCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightBotCastle.png")', empty: false},


	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightBotCastle.png")', empty: false},


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
		checkCastleComplete(arrTile);
		
		updatePlayerInfo();
	}
	// eventually, function that will add score will run checkCastleComplete
	function checkCastleComplete(tileJustPlaced) { 	// tileJustPlaced == gameBoardArr[arrId[1]][arrId[2]]
		checkForExistingTiles(tileJustPlaced)

		// check for attr**

		// find number of sides with castle piece on MAIN-TILE
		// if only one -> castlePairCheck()
		var castleSides = checkTileForSidesWithCastles(tileJustPlaced);
		console.log(castleSides)


		if (castleSides.length === 1) {
			console.log('only had one side, didn\'t do anything')
			console.log(gameBoardArr)
			// if paired, assignPoints() <---- delete castleCheck and make this one
			// need to see if castle is complete before assigning points
			
		// if #sides with castles on MAIN-TILE > 1
		} else {
			console.log('this castle had multiple sides');


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
		var sidesArr = ['top', 'right', 'bottom', 'left'];
		var sidesWithCastles = [];
		for (var i = 0; i < sidesArr.length; i++) {
			if (tile[sidesArr[i]].type === 'castle') {
				sidesWithCastles.push(sidesArr[i]);
			}
		}
		return sidesWithCastles;
	}

	var checkedCastlesArr = [];
	function checkForExistingTiles(tile) {

		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				if (gameBoardArr[i][j] === gameBoardArr[arrId[1]][arrId[2]]) {
					arrayIndex = [i, j]
				}
			}
		}
		if (checkedCastlesArr.includes(arrayIndex)){
			return;
		} else {
			checkedCastlesArr.push(arrayIndex);

			for (var side in tile) {
				if (tile[side].type === 'castle') {
					console.log('found castle side at ' + side);

					var adjacentTile;
					if (side === 'top' && !arrayIndex[0] === 0) {
						adjacentTile = gameBoardArr[arrayIndex[0] - 1][arrayIndex[1]];

					} else if (side === 'right' && !arrayIndex[1] === 3) {
						adjacentTile = gameBoardArr[arrayIndex[0]][arrayIndex[1] + 1];

					} else if (side === 'bottom' && !arrayIndex[0] === 3) {
						adjacentTile = gameBoardArr[arrayIndex[0] + 1][arrayIndex[1]];

					} else if (side === 'left' && !arrayIndex[1] === 0) {
						adjacentTile = gameBoardArr[arrayIndex[0]][arrayIndex[1] - 1];
					}
					console.log('adjacentTile: ', adjacentTile);
					if (adjacentTile) {
						checkForExistingTiles(adjacentTile);
					}
				}
			}
		}
		console.log(checkedCastlesArr)
	}

	// function checkForExistingTiles(arr) {
	// 	console.log(parseInt(arrId[1]))
	// 	var tile = gameBoardArr[arrId[1]][arrId[2]];
	// 	console.log(arrId[1])

	// 	var counter = 0;
	// 	console.log(gameBoardArr);
	// 	for (var i = 0; i < arr.length; i++) {
	// 		if (arr[i] === 'top' && !gameBoardArr[parseInt(arrId[1]) - 1][arrId[2]].empty) {
	// 			console.log('going to check topside!')
	// 			checkTopSide();
	// 			counter += 1;
	// 		} 
	// 		if (arr[i] === 'right' && !gameBoardArr[arrId[1]][parseInt(arrId[2]) + 1].empty) {
	// 			console.log('going to check rightside!')
	// 			checkRightSide();
	// 			counter += 1;
	// 		}
	// 		console.log(arrId[1])
	// 		console.log(gameBoardArr[(arrId[1])][arrId[2]])
	// 		if (arr[i] === 'bottom' && !gameBoardArr[parseInt(arrId[1]) + 1][arrId[2]].empty) {
	// 			console.log('going to check botside!')
	// 			checkBottomSide();
	// 			counter += 1;
	// 		}
	// 		if (arr[i] === 'left' && !gameBoardArr[arrId[1]][parseInt(arrId[2]) - 1].empty) {
	// 			console.log('going to check leftside!')
	// 			checkLeftSide();
	// 			counter += 1;
	// 		}
	// 	}
	// 	console.log('array with connected sides',recursiveArr)
	// 	//console.log(gameBoardArr)
	// 	console.log('resetting recursiveArr')




	// 	recursiveArr = []
	// 	console.log('recursiveArr reset', recursiveArr)
	// 	console.log(counter)
	// 	if (arr.length > 1) {
	// 		if (counter === arr.length) {
	// 			console.log('all sides were paired');
	// 			return true;
	// 		} else {
	// 			console.log('not all paired')
	// 			return false;
	// 		}
	// 	}

	// }
	function castlePairCheck(arr) {
		// good candidate for switch statement
		var counter = 0;

		if (arr.length > 1) {
			if (counter === arr.length) {
			} else {
			}
		}
		// must call checkForPair on each side-possible that castle on multiple sides

	}
	
	
	function checkTopSide() {
		var topObj = gameBoardArr[arrId[1]][arrId[2]];
		var botObj = gameBoardArr[parseInt(arrId[1]) - 1][arrId[2]];
		recursiveArr.push(botObj)
		console.log(topObj)
		// this check is to make sure fx doesn't try to check for a non-existent square
		if (arrId[1] === 0) {
			return;
		} else if (topObj.top.type === 'castle' && botObj.bottom.type === 'castle') {
			// if occupied, flips paired castle's occupant to match that of its pair's occupant
			console.log('checktopside reports true')
			changeOccupancy(topObj, botObj, 'top', 'bottom');
			return true;		
		} else {
			return false;
		}
	}
	function checkRightSide() {
		var rightObj = gameBoardArr[arrId[1]][arrId[2]];
		var leftObj = gameBoardArr[arrId[1]][parseInt(arrId[2]) + 1];
		recursiveArr.push(leftObj)

		if (arrId[2] === 3) {
			return;
		} else if (rightObj.right.type === 'castle' && leftObj.left.type === 'castle') {			
			changeOccupancy(rightObj, leftObj, 'right', 'left');
			return true;
		} else {
			return false;
		}
	}
	function checkBottomSide() {
		var botObj = gameBoardArr[arrId[1]][arrId[2]];
		var topObj = gameBoardArr[parseInt(arrId[1]) + 1][arrId[2]];
		recursiveArr.push(topObj)

		console.log('checkbotside')
		if (arrId[1] === 3) {
			return;
		} else if (botObj.bottom.type === 'castle' && topObj.top.type === 'castle') {	
			console.log('checkbotside reports true')
			changeOccupancy(botObj, topObj, 'bottom', 'top');
			return true;
		} else {
			console.log('checkbotside reports false')

			return false;
		}
	}
	function checkLeftSide() {
		var leftObj = gameBoardArr[arrId[1]][arrId[2]];
		var rightObj = gameBoardArr[arrId[1]][parseInt(arrId[2]) - 1];
		recursiveArr.push(rightObj);

		if (arrId[2] === 0) {
			return;
		}else if (leftObj.left.type === 'castle' && rightObj.right.type === 'castle') {
			changeOccupancy(leftObj, rightObj, 'left', 'right');
			return true;
		}
			return false;
	}


	function changeOccupancy(objA, objB, sideA, sideB) {
		console.log('about to pair side a')
		objA[sideA].paired = true;
		console.log('about to pair side b')

		objB[sideB].paired = true;

		if (objA[sideA].occupied) {
			objB[sideB].occupied = objA[sideA].occupied;
			objB[sideB].occupant = objA[sideA].occupant;
		} else if (objB[sideB].occupied) {
			objA[sideA].occupied = objB[sideB].occupied;
			objA[sideA].occupant = objB[sideB].occupant;
		}
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

//		castlePairCheck();

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






















})