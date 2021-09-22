import screenRender from './screenRender.js';
import game from './game.js';

window.onload = main;

function main() {
    const screen = screenRender();

    screen.fixDpi();

    let gameState = game().startGame();

    screen.renderScreen(gameState);
}