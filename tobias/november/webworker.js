


// animation-worker.js

let ctx;
let canvasWidth;
let canvasHeight;
let animationId;

// Cirkel klasse
class Circle {
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx; // hastighed i x-retning
        this.vy = vy; // hastighed i y-retning
        this.color = 'green';
        this.filled = false;
    }
    
    // Opdater position
    update() {
        // Bevæg cirklen
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce ved kanter
        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }
        
        // Hold cirklen indenfor canvas
        this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
    }
    
    // Tegn cirklen
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.filled) {
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }
}

// Beregn afstand mellem to cirkler
function getDistance(circle1, circle2) {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Opdater farver baseret på afstand
function updateColors(circle1, circle2) {
    const distance = getDistance(circle1, circle2);
    const radiusSum = circle1.radius + circle2.radius;
    const avgRadius = (circle1.radius + circle2.radius) / 2;
    
    let color;
    let filled = false;
    
    if (distance < radiusSum) {
        // Overlapper - rød med udfyldning
        color = 'rgba(255, 0, 0, 0.5)';
        filled = true;
    } else if (distance <= radiusSum + 5) {
        // Berører hinanden - rød
        color = 'red';
    } else if (distance < radiusSum + avgRadius) {
        // Meget tæt - orange
        color = 'orange';
    } else if (distance < radiusSum + avgRadius * 2) {
        // Tæt - blå
        color = 'blue';
    } else {
        // Langt væk - grøn
        color = 'green';
    }
    
    circle1.color = color;
    circle1.filled = filled;
    circle2.color = color;
    circle2.filled = filled;
}

// Cirkel instancer
let circle1;
let circle2;

// Animation loop
function animate() {
    // Ryd canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Opdater positioner
    circle1.update();
    circle2.update();
    
    // Opdater farver baseret på afstand
    updateColors(circle1, circle2);
    
    // Tegn cirklerne
    circle1.draw();
    circle2.draw();
    
    // Tegn linje mellem cirklerne
    ctx.beginPath();
    ctx.moveTo(circle1.x, circle1.y);
    ctx.lineTo(circle2.x, circle2.y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Vis afstand
    const distance = getDistance(circle1, circle2);
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    const midX = (circle1.x + circle2.x) / 2;
    const midY = (circle1.y + circle2.y) / 2;
    ctx.fillText(`${Math.round(distance)}px`, midX, midY);
    
    // Fortsæt animation
    animationId = requestAnimationFrame(animate);
}

// Lyt efter beskeder fra main thread
self.addEventListener('message', (e) => {
    if (e.data.type === 'init') {
        // Hent offscreen canvas og opsæt context
        const canvas = e.data.canvas;
        ctx = canvas.getContext('2d');
        canvasWidth = e.data.width;
        canvasHeight = e.data.height;
        
        // Opret to cirkler med forskellige hastigheder
        circle1 = new Circle(200, 200, 40, 2, 1.5);
        circle2 = new Circle(600, 400, 50, -1.5, -2);
        
        // Start animationen
        animate();
        
        // Send besked tilbage at worker er klar
        self.postMessage({ type: 'ready' });
    } else if (e.data.type === 'stop') {
        // Stop animationen
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
});