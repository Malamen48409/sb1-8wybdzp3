import { NavigatedData, Page } from '@nativescript/core';
import { MenuViewModel } from '../viewmodels/menu-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MenuViewModel();
}