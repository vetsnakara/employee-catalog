import React, { FC } from 'react'

interface Props {
  size?: number
}

export const Title: FC<Props> = ({ children, size = 1 }) => (
  <h1 style={{ fontSize: `${size}rem` }} className="text-center">
    {children}
  </h1>
)
