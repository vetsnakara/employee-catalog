import { SET_ACTIVE, ActiveAction, ActiveState } from './types'
import { REMOVE_EMPLOYEE, ADD_EMPLOYEE } from '../employee/types'
import { RESET_STATE } from '../root/types'

const initState: ActiveState = null

export const actvieReducer = (
  state: ActiveState = initState,
  action: ActiveAction
): ActiveState => {
  switch (action.type) {
    case SET_ACTIVE:
    case ADD_EMPLOYEE:
      return action.payload.id
    case REMOVE_EMPLOYEE:
      return null
    case RESET_STATE:
      return initState
    default:
      return state
  }
}
