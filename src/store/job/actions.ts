import { SET_JOBS, JobsAction } from './types'
import { Job } from '../../types'

export const setJobs = (jobs: Job[]): JobsAction => ({
  type: SET_JOBS,
  payload: { jobs }
})
