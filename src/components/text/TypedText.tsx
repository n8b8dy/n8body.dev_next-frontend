'use client'

import type { ComponentProps, ElementType } from 'react'
import { Component, useEffect, useRef, useState } from 'react'

export type TypedTextSettings = {
  startBlank?: boolean
  typingDelay?: number
  erasingDelay?: number
  betweenDelay?: number
  startDelay?: number
  endDelay?: number
}

export type TypedTextProps<T extends ElementType> = {
  values: Array<string>,
  component?: T,
  userSettings?: TypedTextSettings,
}

export const TypedText = <T extends ElementType = 'span'>({
  values, component, userSettings, ...props
}: TypedTextProps<T> & Omit<ComponentProps<T>, keyof TypedTextProps<T>>) => {
  const [valueIndex, setValueIndex] = useState(0)
  const [text, setText] = useState('')
  const [state, setState] = useState<'waiting' | 'typing' | 'erasing' | 'done'>('waiting')
  const firstUpdate = useRef(true)

  const Component = component || 'span'

  const settings: typeof userSettings = {
    startBlank: true,
    typingDelay: 150,
    erasingDelay: 50,
    betweenDelay: 2400,
    startDelay: 1100,
    endDelay: 3000,
    ...userSettings,
  }

  const sleep = (ms?: number) => new Promise(resolve => setTimeout(() => resolve('Slept enough.'), Number(ms)))

  const generateRandomDelay = (bd?: number) => {
    const baseDelay = Number(bd)
    return Math.floor((baseDelay - baseDelay / 10) + Math.random() * (baseDelay / 5)) + 1
  }

  useEffect(() => {
    const typeChar = () => {
      return setTimeout(() => {
        setText(text => values[valueIndex].slice(0, text.length + 1))
      }, generateRandomDelay(settings.typingDelay))
    }

    const eraseChar = () => {
      return setTimeout(() => {
        setText(text => values[valueIndex].slice(0, text.length - 1))
      }, settings.erasingDelay)
    }

    let typingTimeout: NodeJS.Timeout,
      erasingTimeout: NodeJS.Timeout

    if (firstUpdate.current || state === 'waiting') return

    switch (state) {
      case 'typing': {
        if (text !== values[valueIndex]) typingTimeout = typeChar()
        else if (text === values[valueIndex] && valueIndex < values.length - 1) {
          setState('waiting')
          sleep(settings.betweenDelay).then(() => setState('erasing'))
        } else if (text === values[valueIndex] && valueIndex === values.length - 1) {
          setState('waiting')
          sleep(settings.endDelay).then(() => setState('done'))
        }
        break
      }
      case 'erasing': {
        if (text.length > 0) erasingTimeout = eraseChar()
        else if (text.length === 0 && valueIndex < values.length - 1) {
          setState('waiting')
          sleep(settings.betweenDelay).then(() => {
            setState('typing')
            setValueIndex(index => ++index)
          })
        }
        break
      }
    }

    return () => {
      clearTimeout(typingTimeout)
      clearTimeout(erasingTimeout)
    }
  }, [settings.erasingDelay, settings.typingDelay, settings.betweenDelay, settings.endDelay, state, text, valueIndex, values])

  useEffect(() => {
    sleep(settings.startDelay).then(() => {
      firstUpdate.current = false
      setState('typing')
    })
  }, [settings.startDelay])

  return <Component {...props} data-state={state}>{text}</Component>
}
