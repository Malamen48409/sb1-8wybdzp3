import { Observable, Frame, ApplicationSettings } from '@nativescript/core';

export class SettingsViewModel extends Observable {
    private _soundEnabled: boolean;
    private _musicEnabled: boolean;
    private _vibrationEnabled: boolean;

    constructor() {
        super();
        this._soundEnabled = ApplicationSettings.getBoolean('soundEnabled', true);
        this._musicEnabled = ApplicationSettings.getBoolean('musicEnabled', true);
        this._vibrationEnabled = ApplicationSettings.getBoolean('vibrationEnabled', true);
    }

    get soundEnabled(): boolean {
        return this._soundEnabled;
    }

    set soundEnabled(value: boolean) {
        if (this._soundEnabled !== value) {
            this._soundEnabled = value;
            ApplicationSettings.setBoolean('soundEnabled', value);
            this.notifyPropertyChange('soundEnabled', value);
        }
    }

    get musicEnabled(): boolean {
        return this._musicEnabled;
    }

    set musicEnabled(value: boolean) {
        if (this._musicEnabled !== value) {
            this._musicEnabled = value;
            ApplicationSettings.setBoolean('musicEnabled', value);
            this.notifyPropertyChange('musicEnabled', value);
        }
    }

    get vibrationEnabled(): boolean {
        return this._vibrationEnabled;
    }

    set vibrationEnabled(value: boolean) {
        if (this._vibrationEnabled !== value) {
            this._vibrationEnabled = value;
            ApplicationSettings.setBoolean('vibrationEnabled', value);
            this.notifyPropertyChange('vibrationEnabled', value);
        }
    }

    onBackToMenu() {
        Frame.topmost().goBack();
    }
}