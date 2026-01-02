import React from 'react';

interface ContractScreenProps {
  onContinue: () => void;
}

const ContractScreen: React.FC<ContractScreenProps> = ({ onContinue }) => {
  return (
    <div className="screen">
      <header>
        <h1>BACKLOG SURGEON</h1>
        <p className="subtitle">Cut the backlog. Decide what matters. Ship.</p>
      </header>
      <div className="contract-text">
        <p>This tool will cut your backlog.</p>
        <p>It will force tradeoffs.</p>
        <p>It will remove items you like.</p>
        <p>It will not keep everything.</p>
        <p>If you want consensus, stop here.</p>
      </div>
      <button className="primary" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default ContractScreen;
