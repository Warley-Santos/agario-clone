import util from './util.js';

export default function () {

    function startGame() {
        let gameState = {};

        let player = { id: '1234', position: { x: 500, y: 500, radius: 10 } };

        gameState = {
            player: player,
            balls: generateBalls(30)
        };

        return gameState;
    }

    function generateBalls(quantidade) {
        let balls = [];

        for (var i = 0; i < quantidade; i++) {
            balls.push({ id: util.random(1000000), x: util.random(canvas.width), y: util.random(canvas.height), radius: util.randomMin(3, 16.5), color: util.randomColorHex() });
        }

        return balls;
    }

    function gameLoop(gameState, mouseposition) {
        let game = checkCollisionCapture(gameState);
        game.player = movePlayer(game.player, mouseposition);

        return game;
    }

    function checkCollisionCapture(game) {
        let playerPos = game.player.position;

        for (const ball of game.balls) {
            let dx = ball.x - playerPos.x;
            let dy = ball.y - playerPos.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            //collision
            if (distance < (playerPos.radius) + (ball.radius)) {

                //catch
                if (distance < (playerPos.radius) - (ball.radius)) {
                    console.log(`catch: ${ball.id}`);

                    game.player.position.radius = incrementPlayer(playerPos, ball);
                    game.balls = game.balls.filter((value, index, arr) => {
                        return value.id != ball.id;
                    });

                    return game;
                }
            }
        }

        return game;
    }

    function incrementPlayer(playerPosition, ball) {
        let playerArea = Math.PI * Math.pow(playerPosition.radius, 2);
        let ballArea = Math.PI * Math.pow(ball.radius, 2);
        let totalArea = playerArea + ballArea;

        let newRadius = Math.sqrt(totalArea / Math.PI);

        return newRadius;
    }

    function movePlayer(player, position) {
        if (position) {
            player.position = nextPosition(player.position, position);
        }

        return player;
    }

    function nextPosition(startPos, finalPos) {
        let speed = 2.5;
        let nextPos;

        let dx = finalPos.x - startPos.x;
        let dy = finalPos.y - startPos.y;

        let length = Math.sqrt(dx * dx + dy * dy);

        // smooth stop
        if (length <= startPos.radius * 2000) {
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