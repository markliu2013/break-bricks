
function Ball(direction, coordinate) {
	this.direction = direction;
	this.coordinate = coordinate;
}
Ball.prototype.draw = function() {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
}
Ball.prototype.stepTop = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
	this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
}
Ball.prototype.stepRightTop = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]-1];
}
Ball.prototype.stepRight = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
}
Ball.prototype.stepRightBottom = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+(this.coordinate[0]+1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]+1];
}
Ball.prototype.stepBottom = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+this.coordinate[0]+')').addClass('on');
	this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
}
Ball.prototype.stepLeftBottom = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]+1)+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]+1];
}
Ball.prototype.stepLeft = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1])+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
}
Ball.prototype.stepLeftTop = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
	jQuery('#grid .row:nth-child('+(this.coordinate[1]-1)+') .col:nth-child('+(this.coordinate[0]-1)+')').addClass('on');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]-1];
}
Ball.prototype.bounce = function() {

	//this.direction = 5;
	//this.move(25);
}
Ball.prototype.move = function(step) {
	var thisBall = this;
	switch (thisBall.direction) {
		case 1:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepTop();
				if (++i === step) {
					clearInterval(stepThread);
					thisBall.bounce();
				}
			}, util.ballSpeed);
			break;
		case 2:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepRightTop();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 3:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepRight();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 4:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepRightBottom();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 5:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepBottom();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 6:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepLeftBottom();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 7:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepLeft();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
		case 8:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepLeftTop();
				if (++i === step) {
					clearInterval(stepThread);
				}
			}, util.ballSpeed);
			break;
	}
}

Ball.prototype.run = function() {
	//this.move(29)

}

Ball.prototype.init = function() {
	this.draw();
	var random = util.getRandomNum(1,3);
	var maxStep = util.gridRowsNum > util.gridColsNum ? Math.floor(util.gridColsNum/2) : util.gridRowsNum-2;
	switch (random) {
		case 1:
			this.direction = 1;
			this.move(util.gridRowsNum-2);
			break;
		case 2:
			this.direction = 2;
			this.move(maxStep);
			break;
		case 3:
			this.direction = 8;
			this.move(maxStep);
			break;
	}
}
