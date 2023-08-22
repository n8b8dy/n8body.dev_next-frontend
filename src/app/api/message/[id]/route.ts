import type { NextRequest } from 'next/server'
import { AuthRequiredResponse } from '@/app/api/response/AuthRequiredResponse'

type MessageIDContext = {
  params: { id: string }
}

export async function DELETE(request: NextRequest, context: MessageIDContext) {
  const token = request.cookies.get('__n8body.dev_token')

  if (!token) return AuthRequiredResponse({ message: null })

  return await fetch(`${process.env.BACKEND_API_ENDPOINT}/message/${context.params.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token.value}`,
    },
  })
}
