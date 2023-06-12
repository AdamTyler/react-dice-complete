# React Dice 🎲

[![npm version](https://badge.fury.io/js/react-dice-complete.svg)](https://badge.fury.io/js/react-dice-complete)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Library for creating multisided dice and rolling them. Check out the demo [here](http://adam-tyler.com/react-dice-complete).

![sample dice roll](/img/diceRoll2.gif 'Sample Dice Roll')

## Installation

```
npm install react-dice-complete
```

## Usage

```javascript
import React, { useRef } from 'react'
import ReactDice, { ReactDiceRef } from 'react-dice-complete'

const MyDiceApp = () => {

  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (totalValue: number, values: number[]) => {
    console.log('individual die values array:', values)
    console.log('total dice value:', totalValue)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
  }

  return (
    <ReactDice
      numDice={2}
      ref={reactDice}
      rollDone={rollDone}
    />
  )

}
```

## Available Options

|          Name           |        Type         |  Default  | Description                                               |
| :---------------------: | :-----------------: | :-------: | :-------------------------------------------------------- |
|    **`defaultRoll`**    |     `{Number}`      |    `6`    | The number you want displayed before a roll               |
|  **`dieCornerRadius`**  |     `{Number}`      |    `5`    | Rounded radius to use for each die                        |
|      **`dieSize`**      |     `{Number}`      |   `60`    | px width/height of each dice face                         |
| **`disableIndividual`** |      `{Bool}`       |  `false`  | disable clicks on die to roll each individually           |
|  **`disabbleRandom`**   |      `{Bool}`       |  `false`  | disable random die chance and reuses current value        |
|     **`dotColor`**      |     `{String}`      | `#1eff00` | hex color code for the dots on the die                    |
|     **`faceColor`**     |     `{String}`      | `#ff00ac` | hex color code for the face of the die                    |
|      **`margin`**       |     `{Number}`      |   `15`    | margin between each die                                   |
|      **`numDice`**      |     `{Number}`      |    `4`    | The number of dice you wish to have                       |
|      **`outline`**      |      `{Bool}`       |  `false`  | Show a 1px outline for each face of the die               |
|   **`outlineColor`**    |     `{String}`      | `#000000` | hex color code for outline color if outline is `true`     |
|     **`rollDone`**      | `{String/Function}` |  `null`   | callback returns total & individual values from dice roll |
|     **`rollTime`**      |     `{Number}`      |    `2`    | time in seconds for the roll animation                    |

## Provided functions

`rollAll([values])`: rolls all die and calls `rollDone` with total from roll. You can preset the `values` you would like the outcome to be by passing array of numbers, if not result will be random.
