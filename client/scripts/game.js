import util from './util.js';
import screenRender from "./screenRender.js";

export default function () {

    function startGame() {
        let gameState = {};

        let player = { id: '1234', position: { x: 500, y: 500, radius: 3 } };

        gameState = {
            player: player,
            bolinhas: [
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
                { id: util.random(10000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(1, 4), color: util.randomColorHex() },
            ]
        };

        return gameState;
    }

    function gameLoop(gameState, mouseposition) {
        let game = checkColision(gameState);
        game.player = movePlayer(game.player, mouseposition);

        return game;
    }

    function checkColision(game) {
        const screen = screenRender();

        let playerPos = game.player.position;

        for (const bolinha of game.bolinhas) {
            let dx = bolinha.x - playerPos.x;
            let dy = bolinha.y - playerPos.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < (playerPos.radius * screen.defaultSize) + (bolinha.radius * screen.defaultSize)) {
                console.log(`bateu: ${distance}`);

                if (distance < (playerPos.radius * screen.defaultSize) - (bolinha.radius * screen.defaultSize)) {
                    console.log(`engoliu: ${distance}`);

                    game.bolinhas = game.bolinhas.filter((value, index, arr) => {
                        return value.id != bolinha.id;
                    });

                    return game;
                }
            }
        }

        return game;
    }

    function movePlayer(player, position) {
        if (position) {
            player.position = nextPosition(player.position, position);
        }

        return player;
    }

    function nextPosition(startPos, finalPos) {
        let speed = 15;
        let nextPos;
        
        let dx = finalPos.x - startPos.x;
        let dy = finalPos.y - startPos.y;

        let length = Math.sqrt(dx * dx + dy * dy);

        // altera a velocidade para fazer uma parada suave no destino
        if (length <= startPos.radius * 100) {
            let newSpeed = length / speed;

            speed = newSpeed <= speed ? newSpeed : speed;
        }

        dx /= length;
        dy /= length;

        dx *= speed;
        dy *= speed;

        nextPos = startPos;
        nextPos.x += dx;
        nextPos.y += dy;

        return nextPos;
    }

    return { startGame, gameLoop };
}