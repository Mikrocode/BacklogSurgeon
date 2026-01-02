import React from 'react';
import logo from '../assets/backlog-surgeon-logo.svg';

interface ContractScreenProps {
  onContinue: () => void;
}

const ContractScreen: React.FC<ContractScreenProps> = ({ onContinue }) => {
  return (
    <div className="screen contract-screen">
      <div className="hero">
        <div className="hero__badge">Surgical prioritization</div>
        <div className="hero__grid">
          <div className="hero__visual">
            <div className="hero__glow" />
            <img src={logo} alt="Backlog Surgeon logo" className="hero__logo" />
          </div>
          <div className="hero__content">
            <p className="eyebrow">Deliver faster with ruthless clarity</p>
            <h1>
              Slice through noise, protect focus, and keep momentum on what actually ships value.
            </h1>
            <div className="hero__list">
              <div className="hero__card">
                <p className="hero__card-title">Tradeoffs are the strategy</p>
                <p>
                  Every cut forces an explicit choice. We expose the real constraints so teams move with intent.
                </p>
              </div>
              <div className="hero__card">
                <p className="hero__card-title">No hiding in the backlog</p>
                <p>
                  Flaky ideas, pet projects, and nice-to-haves don&apos;t survive. Only outcomes that advance the
                  mission stay.
                </p>
              </div>
              <div className="hero__card hero__card--warning">
                <p className="hero__card-title">Warning</p>
                <p>
                  If you need consensus or want to keep everything, stop here. This is a scalpel, not a sponge.
                </p>
              </div>
            </div>
            <div className="hero__actions">
              <button className="primary" onClick={onContinue}>
                Start the surgery
              </button>
              <p className="note">You can always start over—your focus is the only thing at risk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;
