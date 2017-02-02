import React, { Component } from 'react'
import Die from './die'

export default class DiceContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalValue: props.numDice * 6
    }
    this.dice = []

    this.rollDone = this.rollDone.bind(this)
    this.rollAll = this.rollAll.bind(this)
    this.getDiceTotal = this.getDiceTotal.bind(this)

  }

  rollAll() {
    for (let die of this.dice) {
      if(die !== null) {
        die.rollDie()
      }
    }
  }

  rollDone() {
    this.getDiceTotal()
  }

  getDiceTotal() {
    let total = 0
    for (let die of this.dice) {
      if(die !== null) {
        total += die.getValue()
      }
    }
    this.setState({totalValue: total})
    this.props.totalDisplay(total)
  }

  componentDidMount() {
    this.props.totalDisplay(this.state.totalValue)
  }

  render() {
    let { props } = this
    let dice = []
    for (let i = 0; i < props.numDice; i++) {
      dice.push(<Die {...props} key={i} rollDone={this.rollDone.bind(this, i)} ref={die => this.dice[i] = die} />)
    }

    return (
      <div className="dice">
        {dice}
      </div>
    )
  }
}
