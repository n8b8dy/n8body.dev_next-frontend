'use client'

import type { FC } from 'react'
import moment from 'moment'
import { StandardParagraph } from '@/components/text/StandardParagraph'
import type { MessageDTO, MessageResponse } from '@/types/message'
import { MessageDeleteButton } from '@/components/message/MessageDeleteButton'
import { useState } from 'react'

export type MessageProps = MessageDTO

export const Message: FC<MessageProps> = ({ id, username, email, text, createdAt, deletedAt: deleted_at }) => {
  const [deletedAt, setDeletedAt ] = useState(deleted_at)

  const onDelete = () => {
    fetch(`/api/message/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) throw new Error()
      return response.json() as Promise<MessageResponse>
    }).then(({ message }) => {
      setDeletedAt(message?.deletedAt || null)
    }).catch(err => {
      console.error(err)
    })
  }

  if (deletedAt) return null

  return <div className="flex gap-1 px-4 py-2 rounded-md bg-zinc-100 dark:bg-neutral-900">
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2">
        <span className="text-lg">{username} - {email}</span>
        <span className="opacity-50">{moment(createdAt).fromNow()}</span>
      </div>
      <StandardParagraph className="flex-1">{text}</StandardParagraph>
    </div>
    <div className="flex justify-center items-center gap-1">
      <MessageDeleteButton onDelete={onDelete } />
    </div>
  </div>
}
