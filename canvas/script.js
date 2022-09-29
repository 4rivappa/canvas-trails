const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

window.addEventListener('resize', function(){ 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const mouse = { 
    x: canvas.width/2,
    y: canvas.height/2
}
canvas.addEventListener('mousemove', function(mouseEvent){ 
    mouse.x = mouseEvent.x;
    mouse.y = mouseEvent.y; 
})

class Particle{ 
    constructor(x, y, radius, color){ 
        this.x = x;
        this.y = y;
        this.size = Math.random()*15 + 1;
        this.radians = Math.random()*Math.PI*2;
        this.velocity = Math.random()*0.03 + 0.01;
        this.speed = Math.random()*6 + 1;
        this.color = color;
        this.radius = radius;
        this.lengthFromCenter = randomIntFromInterval(50, 125);
        this.lastmouse = {x: x, y: y};
    } 
    update(){ 
        const lastpointX = this.x;
        const lastpointY = this.y;
        
        this.lastmouse.x += (mouse.x - this.lastmouse.x)*0.1;
        this.lastmouse.y += (mouse.y - this.lastmouse.y)*0.1;
    
        this.radians += this.velocity;
       
        this.x = this.lastmouse.x + Math.cos(this.radians)*this.lengthFromCenter;
        this.y = this.lastmouse.y + Math.sin(this.radians)*this.lengthFromCenter;
        this.draw(lastpointX, lastpointY);
    }
    draw(lastpointX, lastpointY){ 
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastpointX, lastpointY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function init(){ 
    let radius;
    let index;
    for(var i=0; i<50; i++){ 
        radius = Math.random()*5 + 1;
        index = Math.floor(Math.random()*3);
        particlesArray.push(new Particle(canvas.width/2, canvas.height/2, radius, colors[index]));
    }
}
init();

function handleParticles(){  
    for(let i=0; i<particlesArray.length; i++){  
        particlesArray[i].update();
    }
}

function animation(){ 
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animation);
}
animation();