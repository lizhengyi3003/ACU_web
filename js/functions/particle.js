const canvas=document.getElementById('particle-canvas');
const ctx=canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;
const rect=canvas.getBoundingClientRect();
const WIDTH = rect.width;
const HEIGHT = rect.height;
canvas.width = WIDTH * dpr;
canvas.height = HEIGHT * dpr;
ctx.scale(dpr,dpr);
let particles=[];
const particleCount=80;
class Particle {
    constructor() {
        this.x=Math.random()*WIDTH;
        this.y=Math.random()*HEIGHT;
        this.size=Math.random()*2+0.5;
        this.speedX=Math.random()*0.5+0.1;
        this.speedY=Math.random()*-0.8-0.2;
        this.opacity=1;
        this.fadeSpeed=Math.random()*0.001+0.005;
        this.colorShift = Math.random() > 0.5 ? 20 : -20;
    }
    reset() {
        this.x=Math.random()*WIDTH;
        this.y=Math.random()*HEIGHT;
        this.opacity=1;
    }
    update() {
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.opacity-=this.fadeSpeed;
        if(this.opacity<=0) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle = `hsla(${110+this.colorShift},100%,50%,${this.opacity})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `hsla(${110 + this.colorShift}, 100%, 50%, ${Math.min(this.opacity, 0.5)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}
function initParticles() {
    for(let i=0;i<particleCount;i++)
    {
        particles.push(new Particle());
        particles[i].y=Math.random()*HEIGHT;
        particles[i].opacity=Math.random();
    }
}
function animateParticles() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    particles.forEach(p=>{
        p.update();
        p.draw();
    })
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
