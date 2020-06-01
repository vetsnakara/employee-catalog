import { v4 as uuid } from 'uuid'
import { APP_NAME, API_DELAY, ERR_MSG } from '../config/constants'

import { Job, Data, Employee } from '../types'

export const api = {
  /**
   * Get jobs list
   */
  getJobs() {
    return new Promise<Job[]>((resolve, reject) => {
      setTimeout(() => {
        const persistedData = window.localStorage.getItem(APP_NAME)

        if (!persistedData) {
          return reject(new Error(ERR_MSG))
        }

        const data: Data = JSON.parse(persistedData)

        resolve(data.jobs)
      }, API_DELAY)
    })
  },

  /**
   * Get employees list
   */
  getEmployees() {
    return new Promise<Array<Pick<Employee, 'id' | 'name'>>>(
      (resolve, reject) => {
        setTimeout(() => {
          const persistedData = window.localStorage.getItem(APP_NAME)

          if (!persistedData) {
            return reject(new Error(ERR_MSG))
          }

          const data: Data = JSON.parse(persistedData)

          const names = data.employees.map(({ id, name }) => ({
            id,
            name
          }))

          resolve(names)
        }, API_DELAY)
      }
    )
  },

  /**
   * Get employee details
   */

  getEmployee(empId: string) {
    return new Promise<Employee>((resolve, reject) => {
      setTimeout(() => {
        const persistedData = window.localStorage.getItem(APP_NAME)

        if (!persistedData) {
          return reject(new Error(ERR_MSG))
        }

        const data: Data = JSON.parse(persistedData)

        const employee = data.employees.filter((item) => item.id === empId)[0]

        resolve(employee)
      }, API_DELAY)
    })
  },

  /**
   * Remove employee
   */
  removeEmployee(empId: string) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const persistedData = window.localStorage.getItem(APP_NAME)

        if (!persistedData) {
          return reject(new Error(ERR_MSG))
        }
        const data: Data = JSON.parse(persistedData)

        const employees = data.employees.filter((item) => item.id !== empId)

        window.localStorage.removeItem(APP_NAME)
        window.localStorage.setItem(
          APP_NAME,
          JSON.stringify({ ...data, employees })
        )

        resolve(empId)
      }, API_DELAY)
    })
  },

  /**
   * Create/update employee
   */
  saveEmployee(empData: Employee) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const persistedData = window.localStorage.getItem(APP_NAME)

        if (!persistedData) {
          return reject(new Error(ERR_MSG))
        }
        const data: Data = JSON.parse(persistedData)

        let employees
        const employee = data.employees.find((emp) => emp.id === empData.id)

        if (!employee) {
          empData.id = uuid()
          employees = [...data.employees, empData]
        } else {
          employees = data.employees.map((item) =>
            item.id === empData.id ? empData : item
          )
        }

        window.localStorage.removeItem(APP_NAME)
        window.localStorage.setItem(
          APP_NAME,
          JSON.stringify({ ...data, employees })
        )

        resolve(empData.id)
      }, API_DELAY)
    })
  }
}
