const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 0;

// console.log(ctx)

window.addEventListener('resize', function(){ 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = { 
    x: undefined,
    y: undefined
}
canvas.addEventListener('mousemove', function(mouseEvent){ 
    mouse.x = mouseEvent.x;
    mouse.y = mouseEvent.y; 
    for(var i=0; i<4; i++){ 
        particlesArray.push(new Particle());
    }
})

class Particle{ 
    constructor(){ 
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()*canvas.width
        // this.y = Math.random()*canvas.height
        this.size = Math.random()*15 + 1;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5; 
        this.color = 'hsl('+ hue + ', 100%, 50%)';
    } 
    update(){ 
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){ 
        ctx.fillStyle = this.color;
        // ctx.strokeStyle ="white"
        // ctx.lineWidth = 10
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        // ctx.stroke()
        ctx.fill();
    }
}

// function init(){ 
//     for(var i=0; i<100; i++){ 
//         particlesArray.push(new Particle())
//     }
// }
// init()

function handleParticles(){  
    console.log("handlePraticles");
    for(let i=0; i<particlesArray.length; i++){  
        particlesArray[i].update();
        particlesArray[i].draw(); 
        if(particlesArray[i].size <= 0.3){ 
            particlesArray.splice(i, 1);
            i-=1;
        }
    }
}

function animation(){ 
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue++;
    handleParticles();
    requestAnimationFrame(animation);
}
animation();