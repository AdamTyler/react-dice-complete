// This file used for production
import React, { forwardRef, useCallback } from 'react'
import DiceContainer, { DiceContainerProps, DieContainerRef } from './DiceContainer'

export interface ReactDiceProps extends Omit<DiceContainerProps, 'totalCb'> {
  rollDone: (total: number, diceValues: number[]) => void
}

export type ReactDiceRef = DieContainerRef

const ReactDice = forwardRef<DieContainerRef, ReactDiceProps>((props, ref) => {
  const totalCb = useCallback(
    (total: number, diceValues: number[]) => {
      props.rollDone(total, diceValues)
    },
    [props.rollDone]
  )

  return <DiceContainer {...props} totalCb={totalCb} ref={ref} />
})

export default ReactDice
