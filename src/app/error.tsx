'use client'

import { CustomErrorPage } from '@/components/page/CustomErrorPage'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return <CustomErrorPage error={{
    name: 'There was a problem!',
    reason: error.message,
  }} reset={reset}/>
}
