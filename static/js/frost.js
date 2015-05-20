// 
// 
// Requires animations.js
// 
// 



var INTERVAL = 25; // used to move objects along fixed-size square 'pixels'
var doorsOpen = false;
var currentPage = 0;

var $document;

var $container;
var $background;
var $foreground;

var $frontCanvas;
var $backCanvas;

var $cursor;
var $cursorClick;

var $doors;
var $doorTop;
var $doorBottom;

// modules
var $modules; // all modules

var $modulePinwheel;
var $moduleName;
var $moduleMainInfo;

var $audio;


function cacheObjects() {

	$document = $(document);

	$container = $(".container");
	$background = $(".background");
	$foreground = $(".foreground");

	$frontCanvas = $(".canvas.front")[0];
	$backCanvas = $(".canvas.back")[0];

	// cursor
	$cursor = $(".cursor");
	$cursorClick = $(".cursor.click");

	// doors
	$doors = $(".door");
	$doorTop = $(".door.top");
	$doorBottom = $(".door.bottom");

	// modules
	$modules = $(".module");

	$modulePinwheel = $(".module.pinwheel");
	$moduleName = $(".module.name");
	$moduleMainInfo = $(".module.main-info");

	// media
	// $audio = $("#chargeup");
}

function setEventListeners() {
	$('.explore-site').bind('click', function() {
		goToMainPage();
	});
}




// Moves an element in a direction by the INTERVAL
function shift(selector, direction) {

	// Get css left and top positions and convert them to an int
	var left_pos = $(selector).css('left');
	var top_pos = $(selector).css('top');
	left_pos = parseInt(left_pos);
	top_pos = parseInt(top_pos);

	// Set the CSS left or top positions
	if(direction=="left") {
		$(selector).css(	{'left': (left_pos - INTERVAL)}	);
	}
	else if (direction=="right") {
		$(selector).css(	{'left': (left_pos + INTERVAL)}	);
	}
	else if (direction=="up") {
		$(selector).css(	{'top': (top_pos - INTERVAL)}	);
	}
	else if (direction=="down") {
		$(selector).css(	{'top': (top_pos + INTERVAL)}	);
	}
	else {return false}

	return true;

}


function trackMouse() {

	$(document).mousemove(function(e){
		var mouse_X = e.pageX;
		var mouse_Y = e.pageY;
		var cursor_X = mouse_X - (mouse_X % INTERVAL);
		var cursor_Y = mouse_Y - (mouse_Y % INTERVAL);
		var cursor_css = {
			'left': cursor_X,
			'top': cursor_Y
		}
		var click_css = {
			'left': cursor_X-INTERVAL,
			'top': cursor_Y-INTERVAL
		}
		

		$cursor.css(cursor_css);
		$cursorClick.css(click_css).hide();

	});

	$(document).mousedown(function() {
		$cursorClick.show();
	})

	$(document).mouseup(function() {
		$cursor.show();
		$cursorClick.hide();
	})



}

function openDoors(duration, topHeight, bottomHeight) {
	// defaults
	duration = duration || 800;
	topHeight = topHeight || 40;
	bottomHeight = bottomHeight || 40;


	$doorTop.animate({'height': topHeight}, duration);
	$doorBottom.animate({
			'height': bottomHeight,
			'top': window.innerHeight-bottomHeight
		}, duration);

	// have to add shadow after otherwise looks weird when doors closed
	$doors.css({ 'box-shadow': '0px 2px 6px 7px #959595' });

	doorsOpen = true;
}

function closeDoors(duration) {
	// defaults
	duration = duration || 800;

	if(doorsOpen) {

		var windowHeight = window.innerHeight;
		var doorTopHeight = $doorTop.height;
		var doorBottomHeight = $doorBottom.height;

		$doorTop.animate({ 'height': windowHeight/2 }, duration);
		$doorBottom.animate({
				'height': windowHeight/2,
				'top': windowHeight/2
			}, duration);

		// have to hide shadow after otherwise looks weird when doors closed
		setTimeout(function(){
			$doors.css({ 'box-shadow': 'none' });
		}, duration);
		
		doorsOpen = false;
	}
}

function setPositions() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	/*
	if(!doorsOpen) {
		$doorTop.css({'top:': 0, 'left': 0});
		$doorBottom.css({'top': ((height/2)+2), 'left': 0});
	} else {
		// maintain positions of doors so that only 40px shows from top or bottom when window resized
		$doorTop.css({'top': 0, 'left': 0, 'height': 40});
		$doorBottom.css({'top': ((height)-40), 'left': 0, 'height': 40});
	}
	*/

	$container.css({
		'width': width,
		'height': height
	});

	center($moduleMainInfo);
}

function goToMainPage() {
	$modulePinwheel.fadeOut(800);
	$moduleName.fadeOut(800, function() {
		flickerInRandom($moduleMainInfo);
	});
}

$(document).ready( function() {
	//$('.page-start').fadeOut(1);
});

$(window).load( function() {

	cacheObjects();
	setPositions();
	setEventListeners();
	trackMouse();

	//setTimeout(openDoors, 100);
	//setTimeout( function() {
	//	circleOutFromCenter($backCanvas, 15);
	//	$audio[0].play();
	//}, 600);
	//setTimeout( function(){
	//	flickerInRandom($modulePinwheel);
	//	flickerInRandom($moduleName);
	//	$modulePinwheel.fadeIn(1400);
	//	$moduleName.fadeIn(900);
	//}, 600);

	window.onresize = function() {
		setPositions();
	};


});