import { Ball, Brick, Paddle, GameObject } from '../models/game-objects';

export class CollisionService {
  static checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }

  static handleBallPaddleCollision(ball: Ball, paddle: Paddle) {
    if (this.checkCollision(ball, paddle)) {
      ball.reverseY();
      
      // Calculate relative position of ball on paddle
      const hitPoint = (ball.x - paddle.x) / paddle.width;
      // Adjust ball direction based on hit point
      ball.dx = 5 * (hitPoint - 0.5) * 2;
    }
  }

  static handleBallBrickCollision(ball: Ball, brick: Brick): boolean {
    if (this.checkCollision(ball, brick)) {
      // Determine which side of the brick was hit
      const hitFromBottom = ball.y > brick.y + brick.height / 2;
      const hitFromTop = ball.y < brick.y - brick.height / 2;
      
      if (hitFromTop || hitFromBottom) {
        ball.reverseY();
      } else {
        ball.reverseX();
      }
      
      return true;
    }
    return false;
  }

  static handleWallCollisions(ball: Ball, screenWidth: number, screenHeight: number) {
    // Left and right walls
    if (ball.x <= 0 || ball.x + ball.width >= screenWidth) {
      ball.reverseX();
    }
    
    // Top wall
    if (ball.y <= 0) {
      ball.reverseY();
    }
  }
}