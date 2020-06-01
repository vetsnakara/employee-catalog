import { GENDER } from './enums'

export type Employee = {
  id: string
  name: string
  jobId?: string
  birthDate?: Date | null
  fired?: boolean
  gender?: GENDER
}

export type Job = {
  id: string
  name: string
}

export type Data = {
  employees: Employee[]
  jobs: Job[]
}
