
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
Ball.prototype.stepLeftTop = function () {
	jQuery('#grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on');
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
					thisBall.bounce();
				}
			}, util.ballSpeed);
			break;
		case 4:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepRightBottom();
				if (++i === step) {
					clearInterval(stepThread);
					if (thisBall.coordinate[0] == util.gridColsNum || jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]+1)+')').hasClass('on')) {
						thisBall.bounce();
					} else {//game over
						thisBall.stepRightBottom();
					}
				}
			}, util.ballSpeed);
			break;
		case 5:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepBottom();
				if (++i === step) {
					clearInterval(stepThread);
					if (jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+thisBall.coordinate[0]+')').hasClass('on')) {
						thisBall.bounce();
					} else {//game over
						thisBall.stepBottom();
					}
				}
			}, util.ballSpeed);
			break;
		case 6:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepLeftBottom();
				if (++i === step) {
					clearInterval(stepThread);
					if (thisBall.coordinate[0] == 1 || jQuery('#grid .row:nth-child('+util.gridRowsNum+') .col:nth-child('+(thisBall.coordinate[0]-1)+')').hasClass('on')) {
						thisBall.bounce();
					} else {//game over
						thisBall.stepLeftBottom();
					}
				}
			}, util.ballSpeed);

			break;
		case 8:
			var i = 0;
			var stepThread = setInterval(function() {
				thisBall.stepLeftTop();
				if (++i === step) {
					clearInterval(stepThread);
					thisBall.bounce();
				}
			}, util.ballSpeed);
			break;
	}
}

Ball.prototype.init = function() {
	this.draw();
	var random = util.getRandomNum(2,3);
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
