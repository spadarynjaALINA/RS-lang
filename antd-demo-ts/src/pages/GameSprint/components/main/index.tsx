import React from "react";
import './main.css';
import { Button } from 'antd'

function GameSprint() {
  return (
    <div className="game-container">
      <div className="game-text-container">
        <p className="game-title">Спринт</p>
        <p className="game-rules">Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.</p>
      </div>
      <div className="game-level-selector">
        <Button type="ghost" shape="round" className="level-button">A1</Button>
        <Button type="ghost" shape="round" className="level-button">A2</Button>
        <Button type="ghost" shape="round" className="level-button">B1</Button>
        <Button type="ghost" shape="round" className="level-button">B2</Button>
        <Button type="ghost" shape="round" className="level-button">C1</Button>
        <Button type="ghost" shape="round" className="level-button">C2</Button>
      </div>
      <Button type="primary" shape="round" className="game-start-button">Начать</Button>
      </div>
  );
}

export default GameSprint;