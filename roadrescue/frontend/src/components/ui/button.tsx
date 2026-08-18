import React from 'react'
import { cn } from '../../lib/utils'

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) {
  const base = 'inline-flex items-center rounded-md font-medium transition-colors'
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground px-3 py-2',
    outline: 'bg-card border border-border px-3 py-2',
  }
  const sizes: Record<string, string> = {
    default: 'text-sm',
    lg: 'text-base py-3 px-4',
    sm: 'text-sm py-1 px-2',
  }
  return (
    <button className={cn(base, variants[variant] ?? variants.default, sizes[size] ?? sizes.default, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button
