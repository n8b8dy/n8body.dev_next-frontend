import { cookies } from 'next/headers'

import { Message } from '@/components/message/Message'
import { Heading2 } from '@/components/text/Heading2'
import { InfoParagraph } from '@/components/text/InfoParagraph'
import { CustomErrorPage } from '@/components/page/CustomErrorPage'

import type { UserResponse } from '@/types/user'
import type { MessagesResponse } from '@/types/message'

export const revalidate = 60

async function getData(): Promise<UserResponse & MessagesResponse> {
  const token = cookies().get('__n8body.dev_token')

  if (!token) return {
    error: {
      status: 401,
      reason: 'authorization is required to access this API route',
    },
    user: null,
    messages: null,
  }

  const headers = {
    'Authorization': `Bearer ${token.value}`,
  }

  const meResponse = await fetch(`${process.env.BACKEND_API_ENDPOINT}/user/me`, { headers })

  const { error: meError, user }: UserResponse = await meResponse.json()
  if (!meResponse.ok) return { error: meError, user, messages: null }

  const messagesRes = await fetch(`${process.env.BACKEND_API_ENDPOINT}/messages`, { headers })

  const { error: messagesError, messages }: MessagesResponse = await messagesRes.json()
  if (!messagesRes.ok) return { error: messagesError, user, messages }

  return { error: null, user, messages }
}

export default async function Admin() {
  const { user, error, messages } = await getData()

  if (error) return <CustomErrorPage error={{
    name: 'Error',
    status: error.status,
    reason: error.reason,
  }}/>

  return <div className="container">
    <div>
      <Heading2 className="my-4 !text-3xl">Welcome {user?.username}!</Heading2>
    </div>
    <div>
      {error && <InfoParagraph type="error">{error}</InfoParagraph>}
    </div>
    <div className="flex flex-col gap-2">
      {messages && messages.map(message => <Message key={message.id} {...message}/>)}
    </div>
  </div>
}
