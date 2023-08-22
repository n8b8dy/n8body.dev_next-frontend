'use client'

import type { FC } from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'

import { Input } from '@/components/form/Input'
import { Textarea } from '@/components/form/Textarea'
import { InfoParagraph } from '@/components/text/InfoParagraph'
import { StandardButton } from '@/components/button/StandardButton'
import { EmailRFC2822 } from '@/utils/regex'

import type { MessageResponse } from '@/types/message'

type MessageFormData = {
  username: string
  email: string
  text: string
}

export const MessageForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<MessageResponse>()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MessageFormData>()

  const submitHandler: SubmitHandler<MessageFormData> = (data, event) => {
    event?.preventDefault()
    setResponse(undefined)
    setLoading(true)

    fetch(`/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json() as Promise<MessageResponse>)
      .then(json => {
        setResponse(json)
        if (!json.error) reset()
      })
      .finally(() => setLoading(false))
  }

  return <form onSubmit={handleSubmit(submitHandler)} className={clsx(
    'py-2',
    'flex flex-col items-stretch gap-2',
  )}>
    <div className="flex flex-col sm:flex-row items-stretch justify-stretch gap-2">
      <div className="flex-1 flex flex-col justify-end">
        <ErrorMessage name="username" errors={errors} render={({ message }) => <InfoParagraph type="error">{message}</InfoParagraph>}/>
        <Input
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Invalid username: minimum length is 3 characters' },
            maxLength: { value: 255, message: 'Invalid username: maximum length is 255 characters' },
          })}
          placeholder="Username *"
          className="w-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <ErrorMessage name="email" errors={errors} render={({ message }) => <InfoParagraph type="error">{message}</InfoParagraph>}/>
        <Input
          {...register('email', {
            required: 'Email address is required',
            minLength: { value: 3, message: 'Invalid email address: minimum length is 3 characters' },
            maxLength: { value: 255, message: 'Invalid email address: maximum length is 255 characters' },
            pattern: { value: EmailRFC2822, message: 'Invalid email address: valid one looks like example@n8body.dev' },
          })}
          placeholder="Email *"
          className="w-full"
        />
      </div>
    </div>

    <div>
      <ErrorMessage name="text" errors={errors} render={({ message }) => <InfoParagraph type="error">{message}</InfoParagraph>}/>
      <Textarea
        {...register('text', {
          required: 'Text is required',
          minLength: { value: 3, message: 'Invalid text: minimum length is 3 characters' },
          maxLength: { value: 2047, message: 'Invalid text: maximum length is 2047 characters' },
        })}
        placeholder="Your text goes here... *"
        className="w-full min-h-[234px] resize-none"
      ></Textarea>
    </div>

    <div className="flex justify-between">
      <div>
        {response?.error ? <InfoParagraph type="error">{response.error.reason}</InfoParagraph> :
          response?.message ? <InfoParagraph type="success">Message was sent successfully!</InfoParagraph> :
            null}
      </div>
      <StandardButton type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</StandardButton>
    </div>
  </form>
}
