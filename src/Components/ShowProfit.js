import React from 'react'

const ShowProfit = ({buyIn,cashOut}) => {
    const show = buyIn !== -1 && cashOut !== -1
    const profit = cashOut - buyIn
    const negative = profit < 0
  return (
    <div className="playerinput-input-4">
        {show ? 
        <>{negative ? <p className="negative-profit">$({-1*profit})</p> : <p className="profit">${profit}</p>}</> 
        : 
        <p className="negative-profit">$--</p>}
    </div>
  )
}

export default ShowProfit