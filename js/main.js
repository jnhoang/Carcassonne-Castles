var ARRAYSIZE = 4;
var gameBoardArr = [];
var tileSquare = '<div class="tile"><div class="top">top</div><div class="center">\
				  <div class="left">left</div><div class="right">right</div></div>\
				  <div class="bottom">bottom</div></div>';
$('document').ready(function() {
	console.log('ready');

	initHTMLArray();

	function initHTMLArray() {
		gameBoardArr = [];

		for (var i = 0; i < ARRAYSIZE; i++) {
			gameBoardArr.push([]);
			for (var j = 0; j < ARRAYSIZE; j++) {
				gameBoardArr[i].push(new Tile('"'+ i + ',' + j + '"'));
			}
			addRow(i);
		}
	}

	function addRow(rowNumber) {
		$('#gameBoard').append('<div class="row row' + rowNumber + '"></div>');
		
		addTile(rowNumber);
	}
	function addTile(rowNumber) {
		for (var i = 0; i < ARRAYSIZE; i++) {
			$('.row' + rowNumber).append(tileSquare);
		}
	}

function addHTMLRow(row) {

}

function generateArray() {
	for (var i = 0; i < ARRAYSIZE; i++) {
		for (var j = 0; j < ARRAYSIZE; j++) {
			
		}
	}
}

function Tile(name, point) {
	this.name = name;
	this.type = '';
	this.top = {};
	this.right = {};
	this.bottom = {};
	this.left = {};
	this.occupied = false;
	this.occupant = '';
	this.pointValue = point;
	//connected
	//completed
}




})