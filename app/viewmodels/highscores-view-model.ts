import { Observable, Frame } from '@nativescript/core';
import { HighScoreService } from '../services/highscore-service';

export class HighScoresViewModel extends Observable {
    private _highScores: Array<{position: number, playerName: string, score: number}> = [];

    constructor() {
        super();
        this.loadHighScores();
    }

    get highScores() {
        return this._highScores;
    }

    private async loadHighScores() {
        const scores = await HighScoreService.getInstance().getHighScores();
        this._highScores = scores.map((score, index) => ({
            position: index + 1,
            playerName: score.playerName,
            score: score.score
        }));
        this.notifyPropertyChange('highScores', this._highScores);
    }

    onBackToMenu() {
        Frame.topmost().goBack();
    }
}