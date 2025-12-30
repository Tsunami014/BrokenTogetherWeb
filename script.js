const c = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const img = new Image();
img.src = "assets/tile.svg"
const img2 = new Image();
img2.src = "assets/tile2.svg"

function getTile(x, y) {
    return (x+y)%2==0 ? img : img2
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    const cols = 10
    const twid = Math.ceil(c.width/cols)
    const htwid = twid/2
    const thei = Math.floor(twid/2)
    const hthei = thei/2
    const rows = Math.floor(c.height/thei)*2
    for (let i = 0; i < rows+3; i++) {
        for (let j = 0; j < cols+1; j++) {
            const offs = i%2==0 ? 0 : htwid
            ctx.drawImage(getTile(i, j), twid*j-offs, hthei*(i-1), twid, thei);
        }
    }
}


function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    draw(); 
}
window.addEventListener('resize', resizeCanvas);

async function init() {
    // Wait for images to be ready
    await img.decode()
    await img2.decode()
    resizeCanvas(); // Initial draw
}
init()

