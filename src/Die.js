import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Die extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: props.defaultRoll || 6,
    }
    this.rollDie = this.rollDie.bind(this)
  }

  getRandomInt() {
    let min = 1
    let max = Math.ceil(this.props.sides)
    return Math.floor(Math.random() * max) + min
  }

  rollDie(value) {
    this.die.className = `die`
    void this.die.offsetWidth
    let roll = value || this.getRandomInt()
    this.die.classList.add(`roll${roll}`)
    setTimeout(() => {
      this.setState({ currentValue: roll })
      this.props.rollDone(roll)
    }, this.props.rollTime * 1000)
  }

  getValue() {
    return this.state.currentValue
  }

  render() {
    // face styles
    let faceStyle = {
      background: this.props.faceColor,
      outline: this.props.outline
        ? `1px solid ${this.props.outlineColor}`
        : 'none',
      height: `${this.props.dieSize}px`,
      position: 'absolute',
      width: `${this.props.dieSize}px`,
    }
    let f1Style = {
      transform: `rotateX(180deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    let f2Style = {
      transform: `rotateY(-90deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    let f3Style = {
      transform: `rotateX(90deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    let f4Style = {
      transform: `rotateX(-90deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    let f5Style = {
      transform: `rotateY(90deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    let f6Style = {
      transform: `rotateY(0deg) translateZ(${this.props.dieSize / 2}px)`,
    }
    // dot styles
    let dotSize = this.props.dieSize / 6 - 2
    let dotStyle = {
      background: this.props.dotColor,
      height: `${dotSize}px`,
      width: `${dotSize}px`,
    }
    let d1Style = {
      top: `${this.props.dieSize / 6}px`,
      left: `${this.props.dieSize / 6}px`,
    }
    let d2Style = {
      top: `${this.props.dieSize / 6}px`,
      right: `${this.props.dieSize / 6}px`,
    }
    let d3Style = {
      top: `${this.props.dieSize / 2 - dotSize / 2}px`,
      left: `${this.props.dieSize / 6}px`,
    }
    let d4Style = {
      top: `${this.props.dieSize / 2 - dotSize / 2}px`,
      left: `${this.props.dieSize / 2 - dotSize / 2}px`,
    }
    let d5Style = {
      top: `${this.props.dieSize / 2 - dotSize / 2}px`,
      right: `${this.props.dieSize / 6}px`,
    }
    let d6Style = {
      bottom: `${this.props.dieSize / 6}px`,
      left: `${this.props.dieSize / 6}px`,
    }
    let d7Style = {
      bottom: `${this.props.dieSize / 6}px`,
      right: `${this.props.dieSize / 6}px`,
    }
    // roll styles
    let rollStyle = {
      animationDuration: `${this.props.rollTime}s`,
      height: `${this.props.dieSize}px`,
      width: `${this.props.dieSize}px`,
    }
    // container styles
    let containerStyle = {
      margin: `${this.props.margin}px`,
      display: 'inline-block',
    }
    return (
      <div
        className='die-container'
        onClick={this.props.disableIndividual ? null : () => this.rollDie()}
        style={containerStyle}
      >
        <div
          className={`die roll${this.getValue()}`}
          ref={(die) => (this.die = die)}
          style={rollStyle}
        >
          <div
            className='face six'
            style={Object.assign({}, faceStyle, f6Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d1Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d2Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d3Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d5Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d6Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d7Style)}
            />
          </div>
          <div
            className='face one'
            style={Object.assign({}, faceStyle, f1Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d4Style)}
            />
          </div>
          <div
            className='face five'
            style={Object.assign({}, faceStyle, f5Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d1Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d2Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d4Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d6Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d7Style)}
            />
          </div>
          <div
            className='face two'
            style={Object.assign({}, faceStyle, f2Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d2Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d6Style)}
            />
          </div>
          <div
            className='face three'
            style={Object.assign({}, faceStyle, f3Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d2Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d4Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d6Style)}
            />
          </div>
          <div
            className='face four'
            style={Object.assign({}, faceStyle, f4Style)}
          >
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d1Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d2Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d6Style)}
            />
            <span
              className='dot'
              style={Object.assign({}, dotStyle, d7Style)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Die
