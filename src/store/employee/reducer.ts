import {
  SET_EMPLOYEES,
  SET_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  ADD_EMPLOYEE,
  SYNC_DATA,
  UPDATE_META,
  EmployeeState,
  EmployeeAction
} from './types'

import { RESET_STATE } from '../root/types'

import {
  handleSetEmployees,
  handleSetEmployee,
  handleEditEmployee,
  handleAddEmployee,
  handleRemoveEmployee,
  handleSyncData,
  handleUpdateMeta
} from './handlers'

const initState: EmployeeState = []

export const employeeReducer = (
  state: EmployeeState = initState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return handleSetEmployees(state, action)
    case SET_EMPLOYEE:
      return handleSetEmployee(state, action)
    case EDIT_EMPLOYEE:
      return handleEditEmployee(state, action)
    case REMOVE_EMPLOYEE:
      return handleRemoveEmployee(state, action)
    case ADD_EMPLOYEE:
      return handleAddEmployee(state, action)
    case UPDATE_META:
      return handleUpdateMeta(state, action)
    case SYNC_DATA:
      return handleSyncData(state, action)
    case RESET_STATE:
      return initState
    default:
      return state
  }
}
