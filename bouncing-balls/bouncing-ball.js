class Ball {
    constructor(x, y, dx, dy, rad, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = rad;
        this.color = color;
    }
}

class Canvas {
    constructor() {
        this.balls = new Array();
        this.canvas = null;
        
        this.canvas = document.getElementById('bouncingBallCanvas');
        
        // set canvas size to match the window size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // set on-click event handler to create balls
        this.canvas.addEventListener('click', (event)=> {
            this.balls.push(new Ball(event.clientX, event.clientY, this.getRandomSpeed(), this.getRandomSpeed(), 15, this.getRandomColor()));
        });
        
        this.ctx = this.canvas.getContext('2d');
    }

    getRandomColor() {
        let colors = [
            'LightBlue', 'LightCoral', 'LightGreen', 'LawnGreen', 'Maroon', 'MediumPurple', 'Moccasin', 'Aqua',
            'OrangeRed', 'Peru', 'RebeccaPurple', 'Salmon', 'SaddleBrown', 'SteelBlue', 'Gold', 'DarkSlateGray', 'Chocolate',
            'Fuchsia', 'Red', 'Yellow', 'Green', 'Blue', 'Green', 'Purple', 'Orange', 'Grey', 'LightBlue', 'AntiqueWhite'
        ];
        let randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    getRandomSpeed(maxSpeed = 4) {
        return Math.floor(Math.random() * (maxSpeed * 2 + 1)) - maxSpeed;
    }

    drawBall(ball) {
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = ball.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateBallPosition(ball) {
        // update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;
    
        // bounce off the right + left wall
        if (ball.x + ball.radius > this.canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
            // change color on bouncing
            ball.color = this.getRandomColor();
        }

        // bounce off the up + down wall
        if (ball.y + ball.radius > this.canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
            // change color on bouncing
            ball.color = this.getRandomColor();
        }
    }

    animate() {
        // clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
