import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { ComfortaaFont } from '@/app/fonts'

export type Heading3Props = PropsWithChildren & HTMLAttributes<HTMLHeadingElement>

export const Heading3: FC<Heading3Props> = ({ children, className, ...props }) => {
  return <h3 className={clsx(
    ComfortaaFont.className,
    'mt-4',
    'text-xl xl:text-2xl',
    className,
  )} {...props}>{children}</h3>
}
