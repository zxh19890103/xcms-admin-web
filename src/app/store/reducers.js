import * as actionTypes from './actionTypes'
import { Message } from '../models'

export const appName = (state = '', action) => {
  switch (action.type) {
    case actionTypes.UPDATE_APP_NAME:
      return action.payload
    default:
      return state
  }
}

export const messages = (state = [], action) => {
  let newState = null
  switch (action.type) {
    case actionTypes.MESSAGE_ADD:
      newState = [...state, new Message(action.payload)]
      return newState
    case actionTypes.MESSAGE_REMOVE:
      newState = []
      state.forEach(item => {
        if (item.id !== action.payload) {
          newState.push(item)
        }
      })
      return newState
    default:
      return state
  }
}
