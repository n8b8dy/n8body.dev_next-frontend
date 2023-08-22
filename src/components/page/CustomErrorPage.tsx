'use client'

import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Heading1 } from '@/components/text/Heading1'
import { Heading3 } from '@/components/text/Heading3'
import { StandardButton } from '@/components/button/StandardButton'

export type CustomErrorPageProps = {
  error: {
    name: string
    status?: number | null
    reason?: string | null
  }
  reset?: () => void
}

export const CustomErrorPage: FC<CustomErrorPageProps> = ({ error, reset }) => {
  const { push } = useRouter()

  return <div className={clsx(
    'h-screen',
    'flex flex-col',
    'justify-center items-center',
  )}>
    <Heading1 className="!text-5xl">{error.name} {error.status}</Heading1>
    {error.reason && <Heading3 className="text-center">{error.reason}</Heading3>}
    <div className="flex flex-wrap justify-center gap-3 mt-5">
      <StandardButton onClick={() => push('/')} className="w-52">Return home</StandardButton>
      {reset && <StandardButton onClick={reset} className="w-52">Try again</StandardButton>}
    </div>
  </div>
}
