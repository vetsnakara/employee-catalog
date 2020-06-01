import { Job } from '../../types'
import { RootAction } from '../root/types'

export const SET_JOBS = 'SET_JOBS'

export type JobsState = Job[]

interface SetJobsAcition {
  type: typeof SET_JOBS
  payload: {
    jobs: Job[]
  }
}

export type JobsAction = SetJobsAcition | RootAction
