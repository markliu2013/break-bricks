function Util() {

	this.gridRowsNum = 40;
	this.gridColsNum = 31;
	this.sliderLength = 31;
	this.ballSpeed = 500;
	this.ballSpeed2 = 10;

}
Util.prototype.getRandomNum = function(min, max) {
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));
}

