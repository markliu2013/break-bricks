
function Bricks() {
	this.rowCount = 0;
	this.blockCounts = 0;
}

Bricks.prototype.init = function() {
	this.rowCount = Math.floor(util.gridRowsNum*0.3);
	var temp = util.gridRowsNum - this.rowCount + 1;
	jQuery('#grid .row:nth-child(n):nth-last-child(n+'+temp+') .col').addClass('on').addClass('brick');
	this.blockCounts = util.gridColsNum * this.rowCount;
}