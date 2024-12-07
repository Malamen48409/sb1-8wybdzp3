import { NavigatedData, Page } from '@nativescript/core';
import { GameViewModel } from '../viewmodels/game-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new GameViewModel();
    }
}