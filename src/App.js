/* eslint-disable */
import { useState } from 'react';
import './App.css';
import { MainBid } from './MainBid';
import {NavBar} from './NavBar';


function App() {
  const [accounts, setAccounts] = useState([]);
  const [highestBid, setHighestBid] = useState("");

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} highestBid={highestBid} setHighestBid={setHighestBid}></NavBar>
      <MainBid accounts={accounts} setAccounts={setAccounts} highestBid={highestBid} setHighestBid={setHighestBid}></MainBid>
    </div>
  );
}

export default App;
