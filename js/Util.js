/**
 * Class Util
 * @constructor
 */
function Util() {

	this.gridRowsNum = 40;
	this.gridColsNum = 31;
	this.sliderLength = 7;
	this.ballSpeed = 500;
	this.ballSpeed2 = 10;//when you are pressing space key, this speed will apply.
	this.dockTime = 2000;

}
Util.prototype.getRandomNum = function(min, max) {
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));
}

