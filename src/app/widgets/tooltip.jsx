import React from 'react'

/**
 * Props: body, type
 *  type: text, hover
 */
export class ToolTip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type || 'text'
    }
  }

  handleMouseEnter = (e) => {
    e.preventDefault()
    this.addElement(e.pageX, e.pageY)
  }

  handleMouseLeave = (e) => {
    this.xElement()
  }

  addElement(left, top) {
    const html = `
      <div class="toolTip__body">
      ${this.props.body}
      </div>
      <div class="toolTip__caret">
        <i></i>
      </div>
    `
    const element = document.createElement('div')
    element.innerHTML = html
    element.className = 'toolTip toolTip--hover'
    document.body.appendChild(element)
    element.style.top = (top - element.clientHeight - 10) + 'px'
    element.style.left = (left - element.clientWidth / 2) + 'px'
    this.tooltipDiv = element
    return element
  }

  xElement() {
    if (!this.tooltipDiv) return
    this.tooltipDiv.remove()
  }

  render() {
    if (this.state.type === 'text') {
      return (
        <span className="toolTip toolTip--text">
          <i className="fa fa-info-circle toolTip__icon"></i>
          <span>{this.props.body}</span>
        </span>
      )
    } else {
      return (
        <i onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter} className="fa fa-question-circle toolTip__icon"></i>
      )
    }
  }
}
