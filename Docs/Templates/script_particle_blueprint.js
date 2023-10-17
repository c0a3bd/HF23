// rename to script.js before using
// this was saved as a template to make creating future projects easier

//// setup
//Id defined in HTML file
const canvas = document.getElementById('canvas1');

// ctx is short for context
// CanvasRenderingContext2D
const ctx = canvas.getContext('2d');

// sets to full width of browser window
canvas.width = window.innerWidth;

// sets to full height of browser window
canvas.height = window.innerHeight;
ctx.fillStyle = 'green';  // inserted here vs draw module for better performance
console.log(ctx);

// define the fill color

// creates blueprint to contain individual particles
class Particle {
    constructor(effect){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

// manages all particles
// Effect ensures that we draw shapes only within the canvas area
class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 20;
        this.createParticles();
    }

    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }

    handleParticles(context){
        this.particles.forEach(particle => {
            particle.draw(context);
        });
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);

// run loop to draw and re-draw shapes
function animate() {

}