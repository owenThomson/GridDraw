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
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Scale image while maintaining aspect ratio, this helps avoid image distortion
    let scale = Math.min(maxWidth / img.width, maxHeight / img.height);

    // This multiplies the og dimensions by the new ratio to get the new dimensions
    scaledWidth = img.width * scale;
    scaledHeight = img.height * scale;

    // This sets the canvas size to accomodate the new width and height
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    // Draws the new image on the canvas
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
};

function drawGrid() {
    if (!img.src) return;
    // This collects the grid count input from the user, I use base-10 to tell js to intrepet it as a decimal number
    let gridCount = parseInt(gridSizeInput.value, 10);
    // This collects the line thickness input from the user, I use base-10 to tell js to intrepet it as a decimal number
    let lineThickness = parseInt(lineThicknessInput.value, 10);
    // This collects the grid color input from the user 
    let gridColor = gridColorInput.value;


    //  If a user puts too high of an input it defaults to 20 and if a user puts too low of an input it defaults to 1
    gridCount = Math.min(Math.max(gridCount, 1), 20);

    //  The same thing happens here, if a user puts too low of a value it defaults to 1 and if the user puts too igh of a value it defaults to 20
    lineThickness = Math.min(Math.max(lineThickness, 1), 30);


    // Scaled width nd height are the dimensions of the image after resizing to fit the screen
    // Dividing these dimensions by gridcount ensures that the lines will be evenly spaced
    const gridSizeX = scaledWidth / gridCount;
    const gridSizeY = scaledHeight / gridCount;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = lineThickness;

    //This goes through the x positions starting at gridSizeX and increases by gridsizeX each timeand draws a vertical line at each point starting at 0 and going to scaledHeight
    for (let x = gridSizeX; x < scaledWidth; x += gridSizeX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, scaledHeight);
        ctx.stroke();
    }
    //This goes through the y positions starting at gridSizeY and increases by gridsizeY each timeand draws a horizontal line at each point starting at 0 and going to scaledWdth
    for (let y = gridSizeY; y < scaledHeight; y += gridSizeY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(scaledWidth, y);
        ctx.stroke();
    }
}

function removeGrid() {
    img.onload();
}
