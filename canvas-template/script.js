const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []

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
})

class Particle{ 
    constructor(){ 
        // this.x = mouse.x
        // this.y = mouse.y
        this.x = Math.random()*canvas.width
        this.y = Math.random()*canvas.height
        this.size = Math.random()*5 + 1
        this.speedX = Math.random()*3 - 1.5
        this.speedY = Math.random()*3 - 1.5
    } 
    update(){ 
        this.x += this.speedX 
        this.y += this.speedY
    }
    draw(){ 
        ctx.fillStyle ='blue'
        // ctx.strokeStyle ="white"
        // ctx.lineWidth = 10
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
        // ctx.stroke()
        ctx.fill()
    }
}

function init(){ 
    for(var i=0; i<100; i++){ 
        particlesArray.push(new Particle())
    }
}
init()

function handleParticles(){ 
    for(var i=0; i<particlesArray.length; i++){ 
        particlesArray[i].update()
        particlesArray[i].draw()
    }
}

function animation(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    handleParticles()
    requestAnimationFrame(animation)
}

animation()