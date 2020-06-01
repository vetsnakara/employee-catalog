import React, { FC } from 'react'

interface Props {
  className?: string
}

export const Container: FC<Props> = ({ children, className }) => (
  <div className={`container ${className}`}>{children}</div>
)
