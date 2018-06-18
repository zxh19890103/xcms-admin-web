import { createContainer, makeAction, actionTypes, actions } from '../store'
import { HomeView } from './view.jsx'

const mapping = {
  data: {
    appName: (state) => {
      return state.appName
    }
  },
  methods: {
    handleAny: (dispatch, props) => {
      const action = makeAction(actionTypes.UPDATE_APP_NAME, 'New App name')
      dispatch(action)
    },
    addMessage: (dispatch, props) => {
      dispatch(actions.addMessage('info', 'Hello, World.'))
    }
  }
}

export default createContainer(HomeView, mapping)
