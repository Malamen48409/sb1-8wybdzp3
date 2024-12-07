import { Observable } from '@nativescript/core';

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Ball implements GameObject {
  x: number;
  y: number;
  width: number = 10;
  height: number = 10;
  dx: number = 5;
  dy: number = -5;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reverseX() {
    this.dx = -this.dx;
  }

  reverseY() {
    this.dy = -this.dy;
  }
}

export class Paddle implements GameObject {
  x: number;
  y: number;
  width: number = 80;
  height: number = 15;
  speed: number = 7;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveLeft(screenWidth: number) {
    this.x = Math.max(0, this.x - this.speed);
  }

  moveRight(screenWidth: number) {
    this.x = Math.min(screenWidth - this.width, this.x + this.speed);
  }
}

export class Brick implements GameObject {
  x: number;
  y: number;
  width: number = 60;
  height: number = 20;
  health: number;
  points: number;
  color: string;

  constructor(x: number, y: number, health: number = 1) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.points = health * 10;
    this.color = this.getColorForHealth(health);
  }

  hit() {
    this.health--;
    this.color = this.getColorForHealth(this.health);
    return this.health <= 0;
  }

  private getColorForHealth(health: number): string {
    switch(health) {
      case 3: return '#ff0000'; // Red
      case 2: return '#ffa500'; // Orange
      case 1: return '#00ff00'; // Green
      default: return '#808080'; // Gray
    }
  }
}