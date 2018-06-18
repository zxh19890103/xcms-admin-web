import React, { Component } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'

import Home from './home/container'
import DocumentView from './document/view.jsx'
import ResumeView from './resume/view.jsx'
import { TopBar, SideBar } from './outlet.jsx'
import { createContainer, actions } from './store'
import { AlertGroup } from './widgets/alert.jsx'

import './app.scss'

const Messages = createContainer(AlertGroup, {
  data: {
    data: state => state.messages
  },
  methods: {
    handleRemoval: (dispatch, props, id) => {
      dispatch(actions.xMessage(id))
    }
  }
})

class App extends Component {

  correntAppHeight() {
    document.getElementById('App').style.height = window.innerHeight + 'px'
    document.getElementById('xCMSAppRoute').style.height = (window.innerHeight - 70) + 'px'
  }

  componentDidMount() {
    this.correntAppHeight()
    window.addEventListener('resize', this.correntAppHeight)
  }

  render() {
    return (
      <div className="xCMSApp">
        <div className="xCMSApp__left">
          <SideBar/>
        </div>
        <div className="xCMSApp__right">
          <div className="xCMSApp__rightTop">
            <TopBar/>
          </div>
          <div id="xCMSAppRoute" className="xCMSApp__route">
            <div className="xCMSApp__routeInner">
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/document" component={DocumentView}></Route>
                <Route path="/resume" component={ResumeView}></Route>
              </Switch>
            </div>
          </div>
        </div>
        <Messages/>
      </div>
    )
  }
}

export default App
