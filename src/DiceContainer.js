import React, { Component } from 'react'
import Die from './Die'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './styles.scss'

export default class DiceContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalValue: props.numDice * 6
    }
    this.dice = []
    this.rollCount = 0

    this.rollDone = this.rollDone.bind(this)
    this.rollAll = this.rollAll.bind(this)
    this.getDiceTotal = this.getDiceTotal.bind(this)

  }

  rollAll() {
    this.rollCount = 0
    for (let die of this.dice) {
      if(die !== null) {
        this.rollCount++
        die.rollDie()
      }
    }
  }

  rollDone() {
    this.rollCount--;
    if (this.rollCount <= 0) {
      this.getDiceTotal()
    }
  }

  getDiceTotal() {
    let total = 0
    for (let die of this.dice) {
      if(die !== null) {
        total += die.getValue()
      }
    }
    this.setState({totalValue: total})
    this.props.totalCb(total)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numDice !== this.props.numDice) {
      this.getDiceTotal()
    }
  }

  render() {
    let { props } = this
    let dice = []
    this.dice.splice(props.numDice, 100 - props.numDice)
    for (let i = 0; i < props.numDice; i++) {
      dice.push(<Die {...props} key={i} rollDone={this.rollDone} ref={die => this.dice[i] = die} />)
    }

    return (
      <div className="dice">
        {dice}
      </div>
    )
  }
}
