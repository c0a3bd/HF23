// rename to just script.js if used
// this script adds a connector line if particles are close enough
// no external libraries used


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
ctx.strokeStyle = 'white';
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
        // math tells it to vary color
        context.fillStyle = 'hsl(' + this.x * 1 + ', 100%, 50%)';

        // begin to draw
        context.beginPath();

        // draw circle starting at 0
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // fill the circle with color
        context.fill();

        // outline the circle with black
        // could define another color or line width, but not necessary yet
        // context.stroke();   // enable for testing, but remove because it's performance expensive to outline circles here
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

        // draw the canvas and set constraints
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // store particles in an array
        this.particles = [];

        // should be no less than 60 particles each creation
        this.numberOfParticles = Math.random() + 60 ;  

        // calls createParticles helper
        this.createParticles();
    }

    // create particles helper loop 
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }

    handleParticles(context){
        // canvas draws based on code written top to bottom
        // moving connector lines above drawing particles puts lines behind particles
        this.connectParticles(context);

        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }

    // adds a connector line if particle is close enough
    connectParticles(context){
        const maxDistance = 100;

        // creates nested loops to evaluate whether connector line is needed
        for (let a = 0; a < this.particles.length; a++){
            for (let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x; 
                const dy = this.particles[a].y - this.particles[b].y;
                const distance  = Math.hypot(dx, dy);
                if (distance < maxDistance){
                    context.save();  // tells canvas to save lines below

                    // prevents snpping lines and creates more gradual connector
                    const opacity = 1 - (distance/maxDistance);
                    context.globalAlpha = opacity;

                    // begin to draw
                    context.beginPath();

                    // where to start and where to connect then draw
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();  // tells canvas to restore to default
                }
            }
        }
    }
}

const effect = new Effect(canvas);

// run loop to draw and re-draw shapes at 60 frames per second
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas at each frame to prevent trail
    effect.handleParticles(ctx);

    // draw particles
    requestAnimationFrame(animate);
}

animate();