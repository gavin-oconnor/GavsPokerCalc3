import React, { useEffect, useState } from 'react'
import PlayerInput from './Components/PlayerInput'
import CategoryHeader from './Components/CategoryHeader'
import {ArrowBack} from "react-icons/bi"

const App = () => {
  const [players,setPlayers] = useState([{name:"",buyIn:-1,cashOut:-1}])
  const [buyIns,setBuyIns] = useState(0);
  const [cashOuts,setCashOuts] = useState(0);
  const [nameError,setNameError] = useState("")
  const [showEnd,setShowEnd] = useState(false);
  const [payStrings,setPayString] = useState([])
  const [secretIndex,setSecretIndex] = useState(0)
  const secretArray = ["Secret","Aidan sucks at poker"]
  useEffect(() => {
    let buyIn = 0;
    let cashOut = 0;
    for(let i=0; i<players.length; i++) {
      if(players[i].buyIn !== -1) {
        buyIn += players[i].buyIn;
      }
      if(players[i].cashOut !== -1) {
        cashOut += players[i].cashOut;
      }
    }
    setBuyIns(buyIn)
    setCashOuts(cashOut)
  },[players])
  const setName = (name,index) => {
    const newPlayers = [...players]
    if(index === players.length-1) {
      newPlayers.push({name:"",buyIn:-1,cashOut:-1})
    }
    newPlayers[index].name = name
    setPlayers(newPlayers)
  }
  const setBuyIn = (buyIn,index) => {
    const newPlayers = [...players]
    newPlayers[index].buyIn = parseFloat(buyIn)
    setPlayers(newPlayers)
  }
  const setCashOut = (cashOut,index) => {
    const newPlayers = [...players]
    newPlayers[index].cashOut = parseFloat(cashOut)
    setPlayers(newPlayers)
  }
  const endGame = () => {
    if(buyIns !== cashOuts) {
      return
    }
    const losers = []
    const winners = []
    for(let i=0; i<players.length-1; i++) {
      console.log(players[i])
      if(players[i].name === "" || players[i].buyIn < 0 || players[i].cashOut < 0) {
        setNameError("Please check all data is correct")
        return
      }
      let profit = players[i].cashOut - players[i].buyIn
      if(profit < 0) {
        losers.push({name:players[i].name,payment:Math.abs(profit)})
      }
      if(profit > 0) {
        winners.push({name:players[i].name,payment:profit})
      }
    }
    setNameError("")
    losers.sort((a,b) => a.payment > b.payment ? -1 : a.payment < b.payment ? 1 : 0)
    winners.sort((a,b) => a.payment > b.payment ? -1 : a.payment < b.payment ? 1 : 0)
    let winnersIndex = 0
    let losersIndex = 0
    const paymentStrings = []
    while(winnersIndex < winners.length && losersIndex < losers.length) {
      if(losers[losersIndex].payment < winners[winnersIndex].payment) {
        const string = `${losers[losersIndex].name} pay ${winners[winnersIndex].name} $${losers[losersIndex].payment}`
        winners[winnersIndex].payment -= losers[losersIndex].payment
        losers[losersIndex].payment = 0;
        losersIndex++;
        paymentStrings.push(string)
      }
      else if(losers[losersIndex].payment > winners[winnersIndex].payment) {
        const string = `${losers[losersIndex].name} pay ${winners[winnersIndex].name} $${winners[winnersIndex].payment}`
        losers[losersIndex].payment -= winners[winnersIndex].payment
        winners[winnersIndex].payment = 0;
        winnersIndex++;
        paymentStrings.push(string)
      }
      else {
        const string = `${losers[losersIndex].name} pay ${winners[winnersIndex].name} $${winners[winnersIndex].payment}`
        losers[losersIndex] = 0;
        winners[winnersIndex].payment = 0;
        winnersIndex++;
        losersIndex++;
        paymentStrings.push(string)
      }
      console.log(paymentStrings)
      setPayString(paymentStrings)
      setShowEnd(true);
    }

    
  }
  return (
    <>
    <div className="app-container">
      <h2 style={{textAlign:"center"}}>Gav's Poker Calc 3.0</h2>
      {showEnd ? 
      <div>
        {payStrings.map((string) => <p style={{textAlign:"center",margin:"6px",fontSize:"22px"}}>{string}</p>)}
      </div> : 
      <>
      <CategoryHeader/>
      {
        players.map((player, index) => 
        <PlayerInput 
        key={index}
        index={index}
        buyIn={player.buyIn}
        cashOut={player.cashOut} 
        setName={setName}
        setBuyIn={setBuyIn}
        setCashOut={setCashOut}
        />)
      }
      {buyIns !== cashOuts ? <p className="error">Total buy ins must equal total cash outs</p> : <></>}
      <div className="totals-row">
        <p>Total buy ins: ${buyIns}</p>
        <p>Total cash outs: ${cashOuts}</p>
      </div>
      {nameError && <p style={{textAlign:"center"}}>{nameError}</p>}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <button className="btn" onClick={endGame}>Calculate</button>
      </div>
      </>}
    </div>
    <footer onClick={() => secretIndex === 1 ? setSecretIndex(0) : setSecretIndex(1)}>
      <p>{secretArray[secretIndex]}</p>
    </footer>
    </>
  )
}

export default App