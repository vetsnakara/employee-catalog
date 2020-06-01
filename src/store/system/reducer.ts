import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  DISMISS_ERROR,
  SystemAction,
  SystemState
} from './types'

import { RESET_STATE } from '../root/types'

const initState: SystemState = {
  loading: false,
  error: null
}

export const systemReducer = (
  state = initState,
  action: SystemAction
): SystemState => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case DISMISS_ERROR:
    case RESET_STATE:
      return initState
    default:
      return state
  }
}
