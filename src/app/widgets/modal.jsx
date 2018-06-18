import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { isPromise } from '../utils'

/**
 * Props:
 *  isOpen, onCloseRequest, onConfirmRequest, onCancelRequest, noFooter,
 *  noConfirmButton, noCloseButton
 */
export class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    return ReactDOM.createPortal(
      <React.Fragment>
        <ModalBackdrop isOpen={this.props.isOpen}/>
        {this._renderAlert()}
      </React.Fragment>
      ,
      document.getElementById('Modal')
    )
  }

  toggleLoading() {
    this.setState(prevState => {
      return { loading: !prevState.loading }
    })
  }

  handleClose = (e) => {
    this.props.onCloseRequest && this.props.onCloseRequest()
  }

  handleCancel = (e) => {
    this.props.onCancelRequest && this.props.onCancelRequest()
    this.handleClose(null)
  }

  handleConfirm = (e) => {
    if (this.props.onConfirmRequest) {
      const r = this.props.onConfirmRequest()
      if (isPromise(r)) {
        this.toggleLoading()
        r.then(() => {
          this.toggleLoading()
          this.handleClose(null)
        }, () => {
          console.log('Error')
        })
      } else {
        this.handleClose(null)
      }
    } else {
      this.handleClose(null)
    }
  }

  _renderHeader() {
    if (!this.props.title) return null
    return (
      <div className="modal__header">
        <div className="modal__title">
        {this.props.title}
        </div>
      </div>
    )
  }

  _renderFooter() {
    if (this.props.noFooter) return
    const spinner = this.state.loading && <i className="fa fa-fw fa-spin fa-sync"/>
    return (
      <div className="modal__footer">
        {this.props.noConfirmButton || <button disabled={this.state.loading} onClick={this.handleConfirm} type="button" className="btn btn--success btn--small">{spinner}确认</button>}
        {this.props.noCloseButton || <button onClick={this.handleCancel} type="button" className="btn btn--default btn--small">取消</button>}
      </div>
    )
  }

  _renderAlert() {
    const classList = ['modal', 'modal--alert']
    if (this.props.isOpen) classList.push('modal--in')
    return (
      <div className={classList.join(' ')}>
        <div className="flexCenter">
          <div className="modal__in">
            <a href="javascript:;" onClick={this.handleClose} className="modal__close"><i className="fa fa-times"></i></a>
            {this._renderHeader()}
            <div className="modal__body">
            {this.props.children}
            </div>
            {this._renderFooter()}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Props:
 * isOpen
 */
export class ModalBackdrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      in: false,
      out: false
    }
  }

  componentWillReceiveProps(props) {
    if (this.state.in && !props.isOpen) {
      this.setState({ out: true })
    }
    if (!this.state.in && props.isOpen) {
      this.setState({ in: true })
    }
  }

  handleAnimationEnd = (e) => {
    const an = e.animationName
    if (an === 'fade-out') {
      this.setState({ in: false, out: false })
    }
  }

  render() {
    console.log('modal render')
    let classList = 'modalBackdrop'
    if (this.state.in) {
      classList += ' modalBackdrop--in'
    }
    if (this.state.out) {
      classList += ' modalBackdrop--out'
    }
    return (
      <div onAnimationEnd={this.handleAnimationEnd} className={classList}/>
    )
  }
}
