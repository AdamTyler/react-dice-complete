import React, { Component } from 'react'
import ReactDice from './ReactDice'

class TestApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outline: false,
      outlineColor: '#000000',
      defaultRoll: 1,
      dieSize: 60,
      disableIndividual: false,
      margin: 15,
      numDice: 4,
      sides: 6,
      rollTime: 2,
      faceColor: '#FF00AC',
      dotColor: '#1eff00',
      diceTotal: '...',
      rolling: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.rollDone = this.rollDone.bind(this)
    this.rollAll = this.rollAll.bind(this)
    this.showHideControls = this.showHideControls.bind(this)
  }

  handleChange(e) {
    let value = e.target.value
    if (e.target.type === 'number') {
      value = parseInt(e.target.value, 10)
      if (value < e.target.min) {
        value = e.target.min
      } else if (value > e.target.max) {
        value = e.target.max
      }
    }
    if (e.target.type === 'checkbox') {
      value = !this.state[e.target.name]
    }
    this.setState({
      [e.target.name]: value,
    })
  }

  rollDone(value, values) {
    // console.log('done', value, values)
    this.setState({ diceTotal: value, rolling: false })
  }

  rollAll() {
    this.reactDice.rollAll()
    this.setState({ rolling: true })
  }

  showHideControls() {
    if (window.innerWidth < 576) {
      document.getElementById('collapseForm').classList.remove('show')
    } else {
      document.getElementById('collapseForm').classList.add('show')
    }
  }

  componentDidMount() {
    // this.showHideControls()
    // window.addEventListener('resize', this.showHideControls)
    if (window.innerWidth < 576) {
      document.getElementById('collapseForm').classList.remove('show')
    } else {
      document.getElementById('collapseForm').classList.add('show')
    }
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.showHideControls)
  }

  render() {
    let { state } = this
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
                value={state.numDice}
                onChange={this.handleChange}
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
                value={state.faceColor}
                onChange={this.handleChange}
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
                value={state.dotColor}
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className='form-group col-xs-6 col-sm-4 col-md-3'>
              <label htmlFor='dieSize'>Die Size (px)</label>
              <input
                type='number'
                name='dieSize'
                id='dieSize'
                className='form-control'
                value={state.dieSize}
                onChange={this.handleChange}
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
                value={state.margin}
                onChange={this.handleChange}
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
                value={state.rollTime}
                onChange={this.handleChange}
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
                    checked={state.outline}
                    onChange={this.handleChange}
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
                  value={state.outlineColor}
                  onChange={this.handleChange}
                  disabled={!this.state.outline}
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
                    checked={state.disableIndividual}
                    onChange={this.handleChange}
                  />{' '}
                  Disable individual roll on click
                </label>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='row info'>
          <div className='col'>
            <h4>
              <button className='btn btn-primary' onClick={this.rollAll}>
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
                  display: this.state.rolling ? 'none' : 'inline-block',
                  paddingLeft: '5px',
                }}
              >
                {this.state.diceTotal}
              </span>
              <div
                className='sk-cube-grid'
                style={{
                  display: this.state.rolling ? 'inline-block' : 'none',
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
          <div className='col'>
            <ReactDice
              {...this.state}
              rollDone={this.rollDone}
              ref={(c) => (this.reactDice = c)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TestApp
