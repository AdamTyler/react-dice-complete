import React, { Component, PropTypes } from 'react'

class Die extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentValue: 6
    }
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
      this.setState({currentValue: roll})
      this.die.classList.remove('roll')
      this.die.classList.add(`show-${roll}`)
    }, this.props.rollTime)
  }

  render() {
    return (
      <div className="die-container" onClick={this.rollDie}>
        <div className="die" ref={die => this.die = die}>
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
      </div>
    )
  }

}

export default Die
