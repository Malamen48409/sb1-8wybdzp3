import { NavigatedData, Page } from '@nativescript/core';
import { GameOverViewModel } from '../viewmodels/game-over-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        const score = page.navigationContext?.score || 0;
        page.bindingContext = new GameOverViewModel(score);
    }
}