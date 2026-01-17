import React, { useEffect, useMemo, useState } from 'react';
import ContractScreen from './screens/ContractScreen';
import ContextScreen from './screens/ContextScreen';
import BacklogInputScreen from './screens/BacklogInputScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import OutputScreen from './screens/OutputScreen';
import { BacklogItem, ContextState } from './types';
import { rankBacklog } from './lib/scoring';

let idCounter = 0;
const createId = () => {
  idCounter += 1;
  return `item-${idCounter}`;
};

const initialContext: ContextState = {
  goal: '',
  timeHorizon: 'Next sprint',
  teamSize: 3,
};

const emptyRow = (): BacklogItem => ({
  id: createId(),
  item: '',
  impact: 'Medium',
  effort: 'M',
  confidence: 'Medium',
});

const sampleBacklog: BacklogItem[] = [
  { id: createId(), item: 'Invite flow', impact: 'High', effort: 'S', confidence: 'High' },
  { id: createId(), item: 'Billing retry logic', impact: 'Medium', effort: 'S', confidence: 'High' },
  { id: createId(), item: 'Admin filters', impact: 'Medium', effort: 'L', confidence: 'Medium' },
  { id: createId(), item: 'Dark mode', impact: 'Low', effort: 'M', confidence: 'Low' },
];

type Screen = 'contract' | 'context' | 'backlog' | 'processing' | 'output';

function App() {
  const [screen, setScreen] = useState<Screen>('contract');
  const [context, setContext] = useState<ContextState>(initialContext);
  const [backlog, setBacklog] = useState<BacklogItem[]>(Array.from({ length: 4 }, emptyRow));
  const [goalError, setGoalError] = useState('');
  const [processing, setProcessing] = useState(false);

  const updateContext = (updates: Partial<ContextState>) => {
    setContext((prev) => ({ ...prev, ...updates }));
    if (updates.goal !== undefined && updates.goal.trim()) {
      setGoalError('');
    }
  };

  const handleContinue = () => setScreen('context');

  const handleProceed = () => {
    if (!context.goal.trim()) {
      setGoalError('Goal is required.');
      return;
    }
    setScreen('backlog');
  };

  const handleChangeItem = <K extends keyof BacklogItem>(id: string, field: K, value: BacklogItem[K]) => {
    setBacklog((prev) => prev.map((row) => (row.id === id ? ({ ...row, [field]: value } as BacklogItem) : row)));
  };

  const handleAddItem = () => {
    setBacklog((prev) => [...prev, emptyRow()]);
  };

  const handleLoadSample = () => {
    setBacklog(sampleBacklog.map((item) => ({ ...item, id: createId() })));
  };

  const handleCut = () => {
    setProcessing(true);
    setScreen('processing');
    setTimeout(() => {
      setProcessing(false);
      setScreen('output');
    }, 1500);
  };

  const results = useMemo(() => rankBacklog(backlog, context.teamSize), [backlog, context.teamSize]);

  const handleStartOver = () => {
    idCounter = 0;
    setContext(initialContext);
    setBacklog(Array.from({ length: 4 }, emptyRow));
    setGoalError('');
    setScreen('contract');
  };

  useEffect(() => {
    if (!processing && screen === 'processing') {
      setScreen('output');
    }
  }, [processing, screen]);

  return (
    <main className="app">
      {screen === 'contract' && <ContractScreen onContinue={handleContinue} />}
      {screen === 'context' && (
        <ContextScreen context={context} onUpdate={updateContext} onProceed={handleProceed} error={goalError} />
      )}
      {screen === 'backlog' && (
        <BacklogInputScreen
          backlog={backlog}
          onChangeItem={handleChangeItem}
          onAddItem={handleAddItem}
          onLoadSample={handleLoadSample}
          onCut={handleCut}
        />
      )}
      {screen === 'processing' && <ProcessingScreen />}
      {screen === 'output' && <OutputScreen context={context} results={results} onStartOver={handleStartOver} />}
    </main>
  );
}

export default App;
