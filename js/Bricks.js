/**
 * Class Bricks
 * @constructor
 */
function Bricks() {
	this.rowCount = 0;
	this.blockCounts = 0;
}

Bricks.prototype.init = function() {
	this.rowCount = Math.floor(game.util.gridRowsNum*0.3);
	var temp = game.util.gridRowsNum - this.rowCount + 1;
	jQuery('#grid .row:nth-child(n):nth-last-child(n+'+temp+') .col').addClass('on').addClass('brick');
	this.blockCounts = game.util.gridColsNum * this.rowCount;
}