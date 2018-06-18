import React, { Component } from 'react'
import moment from 'moment'
import { DAYS, MONTHS } from '../constants'

/**
 * Props: value, format, minView
 */
export class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.value = moment(this.props.value)
    this.minView = this.props.minView || 'd' // m, d, h, s
    this.format = this.props.format || (this.minView === 'm' ? 'YYYY-MM' : 'YYYY-MM-DD')
    this.state = {
      hidden: true
    }
  }

  toggle = (e) => {
    this.setState(prevState => {
      return {
        hidden: !prevState.hidden
      }
    })
  }

  showPicker = (e) => {
    this.setState({ hidden: false })
  }

  hidePicker = (e) => {
    this.setState({ hidden: true })
  }

  handleDateSelected = (value) => {
    this.value = value
    this.toggle(null)
  }

  render() {
    return (
      <div className="datepicker">
        <input readOnly={true} onFocus={this.showPicker} className="datepicker__input" type="text" value={this.value.format(this.format)}/>
        <DatePickerPopup minView={this.minView} onDateSelected={this.handleDateSelected} hidden={this.state.hidden} value={this.value}/>
      </div>
    )
  }
}

/**
 * Props: lang
 */
class DatePickerPopup extends Component {
  constructor(props) {
    super(props)
    const value = moment(this.props.value)
    const now = moment()
    this.minView = this.props.minView
    this.lang = this.props.lang || 'cn'
    this.today = { y: now.year(), m: now.month(), d: now.date() }
    this.state = {
      startOfYear: value.year(),
      mode: this.minView, // d,m,y
      value
    }
    this.nOfYear = 20
  }

  // #region grid data generator

  _writeLastMonthPart(grid) {
    const copy = this.state.value.clone()
    copy.date(1)
    const N = copy.day()
    copy.subtract(1, 'd')
    const Y = copy.year(), M = copy.month(), D = copy.date()
    for (let i = 0, d = D - N - 1; i < N; i ++, d ++) {
      grid.push({
        text: d + '',
        value: `${Y}-${M}-${d}`,
        y: Y, m: M, d,
        gray: true
      })
    }
  }

  _writeThisMonthPart(grid) {
    const { value } = this.state
    const N = value.daysInMonth()
    const Y = value.year(), M = value.month(), D = value.date()
    for (let i = 0, d = 1; i < N; i ++, d ++) {
      grid.push({
        text: d + '',
        value: `${Y}-${M}-${d}`,
        y: Y, m: M, d,
        checked: d === D,
        red: false
      })
    }
  }

  _writeNextMonthPart(grid) {
    const { value } = this.state
    const copy = moment(value)
    copy.add(1, 'M')
    copy.date(1)
    const N = (7 - copy.day()) % 7
    const Y = copy.year(), M = copy.month(), D = copy.date()
    for (let i = 0, d = 1; i < N; i ++, d ++) {
      grid.push({
        text: d + '',
        value: `${Y}-${M}-${d}`,
        y: Y, m: M, d,
        gray: true
      })
    }
  }

  // #endregion

  _getGridData() {
    const { value } = this.state
    const data = []
    this._writeLastMonthPart(data)
    this._writeThisMonthPart(data)
    this._writeNextMonthPart(data)
    return data
  }

  render() {
    const mode = this.state.mode
    const classList = ['datepickerPopup']
    if (this.props.hidden) classList.push('datepickerPopup--hidden')
    return (
      <div className={classList.join(' ')}>
        {
          this._renderYMCtrl()
        }
        {
          mode === 'd' ?
            this._renderDatePicker() :
          (mode === 'm' ?
            this._renderMonthPicker() :
            this._renderYearPicker()
          )
        }
      </div>
    )
  }

  setYM = (e) => {
    const type = e.currentTarget.dataset.type
    this.setState((prevState) => {
      const { value, mode, startOfYear } = prevState
      if (mode === 'm' || mode === 'd') {
        if (type === '-')  value.subtract(1, 'M')
        else value.add(1, 'M')
        return { value }
      } else if (mode === 'y') {
        if (type === '-')  return { startOfYear: startOfYear - this.nOfYear }
        else return { startOfYear: startOfYear + this.nOfYear }
      }
    })
  }

