import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export type DieRef = {
  getValue: () => number
  rollDie: (value?: number) => void
}

export interface DieProps {
  defaultRoll?: number
  dieCornerRadius?: number
  dieSize?: number
  disableIndividual?: boolean
  disableRandom?: boolean
  dotColor?: string
  faceColor?: string
  margin?: number
  onRollDone: (value: number) => void
  outline?: boolean
  outlineColor?: string
  rollTime?: number
  sides?: number
}

const Die = forwardRef<DieRef, DieProps>(
  (
    {
      defaultRoll = 4,
      dieCornerRadius = 5,
      dieSize = 60,
      disableIndividual = false,
      disableRandom = false,
      dotColor = '#1dff00',
      faceColor = '#ff00ac',
      margin = 15,
      onRollDone,
      outline = false,
      outlineColor = '#000000',
      rollTime = 2,
      sides = 6,
    }: DieProps,
    ref
  ): JSX.Element => {
    const dieRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return dieValue
      },
      rollDie,
    }))

    const [dieValue, setDieValue] = useState(defaultRoll || 6)

    const getRandomInt = () => {
      let min = 1
      let max = Math.ceil(sides)
      return Math.floor(Math.random() * max) + min
    }

    const rollDie = (value?: number) => {
      dieRef.current && (dieRef.current.className = `die`)
      void dieRef.current?.offsetWidth
      let roll = disableRandom ? dieValue : value || getRandomInt()
      dieRef.current?.classList.add(`roll${roll}`)
      setTimeout(() => {
        setDieValue(roll)
        onRollDone(roll)
      }, rollTime * 1000)
    }

    // face styles
    let faceStyle: React.CSSProperties = {
      background: faceColor,
      borderRadius: `${dieCornerRadius}px`,
      height: `${dieSize}px`,
      position: 'absolute',
      width: `${dieSize}px`,
    }
    if (outline) {
      faceStyle = { ...faceStyle, boxShadow: `0 0 0 1px ${outlineColor}` }
    }
    const f1Style = {
      transform: `rotateX(180deg) translateZ(${dieSize / 2}px)`,
    }
    const f2Style = {
      transform: `rotateY(-90deg) translateZ(${dieSize / 2}px)`,
    }
    const f3Style = {
      transform: `rotateX(90deg) translateZ(${dieSize / 2}px)`,
    }
    const f4Style = {
      transform: `rotateX(-90deg) translateZ(${dieSize / 2}px)`,
    }
    const f5Style = {
      transform: `rotateY(90deg) translateZ(${dieSize / 2}px)`,
    }
    const f6Style = {
      transform: `rotateY(0deg) translateZ(${dieSize / 2}px)`,
    }
    // dot styles
    const dotSize = dieSize / 6 - 2
    const dotStyle: React.CSSProperties = {
      background: dotColor,
      height: `${dotSize}px`,
      width: `${dotSize}px`,
    }
    const d1Style = {
      top: `${dieSize / 6}px`,
      left: `${dieSize / 6}px`,
    }
    const d2Style = {
      top: `${dieSize / 6}px`,
      right: `${dieSize / 6}px`,
    }
    const d3Style = {
      top: `${dieSize / 2 - dotSize / 2}px`,
      left: `${dieSize / 6}px`,
    }
    const d4Style = {
      top: `${dieSize / 2 - dotSize / 2}px`,
      left: `${dieSize / 2 - dotSize / 2}px`,
    }
    const d5Style = {
      top: `${dieSize / 2 - dotSize / 2}px`,
      right: `${dieSize / 6}px`,
    }
    const d6Style = {
      bottom: `${dieSize / 6}px`,
      left: `${dieSize / 6}px`,
    }
    const d7Style = {
      bottom: `${dieSize / 6}px`,
      right: `${dieSize / 6}px`,
    }
    // roll styles
    const rollStyle = {
      animationDuration: `${rollTime}s`,
      height: `${dieSize}px`,
      width: `${dieSize}px`,
    }
    // container styles
    const containerStyle = {
      margin: `${margin}px`,
      display: 'inline-block',
    }
    return (
      <div
        className='die-container'
        onClick={disableIndividual ? undefined : () => rollDie()}
        style={containerStyle}
      >
        <div className={`die roll${dieValue}`} ref={dieRef} style={rollStyle}>
          <div className='face six' style={Object.assign({}, faceStyle, f6Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d1Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d2Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d3Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d5Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d6Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d7Style)} />
          </div>
          <div className='face one' style={Object.assign({}, faceStyle, f1Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d4Style)} />
          </div>
          <div className='face five' style={Object.assign({}, faceStyle, f5Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d1Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d2Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d4Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d6Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d7Style)} />
          </div>
          <div className='face two' style={Object.assign({}, faceStyle, f2Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d2Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d6Style)} />
          </div>
          <div className='face three' style={Object.assign({}, faceStyle, f3Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d2Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d4Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d6Style)} />
          </div>
          <div className='face four' style={Object.assign({}, faceStyle, f4Style)}>
            <span className='dot' style={Object.assign({}, dotStyle, d1Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d2Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d6Style)} />
            <span className='dot' style={Object.assign({}, dotStyle, d7Style)} />
          </div>
        </div>
      </div>
    )
  }
)

export default Die
