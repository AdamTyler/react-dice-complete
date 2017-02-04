import React, { Component } from 'react'
import {render} from 'react-dom'
import DiceContainer from './DiceContainer'

import './styles.scss'

class TestApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dieSize: 60,
      numDice: 4,
      sides: 6,
      rollTime: 2,
      faceColor: '#FF00AC',
      dotColor: '#5AFF44',
      diceTotal: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.totalDisplay = this.totalDisplay.bind(this)
    this.rollAll = this.rollAll.bind(this)
  }

  handleChange(e) {
    let value = e.target.value
    if (e.target.type === 'number') {
      value = parseInt(e.target.value, 10)
      if (value < e.target.min) {
        value = e.target.min
      } else if (value > e.target.max) {
        value = e.target.max
      }
    }
    this.setState({
      [e.target.name]: value
    })
  }

  totalDisplay(value) {
    this.setState({diceTotal: value})
  }

  rollAll() {
    this.diceContainer.rollAll()
  }

  render() {
    let { state } = this
    let colorStyle = {height: '2.375rem'}
    return (
      <div className="dice-test">
        <form className="row controls align-items-end">
          <fieldset className="form-group col">
            <label htmlFor="numDice">Dice</label>
            <input type="number" name="numDice" id="numDice" className="form-control"
              value={state.numDice} onChange={this.handleChange} min="1" max="100"/>
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
          <fieldset className="form-group col">
            <label htmlFor="dieSize">Die Size (px)</label>
            <input type="number" name="dieSize" id="dieSize" className="form-control"
              value={state.dieSize} onChange={this.handleChange} min="30" max="200"/>
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="rollTime">Roll Time (seconds)</label>
            <input type="number" name="rollTime" id="rollTime" className="form-control"
              value={state.rollTime} onChange={this.handleChange} min="1" max="4"/>
          </fieldset>
        </form>
        <div className="row info">
          <div className="col">
            <h4>
              <button className="btn btn-primary" onClick={this.rollAll}>Roll All</button>
              {'   '} or click individual dice
            </h4>
          </div>

          <div className="col">
            <h4 className="text-primary">Dice Total:
              <span>{this.state.diceTotal}</span>
            </h4>
          </div>
        </div>
        <div className="row dice">
          <div className="col">
            <DiceContainer {...this.state} totalDisplay={this.totalDisplay}
              ref={c=> this.diceContainer = c} />
          </div>
        </div>
      </div>
    )
  }
}

render(<TestApp />, document.getElementById('app'));
