import React from 'react';
import { ContextState } from '../types';

interface ContextScreenProps {
  context: ContextState;
  onUpdate: (updates: Partial<ContextState>) => void;
  onProceed: () => void;
  error?: string;
}

const timeOptions = ['Next sprint', 'Next 2 weeks', 'Next month'];

const ContextScreen: React.FC<ContextScreenProps> = ({ context, onUpdate, onProceed, error }) => {
  return (
    <div className="screen">
      <header>
        <h2>Define the operation</h2>
      </header>
      <div className="field">
        <label htmlFor="goal">Goal (required)</label>
        <input
          id="goal"
          value={context.goal}
          onChange={(e) => onUpdate({ goal: e.target.value })}
          placeholder="One sentence. What must improve?"
        />
        <small>One sentence. What must improve?</small>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="field">
        <label htmlFor="timeHorizon">Time horizon</label>
        <select
          id="timeHorizon"
          value={context.timeHorizon}
          onChange={(e) => onUpdate({ timeHorizon: e.target.value })}
        >
          {timeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Team size</label>
        <div className="button-row">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
            <button
              key={size}
              type="button"
              className={context.teamSize === size ? 'secondary selected' : 'secondary'}
              onClick={() => onUpdate({ teamSize: size })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <button className="primary" onClick={onProceed}>
        Proceed to backlog
      </button>
    </div>
  );
};

export default ContextScreen;
