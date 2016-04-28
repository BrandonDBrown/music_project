//Resizing for difference browser size
	var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight,
			container = document.querySelector('#container'),
			canvas = document.querySelector('#pixie'),
			canvazz = ["#canvas", "#pixie", "#myCanvas", "#drums" ]


	function setDimensions(e) {
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight;
			container.style.width = WIDTH+'px';
			container.style.height = HEIGHT+'px';
		
			canvazz.forEach(function(entry) {
				document.querySelector(entry).width = WIDTH;
				document.querySelector(entry).height = HEIGHT;	
			});	
	}
	setDimensions();
	window.addEventListener('resize', setDimensions);

//RANDOM NUMBERS FUNCTION	
function randomFloat (min, max) {
		return min + Math.random()*(max-min);
}