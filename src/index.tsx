import React, { useState } from 'react';
import DataContext, { dataUser } from './data/DataContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Section, User } from './config/types/types';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
