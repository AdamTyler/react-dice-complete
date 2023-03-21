// This file used for production
import React, { forwardRef, useCallback } from 'react'
import DiceContainer, { DiceContainerProps, DieContainerHandle } from './DiceContainer'

export interface ReactDiceProps extends Omit<DiceContainerProps, 'totalCb'> {
  rollDone: (total: number, diceValues: number[]) => void
}

export type ReactDiceHandle = DieContainerHandle

const ReactDice = forwardRef<DieContainerHandle, ReactDiceProps>((props, ref) => {
  const totalCb = useCallback(
    (total: number, diceValues: number[]) => {
      props.rollDone(total, diceValues)
    },
    [props.rollDone]
  )

  return <DiceContainer {...props} totalCb={totalCb} ref={ref} />
})

export default ReactDice
