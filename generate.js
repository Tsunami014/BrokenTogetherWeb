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
    planetSze = hash(planetid, 1, 0)%10+10
    planetSze *= planetSze
    x_wonk = (hash(planetid, 1, 1)%19+1)/8
    y_wonk = (hash(planetid, 1, 2)%19+1)/35
}

function rand(x, y, ...extra) {
    return hash(planetid, 0, x, y, ...extra)
}
function smoothrand(x, y, blksze, mod, ...extra) {
    let tx
    if (x >= 0) {
        tx = x%blksze / blksze
    } else {
        tx = -((-x)%blksze) / blksze
    }
    let ty
    if (x >= 0) {
        ty = y%blksze / blksze
    } else {
        ty = -((-y)%blksze) / blksze
    }
    let ix = Math.floor(x/blksze)
    let iy = Math.floor(y/blksze)
    return Math.round(
        rand(ix, iy, ...extra) % mod   * (1 - tx) * (1 - ty) +
        rand(ix+1, iy, ...extra) % mod * tx       * (1 - ty) +
        rand(ix, iy+1, ...extra) % mod * (1 - tx) * ty +
        rand(ix+1,iy+1, ...extra) %mod * tx       * ty)%mod
}

function getTile(x, y) {
    let dist = x*x*x_wonk + y*y*y_wonk
    if (dist > planetSze) {
        if (dist > planetSze+64 && smoothrand(x, y, 10, 4, 1) == 0) {
            return "nebula"+(rand(x, y, 2)%2+1).toString()
        }
        return "space"+(rand(x, y, 2)%2+1).toString()
    }
    return rand(x, y)%2==0 ? "tile" : "tile2"
}
