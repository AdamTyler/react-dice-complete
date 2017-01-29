import React, { Component, PropTypes } from 'react'

class Die extends Component {

  constructor(props) {
    super(props)
    // this.sides = props.sides || 6
    // this.color = options.color || '#f1f1f1'
    // this.currentValue = options.currentValue || this.getRandomInt(1, this.sides)
  }

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  render() {
    return (
      <div className="die">
         <div className="face front">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face back">
            <span className="dot"></span>
         </div>
         <div className="face right">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face left">
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face top">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face bottom">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
      </div>
    )
  }

}

export default Die
