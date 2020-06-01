import { REMOVE_EMPLOYEE, ADD_EMPLOYEE } from '../employee/types'
import { RootAction } from '../root/types'

export const SET_ACTIVE = 'SET_ACTIVE'

export type ActiveState = string | null

interface SetActiveAction {
  type: typeof SET_ACTIVE | typeof REMOVE_EMPLOYEE | typeof ADD_EMPLOYEE
  payload: { id: string }
}

export type ActiveAction = SetActiveAction | RootAction
