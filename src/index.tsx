import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { sessionValues } from './apis/siscopDB';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
sessionValues();

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
