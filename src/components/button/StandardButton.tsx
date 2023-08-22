import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { ComfortaaFont } from '@/app/fonts'

export type ButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>

export const StandardButtonClassname = clsx(
  'relative',
  'self-center',
  'px-8 py-1',
  'rounded-md',
  'text-lg',
  'bg-neutral-100 dark:bg-neutral-900',
  'outline-neutral-500',
  'focus:outline-1',
  'disabled:outline-1',
  'transition-all',
  'duration-300',
  ComfortaaFont.className,
)

export const StandardButton: FC<ButtonProps> = ({ children, type, className, ...props }) => {
  return <button className={clsx(
    StandardButtonClassname,
    className,
  )} {...props}>
    {children}
  </button>
}
