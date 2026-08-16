import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const base = 'inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none'
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
