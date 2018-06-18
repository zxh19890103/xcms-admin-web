import React from 'react'

/**
 * Props: options, value, placeholder, onChangeRequest
 *  option-item: Array<{ value: any, text: string }>
 */
export class Select extends React.Component {
  constructor(props) {
    super(props)
    this.placeholder = this.props.placeholder || '请选择'
  }

  handleChange = (e) => {
    e.preventDefault()
    this.props.onChangeRequest && this.props.onChangeRequest(e.currentTarget.value)
  }

  render() {
    return (
      <select value={this.props.value} onChange={this.handleChange}>
        <option value="">{this.placeholder}</option>
        {
          this.props.options.map(op => {
            return <option key={op.value} value={op.value}>{op.text}</option>
          })
        }
      </select>
    )
  }
}
