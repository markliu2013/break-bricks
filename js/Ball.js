/**
 * Class Ball
 * @param direction
 * @param coordinate
 * @constructor
 */
function Ball(direction, coordinate) {
	this.direction = direction;
	this.coordinate = coordinate;
	this.thread = null;
	this.movedSteps = 0;
	this.movingSteps = 0;
	this.speed = game.util.ballSpeed;
	this.docked = false;
	this.dockTimeout = null;
}
Ball.prototype.draw = function() {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
}
Ball.prototype.preStep = function() {
	var ballNode = jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	if (ballNode.hasClass('brick')) {
		game.addScore();
		game.bricks.blockCounts--;
		ballNode.removeClass('brick');
		if (game.bricks.blockCounts == 0) {
			game.stopGame();
		}
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
			this.move(game.util.gridRowsNum-2);
			break;
		case 2:
			if (this.coordinate[1] == 1) {
				this.direction = 4;
				var maxStep = game.util.gridColsNum - this.coordinate[0] > game.util.gridRowsNum - 2 ? game.util.gridRowsNum - 2 : game.util.gridColsNum - this.coordinate[0];
				this.move(maxStep);
			} else if (this.coordinate[0] == game.util.gridColsNum) {
				this.direction = 8;
				var maxStep = game.util.gridColsNum-1 > this.coordinate[1]-1 ? this.coordinate[1]-1:game.util.gridColsNum-1;
				this.move(maxStep);
			}
			break;
		case 4:
			if (this.coordinate[1] == game.util.gridRowsNum - 1) {//encounter slider
				this.direction = 2;
				var maxStep = game.util.gridColsNum - this.coordinate[0] > game.util.gridRowsNum - 2 ? game.util.gridRowsNum - 2 : game.util.gridColsNum - this.coordinate[0];
				this.move(maxStep);
			} else if (this.coordinate[0] == game.util.gridColsNum) {
				this.direction = 6;
				var maxStep = game.util.gridRowsNum - this.coordinate[1] - 1 > game.util.gridColsNum - 1 ? game.util.gridColsNum - 1 : game.util.gridRowsNum - this.coordinate[1] - 1;
				this.move(maxStep);
			}
			break;
		case 5:
			this.direction = 1;
			this.move(game.util.gridRowsNum-2);
			break;
		case 6:
			if (this.coordinate[1] == game.util.gridRowsNum - 1) {
				this.direction = 8;
				var maxStep = this.coordinate[0] - 1 > game.util.gridRowsNum - 2 ? game.util.gridRowsNum - 2 : this.coordinate[0] - 1;
				this.move(maxStep);
			} else if (this.coordinate[0] == 1) {
				this.direction = 4;
				var maxStep = game.util.gridColsNum - 1 > game.util.gridRowsNum - this.coordinate[1] - 1 ? game.util.gridRowsNum - this.coordinate[1] - 1 : game.util.gridColsNum - 1;
				this.move(maxStep);
			}
			break;
		case 8:
			if (this.coordinate[1] == 1) {
				this.direction = 6;
				var maxStep = this.coordinate[0]-1 > game.util.gridRowsNum - 2 ? game.util.gridRowsNum - 2 : this.coordinate[0]-1;
				this.move(maxStep);
			} else if (this.coordinate[0] == 1) {
				this.direction = 2;
				var maxStep = game.util.gridColsNum-1 > this.coordinate[1]-1 ? this.coordinate[1]-1:game.util.gridColsNum-1;
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
					if (thisBall.coordinate[0] == game.util.gridColsNum) {
						thisBall.bounce();
					} else if (jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]+1)+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, game.util.dockTime);
					} else {//game over
						thisBall.stepRightBottom();
						game.stopGame();
					}
				}
			}, thisBall.speed);
			break;
		case 5:
			thisBall.thread = setInterval(function() {
				thisBall.stepBottom();
				if (++thisBall.movedSteps == step) {
					clearInterval(thisBall.thread);
					if (jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+thisBall.coordinate[0]+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, game.util.dockTime);
					} else {//game over
						thisBall.stepBottom();
						game.stopGame();
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
					} else if (jQuery('#grid .row:nth-child('+game.util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]-1)+')').hasClass('on')) {
						thisBall.docked = true;
						thisBall.dockTimeout = setTimeout(function() {
							thisBall.bounce();
							thisBall.docked = false;
						}, game.util.dockTime);
					} else {//game over
						thisBall.stepLeftBottom();
						game.stopGame();
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
		if (event.keyCode == 32 && game.status == 1) {//I need to change this solution to use offKey
			if (thisBall.docked) {
				clearTimeout(thisBall.dockTimeout);
				thisBall.bounce();
				thisBall.docked = false;
			} else {
				clearInterval(thisBall.thread);
				var step = thisBall.movingSteps - thisBall.movedSteps;
				thisBall.speed = game.util.ballSpeed2;
				thisBall.move(step);
			}
			event.preventDefault();
			return false;
		}
	});
	jQuery(document).on('keyup', function(event) {
		if (thisBall.docked && game.status == 1) {//I need to change this solution to use offKey
			if (event.keyCode == 37) {
				thisBall.direction = 6;
			} else if (event.keyCode == 38) {
				thisBall.direction = 5;
			} else if (event.keyCode == 39) {
				thisBall.direction = 4;
			}
		} else if (event.keyCode == 32 && game.status == 1) {
			clearInterval(thisBall.thread);
			var step = thisBall.movingSteps - thisBall.movedSteps;
			thisBall.speed = game.util.ballSpeed;
			thisBall.move(step);
			return false;
		}
	});
}
Ball.prototype.init = function() {
	this.draw();
	this.keyBoardControl();
	var random = game.util.getRandomNum(1,3);
	switch (random) {
		case 1:
			this.direction = 1;
			this.move(game.util.gridRowsNum-2);
			break;
		case 2:
			this.direction = 2;
			var maxStep = game.util.gridRowsNum-2 > game.util.gridColsNum - this.coordinate[0] ? game.util.gridColsNum - this.coordinate[0] : game.util.gridRowsNum-2;
			this.move(maxStep);
			break;
		case 3:
			this.direction = 8;
			var maxStep = game.util.gridRowsNum-2 > this.coordinate[0]-1 ? this.coordinate[0]-1 : game.util.gridRowsNum-2;
			this.move(maxStep);
			break;
	}
}
Ball.prototype.reset = function() {
	clearInterval(this.thread);
	clearInterval(this.dockTimeout);
	this.coordinate = [(game.util.gridColsNum+1)/2, game.util.gridRowsNum-1];
	this.speed = game.util.ballSpeed;
	this.draw();
	var random = game.util.getRandomNum(1,3);
	switch (random) {
		case 1:
			this.direction = 1;
			this.move(game.util.gridRowsNum-2);
			break;
		case 2:
			this.direction = 2;
			var maxStep = game.util.gridRowsNum-2 > game.util.gridColsNum - this.coordinate[0] ? game.util.gridColsNum - this.coordinate[0] : game.util.gridRowsNum-2;
			this.move(maxStep);
			break;
		case 3:
			this.direction = 8;
			var maxStep = game.util.gridRowsNum-2 > this.coordinate[0]-1 ? this.coordinate[0]-1 : game.util.gridRowsNum-2;
			this.move(maxStep);
			break;
	}
}
Ball.prototype.pause = function() {
	var self = this;
	clearInterval(self.thread);
	clearTimeout(self.dockTimeout);
}
Ball.prototype.resume = function() {
	var self = this;
	if (this.docked) {
		self.dockTimeout = setTimeout(function() {
			self.bounce();
			self.docked = false;
		}, game.util.dockTime);
	} else {
		this.move(this.movingSteps - this.movedSteps);
	}
}
