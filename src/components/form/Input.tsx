import type { HTMLProps } from 'react'
import { forwardRef } from 'react'
import clsx from 'clsx'

export const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(({ className, ...props }, ref ) => {
  return <input className={clsx(
    'px-3 py-1',
    'rounded-md',
    'bg-zinc-100 dark:bg-neutral-900',
    'text-lg',
    className,
  )} ref={ref} {...props}/>
})

Input.displayName = 'Input'
