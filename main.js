let c = document.getElementById('canvas')
let infoBox = document.getElementById('info')
let ctx = c.getContext('2d')
let simplex1 = new SimplexNoise(cfg.seed)
let simplex2 = new SimplexNoise(simplex1.noise2D(1,1))


ctx.imageSmoothingEnabled = false;
window.addEventListener('resize',resizeCanvas)
document.addEventListener('keydown',(e)=>{
    keysPressed[e.key] = true
    // console.log(e.key);
})
document.addEventListener('keyup',(e)=>{
    keysPressed[e.key] = false
})

function resizeCanvas() {
    c.width = window.innerWidth/cfg.downscale
    c.height = window.innerHeight/cfg.downscale
    c.style.width = window.innerWidth + 'px'
    c.style.height = window.innerHeight + 'px'
    // randomData()
    draw()
}
function randomData() {
    let now = performance.now()
    for (let ix = 0; ix < c.width; ix++) {
        for (let iy = 0; iy < c.height; iy++) {
            let noise = 
                simplex1.noise2D(
                    (ix + cfg.position.x)
                    /cfg.zoom,
                    (iy + cfg.position.y)
                    /cfg.zoom) +
                simplex2.noise2D(
                    (ix + cfg.position.x)
                    /cfg.zoom,
                    (iy + cfg.position.y)
                    /cfg.zoom)
            if (!debug.min || debug.min > noise) {
                debug.min = noise
            }
            if (!debug.max || debug.max < noise) {
                debug.max = noise
            }
            ctx.fillStyle = `hsl(${360*noise},70%,70%)`
            ctx.fillRect(ix,iy,1,1)
        }
    }
    // console.log(`Random data generation took ${performance.now()-now}ms`)
}
function draw() {
    let drawStart = performance.now()
    for (let ix = -(c.width/2); ix < c.width/2; ix++) {
        for (let iy = -(c.height/2); iy < c.height/2; iy++) {
            let noise = 
            simplex1.noise3D(
                (ix/cfg.zoom + cfg.position.x),
                (iy/cfg.zoom + cfg.position.y),
                cfg.year) +
            simplex2.noise3D(
                (ix/cfg.zoom + cfg.position.x),
                (iy/cfg.zoom + cfg.position.y),
                cfg.year)
            noise = Math.floor((((noise+2)/4))*terrain.length)
            ctx.fillStyle = terrain[noise].color
            ctx.fillRect(ix+((c.width/2)),iy+(c.height/2)-(terrain[noise].height*(cfg.zoom/25)),1,1)
            if (terrain[noise].height > 0) {
                ctx.fillStyle = darkenColor(terrain[noise].color,0.5)
                ctx.fillRect(ix+(c.width/2),iy+(c.height/2),1,-(terrain[noise].height*(cfg.zoom/25))+1)
            }
        }
    }
    return performance.now() - drawStart
}
function darkenColor(color, percent) {
    // First, convert the color to HSL:
    var color = new tinycolor(color);
    var hsl = color.toHsl();

    // Then, decrease the lightness value:
    hsl.l -= hsl.l * percent;

    // Finally, convert the HSL color back to HEX:
    var newColor = tinycolor(hsl).toHexString();

    return newColor;
}
function update(forceRedraw = false, forceResize = false) {
    let needsRedraw = (forceRedraw === true) // For some reason, forceRedraw is being set to random really high numbers. I have no clue why, but this seems to be the solution
    let needsResize = forceResize
    if (keysPressed.w) {
        cfg.position.y-=1/cfg.zoom
        needsRedraw = true
    }
    if (keysPressed.a) {
        cfg.position.x-=1/cfg.zoom
        needsRedraw = true
    }
    if (keysPressed.s) {
        cfg.position.y+=1/cfg.zoom
        needsRedraw = true
    }
    if (keysPressed.d) {
        cfg.position.x+=1/cfg.zoom
        needsRedraw = true
    }
    if (keysPressed['-']) {
        cfg.zoom -= cfg.zoom/100
        needsRedraw = true
    }
    if (keysPressed['=']) {
        cfg.zoom += cfg.zoom/100
        needsRedraw = true
    }
    if (keysPressed[',']) {
        cfg.downscale -= 0.25
        needsResize = true
    }
    if (keysPressed['.']) {
        cfg.downscale += 0.25
        needsResize = true
    }
    if (keysPressed['ArrowUp']) {
        // cfg.perspective += 0.025
        cfg.year += cfg.yearSpeed
        needsRedraw = true
    }
    if (keysPressed['ArrowDown']) {
        // cfg.perspective -= 0.025
        cfg.year -= cfg.yearSpeed
        needsRedraw = true
    }
    cfg.zoom = Math.max(cfg.zoom,1)
    if (cfg.enableChange) {
        cfg.year += cfg.yearSpeed
        needsRedraw = true
    }
    if (needsRedraw) { 
        console.log('redrew');
        let drawTime = draw()
        infoBox.innerHTML = `
            x: ${Math.floor(cfg.position.x*10)/10}<br>
            y: ${Math.floor(cfg.position.y*10)/10}<br>
            zoom: ${Math.floor(cfg.zoom*10)/10}<br>
            draw time: ${Math.floor(drawTime)}ms
        `
        if (drawTime > 41) {
            needsResize = true
            cfg.downscale += 0.25
        }
        // randomData()
    }
    if (needsResize) { 
        resizeCanvas()
        draw()
        console.log('redrew');
    }
    requestAnimationFrame(update)
}

resizeCanvas()
update()

