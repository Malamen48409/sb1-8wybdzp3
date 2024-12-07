import { Observable, Screen, GestureEventData } from '@nativescript/core';
import { GameState } from '../models/game-state';
import { AdService } from '../services/ad-service';
import { AudioService } from '../services/audio-service';
import { VibrationService } from '../services/vibration-service';
import { Ball, Paddle, Brick } from '../models/game-objects';
import { CollisionService } from '../services/collision-service';
import { LevelService } from '../services/level-service';
import { GameLoopService } from '../services/game-loop-service';
import { PowerUpService, PowerUp } from '../services/power-up-service';

export class GameViewModel extends Observable {
    private gameState: GameState;
    private adService: AdService;
    private audioService: AudioService;
    private vibrationService: VibrationService;
    private gameLoopService: GameLoopService;
    private powerUpService: PowerUpService;
    
    private balls: Ball[] = [];
    private paddle: Paddle;
    private bricks: Brick[] = [];
    private powerUps: PowerUp[] = [];
    
    private readonly screenWidth = Screen.mainScreen.widthDIPs;
    private readonly screenHeight = Screen.mainScreen.heightDIPs;

    constructor() {
        super();
        this.gameState = new GameState();
        this.adService = AdService.getInstance();
        this.audioService = AudioService.getInstance();
        this.vibrationService = VibrationService.getInstance();
        this.gameLoopService = new GameLoopService();
        this.powerUpService = new PowerUpService();
        
        this.initializeGameObjects();
        this.startGame();
    }

    private initializeGameObjects() {
        this.paddle = new Paddle(
            (this.screenWidth - 80) / 2,
            this.screenHeight - 50
        );
        
        this.balls = [new Ball(
            this.paddle.x + this.paddle.width / 2,
            this.paddle.y - 20
        )];
        
        this.bricks = LevelService.createLevel(this.gameState.level, this.screenWidth);
        this.powerUps = [];
    }

    startGame() {
        this.gameState.reset();
        this.initializeGameObjects();
        this.gameLoopService.startGameLoop(() => this.updateGame());
        this.adService.showBannerAd();
        this.audioService.playBackgroundMusic();
    }

    private updateGame() {
        // Update balls
        this.balls.forEach(ball => {
            ball.move();
            CollisionService.handleWallCollisions(ball, this.screenWidth, this.screenHeight);
            
            if (CollisionService.handleBallPaddleCollision(ball, this.paddle)) {
                this.audioService.playSoundEffect('paddle-hit');
                this.vibrationService.vibrate(50);
            }
        });
        
        // Update power-ups
        this.powerUps.forEach((powerUp, index) => {
            powerUp.move();
            if (CollisionService.checkCollision(powerUp, this.paddle)) {
                this.powerUpService.applyPowerUp(powerUp.type, this.paddle, this.balls);
                this.powerUps.splice(index, 1);
            } else if (powerUp.y > this.screenHeight) {
                this.powerUps.splice(index, 1);
            }
        });
        
        // Check brick collisions
        for (let i = this.bricks.length - 1; i >= 0; i--) {
            let brickHit = false;
            this.balls.forEach(ball => {
                if (!brickHit && CollisionService.handleBallBrickCollision(ball, this.bricks[i])) {
                    brickHit = true;
                    this.audioService.playSoundEffect('brick-hit');
                    this.vibrationService.vibrate(30);
                    
                    if (this.bricks[i].hit()) {
                        this.gameState.score += this.bricks[i].points;
                        const powerUp = this.powerUpService.generatePowerUp(
                            this.bricks[i].x + this.bricks[i].width / 2,
                            this.bricks[i].y
                        );
                        if (powerUp) {
                            this.powerUps.push(powerUp);
                        }
                        this.bricks.splice(i, 1);
                    }
                }
            });
        }
        
        // Check for lost balls
        this.balls = this.balls.filter(ball => ball.y <= this.screenHeight);
        
        if (this.balls.length === 0) {
            this.gameState.lives--;
            this.audioService.playSoundEffect('game-over');
            this.vibrationService.vibrate(200);
            
            if (this.gameState.lives > 0) {
                this.resetBallAndPaddle();
            } else {
                this.gameOver();
            }
        }
        
        // Check level completion
        if (this.bricks.length === 0) {
            this.levelComplete();
        }
        
        this.notifyPropertyChange('gameObjects', this.getGameObjects());
    }

    private resetBallAndPaddle() {
        this.paddle.x = (this.screenWidth - this.paddle.width) / 2;
        this.balls = [new Ball(
            this.paddle.x + this.paddle.width / 2,
            this.paddle.y - 20
        )];
    }

    private levelComplete() {
        this.gameState.level++;
        this.gameLoopService.pauseGame();
        this.audioService.playSoundEffect('level-complete');
        this.vibrationService.vibrate(100);
        
        this.adService.showRewardedAd().then(() => {
            this.bricks = LevelService.createLevel(this.gameState.level, this.screenWidth);
            this.resetBallAndPaddle();
            this.gameLoopService.resumeGame();
        });
    }

    private gameOver() {
        this.gameLoopService.stopGameLoop();
        Frame.topmost().navigate({
            moduleName: 'views/game-over-page',
            context: { score: this.gameState.score }
        });
    }

    onPause() {
        if (this.gameLoopService.isGamePaused()) {
            this.gameLoopService.resumeGame();
            this.audioService.playBackgroundMusic();
        } else {
            this.gameLoopService.pauseGame();
            this.audioService.stopBackgroundMusic();
        }
    }

    onPanPaddle(args: GestureEventData) {
        if (!this.gameLoopService.isGamePaused()) {
            const deltaX = args.deltaX;
            this.paddle.x = Math.max(0, Math.min(
                this.screenWidth - this.paddle.width,
                this.paddle.x + deltaX
            ));
        }
    }

    dispose() {
        this.gameLoopService.stopGameLoop();
        this.adService.hideBannerAd();
        this.audioService.stopBackgroundMusic();
        this.audioService.dispose();
    }
}