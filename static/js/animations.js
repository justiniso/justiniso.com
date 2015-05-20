
function center($element) {
	$element.css({
		'top': window.innerHeight/2,
		'left': window.innerWidth/2,
		'margin-top': (-1)*$element.innerHeight()/2,
		'margin-left': (-1)*$element.innerWidth()/2
	});
}

function flickerForever(selector) {
	$(selector).animate({'opacity': 0}, {duration: 1})
		.animate({'opacity': 0.5}, {duration: 100})
		.animate({'opacity': 0}, {duration: 20})
		.animate({'opacity': 1}, {duration: 50})
		.animate({'opacity': 0.2}, {duration: 1})
		.animate({'opacity': 0.7}, {duration: 110})
		.animate({'opacity': 0.1}, {duration: 30})
		.animate({'opacity': 0.9}, {duration: 150})
		.animate({'opacity': 0.5}, {duration: 80})
		.animate({'opacity': 0}, {duration: 15})
		.animate({'opacity': 1}, 100, function(){flickerForever(selector);});

};

// takes a variable number of jquery objects and applies the same flicker-in animation to them
function flickerInTogether() {
	// defaults
	var minIterations = minIterations || 10;
	var maxIterations = maxIterations || 20;
	var minDuration = minDuration || 10;
	var maxDuration = maxDuration || 100;

	if(arguments.length<1){ // no arguments provided
		return;
	}

	var iterations = getRandomIntBetween(minIterations, maxIterations);

	for(var i=0; i<iterations; i++){
		var opacity = Math.random();
		var duration = getRandomIntBetween(minDuration, maxDuration);

		// loop through the arguments applying the animation to each element
		for(var a=0; a<arguments.length; a++){
			arguments[a].animate({'opacity': opacity}, {duration: duration});
		}
		
	}

	// apply the final animation to opacity=1
	for(var a in arguments){
		arguments[a].animate({'opacity': 1}, {duration: 200});
	}
}

function flickerOutTogether() {
	// defaults
	var minIterations = minIterations || 10;
	var maxIterations = maxIterations || 20;
	var minDuration = minDuration || 10;
	var maxDuration = maxDuration || 100;

	var iterations = getRandomIntBetween(minIterations, maxIterations);

	if(arguments.length<1){ // no arguments provided
		return;
	}

	for(var i=0; i<iterations; i++){
		var opacity = Math.random();
		var duration = getRandomIntBetween(minDuration, maxDuration);

		// loop through the arguments applying the animation to each element
		for(var a=0; a<arguments.length; a++){
			arguments[a].animate({'opacity': opacity}, {duration: duration});
		}
	}

	// apply the final animation to opacity=1
	for(var a in arguments){
		arguments[a]
			.animate({'opacity': 0}, {duration: 200})
	}
}

function flickerRandom($element, minIterations, maxIterations, minDuration, maxDuration){
	// defaults
	minIterations = minIterations || 10;
	maxIterations = maxIterations || 20;
	minDuration = minDuration || 10;
	maxDuration = maxDuration || 100;

	var iterations = getRandomIntBetween(minIterations, maxIterations);


	for(var i=0; i<iterations; i++){
		var opacity = Math.random();
		var duration = getRandomIntBetween(minDuration, maxDuration);
		$element.animate({'opacity': opacity}, {duration: duration});
	}
}

// unique animation for each element
function flickerInRandom($elements, minIterations, maxIterations, minDuration, maxDuration) {
	// defaults
	minIterations = minIterations || 10;
	maxIterations = maxIterations || 20;
	minDuration = minDuration || 10;
	maxDuration = maxDuration || 100;

	$elements.each(function() {
		flickerRandom($(this), minIterations, maxIterations, minDuration, maxDuration);
	});

	$elements.animate({'opacity': 1}, {duration: 200});
}

function flickerOutRandom($elements, minIterations, maxIterations, minDuration, maxDuration) {
	// defaults
	minIterations = minIterations || 10;
	maxIterations = maxIterations || 20;
	minDuration = minDuration || 10;
	maxDuration = maxDuration || 100;

	$elements.each(function() {
		flickerRandom($(this), minIterations, maxIterations, minDuration, maxDuration);
	});

	$elements.animate({'opacity': 0}, {duration: 200});
}

// lower and upper inclusive
function getRandomIntBetween(lower, upper){
	return Math.floor((Math.random()*(upper-lower+1))+lower);
}

