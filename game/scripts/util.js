export function randomColorHex() {
    return rgbToHex(random(255), random(255), random(255));
}

export function rgbToHex(r, g, b) {
    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function random(max) {
    return Math.floor(Math.random() * max);
}

export function randomMin(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default { randomColorHex, rgbToHex, random, randomMin }