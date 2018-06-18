import React from 'react'

/**
 * Props: value, onChangeRequest
 */
export class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  handleControlClick = (e) => {
    this.props.onChangeRequest && this.props.onChangeRequest()
  }

  render() {
    let classList = 'checkbox'
    if (this.props.value) classList += ' checkbox--checked'
    return (
      <div className={classList}>
        <div className="checkbox__bg">
          <div onClick={this.handleControlClick} className="checkbox__control"></div>
        </div>
      </div>
    )
  }
}
