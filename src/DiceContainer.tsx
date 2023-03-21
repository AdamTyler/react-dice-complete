import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  memo,
  useMemo,
} from 'react'
import Die, { DieHandle, DieProps } from './Die'
import './styles.scss'

export type DieContainerHandle = {
  rollAll: (values?: number[]) => void
}

export interface DiceContainerProps extends DieProps {
  numDice: number
  totalCb: (newTotalValue: number, newDiceValues: number[]) => void
}

const DiceContainer = forwardRef<DieContainerHandle, DiceContainerProps>(
  ({ numDice, totalCb, ...rest }, ref): JSX.Element => {
    const diceRefs = useRef<Array<DieHandle | null>>([])
    const [totalValue, setTotalValue] = useState(numDice * 6)
    const [diceValues, setDiceValues] = useState<number[]>([])
    const [rollCount, setRollCount] = useState(0)

    useImperativeHandle(ref, () => ({
      rollAll,
    }))

    const rollAll = (values = []) => {
      setRollCount(diceRefs.current.length)
      let index = 0
      for (let die of diceRefs.current) {
        if (die !== null) {
          die.rollDie(values[index])
          index += 1
        }
      }
    }

    const onRollDone = () => {
      setRollCount((count) => count - 1)
    }

    useEffect(() => {
      if (rollCount <= 0) {
        setTimeout(getRollResults, 100)
      }
    }, [rollCount])

    const getRollResults = () => {
      let newTotalValue = 0
      let newDiceValues: number[] = []
      for (let die of diceRefs.current) {
        if (die !== null) {
          const value = die.getValue()
          newDiceValues.push(value)
          newTotalValue += value
        }
      }
      setTotalValue(newTotalValue)
      setDiceValues(newDiceValues)
      totalCb(newTotalValue, newDiceValues)
    }

    useEffect(() => {
      getRollResults()
    }, [numDice])

    const getDice = useMemo(() => {
      let dice: JSX.Element[] = []
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
