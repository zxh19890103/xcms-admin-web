import React from 'react'

/**
 * Props: text, value, checked, onRadioClick
 */
export class RadioButton extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = (e) => {
    this.props.onRadioClick(this.props.value)
  }

  render() {
    let classList = 'radioButton'
    if (this.props.checked) classList += ' radioButton--checked'
    return (
      <div style={this.props.style} className={classList} onClick={this.handleClick}>
        <i className="far fa-fw"></i>
        <span>{this.props.text}</span>
      </div>
    )
  }
}

/**
 * Props: options, width, value, onChangeRequest
 */
export class RadioButtonGroup extends React.Component {

  constructor(props) {
    super(props)
    this.options = this.props.options || []
  }

  get itemStyle() {
    const style = {}
    if (this.props.itemWidth) style.width = `${this.props.itemWidth}`
    return style
  }

  handleRadioButtonClick = (value) => {
    this.props.onChangeRequest && this.props.onChangeRequest(value)
  }

  render() {
    return (
      <div className="radioButtonGroup">
      {
        this.options.map(item => {
          const checked = item.value === this.props.value
          return <RadioButton style={this.itemStyle} key={item.value} checked={checked} text={item.text} value={item.value} onRadioClick={this.handleRadioButtonClick}/>
        })
      }
      </div>
    )
  }
}
