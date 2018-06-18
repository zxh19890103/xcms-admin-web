import React, { Component } from 'react'

/**
 * Props: data, value, onChangeRequest
 */
export class Checker extends Component {

  constructor(props) {
    super(props)
  }

  handleControlClick = e => {
    this.props.onChangeRequest && this.props.onChangeRequest(this.props.data)
  }

  render() {
    let classList = 'checkboxGroup__item'
    if (this.props.value) classList += ' checkboxGroup__item--checked'
    return (
      <div onClick={this.handleControlClick} className={classList}>
        <i className="far"></i>
      </div>
    )
  }
}

/**
 * Props: options, value, onChangeRequest
 */
export class CheckboxGroup extends Component {
  constructor(props) {
    super(props)
    this.options = this.props.options || []
  }

  handleItemClick = (e) => {
    const value = e.currentTarget.dataset.value
    this.props.onChangeRequest && this.props.onChangeRequest(value)
  }

  get itemStyle() {
    const style = {}
    if (this.props.itemWidth) style.width = `${this.props.itemWidth}`
    return style
  }

  isItemChecked(item) {
    return this.props.value.indexOf(item.value) > -1
  }

  render() {
    return (
      <div className="checkboxGroup">
        {
          this.options.map((item, i) => {
            let classList = 'checkboxGroup__item'
            if (this.isItemChecked(item)) classList += ' checkboxGroup__item--checked'
            return (
            <div style={this.itemStyle} data-value={item.value} onClick={this.handleItemClick} key={item.value} className={classList}>
              <i className="far fa-fw"></i>
              <span>{item.text}</span>
            </div>
            )
          })
        }
      </div>
    )
  }
}
