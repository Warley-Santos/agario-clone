export default function screenRender (game, document) {
    const canvasSize = { width: 1000, height: 800 };

    let mousePosition;

    let canvas = document.getElementById('canvas');
    let canvasContext = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    
    canvas.addEventListener('mousemove', (evt) => {
        if (!evt.ctrlKey){
            setMousePos(evt);
        }
    }, false);

    function renderScreen(gameState) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        gameState = game().gameLoop(gameState, mousePosition);

        drawElements(gameState, canvasContext);

        requestAnimationFrame(function () {
            renderScreen(gameState, canvasContext);
        });
    }

    function drawElements(gameState, canvasContext) {
        for (const ball of gameState.balls) {
            drawCircularEntity(canvasContext, ball, '#00ff00');
        }

        drawCircularEntity(canvasContext, gameState.player.position, '#660099');
    }

    function drawCircularEntity(canvasContext, itemPosition, color) {
        canvasContext.beginPath();
        canvasContext.arc(itemPosition.x, itemPosition.y, itemPosition.radius, 0, Math.PI * 2, true);
        canvasContext.fillStyle = color;
        canvasContext.fill();

        // canvasContext.font = '25px serif';
        // canvasContext.fillStyle = '#000000';
        // canvasContext.textAlign = 'center';
        // canvasContext.fillText(itemPosition.radius, itemPosition.x, itemPosition.y);
    }

    function setMousePos(evt) {
        mousePosition = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
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
        canvas.setAttribute('width', canvasSize.width * dpi);
        canvas.setAttribute('height', canvasSize.height * dpi);

        console.log(dpi)
    }

    window.onresize = fixDpi;

    return { renderScreen, fixDpi }
}

