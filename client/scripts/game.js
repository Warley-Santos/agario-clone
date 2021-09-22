import util from './util.js';

export default function () {

    function startGame() {
        let gameState = {};

        let player = { id: '1234', position: { x: 500, y: 500, radius: 30 } };

        gameState = {
            player: player,
            bolinhas: geraBolinhas(30)
        };

        return gameState;
    }

    function geraBolinhas(quantidade) {
        let bolinhas = [];

        for (var i = 0; i < quantidade; i++) {
            bolinhas.push({ id: util.random(1000000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(10, 50), color: util.randomColorHex() });
        }

        return bolinhas;
    }

    function gameLoop(gameState, mouseposition) {
        let game = checkCollisionCapture(gameState);
        game.player = movePlayer(game.player, mouseposition);

        return game;
    }

    function checkCollisionCapture(game) {
        let playerPos = game.player.position;

        for (const bolinha of game.bolinhas) {
            let dx = bolinha.x - playerPos.x;
            let dy = bolinha.y - playerPos.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            //collision
            if (distance < (playerPos.radius) + (bolinha.radius)) {

                //catch
                if (distance < (playerPos.radius) - (bolinha.radius)) {
                    console.log(`catch: ${bolinha.id}`);

                    game.player.position.radius = incrementPlayer(playerPos, bolinha);
                    game.bolinhas = game.bolinhas.filter((value, index, arr) => {
                        return value.id != bolinha.id;
                    });

                    return game;
                }
            }
        }

        return game;
    }

    function incrementPlayer(playerPosition, bolinha) {
        let areaPlayer = Math.PI * Math.pow(playerPosition.radius, 2);
        let areaBolinha = Math.PI * Math.pow(bolinha.radius, 2);
        let areaTotal = areaPlayer + areaBolinha;

        let newRadius = Math.sqrt(areaTotal / Math.PI);

        return newRadius;
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

        // smooth stop
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