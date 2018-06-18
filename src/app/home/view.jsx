import React from 'react'

export class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p onClick={this.props.handleAny}>
          App name: {this.props.appName}
        </p>
        <a href="javascript:;" onClick={this.props.addMessage}>Add Message</a>
      </div>
    )
  }
}
