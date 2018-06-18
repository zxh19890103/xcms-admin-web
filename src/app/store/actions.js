import { makeAction } from './helpers'
import * as actionTypes from './actionTypes'
import { THEME_TYPES_ARRAY, THEME_TYPES } from '../constants'

// #region Utils
const fixType = type => {
  if (THEME_TYPES_ARRAY.indexOf(type) === -1) {
    return THEME_TYPES.primary
  } else return type
}
// #endregion

// #region Actions of Messages

const getIconByType = type => {
  switch (type) {
    case THEME_TYPES.primary:
      return 'fa fa-comment'
    case THEME_TYPES.success:
      return 'fa fa-check-circle'
    case THEME_TYPES.warning:
      return 'fa fa-exclamation-circle'
    case THEME_TYPES.danger:
      return 'fa fa-times-circle'
    default:
      return ''
  }
}

export const addMessage = (type, text) => {
  const fixedType = fixType(type)
  return makeAction(actionTypes.MESSAGE_ADD, { type: fixedType, text, icon: getIconByType(fixedType) })
}

export const xMessage = (id) => {
  return makeAction(actionTypes.MESSAGE_REMOVE, id)
}
// #endregion
