import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('/lint') || url.includes('prompt-forge-qnnu794pk-dazkool.vercel.app')) {
    return Promise.resolve(
      new Response(JSON.stringify({ message: 'Linting is disabled in this demo.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    );
  }
  if (url.startsWith('http')) {
    try {
      const requestUrl = new URL(url, window.location.origin);
      if (requestUrl.origin !== window.location.origin) {
        return Promise.resolve(
          new Response(JSON.stringify({ error: 'External network calls are disabled in this demo.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          })
        );
      }
    } catch {
      return Promise.resolve(
        new Response(JSON.stringify({ error: 'External network calls are disabled in this demo.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      );
    }
  }
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
