var ARRAYSIZE = 5;

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;

// used to manipulate JS array
var checkedCastlesArr = [];
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
							  <div class="imgBox"></div><div class="top"></div><div class="left"></div>\
							  <div class="right"></div><div class="bottom"></div></div>';
			$('.row' + rowNumber).append(tileSquare);
		}
	}
	function showNextCard(){
		//var value = cardArr[cardCount];
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

	function submitBtn() {
			// updates JS board
			arrId = tileDroppedOn.split('');
			gameBoardArr[arrId[1]][arrId[2]] = cardArr[cardCount];
			$('#' + tileDroppedOn).css('background', '0'); 

			updateBoard();

			monitorMeepPlacementOn(this);

			// changes what buttons are listening
			btnListenersOff();
			$('#meepleBtn').on('click', determineMeepSpace);

	}
	function updateBoard() {
		//updates HTML board where tile was placed  
		$('#' + tileDroppedOn + ' > .imgBox').css('background-image', cardArr[cardCount].img);
		$('#' + tileDroppedOn + ' > .imgBox').css('transform', 'rotate(' + rotateDeg + 'deg)');

		$('.displayCard').remove();

		//castlePairCheck();
		
		updatePlayerInfo();
	}



	function rotateBtnOn () {
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

	// meeple functions START
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

	 			swal({
	 			  title: "Hey get off my Lawn!",
	 			  text: "No meeples allowed on the grass.",
	 			  timer: 2200,
	 			  showConfirmButton: false
	 			});
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
	function determineMeepSpace() {
		checkCastleComplete(gameBoardArr[arrId[1]][arrId[2]]);
		if (!tileToMeeple) {
			updateGameState(); // can you just move this out of the if statement & remove other one?
		} else {
			placeMeeple();
			$('#meepleBtn').off('click', determineMeepSpace);

			updateGameState();
		}
		console.log(gameBoardArr)

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


							// droppable object manipulation here!
	function activateDrop() {
		$('.square').droppable({ drop: function(event, ui) {
			tileDroppedOn = $(this).attr('id');
			$(this).removeClass('boxShadow');
		}});
	}
	
	function updateGameState() {
		$('.nextBox > .tilePlaceHolder').append(displayTile);
		cardCount += 1;
		
		updatePlayerTurn();

//		castlePairCheck();

		$('#meepleBtn').off('click', determineMeepSpace);
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
	function checkCastleComplete(tile) {
		console.log(tile)
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				if (gameBoardArr[i][j] === tile) {
					arrIndex = i + ',' + j;
					console.log(arrIndex)
				}
			}
		}
		console.log('check for arrIndex on checkedCastlesArr');
		console.log('checkedCastlesArr:', checkedCastlesArr);
		console.log('arrIndex:', arrIndex)
		if (checkedCastlesArr.includes(arrIndex)){
			return;
		} else {
			if (checkedCastlesArr.length > 10) {
				return
			}
			var indexNum = [];
			var intermediary;
			checkedCastlesArr.push(arrIndex);
			console.log(arrIndex)
			arrIndex = arrIndex.split(',');
			arrIndex.forEach(function(index) {
				indexNum.push(parseInt(index));
			})
			console.log(indexNum)
			for (var side in tile) {
				if (tile[side].type === 'castle') {
					console.log('found castle side at ' + side);

					var adjacentTile;
					console.log(indexNum)
					console.log(gameBoardArr[indexNum[0] - 1][indexNum[1]])
					console.log(!gameBoardArr[indexNum[0] - 1][indexNum[1]].empty)
					if (side === 'top' && !(indexNum[0] === 0) && !gameBoardArr[indexNum[0] - 1][indexNum[1]].empty) {
						adjacentTile = gameBoardArr[indexNum[0] - 1][indexNum[1]];
						console.log('adjacentTile: ', adjacentTile);
						changeOccupancy(tile, adjacentTile, 'top', 'bottom');

					} else if (side === 'right' && !(indexNum[1] === 3) && !gameBoardArr[indexNum[0]][indexNum[1] + 1].empty) {
						adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] + 1];
						console.log('adjacentTile: ', adjacentTile);
						changeOccupancy(tile, adjacentTile, 'right', 'left');


					} else if (side === 'bottom' && !(indexNum[0] === 3) && !gameBoardArr[indexNum[0] + 1][indexNum[1]].empty) {
						adjacentTile = gameBoardArr[indexNum[0] + 1][indexNum[1]];
						console.log('adjacentTile: ', adjacentTile);
						changeOccupancy(tile, adjacentTile, 'bottom', 'top');


					} else if (side === 'left' && !(indexNum[1] === 0) && !gameBoardArr[indexNum[0]][indexNum[1] - 1].empty) {
						adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] - 1];
						console.log('adjacentTile: ', adjacentTile);
						changeOccupancy(tile, adjacentTile, 'left', 'right');

					}
					if (adjacentTile) {
						checkForExistingTiles(adjacentTile);
					}
				}
			}
		}
		console.log(checkedCastlesArr)
	}

	function changeOccupancy(objA, objB, sideA, sideB) {
		console.log('about to pair side a,', sideA)
		objA[sideA].paired = true;
		console.log(objA)
		console.log('about to pair side b,',sideB)
		objB[sideB].paired = true;
		console.log(objB)


		if (objA[sideA].occupied) {
			objB[sideB].occupied = objA[sideA].occupied;
			objB[sideB].occupant = objA[sideA].occupant;
		} else if (objB[sideB].occupied) {
			objA[sideA].occupied = objB[sideB].occupied;
			objA[sideA].occupant = objB[sideB].occupant;
		}
	}	






















})