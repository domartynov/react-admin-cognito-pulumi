import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './BackendApi'
import {BackendApi} from "./BackendApi";

function App() {
  const [msg, setMsg] = useState('Loading...')
  BackendApi
      .hello()
      .then(setMsg)
      .catch(console.log)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msg}
        </a>
      </header>
    </div>
  );
}

export default App;
