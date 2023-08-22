import type { ErrorDTO } from '@/types/general'

export const AuthRequiredResponse = (body?: { [key: string]: any }) => {
  return new Response(JSON.stringify({
    error: {
      status: 401,
      reason: 'authorization is required to access this API route'
    } as ErrorDTO,
    ...body,
  }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
