/* eslint-disable */
import { useState } from 'react';
import './App.css';
import { MainBid } from './MainBid';
import {NavBar} from './NavBar';


function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}></NavBar>
      <MainBid accounts={accounts} setAccounts={setAccounts}></MainBid>
    </div>
  );
}

export default App;
