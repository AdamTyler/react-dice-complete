import React, { Component } from 'react'
import DiceContainer from './DiceContainer'

class DiceRollr extends Component {

  constructor(props) {
    super(props)
    this.state = {
      outline: props.outline || false,
      outlineColor: props.outlineColor || '#000000',
      dieSize: props.dieSize || 60,
      margin: props.dieSize || 15,
      numDice: props.numDice || 4,
      rollTime: props.rollTime || 2,
      faceColor: props.faceColor || '#FF00AC',
      dotColor: props.dotColor || '#5AFF44',
      diceTotal: 0,
      rolling: false
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
    if (e.target.type === 'checkbox') {
      value = !this.state.outline
    }
    this.setState({
      [e.target.name]: value
    })
  }

  totalDisplay(value) {
    this.setState({diceTotal: value, rolling: false})
  }

  rollAll() {
    this.diceContainer.rollAll()
    this.setState({rolling: true})
  }

  render() {
    let { state } = this
    let colorStyle = {height: '2.375rem'}
    return (
      <div>
        <DiceContainer {...this.state} totalDisplay={this.totalDisplay}
          ref={c=> this.diceContainer = c} />
      </div>
    )
  }
}

export default TestApp
