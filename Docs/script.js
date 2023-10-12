//// setup
//Id defined in HTML file
const canvas = document.getElementById('canvas1');

// ctx is short for context
// CanvasRenderingContext2D
const ctx = canvas.getContext('2d')

// sets to full width of browser window
canvas.width = window.innerWidth;

// sets to full height of browser window
canvas.height = window.innerHeight;

// uncomment line 16 to view properties
//console.log(ctx);

ctx.fillStyle = 'white';
ctx.fillRect(250,150, 100, 200);

// creates blueprint to contain individual particles
class Particle {


}

// manages all particles
class Effect {


}


// run loop to draw and re-draw shapes
function animate() {

}