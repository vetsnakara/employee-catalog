import React, { FC } from 'react'

export const ValidationError: FC = ({ children }) => (
  <small style={{ color: 'red' }} className="form-text">
    {children}
  </small>
)
