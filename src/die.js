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
      this.props.rollDone(roll)
    }, (this.props.rollTime*1000))
  }

  getValue() {
    return this.state.currentValue
  }


  componentDidMount() {
    // this.props.rollDone(6)
  }

  render() {
    let faceStyle = {
      background: this.props.faceColor,
      // height: `${this.props.dieSize}px`,
      // width: `${this.props.dieSize}px`
    }
    let dotStyle = {
      background: this.props.dotColor,
      // height: `${this.props.dieSize / }px`,
      // width: `${this.props.dieSize}px`
    }
    let rollStyle = {
      animationDuration: `${this.props.rollTime}s`,
      // height: `${this.props.dieSize}px`,
      // width: `${this.props.dieSize}px`
    }
    return (
      <div className="die-container" onClick={this.rollDie}>
        <div className="die" ref={die => this.die = die} style={rollStyle}>
           <div className="face six" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
           </div>
           <div className="face one" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
           </div>
           <div className="face five" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
           </div>
           <div className="face two" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
           </div>
           <div className="face three" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
           </div>
           <div className="face four" style={faceStyle}>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
           </div>
        </div>
      </div>
    )
  }

}

export default Die
