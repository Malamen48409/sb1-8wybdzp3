import { ApplicationSettings } from '@nativescript/core';

export interface HighScore {
    playerName: string;
    score: number;
    date: Date;
}

export class HighScoreService {
    private static instance: HighScoreService;
    private readonly STORAGE_KEY = 'highScores';
    private readonly MAX_SCORES = 10;

    private constructor() {}

    static getInstance(): HighScoreService {
        if (!HighScoreService.instance) {
            HighScoreService.instance = new HighScoreService();
        }
        return HighScoreService.instance;
    }

    async addScore(playerName: string, score: number): Promise<void> {
        const scores = await this.getHighScores();
        scores.push({ playerName, score, date: new Date() });
        
        // Sort by score (descending) and date (ascending)
        scores.sort((a, b) => b.score - a.score || new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Keep only top scores
        const topScores = scores.slice(0, this.MAX_SCORES);
        
        ApplicationSettings.setString(this.STORAGE_KEY, JSON.stringify(topScores));
    }

    async getHighScores(): Promise<HighScore[]> {
        const scoresJson = ApplicationSettings.getString(this.STORAGE_KEY);
        if (!scoresJson) return [];
        return JSON.parse(scoresJson);
    }
}