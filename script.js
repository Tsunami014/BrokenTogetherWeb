const c = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const img = new Image();
img.src = "assets/tile.svg"

function draw() {
    ctx.clearRect(0, 0, c.width, c.height); 
    ctx.drawImage(img, 0, 0);
}


function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    draw(); 
}
window.addEventListener('resize', resizeCanvas);

async function init() {
    await img.decode() // Wait for image to be ready
    resizeCanvas(); // Initial draw
}
init()

