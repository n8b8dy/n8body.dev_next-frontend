'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import clsx from 'clsx'
export const ToggleThemeButton: FC = () => {
  const [mounted, setMounted] = useState(false)

  const { systemTheme, theme, setTheme } = useTheme()
  const checked = (theme === 'system' ? systemTheme : theme) === 'light'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={clsx(
      'w-[80px] h-[36px]',
      'rounded-full',
      'animate-pulse',
      'bg-neutral-400 dark:bg-neutral-600',
    )}></span>
  }

  return <div className={clsx(
    'relative',
    'px-1 py-1',
    'flex gap-4',
    'rounded-full',
    'bg-zinc-200',
    'dark:bg-neutral-800',

    'before:absolute',
    'before:w-7 before:h-7',
    checked ? 'before:left-[calc(100%-32px)]' : 'before:left-1',
    'before:rounded-full',
    'before:bg-zinc-100',
    'dark:before:bg-neutral-700',
    'before:transition-all before:duration-200 before:ease-in-out',
    'before:z-10',
  )}>
    <button onClick={() => setTheme('dark')} aria-label="Dark theme" className="p-1.5 flex items-center justify-center z-20">
      <BsFillMoonStarsFill/>
    </button>
    <button onClick={() => setTheme('light')} aria-label="Light theme" className="p-1.5 flex items-center justify-center z-20">
      <BsFillSunFill/>
    </button>
  </div>
}
