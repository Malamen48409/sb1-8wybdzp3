import { Brick } from '../models/game-objects';

export class LevelService {
  static createLevel(level: number, screenWidth: number): Brick[] {
    const bricks: Brick[] = [];
    const rows = Math.min(3 + Math.floor(level / 2), 8);
    const cols = Math.min(5 + Math.floor(level / 3), 10);
    
    const brickWidth = 60;
    const brickHeight = 20;
    const padding = 5;
    
    const startX = (screenWidth - (cols * (brickWidth + padding))) / 2;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const health = Math.min(1 + Math.floor(level / 3), 3);
        const x = startX + col * (brickWidth + padding);
        const y = 50 + row * (brickHeight + padding);
        bricks.push(new Brick(x, y, health));
      }
    }
    
    return bricks;
  }
}