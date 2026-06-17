import React, { createRef } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act, cleanup } from '@testing-library/react'
import ReactDice, { ReactDiceRef } from './ReactDice'

afterEach(cleanup)

describe('ReactDice', () => {
  it('renders the requested number of dice', () => {
    const { container } = render(<ReactDice numDice={4} rollDone={vi.fn()} />)
    expect(container.querySelectorAll('.die-container')).toHaveLength(4)
  })

  it('forwards results to rollDone on mount', () => {
    const rollDone = vi.fn()
    render(<ReactDice numDice={2} rollDone={rollDone} defaultRoll={6} />)
    expect(rollDone).toHaveBeenCalledWith(12, [6, 6])
  })

  it('exposes rollAll through the ref and reports the rolled total', () => {
    vi.useFakeTimers()
    try {
      const rollDone = vi.fn()
      const ref = createRef<ReactDiceRef>()
      render(<ReactDice numDice={2} rollDone={rollDone} rollTime={2} ref={ref} />)
      rollDone.mockClear()
      act(() => ref.current!.rollAll([3, 4]))
      // let each die's state flush, then the container's 100ms settle delay
      act(() => vi.advanceTimersByTime(2000))
      act(() => vi.advanceTimersByTime(100))
      expect(rollDone).toHaveBeenCalledWith(7, [3, 4])
    } finally {
      vi.useRealTimers()
    }
  })

  it('passes styling props through to the dice', () => {
    const { container } = render(
      <ReactDice numDice={1} rollDone={vi.fn()} dieSize={120} />
    )
    const die = container.querySelector('.die') as HTMLElement
    expect(die.style.width).toBe('120px')
  })
})
