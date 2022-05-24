const setHexBtn = document.getElementById('setHexBtn');
const hexColorInput = document.getElementById('hexColor');
const coloredDiv = document.getElementById('coloredDiv');
const hexColorError = document.getElementById('hexColorError');
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const setRGBBtn = document.getElementById('setRGBBtn');
const rgbError = document.getElementById('rgbError');
const randomGenerateColorCheckbox = document.getElementById('randomGenerateColor');
let myInterval;


function colorizeDivHex(color) {
    coloredDiv.style.backgroundColor = color[0] !== '#' ? `#${color}` : color;
}

function colorizeDivRgb(color) {
    coloredDiv.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
}

function checkAreColorsValid(red, blue, green) {
    return red && !isNaN(red)
        && blue && !isNaN(blue)
        && green && !isNaN(green);
}

function generateRandomColor() {
    return Math.floor(Math.random() * (255 + 1));
}

function randomlyChangeColor() {
    const color = {
        red: generateRandomColor(),
        blue: generateRandomColor(),
        green: generateRandomColor()
    };
    colorizeDivRgb(color);
    redInput.value = color.red;
    greenInput.value = color.green;
    blueInput.value = color.blue;
}


setHexBtn.onclick = function () {
    let color = hexColorInput.value;

    if (!color) {
        hexColorError.classList.remove('hide');
    } else {
        hexColorError.classList.add('hide');
        colorizeDivHex(color);
    }
}

setRGBBtn.onclick = function () {
    let red = redInput.value;
    let blue = blueInput.value;
    let green = greenInput.value;

    if (!checkAreColorsValid(red, blue, green)) {
        rgbError.classList.remove('hide');
    } else {
        rgbError.classList.add('hide');
        colorizeDivRgb({ red, blue, green });
    }
}

randomGenerateColorCheckbox.onchange = function () {
    if (randomGenerateColorCheckbox.checked) {
        myInterval = setInterval(randomlyChangeColor, 3000);
    } else {
        clearInterval(myInterval);
    }
}