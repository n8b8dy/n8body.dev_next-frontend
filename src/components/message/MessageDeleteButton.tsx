import type { FC } from 'react'
import { AiFillDelete } from 'react-icons/ai'

export type MessageDeleteButtonProps = {
  onDelete: () => void
}
export const MessageDeleteButton: FC<MessageDeleteButtonProps> = ({ onDelete }) => {
  return <button className="p-2 rounded-md bg-neutral-800 opacity-75 hover:opacity-90" onClick={onDelete}>
    <AiFillDelete title="Delete"/>
  </button>
}
