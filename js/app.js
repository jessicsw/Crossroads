let game = {
    tileWidth: 100,
    tileHeight: 80,
    upperLimit: 400,
    lowerLimit: 0,
    enemyWidth: 105,
    accelerator: 1.2,
};

//Enemy bug constructor
class Enemy {
    constructor(x = 0, y = 140, direction, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed
        this.direction = direction;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update = dt => {
        switch (this.direction) {
            case "+":
                this.x += (this.speed * dt);
                this.x > (game.upperLimit + game.enemyWidth) &&
                    this.randomizeBugSpecs("+");
                break;
            case "-":
                this.x -= (this.speed * dt);
                this.x < (game.lowerLimit - game.enemyWidth) &&
                    this.randomizeBugSpecs();
                break;

        }
    }

    randomizeBugSpecs = direction => {
        direction === "+"
            ? (this.x = game.lowerLimit - game.enemyWidth)
            : (this.x = game.upperLimit + game.enemyWidth)
        this.changeDirection();
    };

    // Draw the enemy on the screen, required method for game
    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    changeDirection = () => {
        let newDir = Math.random();
        (newDir > 0.5) ? (this.direction = "+") : (this.direction = "-")
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x = (game.tileWidth * 2), y = (game.tileHeight * 5)) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
    };

    update = () => {
        //Play board limitations
        if (this.x < game.lowerLimit) {
            this.x = game.lowerLimit;
        }
        else if (this.x > game.upperLimit) {
            this.x = game.upperLimit;
        }
        else if (this.y < game.lowerLimit) {
            this.y = game.lowerLimit;
        }
        else if (this.y > game.upperLimit) {
            this.y = game.upperLimit;
        }
    };

    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput = key => {
        switch (key) {
            case 'left':
                return this.x -= game.tileWidth;
            case 'right':
                return this.x += game.tileWidth;
            case 'up':
                return this.y -= game.tileHeight;
            case 'down':
                return this.y += game.tileHeight;
        }
    };
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let initiateGame = () => {
    player = new Player();

    allEnemies = [];
    enemySpeed = 100;

    alphaBug = new Enemy(0, 80, "+", enemySpeed);
    betaBug = new Enemy(120, 160, "-", enemySpeed);
    gammaBug = new Enemy(50, 240, "+", enemySpeed);

    allEnemies.push(alphaBug, betaBug, gammaBug);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

initiateGame();