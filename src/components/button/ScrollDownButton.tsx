'use client'

import type { FC, MouseEvent } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const barClassname =  clsx(
  'absolute',
  'w-6',
  'h-1',
  'rounded-full',
  'bg-neutral-500',
)

export const ScrollDownButton: FC<{ href: string }> = ({ href }) => {
  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = e.currentTarget.href.replace(/.*#/, '')
    const elem = document.getElementById(targetId)
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: 'smooth',
    })
  }

  return <Link href={href} onClick={clickHandler} aria-label="Scroll down">
    <span className={clsx(
      'flex justify-center items-center',
      'relative',
      'w-[41.5px] h-6',
      'animate-pointDown'
    )}>
      <span className={clsx(
        barClassname,
        'left-0',
        'rotate-[35deg]',
      )}></span>
    <span className={clsx(
      barClassname,
      'right-0',
      'rotate-[-35deg]',
    )}></span>
    </span>
  </Link>
}
