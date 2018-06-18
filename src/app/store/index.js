import { createStore, combineReducers } from 'redux'
import initialState from './initialState'
import * as reducers from './reducers'
import * as actionTypes from './actionTypes'
import * as actions from './actions'

const reducer = combineReducers(reducers)
const store = createStore(reducer, initialState)

export {
  store,
  actions,
  actionTypes
}

export {
  makeAction,
  ContainerArg,
  createContainer
} from './helpers'
