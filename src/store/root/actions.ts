import { Dispatch, Action, ActionCreator } from 'redux'

import { STATUS, Employee, Job } from '../../types'

import { RESET_STATE, RootAction } from './types'
import { api } from '../../api'

import { modalOpen, modalClose } from '../modal/actions'
import { fetchStart, fetchSuccess, fetchError } from '../system/actions'

import { setEmployees } from '../employee/actions'
import { setJobs } from '../job/actions'

import { RootState } from '../root/reducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ERR_MSG } from '../../config/constants'

export const resetState = (): RootAction => ({
  type: RESET_STATE
})

export const getData: ActionCreator<ThunkAction<
  Promise<void>,
  RootState,
  null,
  Action
>> = () => async (dispatch: Dispatch<Action>): Promise<void> => {
  try {
    dispatch(fetchStart())

    const [employees, jobs] = await Promise.all<Employee[], Job[]>([
      api.getEmployees(),
      api.getJobs()
    ])

    dispatch(setEmployees(employees))
    dispatch(setJobs(jobs))

    dispatch(fetchSuccess())
  } catch (error) {
    dispatch(fetchError(new Error(ERR_MSG)))
  }
}

export const updateData: ActionCreator<ThunkAction<
  Promise<void>,
  RootState,
  null,
  Action
>> = () => async (
  dispatch: ThunkDispatch<RootState, null, Action>,
  getState
) => {
  try {
    const state = getState()
    const employees = state?.employees

    const notSavedEmployees = employees.filter(
      ({ meta: { status, isNew } }) => isNew || status === STATUS.EDITED
    )

    const update = async () => {
      dispatch(modalClose())
      dispatch(resetState())
      await dispatch(getData())
    }

    if (notSavedEmployees.length === 0) {
      await update()
      return
    }

    dispatch(
      modalOpen({
        content: {
          title: 'Update from server',
          text: 'You can lose unsaved data!'
        },
        callbacks: {
          onSuccess: update,
          onClose: () => dispatch(modalClose())
        }
      })
    )
  } catch (error) {
    dispatch(fetchError(new Error(ERR_MSG)))
  }
}
