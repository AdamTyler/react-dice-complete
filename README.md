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
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/styles.css'

class App extends React.Component {

  render() {
    return (
      <div>
        <ReactDice
          numDice=2
          rollDone={this.rollDoneCallback}
          ref={dice => this.reactDice = dice}
        />
      </div>
    )
  }

  rollAll() {
    this.reactDice.rollAll()
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
<link rel="stylesheet" href="local/path/to/downloaded/react-dice-complete.css">

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="local/path/to/downloaded/react-dice-complete.js"></script>

<script>
  var reactDice = reactDice();
</script>

```

## Available Options
|Name|Type|Description|
|:--:|:--:|:----------|
|**`rollDone`**|`{String|Function}`|callback providing integer of total amount from dice roll|
|**`numDice`**|`{Number}`|The number of dice you wish to have|
|**`outline`**|`{Bool}`|Show a 1px outline for each face of the die|
|**`outlineColor`**|`{String}`|hex color code for outline color if outline is `true`|
|**`faceColor`**|`{String}`|hex color code for the face of the die|
|**`dotColor`**|`{String}`|hex color code for the dots on the die|
|**`dieSize`**|`{Number}`|px width/height of each dice face|
|**`rollTime`**|`{Number}`|time in seconds for the roll animation|
|**`disableIndividual`**|`{Bool}`|disable clicks on die to roll each individuallly |

## Provided functions
`rollAll`: rolls all die and calls `rollDone` with total from roll
