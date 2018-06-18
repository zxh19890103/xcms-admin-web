import React, { Component } from 'react'
import { FADE_STATUSES, FADE_EFFECTS } from '../constants'
import ReactDom from 'react-dom'
import { Message } from '../models'

/**
 * Props:  id, type, closable, text, icon, autoX(自动移除), alpha（背景色透明）
 * Events: onRemoveRequest
 */
export class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: FADE_STATUSES.init
    }
    this.type = this.props.type || 'primary'
    if (this.props.autoX) {
      setTimeout(() => {
        this.xElement(null)
      }, 3000)
    }
  }

  componentDidMount() {
    this.setState({ status: FADE_STATUSES.fadeIn })
  }

  xElement = e => {
    this.setState({ status: FADE_STATUSES.fadeOut })
  }

  handleAnimationEnd = e => {
    const an = e.animationName
    if (an === FADE_EFFECTS.fadeIn) {
      this.setState({ status: FADE_STATUSES.fadeInEnd })
    } else if (an === FADE_EFFECTS.fadeOut) {
      this.props.onRemoveRequest && this.props.onRemoveRequest(this.props.id)
    }
  }

  render() {
    let classList = `alert alert--${this.type}`
    let iconClass = ''
    if (this.props.icon) {
      iconClass = this.props.icon + ' fa-fw alert__icon'
    }
    if (this.props.alpha) {
      classList += ' alpha'
    }
    if (this.state.status === FADE_STATUSES.fadeIn) {
      classList += ' fadeIn'
    } else if (this.state.status === FADE_STATUSES.fadeOut) {
      classList += ' fadeOut'
    }
    return (
      <div onAnimationEnd={this.handleAnimationEnd} className={classList}>
        {iconClass && <i className={iconClass}/>}
        <div className="alert__text">{this.props.text}</div>
        {this.props.closable && <i onClick={this.xElement} className="fa fa-times alert__close"/>}
      </div>
    )
  }
}

/**
 * Props: data
 *  data: Array<{ id, type, text, closable, icon }>
 */
export class AlertGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { handleRemoval, data } = this.props
    return ReactDom.createPortal(
      <div className="alertGroup">
      {
        data.map(item => {
          return <Alert key={item.id} {...item} alpha={true} autoX={true} onRemoveRequest={handleRemoval}/>
        })
      }
      </div>,
      document.getElementById('Alert')
    )
  }
}
