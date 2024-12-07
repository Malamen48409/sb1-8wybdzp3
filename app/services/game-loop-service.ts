import { Observable } from '@nativescript/core';

export class GameLoopService extends Observable {
    private gameLoop: number;
    private isPaused: boolean = false;
    private readonly FPS = 60;
    private readonly frameTime = 1000 / this.FPS;

    startGameLoop(updateCallback: () => void) {
        if (this.gameLoop) {
            this.stopGameLoop();
        }

        this.gameLoop = setInterval(() => {
            if (!this.isPaused) {
                updateCallback();
            }
        }, this.frameTime);
    }

    stopGameLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }

    pauseGame() {
        this.isPaused = true;
    }

    resumeGame() {
        this.isPaused = false;
    }

    isGamePaused(): boolean {
        return this.isPaused;
    }
}