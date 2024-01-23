class Ball {
    constructor(x, y, stepX, stepY, rad, color) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.radius = rad;
        this.color = color;
    }

    static getRandomColor() {
        let colors = [
            'LightBlue', 'LightCoral', 'LightGreen', 'LawnGreen', 'Maroon', 'MediumPurple', 'Moccasin', 'Aqua',
            'OrangeRed', 'Peru', 'RebeccaPurple', 'Salmon', 'SaddleBrown', 'SteelBlue', 'Gold', 'DarkSlateGray', 'Chocolate',
            'Fuchsia', 'Red', 'Yellow', 'Green', 'Blue', 'Green', 'Purple', 'Orange', 'Grey', 'LightBlue', 'AntiqueWhite'
        ];
        let randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    static getRandomSpeed(maxSpeed = 4) {
        return Math.floor(Math.random() * (maxSpeed * 2 + 1)) - maxSpeed;
    }
}

class Canvas {
    constructor() {
        this.balls = new Array();
        this.canvas = null;
        
        this.canvas = document.getElementById('bouncing-ball-canvas');
        
        // set canvas size to match the window size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // set on-click event handler to create balls
        this.canvas.addEventListener('click', (event)=> {
            this.balls.push(new Ball(event.clientX, event.clientY, Ball.getRandomSpeed(), Ball.getRandomSpeed(), 15, Ball.getRandomColor()));
        });
        
        this.ctx = this.canvas.getContext('2d');
    }

    drawBall(ball) {
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = ball.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateBallPosition(ball) {
        const speed = 4;

        // update ball position
        ball.x += ball.stepX * speed;
        ball.y += ball.stepY * speed;
    
        // bounce off the right + left wall
        if (ball.x + ball.radius > this.canvas.width || ball.x - ball.radius < 0) {
            ball.stepX = -ball.stepX;
            // change color on bouncing
            ball.color = Ball.getRandomColor();
        }

        // bounce off the up + down wall
        if (ball.y + ball.radius > this.canvas.height || ball.y - ball.radius < 0) {
            ball.stepY = -ball.stepY;
            // change color on bouncing
            ball.color = Ball.getRandomColor();
        }
    }

    animate() {
        // clear the canvas for floating ball effect
        // comment the line below to print lines
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // display and update position of each ball present in array
        this.balls.forEach((ball) => {
            this.drawBall(ball);
            this.updateBallPosition(ball);
        });

        // request the next animation frame
        requestAnimationFrame(() => this.animate());
    }
}

let canvas = new Canvas();
canvas.animate();
