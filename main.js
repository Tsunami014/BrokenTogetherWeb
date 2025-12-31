const c = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const imgNames = [
    "tile",
    "tile2",
    "space1",
    "space2",
    "nebula1",
    "nebula2"
]
const imgs = new Map()


var x = 0
var y = 0
const units = 8 // How many units in one block (one block is 2x1 'blocks')

function draw() {
    ctx.clearRect(0, 0, c.width, c.height)
    var cols = Math.floor((c.width/c.height + 1) * 4)
    if (cols > 12) {
        cols = 12
    }
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
    blk_xoffs = Math.round(blk_xoffs + cols/2)
    var blk_yoffs = Math.floor(Math.abs(y)/units)*2
    let px_yoffs = Math.abs(y/units*hblk)%hblk
    if (y < 0) {
        px_yoffs = -px_yoffs
    } else {
        blk_yoffs = -blk_yoffs
    }
    blk_yoffs = Math.round(blk_yoffs+rows/2)
    const scale = blk/32
    for (let i = -3; i < rows+6; i++) {
        const offs = (i%2)==0 ? 0 : 0.5
        for (let j = -2; j < cols+2; j++) {
            const tle = imgs.get(getTile(j-blk_xoffs, i-blk_yoffs))
            const xpos = blk*(j-offs)-px_xoffs-1
            const ypos = qblk*i-px_yoffs-1
            const thei = tle.height * scale
            const twid = tle.width * scale
            ctx.drawImage(tle, xpos-twid+hblk, ypos-thei+hblk, twid+2, thei+2)
        }
    }
}


// Keep keys in a dict
const keys = {}
window.addEventListener('keydown', (e) => keys[e.key] = true)
window.addEventListener('keyup', (e) => keys[e.key] = false)

function tick() {
    var oldx = x
    var oldy = y
    if (keys['ArrowUp']) {
        y -= 2
    }
    if (keys['ArrowDown']) {
        y += 2
    }
    if (keys['ArrowLeft']) {
        x -= 1
    }
    if (keys['ArrowRight']) {
        x += 1
    }
    if (oldx != x || oldy != y) {
        draw()
    }
}

function resizeCanvas() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    draw()
}

async function init() {
    // Load all images
    for (const nam of imgNames) {
        const img = new Image()
        img.src = `assets/tiles/${nam}.svg`
        imgs.set(nam, img)
        await img.decode()
    }

    newPlanet()

    resizeCanvas() // Initial draw

    window.addEventListener('resize', resizeCanvas)
    setInterval(tick, 17)
}
init()

