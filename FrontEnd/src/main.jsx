import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../static-html/css/styles.css';
import './styles/app-overrides.css';
import './styles/auth-forms.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
