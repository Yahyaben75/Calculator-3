
let input = document.getElementById('calculatorInput');
let canvas = document.getElementById('snakeGame');
let ctx = canvas.getContext('2d');
let gridSize = 20;
let rows = canvas.height / gridSize;
let cols = canvas.width / gridSize;
let snake, apple, direction;

// Calculator Functions
function clr() {
    input.value = "";
}

function dis(val) {
    input.value += val;
}

function back() {
    input.value = input.value.slice(0, -1);
}

function solve() {
    let expression = input.value;

    if (expression === "3+3") {
        document.querySelector('.calc').classList.add('hidden');
        canvas.classList.remove('hidden');
        startSnakeGame();
        return;
    }

    try {
        input.value = eval(expression);
    } catch {
        input.value = "Error";
    }
}

// Snake Game Functions
function startSnakeGame() {
    snake = [{ x: 10, y: 10 }];
    apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    direction = { x: 0, y: 0 };
    document.addEventListener('keydown', changeDirection);
    setInterval(updateSnakeGame, 100);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp': direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': direction = { x: 1, y: 0 }; break;
    }
}

function updateSnakeGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over!');
        canvas.classList.add('hidden');
        document.querySelector('.calc').classList.remove('hidden');
        return;
    }

    if (head.x === apple.x && head.y === apple.y) {
        snake.unshift(head);
        apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } else {
        snake.unshift(head);
        snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));
}
