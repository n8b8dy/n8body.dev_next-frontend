import type { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

export type InfoParagraphProps= PropsWithChildren & {
  type: 'error' | 'success'
}

export const InfoParagraph: FC<InfoParagraphProps> = ({ children, type }) => {
  return <p className={clsx(
    'flex items-center',
    'px-1 py-1',
    'text-sm',
    type === 'error' ? 'text-red-600' : 'text-green-600',
  )}>{children}</p>
}
