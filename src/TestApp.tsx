import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import ReactDice, { ReactDiceRef } from '../lib/ReactDice'

const TestApp = () => {
  const [defaultRoll, setDefaultRoll] = useState(1)
  const [diceTotal, setDiceTotal] = useState<number>()
  const [dieCornerRadius, setDieCornerRadius] = useState(5)
  const [dieSize, setDieSize] = useState(60)
  const [disableIndividual, setDisableIndividual] = useState(false)
  const [disableRandom, setDisableRandom] = useState(false)
  const [dotColor, setDotColor] = useState('#1eff00')
  const [faceColor, setFaceColor] = useState('#FF00AC')
  const [margin, setMargin] = useState(15)
  const [numDice, setNumDice] = useState(1)
  const [outline, setOutline] = useState(false)
  const [outlineColor, setOutlineColor] = useState('#000000')
  const [rolling, setRolling] = useState(false)
  const [rollTime, setRollTime] = useState(2)
  const [sides, setSides] = useState(6)
  const [showConfig, setShowConfig] = useState(false)

  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (value: number, _values: number[]) => {
    setRolling(false)
    setDiceTotal(value)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
    setRolling(true)
  }

  const getDice = useCallback(() => {
    return (
      <ReactDice
        defaultRoll={defaultRoll}
        dieCornerRadius={dieCornerRadius}
        dieSize={dieSize}
        disableIndividual={disableIndividual}
        disableRandom={disableRandom}
        dotColor={dotColor}
        faceColor={faceColor}
        margin={margin}
        numDice={numDice}
        outline={outline}
        outlineColor={outlineColor}
        ref={reactDice}
        rollDone={rollDone}
        rollTime={rollTime}
        sides={sides}
      />
    )
  }, [
    defaultRoll,
    dieCornerRadius,
    dieSize,
    disableIndividual,
    disableRandom,
    dotColor,
    faceColor,
    margin,
    numDice,
    outline,
    outlineColor,
    rollTime,
    sides,
  ])

  return (
    <div className='demo'>
      {/* Mobile-only toggle for the configuration panel */}
      <button
        type='button'
        className='config-toggle'
        aria-expanded={showConfig}
        aria-controls='configPanel'
        onClick={() => setShowConfig((v) => !v)}
      >
        <span>Configure dice</span>
        <span className='chevron' aria-hidden='true'>
          ▾
        </span>
      </button>

      <div
        id='configPanel'
        className={`panel config-collapsible${showConfig ? ' is-open' : ''}`}
      >
        <form className='controls' onSubmit={(e) => e.preventDefault()}>
          <div className='field'>
            <label htmlFor='numDice'>Dice</label>
            <input
              type='number'
              name='numDice'
              id='numDice'
              className='input'
              value={numDice}
              onChange={(e) => setNumDice(parseInt(e.target.value, 10))}
              min='1'
              max='100'
            />
          </div>

          <div className='field'>
            <label htmlFor='faceColor'>Face Color</label>
            <input
              type='color'
              name='faceColor'
              id='faceColor'
              className='input'
              value={faceColor}
              onChange={(e) => setFaceColor(e.target.value)}
            />
          </div>

          <div className='field'>
            <label htmlFor='dotColor'>Dot Color</label>
            <input
              type='color'
              name='dotColor'
              id='dotColor'
              className='input'
              value={dotColor}
              onChange={(e) => setDotColor(e.target.value)}
            />
          </div>

          <div className='field'>
            <label htmlFor='dieSize'>Die Size (px)</label>
            <input
              type='number'
              name='dieSize'
              id='dieSize'
              className='input'
              value={dieSize}
              onChange={(e) => setDieSize(parseInt(e.target.value, 10))}
              min='30'
              max='200'
            />
          </div>

          <div className='field'>
            <label htmlFor='margin'>Margin Between (px)</label>
            <input
              type='number'
              name='margin'
              id='margin'
              className='input'
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value, 10))}
              min='0'
              max='200'
            />
          </div>

          <div className='field'>
            <label htmlFor='dieCornerRadius'>Corner Radius (px)</label>
            <input
              type='number'
              name='dieCornerRadius'
              id='dieCornerRadius'
              className='input'
              value={dieCornerRadius}
              onChange={(e) => setDieCornerRadius(parseInt(e.target.value, 10))}
              min='0'
              max='200'
            />
          </div>

          <div className='field'>
            <label htmlFor='rollTime'>Roll Time (seconds)</label>
            <input
              type='number'
              name='rollTime'
              id='rollTime'
              className='input'
              value={rollTime}
              onChange={(e) => setRollTime(parseInt(e.target.value, 10))}
              min='1'
              max='4'
            />
          </div>

          <div className='field'>
            <span className='field__label'>Outline</span>
            <label className='check'>
              <input
                type='checkbox'
                name='outline'
                id='outline'
                checked={outline}
                onChange={() => setOutline(!outline)}
              />
              Enable outline
            </label>
            <input
              type='color'
              name='outlineColor'
              id='outlineColor'
              className='input'
              value={outlineColor}
              onChange={(e) => setOutlineColor(e.target.value)}
              disabled={!outline}
            />
          </div>

          <div className='field'>
            <span className='field__label'>Roll behavior</span>
            <label className='check'>
              <input
                type='checkbox'
                name='disableIndividual'
                id='disableIndividual'
                checked={disableIndividual}
                onChange={() => setDisableIndividual(!disableIndividual)}
              />
              Disable individual roll on click
            </label>
            <label className='check'>
              <input
                type='checkbox'
                name='disableRandom'
                id='disableRandom'
                checked={disableRandom}
                onChange={() => setDisableRandom(!disableRandom)}
              />
              Disable random rolls
            </label>
          </div>
        </form>
      </div>

      <div className='panel action'>
        <div className='action__left'>
          <button type='button' className='btn-roll' onClick={rollAll}>
            Roll All
          </button>
          <span className='hint'>or click an individual die</span>
        </div>

        <div className='total'>
          <span>Dice Total:</span>
          {rolling ? (
            <div className='sk-cube-grid' aria-label='Rolling'>
              <div className='sk-cube sk-cube1' />
              <div className='sk-cube sk-cube2' />
              <div className='sk-cube sk-cube3' />
              <div className='sk-cube sk-cube4' />
              <div className='sk-cube sk-cube5' />
              <div className='sk-cube sk-cube6' />
              <div className='sk-cube sk-cube7' />
              <div className='sk-cube sk-cube8' />
              <div className='sk-cube sk-cube9' />
            </div>
          ) : (
            <span className='total__value'>{diceTotal ?? '…'}</span>
          )}
        </div>
      </div>

      <div className='panel stage'>{getDice()}</div>
    </div>
  )
}

export default TestApp
