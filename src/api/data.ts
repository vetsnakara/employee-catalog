import faker from 'faker'
import { v4 as uuid } from 'uuid'

import { Employee, Job, Data, GENDER } from '../types'

import { APP_NAME, EMPLOYEE_NUM } from '../config/constants'
import { randIndex } from '../utils/helpers'

const jobs: Job[] = [
  { id: uuid(), name: 'Programmer' },
  { id: uuid(), name: 'Designer' },
  { id: uuid(), name: 'Manager' },
  { id: uuid(), name: 'DevOps' }
]

const getName = (gender: GENDER) => {
  const { name } = faker
  const firstName = name.firstName(gender)
  const lastName = name.lastName(gender)
  return `${firstName} ${lastName}`
}

const genEmployeeRecord = (): Employee => {
  const gender = Math.random() > 0.5 ? GENDER.MALE : GENDER.FEMALE

  return {
    id: uuid(),
    name: getName(gender),
    jobId: jobs[randIndex(0, jobs.length - 1)].id,
    birthDate: faker.date.between(new Date('01/01/2000'), new Date(Date.now())),
    fired: Math.random() > 0.5,
    gender
  }
}

if (!window.localStorage.getItem(APP_NAME)) {
  const employees = Array.from({ length: EMPLOYEE_NUM }).map(genEmployeeRecord)
  const data: Data = { employees, jobs }
  window.localStorage.setItem(APP_NAME, JSON.stringify(data))
}
