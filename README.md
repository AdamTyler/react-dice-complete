# React Dice

Library for creating multisided dice and rolling them. Check out the demo [here](http://adam-tyler.com/react-dice-complete).

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
import 'react-dice-complete/dist/react-dice-complete.css'

class App extends React.Component {

  render() {
    return (
      <div>
        <ReactDice
          numDice={2}
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

<div id="app"></div>


<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="local/path/to/downloaded/react-dice-complete.js"></script>
<script>
  var rollDone = function(num) {
    console.log('rollDone, total = ' + num);
  }
  var props = {
    rollDone: rollDone,
    faceColor: '#afa2ac'
  }
  var myDice = ReactDOM.render(
    React.createElement(ReactDice.default, props),
    document.getElementById('app')
  );
  myDice.rollAll();
</script>

```

## Available Options
|Name|Type|Default|Description|
|:--:|:--:|:--:|:----------|
|**`rollDone`**|`{String|Function}`|`null`|callback providing integer of total amount from dice roll|
|**`numDice`**|`{Number}`|`4`|The number of dice you wish to have|
|**`outline`**|`{Bool}`|`false`|Show a 1px outline for each face of the die|
|**`outlineColor`**|`{String}`|`#000000`|hex color code for outline color if outline is `true`|
|**`margin`**|`{Number}`|`15`|margin between each die|
|**`faceColor`**|`{String}`|`#ff00ac`|hex color code for the face of the die|
|**`dotColor`**|`{String}`|`#1eff00`|hex color code for the dots on the die|
|**`dieSize`**|`{Number}`|`60`|px width/height of each dice face|
|**`rollTime`**|`{Number}`|`2`|time in seconds for the roll animation|
|**`disableIndividual`**|`{Bool}`|`false`|disable clicks on die to roll each individually |

## Provided functions
`rollAll()`: rolls all die and calls `rollDone` with total from roll
