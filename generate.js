var seed = Math.random()*100000+100

// My custom randomness - an amalgamation of various algorithms
function hash2(x, y) {
    let h = seed ^ (x * 0x27D4EB2D) ^ (y * 0x9E3779B1);
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    let out = (h | 0).toString()
    if (out.length <= 3) {
        return h | 0
    }
    let hlen = Math.floor(out.length/3)
    return parseInt(out.slice(hlen, hlen*2));
}

function getTile(x, y) {
    return hash2(x, y)%2==0 ? img : img2
}
