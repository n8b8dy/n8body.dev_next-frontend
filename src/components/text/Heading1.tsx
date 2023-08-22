import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { FredokaFont } from '@/app/fonts'

export type Heading1Props = PropsWithChildren & HTMLAttributes<HTMLHeadingElement>

export const Heading1: FC<Heading1Props> = ({ children, className, ...props}) => {
  return <h1 className={clsx(
    FredokaFont.className,
    'font-medium',
    'text-center',
    'text-7xl lg:text-8xl xl:text-8.5xl',
    className,
  )} {...props}>{children}</h1>
}
