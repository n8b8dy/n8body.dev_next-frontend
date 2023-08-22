'use client'

import { CustomErrorPage } from '@/components/page/CustomErrorPage'

export default function NotFound() {
  return <CustomErrorPage error={{
    name: 'Error',
    status: 404,
    reason: `page not found`
  }} />
}
