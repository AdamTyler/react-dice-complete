import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactDice, { ReactDiceHandle } from './ReactDice'

const TestApp = () => {
  const [outline, setOutline] = useState(false)
  const [outlineColor, setOutlineColor] = useState('#000000')
  const [defaultRoll, setDefaultRoll] = useState(5)
  const [dieSize, setDieSize] = useState(60)
  const [dieCornerRadius, setDieCornerRadius] = useState(5)
  const [disableIndividual, setDisableIndividual] = useState(false)
  const [disableRandom, setDisableRandom] = useState(false)
  const [margin, setMargin] = useState(15)
  const [numDice, setNumDice] = useState(4)
  const [sides, setSides] = useState(6)
  const [rollTime, setRollTime] = useState(2)
  const [faceColor, setFaceColor] = useState('#FF00AC')
  const [dotColor, setDotColor] = useState('#1eff00')
  const [rolling, setRolling] = useState(false)
  const [diceTotal, setDiceTotal] = useState()

  const reactDice = useRef<ReactDiceHandle>(null)

  const rollDone = (value, values) => {
    setRolling(false)
    setDiceTotal(value)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
    setRolling(true)
  }

  useEffect(() => {
    if (window.innerWidth < 576) {
      document.getElementById('collapseForm')?.classList.remove('show')
    } else {
      document.getElementById('collapseForm')?.classList.add('show')
    }
  }, [])

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
    rollDone,
    rollTime,
    sides,
  ])

  let colorStyle = { height: '2.375rem' }

  return (
    <div className='dice-test'>
      <a
        className='row card card-header collapse-title hidden-sm-up'
        data-toggle='collapse'
        href='#collapseForm'
        aria-expanded='false'
        aria-controls='collapseForm'
      >
        Show Config Options &#9660;
      </a>
      <div className='collapse' id='collapseForm'>
        <form className='row controls align-items-end'>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='numDice'>Dice</label>
            <input
              type='number'
              name='numDice'
              id='numDice'
              className='form-control'
              value={numDice}
              onChange={(e) => setNumDice(parseInt(e.target.value, 10))}
              min='1'
              max='100'
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='faceColor'>Face Color</label>
            <input
              type='color'
              name='faceColor'
              id='faceColor'
              className='form-control'
              style={colorStyle}
              value={faceColor}
              onChange={(e) => setFaceColor(e.target.value)}
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='dotColor'>Dot Color</label>
            <input
              type='color'
              name='dotColor'
              id='dotColor'
              className='form-control'
              style={colorStyle}
              value={dotColor}
              onChange={(e) => setDotColor(e.target.value)}
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='dieSize'>Die Size (px)</label>
            <input
              type='number'
              name='dieSize'
              id='dieSize'
              className='form-control'
              value={dieSize}
              onChange={(e) => setDieSize(parseInt(e.target.value, 10))}
              min='30'
              max='200'
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='dieSize'>Margin Between (px)</label>
            <input
              type='number'
              name='margin'
              id='margin'
              className='form-control'
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value, 10))}
              min='0'
              max='200'
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='dieSize'>Corner Radius (px)</label>
            <input
              type='number'
              name='dieCornerRadius'
              id='dieCornerRadius'
              className='form-control'
              value={dieCornerRadius}
              onChange={(e) => setDieCornerRadius(parseInt(e.target.value, 10))}
              min='0'
              max='200'
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <label htmlFor='rollTime'>Roll Time (seconds)</label>
            <input
              type='number'
              name='rollTime'
              id='rollTime'
              className='form-control'
              value={rollTime}
              onChange={(e) => setRollTime(parseInt(e.target.value, 10))}
              min='1'
              max='4'
            />
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <div className='form-check'>
              <label className='form-check-label'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='outline'
                  id='outline'
                  checked={outline}
                  onChange={() => setOutline(!outline)}
                />
                {'  '}Outline
              </label>
            </div>
            <div>
              <input
                type='color'
                name='outlineColor'
                id='outlineColor'
                className='form-control'
                style={colorStyle}
                value={outlineColor}
                onChange={(e) => setOutlineColor(e.target.value)}
                disabled={!outline}
              />
            </div>
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <div className='form-check'>
              <label className='form-check-label'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='disableIndividual'
                  id='disableIndividual'
                  checked={disableIndividual}
                  onChange={() => setDisableIndividual(!disableIndividual)}
                />{' '}
                Disable individual roll on click
              </label>
            </div>
          </fieldset>
          <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
            <div className='form-check'>
              <label className='form-check-label'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='disableRandom'
                  id='disableRandom'
                  checked={disableRandom}
                  onChange={() => setDisableRandom(!disableRandom)}
                />{' '}
                Disable random rolls
              </label>
            </div>
          </fieldset>
        </form>
      </div>
      <div className='row info'>
        <div className='col'>
          <h4>
            <button className='btn btn-primary' onClick={rollAll}>
              Roll All
            </button>
            {'   '} or click individual dice
          </h4>
        </div>

        <div className='col'>
          <h4 className='text-primary'>
            Dice Total:
            <span
              style={{
                display: rolling ? 'none' : 'inline-block',
                paddingLeft: '5px',
              }}
            >
              {diceTotal || '...'}
            </span>
            <div
              className='sk-cube-grid'
              style={{
                display: rolling ? 'inline-block' : 'none',
              }}
            >
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
          </h4>
        </div>
      </div>
      <div className='row dice'>
        <div className='col'>{getDice()}</div>
      </div>
    </div>
  )
}

export default TestApp
