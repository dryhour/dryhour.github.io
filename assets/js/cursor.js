const coords = { x: 0, y: 0 };
const wrapper = document.querySelector(".cursor-wrapper");
const circles = document.querySelectorAll(".circle");
let lastMouse = { x: 0, y: 0 };
let currentScale = 1;

circles.forEach(c => { c.x = 0; c.y = 0; });

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.02})`;
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.15;
        y += (nextCircle.y - y) * 0.15;
    });

    const first = circles[0];
    const last = circles[circles.length - 1];
    const centerX = (first.x + last.x) / 2;
    const centerY = (first.y + last.y) / 2;
    const distance = Math.hypot(last.x - first.x, last.y - first.y) + 60;

    wrapper.style.width = distance + "px";
    wrapper.style.height = distance + "px";
    wrapper.style.left = centerX + "px";
    wrapper.style.top = centerY + "px";

    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;
    const speed = Math.hypot(dx, dy);

    const targetScale = Math.max(0.6, 1 - speed / 500); // faster = smaller
    currentScale += (targetScale - currentScale) * 0.2; // smooth bounce back
    wrapper.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;

    requestAnimationFrame(animateCircles);
}

animateCircles();