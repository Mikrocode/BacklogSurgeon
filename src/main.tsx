import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('/lint')) {
    return Promise.resolve(
      new Response(JSON.stringify({ message: 'Linting is disabled in this demo.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    );
  }
  if (url.startsWith('http')) {
    return Promise.reject(new Error('External network calls are disabled in this demo.'));
  }
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
