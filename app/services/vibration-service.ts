import { ApplicationSettings, Utils } from '@nativescript/core';

export class VibrationService {
    private static instance: VibrationService;

    private constructor() {}

    static getInstance(): VibrationService {
        if (!VibrationService.instance) {
            VibrationService.instance = new VibrationService();
        }
        return VibrationService.instance;
    }

    vibrate(duration: number = 100) {
        if (ApplicationSettings.getBoolean('vibrationEnabled', true)) {
            Utils.android.getActivity()?.getSystemService(android.content.Context.VIBRATOR_SERVICE)?.vibrate(duration);
        }
    }
}