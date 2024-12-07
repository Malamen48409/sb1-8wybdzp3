import { Observable } from '@nativescript/core';

export class GameState extends Observable {
  private _lives: number = 5;
  private _score: number = 0;
  private _level: number = 1;
  private _gameOver: boolean = false;

  get lives(): number {
    return this._lives;
  }

  set lives(value: number) {
    if (this._lives !== value) {
      this._lives = value;
      this.notifyPropertyChange('lives', value);
      if (this._lives <= 0) {
        this.gameOver = true;
      }
    }
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    if (this._score !== value) {
      this._score = value;
      this.notifyPropertyChange('score', value);
    }
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    if (this._level !== value) {
      this._level = value;
      this.notifyPropertyChange('level', value);
    }
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    if (this._gameOver !== value) {
      this._gameOver = value;
      this.notifyPropertyChange('gameOver', value);
    }
  }

  reset() {
    this.lives = 5;
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
  }
}