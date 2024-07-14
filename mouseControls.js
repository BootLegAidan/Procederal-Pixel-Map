// Detect and update when a user drags the screen, brought to you by microsoft copilot
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

c.addEventListener('mousedown', function(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

c.addEventListener('mousemove', function(event) {
    if (isDragging) {
        let dy = (event.clientY - previousMousePosition.y) * (0.1/cfg.downscale);
        let dx = (event.clientX - previousMousePosition.x) * (0.1/cfg.downscale);
        cfg.position.x -= dx;
        cfg.position.y -= dy;
        previousMousePosition = { x: event.clientX, y: event.clientY };
        requestAnimationFrame(draw())
    }
});

c.addEventListener('mouseup', function(event) {
    isDragging = false;
});

let lastScrollTop = 0; // set initial scroll position

window.addEventListener('wheel', function(event) {
 if (event.deltaY < 0) {
    cfg.zoom += cfg.zoom/25
 }
 else if (event.deltaY > 0) {
    cfg.zoom -= cfg.zoom/25
 }
 this.requestAnimationFrame(draw())
});