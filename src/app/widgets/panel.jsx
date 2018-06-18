import React from 'react'

/**
 * Props: title, type
 */
export class Panel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, title } = this.props
    const className = type ? `panel panel--${type}` : 'panel panel--primary'
    return (
      <div className={className}>
        { title && <div className="panel__header"><span className="panel__title">{title}</span></div> }
        <div className="panel__body">{this.props.children}</div>
      </div>
    )
  }
}
