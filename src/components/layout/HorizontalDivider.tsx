import type { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

export type HorizontalDividerProps = HTMLAttributes<HTMLHRElement>

export const HorizontalDivider: FC<HorizontalDividerProps> = ({ className, ...props}) => {
  return <hr className={clsx(
    'my-8 mx-auto',
    'h-[2px] max-w-[90%]',
    'border-0',
    'rounded-full',
    'bg-neutral-200',
    'dark:bg-neutral-800',
    className,
  )} {...props}/>
}
