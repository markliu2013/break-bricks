function Util() {

	this.gridRowsNum = 10;
	this.gridColsNum = 31;
	this.sliderLength = 5;
	this.ballSpeed = 20;

}
Util.prototype.getRandomNum = function(min, max) {
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));
}

