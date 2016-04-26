	function randomFloat (min, max)
	{
		return min + Math.random()*(max-min);
	}
// Create an array to store our particlez
var particlez = [];

// The amount of particlez to render
var particleCount = randomFloat(3,7);

// The maximum velocity in each direction
var maxVelocity = .5;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

// Set the dimensions of the canvas as variables so they can be used.
var canvasWidth = 1500;
var canvasHeight = 1000;

// Create an image object (only need one instance)
var imageObj = new Image();

// Once the image has been downloaded then set the image on all of the particlez
imageObj.onload = function() {
    particlez.forEach(function(particle) {
            particle.setImage(imageObj);
    });
};

// Once the callback is arranged then set the source of the image
imageObj.src = "smoke.png";

// A function to create a particle object.
function Particler(contex) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the contex which will be used to draw the particle
    this.contex = contex;

    // The function to draw the particle on the canvas.
    this.drawz = function() {
        
        // If an image is set draw it
        if(this.image){
            this.contex.drawImage(this.image, this.x-128, this.y-128);         
            // If the image is being rendered do not draw the circle so break out of the draw function                
            return;
        }
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.contex.beginPath();
        this.contex.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.contex.fillStyle = "rgba(0, 255, 255, 1)";
        this.contex.fill();
        this.contex.closePath();
    };

    // Update the particle.
    this.updatez = function() {
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = canvasWidth;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        }
        
        // Check if has crossed the top edge
        else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };
    
    this.setImage = function(image){
        this.image = image;
    }
}

// A function to generate a random number between 2 values
function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

// The canvas contex if it is defined.
var contex;

// Initialise the scene and set the contex if possible
function init() {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {

        // Set the contex variable so it can be re-used
        contex = canvas.getContext('2d');

        // Create the particlez and set their initial positions and velocities
        for(var i=0; i < particleCount; ++i){
            var particled = new Particler(contex);
            
            // Set the position to be inside the canvas bounds
            particled.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));
            
            // Set the initial velocity to be either random and either negative or positive
            particled.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
            particlez.push(particled);            
        }
    }
    else {
        alert("Please use a modern browser");
    }
}

// The function to draw the scene
function drawzz() {
    // Clear the drawing surface and fill it with a black background
//    contex.clearStyle = "rgba(0, 0, 0, 0.5)";
    contex.clearRect(0, 0, 1500, 1000);

    // Go through all of the particlez and draw them.
    particlez.forEach(function(particle) {
        particle.drawz();
    });
}

// Update the scene
function updatezz() {
    particlez.forEach(function(particle) {
        particle.updatez();
    });
}

// Initialize the scene
init();

// If the contex is set then we can draw the scene (if not then the browser does not support canvas)
if (contex) {
    setInterval(function() {
        // Update the scene befoe drawing
        updatezz();

        // Draw the scene
        drawzz();
    }, 1000 / targetFPS);
}