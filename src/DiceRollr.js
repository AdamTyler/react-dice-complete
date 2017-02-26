import React, { Component, PropTypes } from 'react'
import DiceContainer from './DiceContainer'

class DiceRollr extends Component {

  static propTypes = {
    outline: PropTypes.bool,
    outlineColor: PropTypes.string,
    dieSize: PropTypes.number,
    disableIndividual: PropTypes.bool,
    margin: PropTypes.number,
    numDice: PropTypes.number,
    sides: PropTypes.number,
    rollTime: PropTypes.number,
    faceColor: PropTypes.string,
    dotColor: PropTypes.string,
  }

  static defaultProps = {
    outline: false,
    outlineColor: '#000000',
    dieSize: 60,
    disableIndividual: false,
    margin: 15,
    numDice: 4,
    sides: 6,
    rollTime: 2,
    faceColor: '#FF00AC',
    dotColor: '#1dff00'
  }

  constructor(props) {
    super(props)
    this.totalCb = this.totalCb.bind(this)
    this.rollAll = this.rollAll.bind(this)
  }

  totalCb(value) {
    this.props.rollDone(value)
  }

  rollAll() {
    this.diceContainer.rollAll()
  }

  render() {
    return (
      <div>
        <DiceContainer {...this.props} totalCb={this.totalCb}
          ref={c=> this.diceContainer = c} />
      </div>
    )
  }
}

export default DiceRollr
