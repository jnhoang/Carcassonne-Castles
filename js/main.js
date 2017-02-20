var ARRAYSIZE = 5;

var cardCount = 0;
var playerTurn = 0;

//var currentIndex = 0; placeholder at 0, to change to dynamic after shuffle ()
var tileDroppedOn;

// used to manipulate JS array
var checkedCastlesArr = [];
var gameBoardArr = [];
var arrId;
var pointsAccrued = 0;
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
	valueType: 'normal', sidesConnect: false, img: 'url("./img/topCastle.png")', empty: false, empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/rightCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true, img: 'url("./img/rightLeftBotCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false},
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false},
	valueType: 'normal', sidesConnect: true, img: 'url("./img/rightLeftCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/sepLeftBotCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true, img: 'url("./img/rightBotCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true, img: 'url("./img/leftBotCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/leftCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true, img: 'url("./img/shieldTopRightCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true, img: 'url("./img/leftTopBotCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: true, img: 'url("./img/leftTopBotCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/sepTopBotCastle.png")', empty: false},	

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/botCastle.png")', empty: false},

	{ top: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true, img: 'url("./img/shieldLeftBotCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'double', sidesConnect: true, img: 'url("./img/shieldTopBotCastle.png")', empty: false},

	{ top: { type: 'castle', occupied: false, occupant: '', pointValue: 1, paired: false, complete: false}, 
	right: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	bottom: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	left: { type: 'grass', occupied: false, occupant: '', pointValue: 0, paired: false, complete: false}, 
	valueType: 'normal', sidesConnect: false, img: 'url("./img/topCastle.png")', empty: false},
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
			logCurrentPlacement();
			updateBoard();
			monitorMeepPlacementOn(this);

			// changes what buttons are listening
			btnListenersOff();
			$('#meepleBtn').on('click', determineMeepSpace);
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
	function rotateBtn() {
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
		if (playerTurn === 0 && playerOne.meeples < 1) {
			monitorMeepPlacementOff();
		} else if (playerTurn === 1 && playerTwo.meeples < 1){
			monitorMeepPlacementOff();
	 	} else {
	 		// trying to target placement & check if occupied
	 		if (gameBoardArr[arrId[1]][arrId[2]][event.target.className].type === 'grass') {
	 			swal({ title: 'Hey get off my Lawn!', text: 'No meeples allowed on the grass.',
	 			timer: 2000, showConfirmButton: false });
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

		// add to html board
		playerTurn === 0 ? $(tileToMeeple).append('<div class="meepleImage meepleBlue"></div>')
			: $(tileToMeeple).append('<div class="meepleImage meepleRed"></div>')
	}
	function determineMeepSpace() {
		if (!tileToMeeple) {
			updateGameState(); // can you just move this out of the if statement & remove other one?
		} else {
			placeMeeple();
			$('#meepleBtn').off('click', determineMeepSpace);
			checkCastleComplete(gameBoardArr[arrId[1]][arrId[2]]);

			updateGameState();
		}

		console.log(gameBoardArr)

	}
	function placeMeeple() {
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
		if (cardCount === cardArr.length - 1) {
			endGame();
		} else {
			cardCount += 1;
			
			updatePlayerTurn();
			updatePlayerInfo();


			$('#meepleBtn').off('click', determineMeepSpace);
			resetGlobalVars();
			showNextCard();
			btnListenersOn();
		}
	}
	function updatePlayerTurn() {
		playerTurn = (playerTurn + 1) % 2;
		swal({ title: 'Player ' + (playerTurn + 1), text: 'It\'s your turn',
		timer: 1000, showConfirmButton: false });
	}
	function resetGlobalVars() {
		pointsAccrued = 0;
		checkedCastlesArr = [];
		rotateDeg = 0;
		tileToMeeple = '';
		tileDroppedOn = '';
		arrId = '';
	}
	function endGame() {
		if (playerOne.points > playerTwo.points) {
			swal({ title:'Player One Wins1', showConfirmButton: true});
		} else {
			swal({ title:'Player Two Wins1', showConfirmButton: true});
		}
	}
	function updatePlayerInfo() {
		$('#pOneScore').text(playerOne.points);
		$('#pOneMeeps').text(playerOne.meeples);
		$('#pTwoScore').text(playerTwo.points);
		$('#pTwoMeeps').text(playerTwo.meeples);

	}
		var pOneMeepsInCastle = 0;
		var pTwoMeepsInCastle = 0;
	function checkCastleComplete(tile) {
		var isBroken = false;
		for (var i = 0; i < ARRAYSIZE; i++) {
			for (var j = 0; j < ARRAYSIZE; j++) {
				if (gameBoardArr[i][j] === tile) {
					arrIndex = i + ',' + j;
					console.log(arrIndex)
				}
			}
		}
		console.log('check for arrIndex on checkedCastlesArr');
		if (checkedCastlesArr.includes(arrIndex)){
			return;
		} else {
			if (checkedCastlesArr.length > 100) {
				return
			}
			var indexNum = [];
			checkedCastlesArr.push(arrIndex);
			console.log(arrIndex)
			arrIndex = arrIndex.split(',');
			arrIndex.forEach(function(index) {
				indexNum.push(parseInt(index));
			})
			console.log(indexNum)
			console.log('checking castle piece at index', indexNum);
		}
		for (var side in tile) {
			if (tile[side].type === 'castle') {
				console.log('found castle side at ' + side);

				var adjacentTile;
				var isConnected = false;
				
				if (side === 'top' && !(indexNum[0] === 0) && !gameBoardArr[indexNum[0] - 1][indexNum[1]].empty) {
					adjacentTile = gameBoardArr[indexNum[0] - 1][indexNum[1]];
					if (adjacentTile && adjacentTile.bottom.type === 'castle') {
						console.log('top and bottom are connected')
						isConnected = true;
						changeOccupancy(tile, adjacentTile, 'top', 'bottom');
						
					}
				} else if (side === 'right' && !(indexNum[1] === ARRAYSIZE) && !gameBoardArr[indexNum[0]][indexNum[1] + 1].empty) {
					adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] + 1];
					if (adjacentTile && adjacentTile.left.type === 'castle') {
						console.log('right and left are connected')
						isConnected = true;
						changeOccupancy(tile, adjacentTile, 'right', 'left');
					}
				} else if (side === 'bottom' && !(indexNum[0] === ARRAYSIZE) && !gameBoardArr[indexNum[0] + 1][indexNum[1]].empty) {
					adjacentTile = gameBoardArr[indexNum[0] + 1][indexNum[1]];
					if (adjacentTile && adjacentTile.top.type === 'castle') {
						console.log('bottom and top are connected')
						isConnected = true;
						changeOccupancy(tile, adjacentTile, 'bottom', 'top');
					}
				} else if (side === 'left' && !(indexNum[1] === 0) && !gameBoardArr[indexNum[0]][indexNum[1] - 1].empty) {
					adjacentTile = gameBoardArr[indexNum[0]][indexNum[1] - 1];
					if (adjacentTile && adjacentTile.right.type === 'castle') {
						console.log('left and right are connected')
						isConnected = true;
						changeOccupancy(tile, adjacentTile, 'left', 'right');
					}
				}

			}
		}
		
		console.log(checkedCastlesArr)
		
	}

	// pointsAccrued += tile.top.pointValue + adjacentTile.bottom.pointValue;
	// pointsAccrued += tile.right.pointValue + adjacentTile.left.pointValue;
	// pointsAccrued += tile.bottom.pointValue + adjacentTile.top.pointValue;
	// pointsAccrued += tile.left.pointValue + adjacentTile.right.pointValue;
	// console.log('points accrued:', pointsAccrued)

	// if (isConnected) {
	// 	console.log('points to give', pointsAccrued)
	// 	console.log('is connected');
	// 	checkCastleComplete(adjacentTile);
	// }
	// if (!isConnected) {
	// 	console.log('is broken');
	// }

	// console.log(pOneMeepsInCastle);
	// console.log(pTwoMeepsInCastle);
	// console.log('pointsAccrued', pointsAccrued)
	// if (pOneMeepsInCastle > pTwoMeepsInCastle) {
	// 	playerOne.points += pointsAccrued;
	// } else if (pTwoMeepsInCastle > pOneMeepsInCastle) {
	// 	playerTwo.points += pointsAccrued;
	// } else {
	// 	playerOne.points += pointsAccrued;
	// 	playerTwo.points += pointsAccrued;
	// }



	function changeOccupancy(objA, objB, sideA, sideB) {
		console.log('about to pair side a,', sideA)
		objA[sideA].paired = true;
		console.log('about to pair side b,',sideB)
		objB[sideB].paired = true;
		console.log(objA[sideA].occupant)
		if (objA[sideA].occupant === 0) {
			pOneMeepsInCastle += 1;
		} else if (objA[sideA].occupant === 1) {
			pTwoMeepsInCastle += 1;
		}

	}	






















})