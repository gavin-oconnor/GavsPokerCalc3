import React from 'react'

const CategoryHeader = () => {
  return (
    <div className="category-container">
        <p className="category-name">Name</p>
        <div className="category-spacer-1"/>
        <p className="category-number-1">Buy In</p>
        <div className="category-spacer-2"/>
        <p className="category-number-2">Cash Out</p>
        <div className="category-spacer-3"/>
        <p className="category-profit">Profit</p>
    </div>
  )
}

export default CategoryHeader