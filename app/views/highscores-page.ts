import { NavigatedData, Page } from '@nativescript/core';
import { HighScoresViewModel } from '../viewmodels/highscores-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HighScoresViewModel();
}