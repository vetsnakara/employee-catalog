import React, { FC, useEffect, useState } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, ConnectedProps } from 'react-redux'
import { FaAddressCard as ManIcon } from 'react-icons/fa'

import { STATUS, GENDER, Employee } from '../../types'
import { getEmployee, editEmployee } from '../../store/employee/actions'

import { DatePicker, DatePickerDate } from '../Datepicker'
import { Placeholder } from '../Placeholder'
import { ValidationError } from './ValidationError'

import { Validator } from '../../utils/validate'
import { isTruthy } from '../../utils/helpers'
import { RootState } from 'store/root/reducer'
import { EditEmployeeData } from 'store/employee/types'

const GENDERS = [GENDER.MALE, GENDER.FEMALE]

const validator = new Validator({
  name: {
    rule: 'required',
    message: 'Name is required'
  },
  jobId: {
    rule: 'required',
    message: 'Job is required'
  }
})

type Error<T> = Partial<
  {
    [K in keyof T]: string | null
  }
>

type EmployeeValidationError = Error<Employee>

const Form: FC<Props> = ({
  loading,
  activeId: id,
  isNew,
  employee,
  jobs,
  getDetails,
  editDetails
}) => {
  const [errors, setErrors] = useState<EmployeeValidationError>({})
  const [values, setValues] = useState<Partial<Employee> | undefined>({})
  const [isEdited, setIsEdited] = useState<boolean>(false)

  /**
   * Load new employee when id changes
   */
  useEffect(() => {
    if (id) {
      setValues({})
      getDetails(id)
    }
  }, [id, getDetails])

  /**
   * Set new employee
   */
  useEffect(() => {
    if (isNew) {
      setIsEdited(false)
      setValues(employee)
    }
  }, [employee])

  /**
   * Validate values
   */
  useEffect(() => {
    if (employee) {
      const updatedErrors = {
        ...errors,
        ...validator.validate(values || {})
      }

      setErrors(updatedErrors)
    }
  }, [values])

  /**
   * Dispatch edited values
   */
  useEffect(() => {
    if (isEdited) {
      const isValid = !Object.values(errors).some(isTruthy)
      editDetails({ isValid, employee: values || {} })
    }
  }, [errors, editDetails])

  const handleChange = (name: string) => ({
    target: { value, checked = false }
  }: {
    target: {
      value: string | boolean | DatePickerDate
      checked?: boolean
    }
  }) => {
    if (name === 'fired') {
      value = checked
    } else if (name === 'birthDate') {
      value = new Date(value as Date)
    }

    setIsEdited(true)

    setValues((values) => ({
      ...values,
      [name]: value
    }))
  }

  const {
    name = '',
    fired = false,
    gender = '',
    jobId = '',
    birthDate = null
  } = values || {}

  if (!id || !employee)
    return (
      <Placeholder>
        <ManIcon size={50} color="#ddd" />
      </Placeholder>
    )

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          autoComplete="off"
          autoFocus
          value={name}
          className="form-control"
          onChange={handleChange('name')}
        />
        {errors.name && <ValidationError>{errors.name}</ValidationError>}
      </div>

      <div className="form-group">
        <label htmlFor="job">Job</label>
        <select
          id="job"
          style={{ cursor: 'pointer' }}
          className="form-control"
          onChange={handleChange('jobId')}
          value={jobId}
        >
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
        {errors.jobId && <ValidationError>{errors.jobId}</ValidationError>}
      </div>

      <div className="form-group">
        <label>Birth date</label>
        <DatePicker
          date={birthDate}
          placeholder="Select date of birth"
          disabled={loading || !id}
          onChange={handleChange('birthDate')}
        />
      </div>

      <div className="form-group form-check">
        <input
          id="fired"
          type="checkbox"
          className="form-check-input"
          checked={fired}
          onChange={handleChange('fired')}
        />
        <label className="form-check-label" htmlFor="fired">
          Fired
        </label>
      </div>

      <div className="form-group">
        {GENDERS.map((value) => (
          <div key={value} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`gender-${value}`}
              value={value}
              checked={value === gender}
              onChange={handleChange('gender')}
            />
            <label className="form-check-label" htmlFor={`gender-${value}`}>
              {value}
            </label>
          </div>
        ))}
      </div>
    </form>
  )
}

const mapState = ({
  system: { loading },
  activeId,
  employees,
  jobs
}: RootState) => {
  const activeEmployee = employees.filter((emp) => emp.id === activeId)[0]

  const isDataReady =
    activeEmployee && activeEmployee.meta.status !== STATUS.INIT

  const isNew =
    isDataReady &&
    (activeEmployee.meta.status === STATUS.LOADED ||
      activeEmployee.meta.status === STATUS.EDITED ||
      activeEmployee.meta.isNew)

  const employee = isDataReady ? activeEmployee : null

  let empData

  if (employee) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { meta, ...rest } = employee
    empData = rest
  }

  return {
    loading,
    activeId,
    isNew,
    employee: empData || undefined,
    jobs
  }
}

const mapDispatch = (dispatch: ThunkDispatch<RootState, null, Action>) => ({
  getDetails: (id: string) => dispatch(getEmployee(id)),
  editDetails: (employee: EditEmployeeData) => dispatch(editEmployee(employee))
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedForm = connector(Form)

export { ConnectedForm as Form }
