import React, { FC } from 'react'

interface Props {
  className?: string
}

export const Row: FC<Props> = ({ children, className }) => (
  <div className={`row ${className}`}>{children}</div>
)
