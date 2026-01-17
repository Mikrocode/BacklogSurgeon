import React from 'react';
import { ContextState, RankedItem } from '../types';

interface OutputScreenProps {
  context: ContextState;
  results: {
    capacityPoints: number;
    ranked: RankedItem[];
    ship: RankedItem[];
    cut: RankedItem[];
  };
  onStartOver: () => void;
}

const OutputScreen: React.FC<OutputScreenProps> = ({ context, results, onStartOver }) => {
  const { capacityPoints, ranked, ship, cut } = results;
  const orderedRows = [...ship, ...cut];

  return (
    <div className="screen">
      <div className="summary">
        <p>Capacity: {capacityPoints} effort points</p>
        <p>
          {ship.length} items fit the current constraints
          <br />
          Everything below the line is cut
        </p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Item</th>
              <th>Impact</th>
              <th>Effort</th>
              <th>Confidence</th>
              <th>Score</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {orderedRows.length === 0 && (
              <tr>
                <td colSpan={7}>No backlog items provided.</td>
              </tr>
            )}
            {orderedRows.map((row, index) => (
              <React.Fragment key={row.id}>
                {cut.length > 0 && index === ship.length && (
                  <tr className="capacity-line">
                    <td colSpan={7}>— Capacity line —</td>
                  </tr>
                )}
                <tr className={row.decision === 'CUT' ? 'cut-row' : ''}>
                  <td>{index + 1}</td>
                  <td>{row.item}</td>
                  <td>{row.impact}</td>
                  <td>{row.effort}</td>
                  <td>{row.confidence}</td>
                  <td>{row.score.toFixed(2)}</td>
                  <td className={row.decision === 'CUT' ? 'cut-text' : ''}>{row.decision}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cut-explanations">
        {cut.map((item) => (
          <div key={item.id} className="cut-card">
            <h3>{item.item}</h3>
            <p>Decision: Cut</p>
            <p>Why:</p>
            <p>Low impact on the stated goal.</p>
            <p>Effort exceeds remaining capacity.</p>
            <p>Confidence does not justify displacement.</p>
            <p>When to reconsider:</p>
            <p>If capacity increases or priorities change.</p>
          </div>
        ))}
      </div>

      <div className="decision-log">
        <pre>
{`Decision ID: BS-DEMO-001
Date: Today
Goal: ${context.goal}
Time horizon: ${context.timeHorizon}
Team size: ${context.teamSize}

Shipped:
${ship.length > 0 ? ship.map((item) => `- ${item.item}`).join('\n') : '- (none)'}

Cut:
${cut.length > 0 ? cut.map((item) => `- ${item.item}`).join('\n') : '- (none)'}

Scoring model:
Deterministic impact-confidence-effort

Owner:
Backlog Surgeon`}
        </pre>
      </div>

      <footer className="footer">
        <p>This is a demo. No data is saved.</p>
        <button className="link" onClick={onStartOver}>
          Start over
        </button>
      </footer>
    </div>
  );
};

export default OutputScreen;
