var seed = Math.random()*100000+100

// My custom randomness - an amalgamation of various algorithms
const _hashStrs = [0x27D4EB2D, 0x9E3779B1, 0x165667B1, 0xC2B2AE35, 0x85EBCA6B]
function hash(...args) {
    let h = seed
    for (let i = 0; i < args.length; i++) {
        h ^= args[i] * _hashStrs[i]
    }
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    let out = (h | 0).toString()
    if (out.length < 3) {
        return h | 0
    }
    let hlen = Math.floor(out.length/3)
    return parseInt(out.slice(hlen, hlen*2))
}


var planetid = -1
var planetSze
var y_wonk
var x_wonk
function newPlanet() {
    planetid++
    planetSze = hash(1, 0)%10+10
    planetSze *= planetSze
    x_wonk = (hash(1, 1)%19+1)/20
    y_wonk = (hash(1, 2)%19+1)/40
}

function getTile(x, y) {
    if (x*x*x_wonk + y*y*y_wonk > planetSze) {
        return "space"
    }
    return hash(0, x, y)%2==0 ? "tile" : "tile2"
}
