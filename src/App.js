import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PageMaster from './pages/PageMaster';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ PageMaster } />
    </BrowserRouter>
  );
}

export default App;
