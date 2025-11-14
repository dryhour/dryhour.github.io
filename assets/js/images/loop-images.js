export default function loop(foldername, images, imageId, linkId, speed = 3000) {
    let currentIndex = 0;

    const imageElement = document.getElementById(imageId);
    const linkElement = document.getElementById(linkId);

    if (!imageElement || !linkElement) {
        console.error(`loop() error: Element not found: ${imageId}, ${linkId}`);
        return;
    }

    function showNextImage() {
        const img = images[currentIndex];
        const path = `images/${foldername}/${img}`;

        imageElement.src = path;
        linkElement.href = path;

        currentIndex = (currentIndex + 1) % images.length;
    }

    showNextImage();
    return setInterval(showNextImage, speed); // Return interval ID
}
