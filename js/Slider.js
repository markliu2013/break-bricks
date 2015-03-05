
function Slider(header) {
	this.header = header;
}
Slider.prototype.draw = function() {
	for (var i = 0; i < util.sliderLength; i++) {
		jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(this.header+i)+')').addClass('on');
	}
}
Slider.prototype.moveLeft = function() {
	if (this.header > 1) {
		jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(this.header+util.sliderLength-1)+')').removeClass('on');
		jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(this.header-1)+')').addClass('on');
		this.header = this.header - 1;
	}
}
Slider.prototype.moveRight = function() {
	if (this.header <= util.gridColsNum-util.sliderLength) {
		jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(this.header)+')').removeClass('on');
		jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(this.header+util.sliderLength)+')').addClass('on');
		this.header = this.header + 1;
	}
}
Slider.prototype.moveByKey = function(event) {
	if (event.keyCode == 37) {
		slider.moveLeft();

	} else if (event.keyCode == 39) {
		slider.moveRight();
	}
}
Slider.prototype.keyBoardControl = function() {
	jQuery(document).on('keydown', this.moveByKey);
}
Slider.prototype.init = function() {
	this.draw();
	this.keyBoardControl();
}







