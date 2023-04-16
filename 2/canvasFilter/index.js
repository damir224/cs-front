function init(image, x = 0, y = 0) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const { width, height } = image;

    ctx.clearRect(x, y, width, height);
    ctx.drawImage(image, x, y, width, height);
}
function grayscale(image, x = 330, y = 0) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const { width, height } = image;

    ctx.clearRect(x, y, width, height);
    ctx.drawImage(image, x, y, width, height);

    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // grayscale = (R + G + B)/3
        const R = data[i + 0];
        const G = data[i + 1];
        const B = data[i + 2];
        const avg = (R + G + B) / 3;
        data[i + 0] = avg; // R value
        data[i + 1] = avg; // G value
        data[i + 2] = avg; // B value
    }
    ctx.putImageData(imageData, x, y);
    return canvas;
}

function inverse(canvas, x = 660, y = 0) {
    const ctx = canvas.getContext('2d');
    const width = 330,
        height = 330;

    ctx.clearRect(x, y, width, height);

    const imageData = ctx.getImageData(330, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // inverse = 255-R; 255-G; 255-B
        const R = data[i + 0];
        const G = data[i + 1];
        const B = data[i + 2];
        data[i + 0] = 255 - R; // R value
        data[i + 1] = 255 - G; // G value
        data[i + 2] = 255 - B; // B value
    }

    ctx.putImageData(imageData, x, 0);
}

const filepicker = document.getElementById('filepicker');

filepicker.addEventListener('change', (event) => {
    const URL = window.URL;
    const url = URL.createObjectURL(event.target.files[0]);
    const img = document.createElement('img');
    img.src = url;
    img.width = 330;
    img.height = 330;
    img.onload = function () {
        init(img);
        const grayscaleCanvas = grayscale(img);
        inverse(grayscaleCanvas);
    };
});
