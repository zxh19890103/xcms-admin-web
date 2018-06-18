import React, { Component } from 'react'

import './outlet.scss'

class TopBar extends Component {
  render() {
    return (
      <div className="topBar">
        <div className="crumbNav">
          <a className="crumbNav__item crumbNav__item--cap">首页</a>
          <a className="crumbNav__item">欢迎您</a>
        </div>
      </div>
    )
  }
}

class SideBar extends Component {
  render() {
    return (
      <div>
        <Logo/>
        <Menu/>
      </div>
    )
  }
}

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuItems: [
        { key: 'user', icon: 'fa fa-user', text: '用户', active: false },
        { key: 'cogs', icon: 'fa fa-cogs', text: '用户' , active: true },
        { key: 'anchor', icon: 'fa fa-anchor', text: '用户', active: false },
        { key: 'car', icon: 'fa fa-car', text: '用户' , active: false }
      ]
    }
  }

  render() {
    const items = this.state.menuItems
    return (
      <ul className="sideBarMenu">
        {
          items.map(i => {
            return <li key={i.key} className={i.active ? 'sideBarMenu__item sideBarMenu__item--active' : 'sideBarMenu__item'}><a href="#"><i className={i.icon}></i></a></li>
          })
        }
        <li className="sideBarMenu__item sideBarMenu__item--bottom"><a href="#"><i className="fa fa-sign-out-alt"></i></a></li>
      </ul>
    )
  }
}

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src="/static/if_letter_X_blue_1553039.svg"/>
      </div>
    )
  }
}

export {
  TopBar,
  SideBar
}
