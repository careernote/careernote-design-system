import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import '@careernote/tokens/tokens.css';
import '@careernote/react/ui/shadcn.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
