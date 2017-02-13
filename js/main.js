var ARRAYSIZE = 16;

$('document').ready(function() {
	console.log('ready');

	generateArray();


})




function generateArray() {
	for (var i = 0; i < ARRAYSIZE; i++)
		for (var j = 0; j < ARRAYSIZE; j++) {
			
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