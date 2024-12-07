import { Ball, Paddle } from '../models/game-objects';

export enum PowerUpType {
    EXPAND_PADDLE = 'expand_paddle',
    SHRINK_PADDLE = 'shrink_paddle',
    SPEED_UP_BALL = 'speed_up_ball',
    SLOW_DOWN_BALL = 'slow_down_ball',
    MULTI_BALL = 'multi_ball',
    EXTRA_LIFE = 'extra_life'
}

export class PowerUp {
    x: number;
    y: number;
    type: PowerUpType;
    width: number = 20;
    height: number = 20;
    speed: number = 2;

    constructor(x: number, y: number, type: PowerUpType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    move() {
        this.y += this.speed;
    }
}

export class PowerUpService {
    private static readonly POWER_UP_CHANCE = 0.2;
    private activePowerUps: Set<PowerUpType> = new Set();
    private powerUpDuration: number = 10000; // 10 seconds

    generatePowerUp(x: number, y: number): PowerUp | null {
        if (Math.random() > this.POWER_UP_CHANCE) {
            return null;
        }

        const types = Object.values(PowerUpType);
        const randomType = types[Math.floor(Math.random() * types.length)];
        return new PowerUp(x, y, randomType);
    }

    applyPowerUp(type: PowerUpType, paddle: Paddle, balls: Ball[]): void {
        this.activePowerUps.add(type);

        switch (type) {
            case PowerUpType.EXPAND_PADDLE:
                paddle.width *= 1.5;
                break;
            case PowerUpType.SHRINK_PADDLE:
                paddle.width *= 0.75;
                break;
            case PowerUpType.SPEED_UP_BALL:
                balls.forEach(ball => {
                    ball.dx *= 1.5;
                    ball.dy *= 1.5;
                });
                break;
            case PowerUpType.SLOW_DOWN_BALL:
                balls.forEach(ball => {
                    ball.dx *= 0.75;
                    ball.dy *= 0.75;
                });
                break;
            case PowerUpType.MULTI_BALL:
                const newBalls = balls.slice();
                balls.forEach(ball => {
                    const newBall = new Ball(ball.x, ball.y);
                    newBall.dx = -ball.dx;
                    newBalls.push(newBall);
                });
                balls.push(...newBalls);
                break;
        }

        setTimeout(() => this.removePowerUp(type, paddle, balls), this.powerUpDuration);
    }

    private removePowerUp(type: PowerUpType, paddle: Paddle, balls: Ball[]): void {
        this.activePowerUps.delete(type);

        switch (type) {
            case PowerUpType.EXPAND_PADDLE:
                paddle.width /= 1.5;
                break;
            case PowerUpType.SHRINK_PADDLE:
                paddle.width /= 0.75;
                break;
            case PowerUpType.SPEED_UP_BALL:
                balls.forEach(ball => {
                    ball.dx /= 1.5;
                    ball.dy /= 1.5;
                });
                break;
            case PowerUpType.SLOW_DOWN_BALL:
                balls.forEach(ball => {
                    ball.dx /= 0.75;
                    ball.dy /= 0.75;
                });
                break;
        }
    }

    hasActivePowerUp(type: PowerUpType): boolean {
        return this.activePowerUps.has(type);
    }
}