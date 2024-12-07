import { ApplicationSettings } from '@nativescript/core';
import { TNSPlayer } from '@nativescript/audio';

export class AudioService {
    private static instance: AudioService;
    private backgroundMusic: TNSPlayer;
    private soundEffects: Map<string, TNSPlayer>;

    private constructor() {
        this.backgroundMusic = new TNSPlayer();
        this.soundEffects = new Map();
        this.initializeSounds();
    }

    static getInstance(): AudioService {
        if (!AudioService.instance) {
            AudioService.instance = new AudioService();
        }
        return AudioService.instance;
    }

    private async initializeSounds() {
        // Initialize background music
        await this.backgroundMusic.initFromFile({
            audioFile: '~/assets/sounds/background.mp3',
            loop: true
        });

        // Initialize sound effects
        const effects = ['paddle-hit', 'brick-hit', 'game-over', 'level-complete'];
        for (const effect of effects) {
            const player = new TNSPlayer();
            await player.initFromFile({
                audioFile: `~/assets/sounds/${effect}.mp3`,
                loop: false
            });
            this.soundEffects.set(effect, player);
        }
    }

    playBackgroundMusic() {
        if (ApplicationSettings.getBoolean('musicEnabled', true)) {
            this.backgroundMusic.play();
        }
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    playSoundEffect(effect: string) {
        if (ApplicationSettings.getBoolean('soundEnabled', true)) {
            const player = this.soundEffects.get(effect);
            if (player) {
                player.play();
            }
        }
    }

    dispose() {
        this.backgroundMusic.dispose();
        this.soundEffects.forEach(player => player.dispose());
    }
}