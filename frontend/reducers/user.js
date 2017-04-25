'use strict'

import * as Constants from 'lib/constants'
import * as Types from 'actions/actionTypes'

const initialState = {
  remote: null,
  status: Constants.STATUS_IDLE
}

export default function user (state = initialState, action = {}) {
  switch (action.type) {

    // Action: set user
    case Types.SET_REMOTE_USER:
      return {
        ...state,
        remote: action.user,
        status: Constants.STATUS_IDLE
      }

    // Action: set user status
    case Types.SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      }

    // Action: clear user
    case Types.SIGN_OUT:
      return initialState

    default:
      return state
  }
}
