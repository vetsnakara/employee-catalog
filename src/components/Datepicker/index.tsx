import React, { FC } from 'react'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.min.css'
import './styles.css'

export type DatePickerDate = Date | null

export interface DatePickerEvent {
  target: {
    value: DatePickerDate
  }
}

interface Props {
  date?: Date | null
  placeholder?: string
  onChange: (e: DatePickerEvent) => void
  disabled?: boolean
}

export const DatePicker: FC<Props> = ({
  date,
  onChange,
  placeholder = '',
  ...rest
}) => (
  <ReactDatePicker
    placeholderText={placeholder}
    selected={date}
    onChange={(value) => onChange({ target: { value } })}
    {...rest}
  />
)
