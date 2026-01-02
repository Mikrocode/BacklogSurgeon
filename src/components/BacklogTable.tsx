import React from 'react';
import { BacklogItem, Confidence, Effort, Impact } from '../types';

const impactOptions: Impact[] = ['Low', 'Medium', 'High'];
const effortOptions: Effort[] = ['S', 'M', 'L', 'XL'];
const confidenceOptions: Confidence[] = ['Low', 'Medium', 'High'];

interface BacklogTableProps {
  backlog: BacklogItem[];
  onChangeItem: <K extends keyof BacklogItem>(id: string, field: K, value: BacklogItem[K]) => void;
}

const BacklogTable: React.FC<BacklogTableProps> = ({ backlog, onChangeItem }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Impact</th>
            <th>Effort</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  value={row.item}
                  onChange={(e) => onChangeItem(row.id, 'item', e.target.value)}
                  placeholder="Backlog item"
                />
              </td>
              <td>
                <select
                  value={row.impact}
                  onChange={(e) => onChangeItem(row.id, 'impact', e.target.value as Impact)}
                >
                  {impactOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.effort}
                  onChange={(e) => onChangeItem(row.id, 'effort', e.target.value as Effort)}
                >
                  {effortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.confidence}
                  onChange={(e) => onChangeItem(row.id, 'confidence', e.target.value as Confidence)}
                >
                  {confidenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BacklogTable;
