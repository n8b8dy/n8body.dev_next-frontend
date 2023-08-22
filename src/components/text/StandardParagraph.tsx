import type { FC, PropsWithChildren, HTMLAttributes } from 'react'
import clsx from 'clsx'

export type ParagraphProps =  PropsWithChildren & HTMLAttributes<HTMLParagraphElement>

export const StandardParagraph: FC<ParagraphProps> = ({ children, className, ...props }) => {
  return <p className={clsx('text-lg text-justify mx-2 my-1', className)} {...props}>{children}</p>
}
