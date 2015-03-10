/**
 * Class Game
 * @constructor
 */
function Game() {
	this.status = 0;// 0 stopped  1 running  2 paused
	this.grid = null;
	this.slider = null;
	this.ball = null;
	this.bricks = new Bricks();
	this.util = new Util();
	this.stateText = ['Stopped', 'Running', 'Paused'];
	this.score = 0;
}
Game.prototype.init = function() {
	var self = this;
	self.loadConfig();
	self.bindConfigUIData();
	self.status = 1;
	self.grid = new Grid(self.util.gridRowsNum, self.util.gridColsNum);
	self.grid.init();
	self.slider = new Slider((self.util.gridColsNum+1)/2-(Math.floor(self.util.sliderLength/2)));
	self.slider.init();
	self.ball = new Ball(1, [(self.util.gridColsNum+1)/2, self.util.gridRowsNum-1]);
	self.ball.init();
	self.bricks = new Bricks();
	self.bricks.init();
	self.bindEvent();
	jQuery('#pause-game').removeClass('disabled');
	jQuery('#reset-game').removeClass('disabled');
	$('#game-state').text(self.stateText[self.status]);
}
Game.prototype.getConfig = function() {
	var result = {};
	result.gridRowsNum = localStorage.getItem('bricks-gridRowsNum') || this.util.gridRowsNum;
	result.gridColsNum = localStorage.getItem('bricks-gridColsNum') || this.util.gridColsNum;
	result.ballSpeed = localStorage.getItem('ballSpeed') || this.util.ballSpeed;
	result.dockTime = localStorage.getItem('dockTime') || this.util.dockTime;
	result.sliderLength = localStorage.getItem('sliderLength') || this.util.sliderLength;
	return result;
}
Game.prototype.saveConfigAsLocalStorage = function() {
	var gridRowsNum = jQuery('#select-gridRowNum').val();
	var gridColsNum = jQuery('#select-gridColNum').val();
	var ballSpeed = jQuery('#select-ball-speed').val();
	var dockTime = jQuery('#select-dock-time').val();
	var sliderLength = jQuery('#select-slider-length').val();
	localStorage.setItem('bricks-gridRowsNum', gridRowsNum);
	localStorage.setItem('bricks-gridColsNum', gridColsNum);
	localStorage.setItem('ballSpeed', ballSpeed);
	localStorage.setItem('dockTime', dockTime);
	localStorage.setItem('sliderLength', sliderLength);
}
Game.prototype.resetConfig = function() {
	var defaultConfig = new Util();
	localStorage.setItem('bricks-gridRowsNum', defaultConfig.gridRowsNum);
	localStorage.setItem('bricks-gridColsNum', defaultConfig.gridColsNum);
	localStorage.setItem('ballSpeed', defaultConfig.ballSpeed);
	localStorage.setItem('dockTime', defaultConfig.dockTime);
	localStorage.setItem('sliderLength', defaultConfig.sliderLength);
	this.loadConfig();
}
Game.prototype.loadConfig = function() {
	var config = this.getConfig();
	jQuery('#select-gridRowNum').val(config.gridRowsNum);
	jQuery('#select-gridColNum').val(config.gridColsNum);
	jQuery('#select-ball-speed').val(config.ballSpeed);
	jQuery('#select-dock-time').val(config.dockTime);
	jQuery('#select-slider-length').val(config.sliderLength);
}
Game.prototype.addScore = function() {
	jQuery('#score-num').text(++this.score);
}
Game.prototype.bindEvent = function() {
	var self = this;
	jQuery('#start-game').on('click', function(event) {
		self.startNew();
		event.preventDefault();
		return false;
	});
	jQuery('#pause-game').on('click', function(event) {
		if (jQuery(this).hasClass('disabled')) {
			return false;
		}
		if (jQuery(this).hasClass('paused')) {
			self.continueGame();
		} else {
			self.pauseGame();
		}
		event.preventDefault();
		return false;
	});
	jQuery('#reset-game').on('click', function(event) {
		self.resetConfig();
		self.startNew();
		event.preventDefault();
		return false;
	});
}
Game.prototype.startNew = function() {
	var self = this;
	self.bindConfigUIData();
	self.saveConfigAsLocalStorage();
	self.status = 1;
	self.score = 0;
	jQuery('#score-num').text(this.score);
	self.grid.rowsNum = self.util.gridRowsNum;
	self.grid.colsNum = self.util.gridColsNum;
	self.grid.draw();
	self.bricks.init();
	self.ball.reset();
	self.slider.reset();
	jQuery('#pause-game').removeClass('disabled');
	jQuery('#reset-game').removeClass('disabled');
	jQuery('#game-state').text(self.stateText[self.status]);
}
Game.prototype.continueGame = function() {
	var self = this;
	self.status = 1;
	this.ball.resume();
	self.slider.resume();
	jQuery('#pause-game').text('Pause');
	jQuery('#pause-game').removeClass('paused');
	jQuery('#game-state').text(self.stateText[self.status]);
}
Game.prototype.pauseGame = function() {
	this.status = 2;
	this.ball.pause();
	this.slider.pause();
	jQuery('#pause-game').text('Continue');
	jQuery('#pause-game').addClass('paused');
	jQuery('#game-state').text(this.stateText[this.status]);
}
Game.prototype.stopGame = function() {
	this.pauseGame();
	this.status = 0;
	jQuery('#pause-game').addClass('disabled');
	jQuery('#game-state').text(this.stateText[this.status]);
}
Game.prototype.bindConfigUIData = function() {
	this.util.gridRowsNum = parseInt(jQuery('#select-gridRowNum').val());
	this.util.gridColsNum = parseInt(jQuery('#select-gridColNum').val());
	this.util.ballSpeed = parseInt($('#select-ball-speed').val());
	this.util.dockTime = parseInt($('#select-dock-time').val());
	this.util.sliderLength = parseInt($('#select-slider-length').val());
}









