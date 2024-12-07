import { Observable, Frame } from '@nativescript/core';
import { HighScoreService } from '../services/highscore-service';

export class GameOverViewModel extends Observable {
    private _score: number;
    private _playerName: string = '';

    constructor(score: number) {
        super();
        this._score = score;
    }

    get score(): number {
        return this._score;
    }

    get playerName(): string {
        return this._playerName;
    }

    set playerName(value: string) {
        if (this._playerName !== value) {
            this._playerName = value;
            this.notifyPropertyChange('playerName', value);
        }
    }

    async onSaveScore() {
        if (this.playerName.trim()) {
            await HighScoreService.getInstance().addScore(this.playerName, this.score);
            this.onBackToMenu();
        }
    }

    onTryAgain() {
        Frame.topmost().navigate({
            moduleName: 'views/game-page',
            clearHistory: true
        });
    }

    onBackToMenu() {
        Frame.topmost().navigate({
            moduleName: 'views/menu-page',
            clearHistory: true
        });
    }
}