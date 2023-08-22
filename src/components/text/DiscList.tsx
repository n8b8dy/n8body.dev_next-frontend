import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

export type DiscListProps = PropsWithChildren & HTMLAttributes<HTMLUListElement>

export const DiscList: FC<DiscListProps> = ({ children }) => {
  return <ul className="text-lg list-disc list-inside pl-4 leading-7">{children}</ul>
}
