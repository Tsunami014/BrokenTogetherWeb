const c = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const img = new Image();
img.src = "assets/tile.svg"
const img2 = new Image();
img2.src = "assets/tile2.svg"


var x = 0
var y = 0
const units = 8 // How many units in one block (one block is 2x1 'blocks')

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    const cols = 8
    const blk = Math.ceil(c.width/cols) // width
    const hblk = Math.floor(blk/2) // height or half width
    const qblk = Math.floor(blk/4) // half height
    const rows = Math.floor(c.height/hblk)*2

    var blk_xoffs = Math.floor(Math.abs(x)/units)
    let px_xoffs = Math.abs(x/units*blk)%blk
    if (x < 0) {
        px_xoffs = -px_xoffs
    } else {
        blk_xoffs = -blk_xoffs
    }
    var blk_yoffs = Math.floor(Math.abs(y)/units)*2
    let px_yoffs = Math.abs(y/units*hblk)%hblk
    if (y < 0) {
        px_yoffs = -px_yoffs
    } else {
        blk_yoffs = -blk_yoffs
    }
    for (let i = -3; i < rows+6; i++) {
        const offs = (i%2)==0 ? 0 : 0.5
        for (let j = -2; j < cols+2; j++) {
            const tle = getTile(j-blk_xoffs, i-blk_yoffs)
            const xpos = blk*(j-offs)-px_xoffs-1
            const ypos = qblk*i-px_yoffs-1
            if (tle.width == tle.height) {
                ctx.drawImage(tle, xpos, ypos-hblk, blk+2, blk+2)
            } else {
                ctx.drawImage(tle, xpos, ypos, blk+2, hblk+2)
            }
        }
    }
}


// Keep keys in a dict
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function tick() {
    var oldx = x
    var oldy = y
    if (keys['ArrowUp']) {
        y -= 0.5
    }
    if (keys['ArrowDown']) {
        y += 0.5
    }
    if (keys['ArrowLeft']) {
        x -= 0.5
    }
    if (keys['ArrowRight']) {
        x += 0.5
    }
    if (oldx != x || oldy != y) {
        draw()
    }
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    draw(); 
}

async function init() {
    // Wait for images to be ready
    await img.decode()
    await img2.decode()
    resizeCanvas(); // Initial draw

    window.addEventListener('resize', resizeCanvas);
    setInterval(tick, 17);
}
init()

