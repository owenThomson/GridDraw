const upload = document.getElementById('upload');
const gridSizeInput = document.getElementById('gridSize');
const lineThicknessInput = document.getElementById('lineThickness');
const gridColorInput = document.getElementById('gridColor');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let scaledWidth, scaledHeight;

upload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

img.onload = function () {
    // This makes it so there is space on the sides, this is the look I want to allow google adds on the sides for the future lol
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;

    // Scale image while maintaining aspect ratio
    let scale = Math.min(maxWidth / img.width, maxHeight / img.height);

    scaledWidth = img.width * scale;
    scaledHeight = img.height * scale;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
};

function drawGrid() {
    if (!img.src) return;
    let gridCount = parseInt(gridSizeInput.value, 10);
    let lineThickness = parseInt(lineThicknessInput.value, 10);
    let gridColor = gridColorInput.value;


    //  I put limits on the amount of grid you can have as well as how thick you can make the lines
    gridCount = Math.min(Math.max(gridCount, 1), 20);
    lineThickness = Math.min(Math.max(lineThickness, 1), 30);

    const gridSizeX = scaledWidth / gridCount;
    const gridSizeY = scaledHeight / gridCount;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = lineThickness;

    for (let x = gridSizeX; x < scaledWidth; x += gridSizeX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, scaledHeight);
        ctx.stroke();
    }

    for (let y = gridSizeY; y < scaledHeight; y += gridSizeY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(scaledWidth, y);
        ctx.stroke();
    }
}
