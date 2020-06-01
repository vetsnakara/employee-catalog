import { v4 as uuid } from 'uuid'

import { api } from '../../api'
import { STATUS, Employee as PureEmployee } from '../../types'

import { fetchStart, fetchSuccess, fetchError } from '../system/actions'
import { modalOpen, modalClose } from '../modal/actions'

import {
  SET_EMPLOYEES,
  SET_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  UPDATE_META,
  SYNC_DATA,
  Employee,
  EditEmployeeData,
  EmployeeAction
} from './types'

import { ActionCreator, Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from 'store/root/reducer'
import { Dispatch } from 'react'

export const setEmployees = (employees: PureEmployee[]): EmployeeAction => ({
  type: SET_EMPLOYEES,
  payload: { employees }
})

export const addEmployee = (): EmployeeAction => ({
  type: ADD_EMPLOYEE,
  payload: { id: `new-${uuid()}` }
})

export const setEmployee = (
  id: string,
  employee: Employee
): EmployeeAction => ({
  type: SET_EMPLOYEE,
  payload: { id, employee }
})

export const editEmployee = (data: EditEmployeeData): EmployeeAction => ({
  type: EDIT_EMPLOYEE,
  payload: { ...data }
})

export const removeEmployeeFromStore = (id: string): EmployeeAction => ({
  type: REMOVE_EMPLOYEE,
  payload: { id }
})

export const updateMeta = (ids: string[]): EmployeeAction => ({
  type: UPDATE_META,
  payload: { ids }
})

export const syncData = (idsMap: {
  [key: string]: string
}): EmployeeAction => ({
  type: SYNC_DATA,
  payload: { idsMap }
})

export const getEmployee: ActionCreator<ThunkAction<
  Promise<void>,
  RootState,
  null,
  Action
>> = (id) => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  try {
    const { employees } = getState()
    let employee = employees.find((emp) => emp.id === id)

    if (!employee) throw new Error('Employee not found')
    if (employee.meta.status !== STATUS.INIT) return

    dispatch(fetchStart())

    const employeeData = await api.getEmployee(id)

    employee = {
      ...employee,
      ...employeeData
    }

    dispatch(setEmployee(id, employee))

    dispatch(fetchSuccess())
  } catch (error) {
    dispatch(fetchError(error))
  }
}

export const saveEmployees: ActionCreator<ThunkAction<
  Promise<void>,
  RootState,
  null,
  Action
>> = () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  try {
    const { employees } = getState()

    const toSave = ({
      meta: { status, isNew, isValid }
    }: Pick<Employee, 'meta'>) => (isNew || status === STATUS.EDITED) && isValid

    const employeesToSave = employees.filter(toSave)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const promises = employeesToSave.map(({ meta, ...data }) =>
      api.saveEmployee(data)
    )

    const prevIds = employeesToSave.map(({ id }) => id)
    dispatch(updateMeta(prevIds))

    dispatch(fetchStart())
    const newIds = await Promise.all(promises)
    dispatch(fetchSuccess())

    const idsMap = prevIds.reduce(
      (acc: { [key: string]: string }, prevId: string, index: number) => {
        acc[prevId] = newIds[index]
        return acc
      },
      {}
    )

    dispatch(syncData(idsMap))
  } catch (error) {
    dispatch(fetchError(error))
  }
}

const doRemoveEmployee: ActionCreator<ThunkAction<
  Promise<void>,
  RootState,
  null,
  Action
>> = (id) => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  try {
    const { employees } = getState()
    const employee = employees.find((emp) => emp.id === id)

    if (!employee) throw new Error('Employee not found')

    dispatch(removeEmployeeFromStore(id))

    if (employee.meta.isNew) return

    dispatch(fetchStart())
    await api.removeEmployee(id)
    dispatch(fetchSuccess())
  } catch (error) {
    dispatch(fetchError(error))
  }
}

export const removeEmployee: ActionCreator<ThunkAction<
  void,
  RootState,
  null,
  Action
>> = (id) => (dispatch: ThunkDispatch<RootState, null, Action>) => {
  const remove = async () => {
    dispatch(modalClose())
    await dispatch(doRemoveEmployee(id))
  }

  dispatch(
    modalOpen({
      content: {
        title: 'Remove employee',
        text: 'Are you sure?'
      },
      callbacks: {
        onSuccess: remove,
        onClose: () => dispatch(modalClose())
      }
    })
  )
}
