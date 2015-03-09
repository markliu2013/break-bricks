
function Ball(direction, coordinate) {
	this.direction = direction;
	this.coordinate = coordinate;
	this.thread = null;
	this.movedSteps = 0;
	this.movingSteps = 0;
	this.speed = util.ballSpeed;
	this.docked = false;
	this.dockTimeout = null;
}
Ball.prototype.draw = function() {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
}
Ball.prototype.preStep = function() {
	var ballNode = jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	if (ballNode.hasClass('brick')) {
		brick.blockCounts--;
		ballNode.removeClass('brick');
	}
	ballNode.removeClass('on');
}
Ball.prototype.stepTop = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
	this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
}
Ball.prototype.stepRightTop = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]-1];
}
Ball.prototype.stepRight = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
}
Ball.prototype.stepRightBottom = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]+1];
}
Ball.prototype.stepBottom = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
	this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
}
Ball.prototype.stepLeft = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
}
Ball.prototype.stepLeftBottom = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]+1];
}
Ball.prototype.stepLeftTop = function () {
	this.preStep();
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]-1];
}
Ball.prototype.bounce = function() {
	switch (this.direction) {
		case 1:
			this.direction = 5;
			this.move(util.gridRowsNum-2);
			break;
		case 2:
			if (this.coordinate[1] == 1) {
				this.direction = 4;
				var maxStep = util.gridColsNum - this.coordinate[0] > util.gridRowsNum - 2 ? util.gridRowsNum - 2 : util.gridColsNum - this.coordinate[0];
				this.move(maxStep);
			} else if (this.coordinate[0] == util.gridColsNum) {
				this.direction = 8;
				var maxStep = util.gridColsNum-1 > this.coordinate[1]-1 ? this.coordinate[1]-1:util.gridColsNum-1;
				this.move(maxStep);
			}
			break;
		case 4:
			if (this.coordinate[1] == util.gridRowsNum - 1) {//encounter slider
				this.direction = 2;
				var maxStep = util.gridColsNum - this.coordinate[0] > util.gridRowsNum - 2 ? util.gridRowsNum - 2 : util.gridColsNum - this.coordinate[0];
				this.move(maxStep);
			} else if (this.coordinate[0] == util.gridColsNum) {
				this.direction = 6;
				var maxStep = util.gridRowsNum - this.coordinate[1] - 1 > util.gridColsNum - 1 ? util.gridColsNum - 1 : util.gridRowsNum - this.coordinate[1] - 1;
				this.move(maxStep);
			}
			break;
		case 5:
			this.direction = 1;
			this.move(util.gridRowsNum-2);
			break;
		case 6:
			if (this.coordinate[1] == util.gridRowsNum - 1) {
				this.direction = 8;
				var maxStep = this.coordinate[0] - 1 > util.gridRowsNum - 2 ? util.gridRowsNum - 2 : this.coordinate[0] - 1;
				this.move(maxStep);
			} else if (this.coordinate[0] == 1) {
				this.direction = 4;
				var maxStep = util.gridColsNum - 1 > util.gridRowsNum - this.coordinate[1] - 1 ? util.gridRowsNum - this.coordinate[1] - 1 : util.gridColsNum - 1;
				this.move(maxStep);
			}
			break;
		case 8:
			if (this.coordinate[1] == 1) {
				this.direction = 6;
				var maxStep = this.coordinate[0]-1 > util.gridRowsNum - 2 ? util.gridRowsNum - 2 : this.coordinate[0]-1;
				this.move(maxStep);
			} else if (this.coordinate[0] == 1) {
				this.direction = 2;
				var maxStep = util.gridColsNum-1 > this.coordinate[1]-1 ? this.coordinate[1]-1:util.gridColsNum-1;
				this.move(maxStep);
			}
			break;
	}
}
Ball.prototype.move = function(step) {
	if (step == 0) {
		this.bounce();
		return;
	}
	var thisBall = this;
	thisBall.movedSteps = 0;
	thisBall.movingSteps = step;
	switch (thisBall.direction) {
		case 1:
			thisBall.thread = setInterval(function() {
				thisBall.stepTop();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					thisBall.bounce();
				}
			}, thisBall.speed);
			break;
		case 2:
			thisBall.thread = setInterval(function() {
				thisBall.stepRightTop();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					thisBall.bounce();
				}
			}, thisBall.speed);
			break;
		case 4:
			thisBall.thread = setInterval(function() {
				thisBall.stepRightBottom();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					if (thisBall.coordinate[0] == util.gridColsNum) {
						thisBall.bounce();
					} else if (jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]+1)+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, util.sliderTime);
					} else {//game over
						thisBall.stepRightBottom();
					}
				}
			}, thisBall.speed);
			break;
		case 5:
			thisBall.thread = setInterval(function() {
				thisBall.stepBottom();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					if (jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+thisBall.coordinate[0]+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, util.sliderTime);
					} else {//game over
						thisBall.stepBottom();
					}
				}
			}, thisBall.speed);
			break;
		case 6:
			thisBall.thread = setInterval(function() {
				thisBall.stepLeftBottom();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					if (thisBall.coordinate[0] == 1) {
						thisBall.bounce();
					} else if (jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]-1)+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, util.sliderTime);
					} else {//game over
						thisBall.stepLeftBottom();
					}
				}
			}, thisBall.speed);
			break;
		case 8:
			thisBall.thread = setInterval(function() {
				thisBall.stepLeftTop();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					thisBall.bounce();
				}
			}, thisBall.speed);
			break;
	}
}
Ball.prototype.keyBoardControl = function() {
	var thisBall = this;
	jQuery(document).on('keydown', function(event) {
		if (event.keyCode == 32) {
			if (thisBall.docked) {
				clearTimeout(thisBall.dockTimeout);
				thisBall.bounce();
				thisBall.docked = false;
			} else {
				clearInterval(thisBall.thread);
				var step = thisBall.movingSteps - thisBall.movedSteps;
				thisBall.speed = util.ballSpeed2;
				thisBall.move(step);
			}
			return false;
		}
	});
	jQuery(document).on('keyup', function(event) {
		if (thisBall.docked) {
			if (event.keyCode == 37) {
				thisBall.direction = 6;
			} else if (event.keyCode == 38) {
				thisBall.direction = 5;
			} else if (event.keyCode == 39) {
				thisBall.direction = 4;
			}
		} else if (event.keyCode == 32) {
			clearInterval(thisBall.thread);
			var step = thisBall.movingSteps - thisBall.movedSteps;
			thisBall.speed = util.ballSpeed;
			thisBall.move(step);
			return false;
		}
	});
}
Ball.prototype.sleep = function(millisecond) {

}


Ball.prototype.init = function() {
	this.draw();
	this.keyBoardControl();
	var random = util.getRandomNum(3,3);
	switch (random) {
		case 1:
			this.direction = 1;
			this.move(util.gridRowsNum-2);
			break;
		case 2:
			this.direction = 2;
			var maxStep = util.gridRowsNum-2 > util.gridColsNum - this.coordinate[0] ? util.gridColsNum - this.coordinate[0] : util.gridRowsNum-2;
			this.move(maxStep);
			break;
		case 3:
			this.direction = 8;
			var maxStep = util.gridRowsNum-2 > this.coordinate[0]-1 ? this.coordinate[0]-1 : util.gridRowsNum-2;
			this.move(maxStep);
			break;
	}
}
