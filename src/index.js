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
    let colorStyle = {height: '2.375rem'}
    return (
      <div className="dice-test">
        <form className="row controls">
          <fieldset className="form-group col">
            <label htmlFor="numDice">Number of Dice</label>
            <input type="number" name="numDice" id="numDice" className="form-control"
              value={state.numDice} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="faceColor">Face Color</label>
            <input type="color" name="faceColor" id="faceColor" className="form-control" style={colorStyle}
              value={state.faceColor} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="dotColor">Dot Color</label>
            <input type="color" name="dotColor" id="dotColor" className="form-control" style={colorStyle}
              value={state.dotColor} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="rollTime">Roll Time</label>
            <input type="number" name="rollTime" id="rollTime" className="form-control"
              value={state.rollTime} onChange={this.handleChange} />
            <span> second(s) </span>
          </fieldset>
        </form>
        <div>Click individual dice to roll or {'   '}
          <button className="btn btn-primary">Roll All</button>
        </div>
        <div>Dice Total:
          <span>33</span>
        </div>
        <div className="row dice">
          <div className="col">
            <DiceContainer {...this.state} />
          </div>
        </div>
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
