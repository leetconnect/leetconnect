import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Landing from './pages/Landing.jsx';
import { Theme } from './components/Theme';
import { Intro } from './components/Intro';
import {Features } from './components/Features';
import {Howitwork } from './components/Howitwork';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme>
        <App />
        <Intro/>
        <Features/>
        <Howitwork/>
      </Theme>
    </BrowserRouter>
  </React.StrictMode>,
);
