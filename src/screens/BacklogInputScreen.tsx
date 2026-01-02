import React from 'react';
import BacklogTable from '../components/BacklogTable';
import { BacklogItem } from '../types';

interface BacklogInputScreenProps {
  backlog: BacklogItem[];
  onChangeItem: (id: string, field: keyof BacklogItem, value: string) => void;
  onAddItem: () => void;
  onLoadSample: () => void;
  onCut: () => void;
}

const BacklogInputScreen: React.FC<BacklogInputScreenProps> = ({
  backlog,
  onChangeItem,
  onAddItem,
  onLoadSample,
  onCut,
}) => {
  return (
    <div className="screen">
      <header>
        <h2>Paste the backlog</h2>
      </header>
      <p>One item per line, or add them manually.</p>
      <BacklogTable backlog={backlog} onChangeItem={onChangeItem} />
      <div className="actions">
        <button type="button" className="secondary" onClick={onAddItem}>
          + Add item
        </button>
        <button type="button" className="secondary" onClick={onLoadSample}>
          Load sample backlog
        </button>
      </div>
      <button className="primary" onClick={onCut}>
        Cut my backlog
      </button>
    </div>
  );
};

export default BacklogInputScreen;
