import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './style.scss';

export default function TurnList() {
  const turns = useSelector((s: RootState) => s.turn.turns);
  return (
    <div className="turns">
      <div className="turns-title">
        <h4>Turns</h4>
      </div>
      <div className="turns-scrolling-box">
        <div className="turns-score-list">
          {turns.map(turn => {
            const totalScore = turn.answers.reduce(
              (acc, answer) => acc + Number(answer.score),
              0,
            );
            return (
              <div
                key={`${turn.turn}_key_number_${Math.random() * 100}`}
                className="turns-score-list-item "
              >
                <h5
                  className={`turns-score-list-item-score ${
                    Number(totalScore) === 0 ? 'zero' : ''
                  }`}
                >
                  {totalScore}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
