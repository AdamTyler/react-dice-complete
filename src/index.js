import React, { Component } from 'react'
import {render} from 'react-dom'
import Die from './die'

import './styles.scss'

class DiceContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  rollAll() {

  }

  render() {
    return (
      <div className="dice">
        <Die sides={6} rollTime={2000} />
        <Die sides={6} rollTime={2000} />
        <Die sides={6} rollTime={2000} />
        <Die sides={6} rollTime={2000} />
      </div>
    )
  }
}

render(<DiceContainer/>, document.getElementById('app'));
