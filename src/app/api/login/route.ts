import type { NextRequest } from 'next/server'
import type { LoginResponse } from '@/types/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await request.json()),
  })

  console.log(process.env.BACKEND_API_ENDPOINT, '/login')

  if (response.ok) {
    const data: LoginResponse = await response.clone().json()

    cookies().set('__n8body.dev_token', data.token!, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
  }

  return response
}
