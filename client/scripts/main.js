import screenRender from './screenRender.js';
import game from './game.js';

window.onload = main;

function main() {
    const screen = screenRender(game, document);
    
    screen.fixDpi();
    
    let gameState = game().startGame();
        
    screen.renderScreen(gameState);
}