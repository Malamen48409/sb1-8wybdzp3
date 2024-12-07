import { NavigatedData, Page } from '@nativescript/core';
import { SettingsViewModel } from '../viewmodels/settings-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SettingsViewModel();
}