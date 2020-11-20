import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Uploads from './components/Upload/Uploads';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Uploads />
    </div>
  );
}

export default App;
