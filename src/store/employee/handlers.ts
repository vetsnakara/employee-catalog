import {
  EmployeeState,
  UpdateMetaAction,
  SyncDataAction,
  AddEmployeeAction,
  RemoveEmployeeAction,
  EditEmployeeAction,
  SetEmployeesAction,
  SetEmployeeAction,
  Employee
} from './types'

import { STATUS, GENDER } from '../../types'

/**
 * Update employees metadata after saving
 */
export function handleUpdateMeta(
  state: EmployeeState,
  action: UpdateMetaAction
): EmployeeState {
  const { ids } = action.payload

  return state.map((emp) =>
    ids.includes(emp.id)
      ? { ...emp, meta: { ...emp.meta, isNew: false, status: STATUS.LOADED } }
      : emp
  )
}

/**
 * Update ids after saving new employees
 */
export function handleSyncData(
  state: EmployeeState,
  action: SyncDataAction
): EmployeeState {
  const employees = [...state]
  const { idsMap } = action.payload
  const prevIds = Object.keys(idsMap)

  return employees.map((emp) =>
    prevIds.includes(emp.id)
      ? {
          ...emp,
          id: idsMap[emp.id]
        }
      : emp
  )
}

/**
 * Add new employee
 */
export function handleAddEmployee(
  state: EmployeeState,
  action: AddEmployeeAction
): EmployeeState {
  return [
    {
      id: action.payload.id,
      name: '',
      fired: false,
      gender: GENDER.MALE,
      jobId: '',
      meta: {
        isValid: false,
        isNew: true
      }
    },
    ...state
  ]
}

/**
 * Remove employee
 */
export function handleRemoveEmployee(
  state: EmployeeState,
  action: RemoveEmployeeAction
): EmployeeState {
  return state.filter((emp) => emp.id !== action.payload.id)
}

/**
 * Edit employee
 */
export function handleEditEmployee(
  state: EmployeeState,
  action: EditEmployeeAction
): EmployeeState {
  const {
    isValid,
    employee,
    employee: { id }
  } = action.payload
  const employees = [...state]

  const index = employees.findIndex((emp) => emp.id === id)
  const prevEmployee = employees[index]

  // update fields
  let updatedEmployee = {
    ...prevEmployee,
    ...employee,
    meta: {
      ...prevEmployee.meta,
      isValid
    }
  }

  // set edited status
  if (!prevEmployee.meta.isNew) {
    updatedEmployee = {
      ...updatedEmployee,
      meta: {
        ...updatedEmployee.meta,
        status: STATUS.EDITED
      }
    }
  }

  employees.splice(index, 1, updatedEmployee)

  return employees
}

/**
 * Set employess init info
 */
export function handleSetEmployees(
  state: EmployeeState,
  action: SetEmployeesAction
): EmployeeState {
  return action.payload.employees.map((emp) => ({
    ...emp,
    meta: {
      status: STATUS.INIT,
      isValid: true,
      isNew: false
    }
  }))
}

/**
 * Set employee details
 */
export function handleSetEmployee(
  state: EmployeeState,
  action: SetEmployeeAction
): EmployeeState {
  const { id, employee: employeeDetails } = action.payload
  const employees = [...state]

  const index = employees.findIndex((emp) => emp.id === id)
  const prevEmployee = employees[index]

  const { birthDate } = employeeDetails

  const updatedEmployee: Employee = {
    ...prevEmployee,
    ...employeeDetails,
    birthDate: birthDate ? new Date(birthDate) : null,
    meta: {
      ...prevEmployee.meta,
      status: STATUS.LOADED
    }
  }

  employees.splice(index, 1, updatedEmployee)

  return employees
}