  switchMode = (e) => {
    this.setState(prevState => {
      const mode = prevState.mode
      if (mode === 'd') return { mode : 'm' }
      if (mode === 'm') return { mode: 'y' }
      else {}
    })
  }

  _renderYMCtrl() {
    const { value, startOfYear } = this.state
    let text = ''
    if (this.state.mode === 'd') {
      text = MONTHS[value.month()].full + ' ' + value.year()
    } else if (this.state.mode === 'm') {
      text = value.year() + ''
    } else {
      text = `${startOfYear} - ${startOfYear + this.nOfYear}`
    }
    return (
      <div className="datepickerYMCtrl">
        <a href="javascript:;" className="datepickerYMCtrl__left" data-type="-" onClick={this.setYM}>
          <i className="fa fa-caret-left"></i>
        </a>
        <a href="javascript:;" onClick={this.switchMode}>{text}</a>
        <a href="javascript:;" className="datepickerYMCtrl__right" data-type="+" onClick={this.setYM}>
          <i className="fa fa-caret-right"></i>
        </a>
      </div>
    )
  }

  handleDItemClick = (e) => {
    const item = e.target.dataset
    this.setState(prevState => {
      const value = prevState.value
      value.month(item.m)
      value.date(item.d)
      this.props.onDateSelected(value)
      return { value }
    })
  }

  _renderDatePicker() {
    const data = this._getGridData()
    return (
      <React.Fragment>
        <div className="datepickerDayGroup">
          {
            DAYS.map(day => {
              return <div key={day.value} className="datepickerDayGroup__item">{day.text}</div>
            })
          }
        </div>
        <div className="datepickerGrid">
          {
            data.map((item, i) => {
              let classList = 'datepickerGrid__item'
              if (item.checked) classList += ' datepickerGrid__item--checked'
              if (item.gray) classList += ' datepickerGrid__item--gray'
              if (i % 7 === 0 || (i + 1) % 7 === 0) classList += ' datepickerGrid__item--red'
              if (item.y === this.today.y && item.m === this.today.m && item.d === this.today.d) classList += ' datepickerGrid__item--today'
              return (
                <div key={item.value} className={classList}>
                  <a data-m={item.m} data-d={item.d} onClick={this.handleDItemClick} href="javascript:;">
                    {item.text}
                  </a>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  }

  handleMItemClick = (e) => {
    const item = e.target.dataset
    this.setState((prevState) => {
      const value = prevState.value
      value.month(item.m)
      if (this.minView === 'd')
        return { value, mode: 'd' }
      else if (this.minView === 'm') {
        this.props.onDateSelected(value)
        return { value }
      }
    })
  }

  _renderMonthPicker() {
    const m = this.state.value.month()
    return (
      <div className="datepickerGrid datepickerGrid--month">
        {
          MONTHS.map((item, i) => {
            const classList = ['datepickerGrid__item']
            if (m === item.value) classList.push('datepickerGrid__item--checked')
            return (
              <div key={item.value} className={classList.join(' ')}>
                <a data-m={item.value} onClick={this.handleMItemClick} href="javascript:;">
                  {item.text}
                </a>
              </div>
            )
          })
        }
      </div>
    )
  }

  handleYItemClick = (e) => {
    const year = Number(e.target.dataset.year)
    this.setState((prevState) => {
      const value = prevState.value
      value.year(year)
      return { value, mode: 'm', startOfYear: year }
    })
  }

  _renderYearPicker() {
    const start = this.state.startOfYear
    const y = this.state.value.year()
    const years = new Array(this.nOfYear)
    for (let i = 0; i < this.nOfYear; i ++) {
      years[i] = start + i
    }
    return (
    <div className="datepickerGrid datepickerGrid--year">
      {
        years.map(item => {
          const classList = ['datepickerGrid__item']
          if (item === y) classList.push('datepickerGrid__item--checked')
          return (
            <div key={item} className={classList.join(' ')}>
              <a data-year={item} onClick={this.handleYItemClick} href="javascript:;">
                {item}
              </a>
            </div>
          )
        })
      }
    </div>
    )
  }
}
