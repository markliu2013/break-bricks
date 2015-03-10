/**
 * Class Slider
 * @param header
 * @constructor
 */
function Slider(header) {
	this.header = header;
}
Slider.prototype.draw = function() {
	for (var i = 0; i < game.util.sliderLength; i++) {
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header+i)+')').addClass('on');
	}
}
Slider.prototype.reDraw = function() {
	jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col').removeClass('on');
	for (var i = 0; i < game.util.sliderLength; i++) {
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header+i)+')').addClass('on');
	}
}
Slider.prototype.moveLeft = function() {
	if (this.header > 1) {
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header+game.util.sliderLength-1)+')').removeClass('on');
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header-1)+')').addClass('on');
		this.header = this.header - 1;
	}
}
Slider.prototype.moveRight = function() {
	if (this.header <= game.util.gridColsNum - game.util.sliderLength) {
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header)+')').removeClass('on');
		jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(this.header+game.util.sliderLength)+')').addClass('on');
		this.header = this.header + 1;
	}
}
Slider.prototype.moveByKey = function(event) {
	if (event.keyCode == 37) {
		game.slider.moveLeft();
		if (game.ball.docked) {
			if (game.ball.coordinate[0] > 1) {
				game.ball.stepLeft();
			}
		}
	} else if (event.keyCode == 39) {
		game.slider.moveRight();
		if (game.ball.docked) {
			if (game.ball.coordinate[0] < game.util.gridColsNum) {
				game.ball.stepRight();
			}
		}
	}
}
Slider.prototype.keyBoardControl = function() {
	jQuery(document).on('keydown', this.moveByKey);
}
Slider.prototype.offKey = function() {
	jQuery(document).off('keydown', this.moveByKey);
}
Slider.prototype.init = function() {
	this.draw();
	this.keyBoardControl();
}
Slider.prototype.reset = function() {
	this.header = (game.util.gridColsNum+1)/2-(Math.floor(game.util.sliderLength/2));
	this.reDraw();
}
Slider.prototype.pause = function() {
	this.offKey();
}
Slider.prototype.resume = function() {
	this.keyBoardControl();
}






