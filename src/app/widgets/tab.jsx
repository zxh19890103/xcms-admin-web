import React, { Component } from 'react'

/**
 * Props:
 */
export class TabGroup extends Component {
  constructor(props) {
    super(props)
    this.options = this.props.options
    this.state = {
      tab: this.options[0].value
    }
  }

  handleTabClick = e => {
    const tab = e.currentTarget.dataset.tab
    this.setState({ tab })
  }

  render() {
    let idx = -1
    return (
      <div className="tabGroup">
        <ul className="tabGroup__buttons">
        {
          this.options.map((a, i) => {
            let classList = 'tabGroup__button'
            if (a.value === this.state.tab) {
              idx = i
              classList += ' tabGroup__button--active'
            }
            return (
            <li key={a.value} className={classList}>
              <a href="javascript:;" data-tab={a.value} onClick={this.handleTabClick}>{a.text}</a>
            </li>
            )
          })
        }
        </ul>
        {
          this.props.children.map((tab, i) => {
            let classList = 'tabGroup__item'
            if (idx === i) classList += ' tabGroup__item--active'
            return (
            <div key={i} className={classList}>
            {tab}
            </div>
            )
          })
        }
      </div>
    )
  }
}
