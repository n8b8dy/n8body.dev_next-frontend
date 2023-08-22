import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return await fetch(`${process.env.BACKEND_API_ENDPOINT}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await request.json()),
  })
}
