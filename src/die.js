import React, { Component, PropTypes } from 'react'

class Die extends Component {

  constructor(props) {
    super(props)
    // this.sides = props.sides || 6
    // this.color = options.color || '#f1f1f1'
    // this.currentValue = options.currentValue || this.getRandomInt(1, this.sides)
    this.rollDie = this.rollDie.bind(this)
  }

  getRandomInt() {
    let min = 1
    let max = Math.ceil(this.props.sides)
    return Math.floor(Math.random() * max) + min
  }

  rollDie() {
    this.die.classList = 'die roll'
    setTimeout(() => {
      let roll = this.getRandomInt()
          console.log('roll it', roll);
      this.die.classList.remove('roll')
      this.die.classList.add(`show-${roll}`)
    }, this.props.rollTime)
  }

  render() {
    return (
      <div className="die" onClick={this.rollDie} ref={die => this.die = die}>
         <div className="face six">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face one">
            <span className="dot"></span>
         </div>
         <div className="face five">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face two">
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face three">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
         </div>
         <div className="face four">
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
