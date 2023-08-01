import React from 'react'
import ShowProfit from './ShowProfit'

const PlayerInput = ({index, setName, setBuyIn, setCashOut, buyIn, cashOut}) => {
  return (
    <div className="playerinput-container">
        <input onInput={(e) => setName(e.target.value,index)} type="text" className="playerinput-input-1"/>
        <input  onInput={(e) => setBuyIn(Math.abs(e.target.value),index)} type="number" min="0.01" step={0.01} className="playerinput-input-2"/>
        <input  onInput={(e) => setCashOut(Math.abs(e.target.value),index)} type="number" min="0.01" step={0.01} className="playerinput-input-3"/>
        <ShowProfit buyIn={buyIn} cashOut={cashOut}/>
    </div>
  )
}

export default PlayerInput