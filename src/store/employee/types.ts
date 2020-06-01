import { Employee as PureEmployee, STATUS } from '../../types'
import { RootAction } from '../root/types'

export const SET_EMPLOYEES = 'SET_EMPLOYEES'
export const SET_EMPLOYEE = 'SET_EMPLOYEE'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'

export const SYNC_DATA = 'SYNC_DATA'
export const UPDATE_META = 'UPDATE_META'

export type Employee = PureEmployee & {
  meta: {
    isNew: boolean
    isValid: boolean
    status?: STATUS
  }
}

/**
 * State
 */
export type EmployeeState = Employee[]

/**
 * Actions argumends
 */
export interface EditEmployeeData {
  isValid: boolean
  employee: Partial<Employee>
}

export interface SyncData {
  idsMap: { [key: string]: string }
}

/**
 * Actions return values
 */
export interface Action {
  type: string | number
  payload: object
  meta?: object
}

export interface SetEmployeesAction extends Action {
  type: typeof SET_EMPLOYEES
  payload: { employees: PureEmployee[] }
}

export interface SetEmployeeAction extends Action {
  type: typeof SET_EMPLOYEE
  payload: { id: string; employee: Employee }
}

export interface AddEmployeeAction extends Action {
  type: typeof ADD_EMPLOYEE
  payload: { id: string }
}

export interface RemoveEmployeeAction extends Action {
  type: typeof REMOVE_EMPLOYEE
  payload: { id: string }
}

export interface EditEmployeeAction extends Action {
  type: typeof EDIT_EMPLOYEE
  payload: EditEmployeeData
}

export interface UpdateMetaAction extends Action {
  type: typeof UPDATE_META
  payload: { ids: string[] }
}

export interface SyncDataAction extends Action {
  type: typeof SYNC_DATA
  payload: SyncData
}

export type EmployeeAction =
  | SetEmployeesAction
  | AddEmployeeAction
  | SetEmployeeAction
  | EditEmployeeAction
  | RemoveEmployeeAction
  | UpdateMetaAction
  | SyncDataAction
  | RootAction
