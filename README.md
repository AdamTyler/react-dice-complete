# React Dice

Library for creating multisided dice and rolling them. Check out the demo [here](http://adam-tyler.com/react-dice).

![sample dice roll](/img/diceRoll2.gif "Sample Dice Roll")

## Installation
```
npm install react-dice
```

## Dependencies
* [React](https://facebook.github.io/react/)

## Usage (ES6)
```
import React from 'react'
import ReactDice from 'react-dice'

class App extends React.Component {

  render() {
    return (
      <div>
        <ReactDice
          numDice=2
          faceColor='#FF00AC'
          dotColor='#1DFF00'
          dieSize='60'
          rollTime='2'
          outline=false
          rollDone={this.rollDoneCallback}
        />
      </div>
    )
  }

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`)
  }
)
```

## Usage ES5 (with bundling)
```
var React = require('react');
var ReactDice = require('react-dice');


```

## Usage ES5 (no bundling)
```
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="local/path/to/downloaded/react-dice.min.js"></script>

```
