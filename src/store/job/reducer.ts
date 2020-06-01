import { SET_JOBS, JobsAction, JobsState } from './types'
import { RESET_STATE } from '../root/types'

const initState: JobsState = []

export const jobReducer = (
  state: JobsState = initState,
  action: JobsAction
): JobsState => {
  switch (action.type) {
    case SET_JOBS:
      return [
        {
          id: '',
          name: '---'
        },
        ...action.payload.jobs
      ]
    case RESET_STATE:
      return initState
    default:
      return state
  }
}
