import game from './game.js';

export default function () {
    const defaultSize = 10;
    const canvasSize = { width: 1000, height: 1000 };

    let mousePosition;

    let canvas = document.getElementById('canvas');
    let wrapper = document.getElementById('wrapper');
    let canvasContext = canvas.getContext('2d');

    function renderScreen(gameState) {
        canvas.addEventListener('mousemove', setMousePos, false);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        gameState = game().gameLoop(gameState, mousePosition);

        drawElements(gameState, canvasContext);

        requestAnimationFrame(function () {
            renderScreen(gameState, canvasContext);
        });
    }

    function drawElements(game, canvasContext) {
        for (const bolinha of game.bolinhas) {
            drawCircularEntity(canvasContext, bolinha, '#00ff00');
        }

        drawCircularEntity(canvasContext, game.player.position, '#660099');
    }

    function drawCircularEntity(canvasContext, itemPosition, color) {
        canvasContext.beginPath();
        canvasContext.arc(itemPosition.x, itemPosition.y, itemPosition.radius * defaultSize, 0, Math.PI * 2, true);
        canvasContext.fillStyle = color;
        canvasContext.fill();

        canvasContext.font = '25px serif';
        canvasContext.fillStyle = '#000000';
        canvasContext.textAlign = 'center';
        canvasContext.fillText(itemPosition.radius * defaultSize, itemPosition.x, itemPosition.y);
    }

    function setMousePos(evt) {
        mousePosition = {
            x: evt.clientX,
            y: evt.clientY
        };
    }

    function fixDpi() {
        const dpi = window.devicePixelRatio;

        //create a style object that returns width and height
        const screen = {
            height() {
                return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
            },
            width() {
                return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
            }
        }
        //set the correct attributes for a crystal clear image!
        canvas.setAttribute('width', screen.width() * dpi);
        canvas.setAttribute('height', screen.height() * dpi);
    }

    window.onresize = fixDpi;

    return { renderScreen, fixDpi, defaultSize }
}

