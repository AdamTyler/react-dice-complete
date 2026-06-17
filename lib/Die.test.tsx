import React, { createRef } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react'
import Die, { DieRef } from './Die'

afterEach(cleanup)

type DieOverrides = Partial<Omit<React.ComponentProps<typeof Die>, 'onRollDone'>>

const renderDie = (props: DieOverrides = {}) => {
  const onRollDone = vi.fn()
  const ref = createRef<DieRef>()
  const utils = render(<Die {...props} onRollDone={onRollDone} ref={ref} />)
  return { ...utils, ref, onRollDone }
}

describe('Die', () => {
  describe('rendering', () => {
    it('renders a clickable button by default', () => {
      renderDie()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('renders all six faces', () => {
      const { container } = renderDie()
      expect(container.querySelectorAll('.face')).toHaveLength(6)
    })

    it('renders the default value (6) as the initial face', () => {
      const { container } = renderDie()
      expect(container.querySelector('.die')).toHaveClass('init-roll6')
    })

    it('clamps an out-of-range defaultRoll up to a valid face', () => {
      const { container } = renderDie({ defaultRoll: 99 })
      expect(container.querySelector('.die')).toHaveClass('init-roll6')
    })

    it('clamps a too-low defaultRoll up to 1', () => {
      const { container } = renderDie({ defaultRoll: -3 })
      expect(container.querySelector('.die')).toHaveClass('init-roll1')
    })

    it('honors a valid defaultRoll', () => {
      const { container } = renderDie({ defaultRoll: 3 })
      expect(container.querySelector('.die')).toHaveClass('init-roll3')
    })

    it('falls back to 6 when defaultRoll is 0', () => {
      const { container } = renderDie({ defaultRoll: 0 })
      expect(container.querySelector('.die')).toHaveClass('init-roll6')
    })
  })

  describe('disableIndividual', () => {
    it('does not expose button affordances when disabled', () => {
      renderDie({ disableIndividual: true })
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('does not roll on click when disabled', async () => {
      vi.useFakeTimers()
      try {
        const { container, onRollDone } = renderDie({ disableIndividual: true })
        const dieContainer = container.querySelector('.die-container')!
        await act(async () => {
          dieContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }))
          vi.runAllTimers()
        })
        expect(onRollDone).not.toHaveBeenCalled()
      } finally {
        vi.useRealTimers()
      }
    })
  })

  describe('rolling via ref', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('rolls to an explicit value and reports it after rollTime', () => {
      const { ref, onRollDone } = renderDie({ rollTime: 2 })
      act(() => ref.current!.rollDie(4))
      // callback fires only after the roll animation time elapses
      expect(onRollDone).not.toHaveBeenCalled()
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone).toHaveBeenCalledWith(4)
      expect(ref.current!.getValue()).toBe(4)
    })

    it('clamps an explicit roll value above 6 down to 6', () => {
      const { ref, onRollDone } = renderDie()
      act(() => ref.current!.rollDie(10))
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone).toHaveBeenCalledWith(6)
    })

    it('clamps an explicit roll value below 1 up to 1', () => {
      const { ref, onRollDone } = renderDie()
      act(() => ref.current!.rollDie(-5))
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone).toHaveBeenCalledWith(1)
    })

    it('respects a custom rollTime', () => {
      const { ref, onRollDone } = renderDie({ rollTime: 5 })
      act(() => ref.current!.rollDie(2))
      act(() => vi.advanceTimersByTime(4999))
      expect(onRollDone).not.toHaveBeenCalled()
      act(() => vi.advanceTimersByTime(1))
      expect(onRollDone).toHaveBeenCalledWith(2)
    })

    it('produces a random value within 1-6 when no value is given', () => {
      const { ref, onRollDone } = renderDie()
      const spy = vi.spyOn(Math, 'random').mockReturnValue(0.99)
      act(() => ref.current!.rollDie())
      act(() => vi.advanceTimersByTime(2000))
      const rolled = onRollDone.mock.calls[0][0]
      expect(rolled).toBeGreaterThanOrEqual(1)
      expect(rolled).toBeLessThanOrEqual(6)
      spy.mockRestore()
    })

    it('caps random rolls at 6 even when sides is larger', () => {
      const { ref, onRollDone } = renderDie({ sides: 20 })
      const spy = vi.spyOn(Math, 'random').mockReturnValue(0.999)
      act(() => ref.current!.rollDie())
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone.mock.calls[0][0]).toBeLessThanOrEqual(6)
      spy.mockRestore()
    })

    it('disableRandom keeps the current value instead of rolling', () => {
      const { ref, onRollDone } = renderDie({ defaultRoll: 3, disableRandom: true })
      act(() => ref.current!.rollDie())
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone).toHaveBeenCalledWith(3)
      expect(ref.current!.getValue()).toBe(3)
    })

    it('marks the die as rolled after the first roll', () => {
      const { ref, container } = renderDie()
      expect(container.querySelector('.die')).toHaveClass('init-roll6')
      act(() => ref.current!.rollDie(2))
      act(() => vi.advanceTimersByTime(2000))
      expect(container.querySelector('.die')).toHaveClass('roll2')
    })

    it('a second roll cancels the first pending callback', () => {
      const { ref, onRollDone } = renderDie()
      act(() => ref.current!.rollDie(2))
      act(() => vi.advanceTimersByTime(1000))
      act(() => ref.current!.rollDie(5))
      act(() => vi.advanceTimersByTime(2000))
      // only the second roll should report
      expect(onRollDone).toHaveBeenCalledTimes(1)
      expect(onRollDone).toHaveBeenCalledWith(5)
    })

    it('clears a pending timeout on unmount without firing the callback', () => {
      const { ref, onRollDone, unmount } = renderDie()
      act(() => ref.current!.rollDie(4))
      unmount()
      act(() => vi.advanceTimersByTime(2000))
      expect(onRollDone).not.toHaveBeenCalled()
    })
  })

  describe('interaction', () => {
    it('rolls on click', () => {
      vi.useFakeTimers()
      try {
        const { onRollDone } = renderDie()
        act(() => {
          fireEvent.click(screen.getByRole('button'))
        })
        act(() => vi.advanceTimersByTime(2000))
        expect(onRollDone).toHaveBeenCalledTimes(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('rolls on Enter key', () => {
      vi.useFakeTimers()
      try {
        const { onRollDone } = renderDie()
        const button = screen.getByRole('button')
        act(() => {
          button.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
          )
        })
        act(() => vi.advanceTimersByTime(2000))
        expect(onRollDone).toHaveBeenCalledTimes(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('rolls on Space key', () => {
      vi.useFakeTimers()
      try {
        const { onRollDone } = renderDie()
        const button = screen.getByRole('button')
        act(() => {
          button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
        })
        act(() => vi.advanceTimersByTime(2000))
        expect(onRollDone).toHaveBeenCalledTimes(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('ignores other keys', () => {
      vi.useFakeTimers()
      try {
        const { onRollDone } = renderDie()
        const button = screen.getByRole('button')
        act(() => {
          button.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
        })
        act(() => vi.advanceTimersByTime(2000))
        expect(onRollDone).not.toHaveBeenCalled()
      } finally {
        vi.useRealTimers()
      }
    })
  })

  describe('styling props', () => {
    it('applies dieSize and margin to the rendered die', () => {
      const { container } = renderDie({ dieSize: 100, margin: 20 })
      const dieContainer = container.querySelector('.die-container') as HTMLElement
      expect(dieContainer.style.margin).toBe('20px')
      const die = container.querySelector('.die') as HTMLElement
      expect(die.style.width).toBe('100px')
      expect(die.style.height).toBe('100px')
    })

    it('applies faceColor to faces', () => {
      const { container } = renderDie({ faceColor: 'rgb(255, 0, 0)' })
      const face = container.querySelector('.face') as HTMLElement
      expect(face.style.background).toBe('rgb(255, 0, 0)')
    })

    it('adds an outline box-shadow when outline is enabled', () => {
      const { container } = renderDie({ outline: true, outlineColor: 'rgb(0, 0, 0)' })
      const face = container.querySelector('.face') as HTMLElement
      expect(face.style.boxShadow).toContain('rgb(0, 0, 0)')
    })

    it('omits the outline box-shadow by default', () => {
      const { container } = renderDie()
      const face = container.querySelector('.face') as HTMLElement
      expect(face.style.boxShadow).toBe('')
    })
  })
})
