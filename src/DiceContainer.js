import React, { Component } from 'react'
import Die from './Die'
import './styles.scss'

export default class DiceContainer extends Component {
  constructor(props) {
    super(props)
    let diceValues = []
    for (let i = 0; i < props.numDice; i++) {
      diceValues[i] = 6
    }
    this.state = {
      totalValue: props.numDice * 6,
      diceValues,
    }
    this.dice = []
    this.rollCount = 0

    this.rollDone = this.rollDone.bind(this)
    this.rollAll = this.rollAll.bind(this)
    this.getRollResults = this.getRollResults.bind(this)
  }

  rollAll(values = []) {
    this.rollCount = 0
    let index = 0
    for (let die of this.dice) {
      if (die !== null) {
        this.rollCount++
        die.rollDie(values[index])
        index++
      }
    }
  }

  rollDone() {
    this.rollCount--
    if (this.rollCount <= 0) {
      this.getRollResults()
    }
  }

  getRollResults() {
    let totalValue = 0
    let diceValues = []
    for (let die of this.dice) {
      if (die !== null) {
        let value = die.getValue()
        diceValues.push(value)
        totalValue += value
      }
    }
    this.setState({ totalValue, diceValues })
    this.props.totalCb(totalValue, diceValues)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numDice !== this.props.numDice) {
      this.getRollResults()
    }
  }

  render() {
    let { props } = this
    let dice = []
    this.dice.splice(props.numDice, 100 - props.numDice)
    for (let i = 0; i < props.numDice; i++) {
      dice.push(
        <Die
          {...props}
          key={i}
          rollDone={this.rollDone}
          ref={(die) => (this.dice[i] = die)}
        />
      )
    }

    return <div className='dice'>{dice}</div>
  }
}
