const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let adjustX = 10;
let adjustY = 14;
let sizeMultiple = 8;

const mouse = { 
    x: null,
    y: null,
    radius:100
}
window.addEventListener('mousemove', function(mouseEvent){ 
    mouse.x = mouseEvent.x;
    mouse.y = mouseEvent.y;
});
window.addEventListener('mousedown', function(){ 
    mouse.radius = 150;
})
window.addEventListener('mouseup', function(){ 
    mouse.radius = 100;
})

ctx.fillStyle = 'white';
ctx.font = '25px Verdana';
ctx.fillText('ARIVAPPA', 0, 30);

const textColorData = ctx.getImageData(0, 0, 400, 400);

let particlesArray = [];
class Particle{ 
    constructor(x, y){ 
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random()*40 + 5;
    }
    update(){ 
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        let perXdirection = dx/dist;
        let perYdirection = dy/dist;
        let maxDist = mouse.radius;
        let force = (maxDist - dist)/maxDist;
        let directionX = perXdirection*force*this.density;
        let directionY = perYdirection*force*this.density;

        if(dist < mouse.radius){ 
            this.x -= directionX;
            this.y -= directionY;
        }else{ 
            if(this.x !== this.baseX){ 
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){ 
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
        this.draw();
    }
    draw(){ 
       // ctx.fillStyle = 'white';
        ctx.fillStyle = 'rgb(22, 98, 105)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}

function init(){ 
    particlesArray = [];
    let textDataColumn = textColorData.height;
    for(let y=0; y<textDataColumn; y++){ 
        let textDataRow = textColorData.width;
        for(let x=0; x<textDataRow; x++){ 
             if(textColorData.data[(y*4*textColorData.width) + (x*4) + 3]>128){ 
                 let positionX = x + adjustX;
                 let positionY = y + adjustY; 
                 particlesArray.push(new Particle(positionX*sizeMultiple, positionY*sizeMultiple));
             }
        }
    }
}
init();

function handleParticles(){ 
    for(let i=0; i<particlesArray.length; i++){ 
        particlesArray[i].update();
    }
}

function connect(){ 
    let lineStrength = 1;
    for(let a=0; a<particlesArray.length; a++){ 
         for(let b=a; b<particlesArray.length; b++){ 
             let dx = particlesArray[a].x - particlesArray[b].x;
             let dy = particlesArray[a].y - particlesArray[b].y;
             let dist = Math.sqrt(dx*dx + dy*dy);
             let maxDist = 25;
             lineStrength = 1-(dist/maxDist);
             if(dist < maxDist){ 
                 ctx.strokeStyle = 'rgba(22, 98, 105,'+ lineStrength +')';
                 ctx.lineWidth = 2;
                 ctx.beginPath();
                 ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                 ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                 ctx.stroke();
             }
         }
    }
}

function animate(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    handleParticles();
    connect();
    requestAnimationFrame(animate);
}
animate();
