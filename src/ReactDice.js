import React, { Component, PropTypes } from 'react'
import DiceContainer from './DiceContainer'

class ReactDice extends Component {

  static propTypes = {
    outline: PropTypes.bool,
    outlineColor: PropTypes.string,
    dieSize: PropTypes.number,
    disableIndividual: PropTypes.bool,
    margin: PropTypes.number,
    numDice: PropTypes.number,
    sides: PropTypes.number,
    rollTime: PropTypes.number,
    rollDone: PropTypes.func,
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
    this.resultsCb = this.resultsCb.bind(this)
    this.rollAll = this.rollAll.bind(this)
  }

  resultsCb(total, diceValues) {
    this.props.rollDone(total, diceValues);
  }

  rollAll() {
    this.diceContainer.rollAll()
  }

  render() {
    return (
      <div>
        <DiceContainer {...this.props} resultsCb={this.resultsCb}
          ref={c=> this.diceContainer = c} />
      </div>
    )
  }
}

export default ReactDice
