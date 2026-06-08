import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  memo,
  useMemo,
  useCallback,
} from 'react'
import Die, { DieRef, DieProps } from './Die'
import './styles.scss'

export type DieContainerRef = {
  rollAll: (values?: number[]) => void
}

export interface DiceContainerProps extends Omit<DieProps, 'onRollDone'> {
  numDice: number
  totalCb: (newTotalValue: number, newDiceValues: number[]) => void
}

const DiceContainer = forwardRef<DieContainerRef, DiceContainerProps>(
  ({ numDice, totalCb, ...rest }, ref): JSX.Element => {
    const diceRefs = useRef<Array<DieRef | null>>([])
    const rollCountRef = useRef(0)

    useImperativeHandle(ref, () => ({
      rollAll,
    }))

    const getRollResults = useCallback(() => {
      let newTotalValue = 0
      let newDiceValues: number[] = []
      for (let die of diceRefs.current) {
        if (die !== null) {
          const value = die.getValue()
          newDiceValues.push(value)
          newTotalValue += value
        }
      }
      totalCb(newTotalValue, newDiceValues)
    }, [totalCb])

    const rollAll = (values: number[] = []) => {
      // Truncate stale refs left over from a previous higher numDice
      diceRefs.current.length = numDice
      const liveCount = diceRefs.current.filter(Boolean).length
      rollCountRef.current = liveCount
      let index = 0
      for (let die of diceRefs.current) {
        if (die !== null) {
          die.rollDie(values[index])
          index += 1
        }
      }
    }

    const onRollDone = useCallback(() => {
      rollCountRef.current -= 1
      if (rollCountRef.current <= 0) {
        // Small delay lets every die's setState flush before we read values
        setTimeout(getRollResults, 100)
      }
    }, [getRollResults])

    useEffect(() => {
      // Truncate stale refs and report updated totals whenever count changes
      diceRefs.current.length = numDice
      getRollResults()
    }, [numDice, getRollResults])

    const getDice = useMemo(() => {
      const dice: JSX.Element[] = []
      for (let i = 0; i < numDice; i++) {
        dice.push(
          <Die
            {...rest}
            key={i}
            onRollDone={onRollDone}
            ref={(die) => (diceRefs.current[i] = die)}
          />
        )
      }
      return dice
    }, [rest, numDice, onRollDone])

    return <div className='dice'>{getDice}</div>
  }
)

export default memo(DiceContainer)
