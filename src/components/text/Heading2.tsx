import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

export type Heading2Props = PropsWithChildren & HTMLAttributes<HTMLHeadingElement>

export const Heading2: FC<Heading2Props> = ({ children, className, ...props}) => {
  return <h2 className={clsx('text-lg xl:text-2xl', className)} {...props}>{children}</h2>
}
