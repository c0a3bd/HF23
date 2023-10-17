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

// creates blueprint to contain individual particles
class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 30 + 15;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 4 - 2;  // defines the speed of movement L to R
        this.vy = Math.random() * 4 - 2;  // defines the speed of movement U to D
    }

    draw(context){

        // sets the color of the color wheel from left to right
        context.fillStyle = 'hsl(' + this.x * 1 + ', 100%, 50%)';

        // begin to draw
        context.beginPath();

        // draw circle starting at 0
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // fill the circle with color
        context.fill();

        // outline the circle with black
        // could define another color or line width, but not necessary yet
        context.stroke();
    }

    // make particles bounce
    update(){
        this.x+= this.vx;  

        // set loop to bounce particle
        // +1 by default based on code in this.vx above
        // if particle hits right side send it back the opposite way
        // +1 times -1 is -1
        // -1 times -1 is +1
        // adding or statement for opposite side
        // move L to R
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
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
        this.numberOfParticles = 50;
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
            particle.update();
        });
    }
}

const effect = new Effect(canvas);

// run loop to draw and re-draw shapes at 60 frames per second
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas at each frame to prevent trail
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}

animate();