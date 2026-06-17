import React, { createRef } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act, cleanup } from '@testing-library/react'
import DiceContainer, { DieContainerRef } from './DiceContainer'

afterEach(cleanup)

type ContainerOverrides = Partial<
  Omit<React.ComponentProps<typeof DiceContainer>, 'totalCb'>
>

const renderContainer = (props: ContainerOverrides = {}) => {
  const totalCb = vi.fn()
  const numDice = props.numDice ?? 2
  const ref = createRef<DieContainerRef>()
  const utils = render(
    <DiceContainer {...props} numDice={numDice} totalCb={totalCb} ref={ref} />
  )
  return { ...utils, ref, totalCb }
}

describe('DiceContainer', () => {
  describe('rendering', () => {
    it('renders the requested number of dice', () => {
      const { container } = renderContainer({ numDice: 3 })
      expect(container.querySelectorAll('.die-container')).toHaveLength(3)
    })

    it('renders zero dice when numDice is 0', () => {
      const { container } = renderContainer({ numDice: 0 })
      expect(container.querySelectorAll('.die-container')).toHaveLength(0)
    })
  })

  describe('totalCb', () => {
    it('reports the initial total on mount', () => {
      const { totalCb } = renderContainer({ numDice: 2, defaultRoll: 6 })
      // each die defaults to 6 → total 12
      expect(totalCb).toHaveBeenCalledWith(12, [6, 6])
    })

    it('reports an updated total when numDice changes', () => {
      const totalCb = vi.fn()
      const ref = createRef<DieContainerRef>()
      const { rerender } = render(
        <DiceContainer numDice={2} totalCb={totalCb} defaultRoll={6} ref={ref} />
      )
      totalCb.mockClear()
      rerender(
        <DiceContainer numDice={3} totalCb={totalCb} defaultRoll={6} ref={ref} />
      )
      expect(totalCb).toHaveBeenCalledWith(18, [6, 6, 6])
    })
  })

  describe('rollAll', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('rolls every die to explicit values and reports the summed total', () => {
      const { ref, totalCb } = renderContainer({ numDice: 2, rollTime: 2 })
      totalCb.mockClear()
      act(() => ref.current!.rollAll([2, 5]))
      // wait for each die's rollTime, then the container's 100ms settle delay
      act(() => vi.advanceTimersByTime(2000))
      act(() => vi.advanceTimersByTime(100))
      expect(totalCb).toHaveBeenCalledWith(7, [2, 5])
    })

    it('only reports once all dice have finished rolling', () => {
      const { ref, totalCb } = renderContainer({ numDice: 3, rollTime: 2 })
      totalCb.mockClear()
      act(() => ref.current!.rollAll([1, 2, 3]))
      act(() => vi.advanceTimersByTime(2000))
      // dice are done but the settle timeout has not fired yet
      expect(totalCb).not.toHaveBeenCalled()
      act(() => vi.advanceTimersByTime(100))
      expect(totalCb).toHaveBeenCalledWith(6, [1, 2, 3])
    })

    it('rolls random values within range when none are provided', () => {
      const { ref, totalCb } = renderContainer({ numDice: 2 })
      totalCb.mockClear()
      act(() => ref.current!.rollAll())
      act(() => vi.advanceTimersByTime(2000))
      act(() => vi.advanceTimersByTime(100))
      const calls = totalCb.mock.calls
      const [total, values] = calls[calls.length - 1]
      expect(values).toHaveLength(2)
      values.forEach((v: number) => {
        expect(v).toBeGreaterThanOrEqual(1)
        expect(v).toBeLessThanOrEqual(6)
      })
      expect(total).toBe(values[0] + values[1])
    })
  })
})
