import { Observable, Frame } from '@nativescript/core';

export class MenuViewModel extends Observable {
    constructor() {
        super();
    }

    onStartGame() {
        Frame.topmost().navigate({
            moduleName: 'views/game-page',
            clearHistory: true
        });
    }

    onHighScores() {
        Frame.topmost().navigate({
            moduleName: 'views/highscores-page'
        });
    }

    onSettings() {
        Frame.topmost().navigate({
            moduleName: 'views/settings-page'
        });
    }
}