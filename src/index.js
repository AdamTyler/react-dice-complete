import React, { Component } from 'react'
import {render} from 'react-dom'
import Die from './die'

import './styles.scss'

class DiceContainer extends Component {

  constructor(props) {
    super(props)
    console.log(props);
    this.state = {}
  }

  rollAll() {

  }

  render() {
    let { props } = this
    let dice = []
    for (let i = 0; i < props.numDice; i++) {
      dice.push(<Die {...props} key={i} />)
    }
    return (
      <div className="dice">
        {dice}
      </div>
    )
  }
}


class TestApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numDice: 4,
      sides: 6,
      rollTime: 2,
      faceColor: '#FF00AC',
      dotColor: '#5AFF44'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log('handleChange', e.target.name, e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    let { state } = this
    return (
      <div className="dice-test">
        <form className="controls">
          <h3>Number of Dice</h3>
          <input type="number" name="numDice" value={state.numDice} onChange={this.handleChange} />
          <h3>Face Color</h3>
          <input type="color" name="faceColor" value={state.faceColor} onChange={this.handleChange} />
          <h3>Dot Color</h3>
          <input type="color" name="dotColor" value={state.dotColor} onChange={this.handleChange} />
          <h3>Roll Time</h3>
          <input type="number" name="rollTime" value={state.rollTime} onChange={this.handleChange} />
          <span> second(s)</span>
        </form>
        <DiceContainer {...this.state} />
      </div>
    )
  }
}

// call this from regular JS, will be part of plugin/moudle init
// let options = {
//   numDice: 4,
//   sides: 6,
//   rollTime: 2000,
//   faceColor: '#FF00AC',
//   dotColor: '#5AFF44'
// }

render(<TestApp />, document.getElementById('app'));
