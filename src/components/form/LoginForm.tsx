'use client'

import type { FC } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'

import { ErrorMessage } from '@hookform/error-message'
import { InfoParagraph } from '@/components/text/InfoParagraph'
import { Input } from '@/components/form/Input'
import { StandardButton } from '@/components/button/StandardButton'
import { EmailRFC2822 } from '@/utils/regex'

import type { LoginResponse } from '@/types/auth'

type LoginFormData = {
  email: string
  password: string
}

export const LoginForm: FC = () => {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<LoginResponse>()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>()

  const submitHandler: SubmitHandler<LoginFormData> = (data, event) => {
    event?.preventDefault()
    setLoading(true)

    fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json() as Promise<LoginResponse>)
      .then(json => {
        setResponse(json)

        if (!json.error) {
          reset()
          push('/admin')
        }
      })
      .finally(() => setLoading(false))
  }

  return <form onSubmit={handleSubmit(submitHandler)} className={clsx(
    'w-[320px]',
    'py-2',
    'flex flex-col items-stretch gap-1',
  )}>
    <div>
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
    <div>
      <ErrorMessage name="password" errors={errors} render={({ message }) => <InfoParagraph type="error">{message}</InfoParagraph>}/>
      <Input
        {...register('password', {
          required: 'Password address is required',
        })}
        type="password"
        placeholder="Password *"
        className="w-full"
      />
    </div>
    {response?.error ? <InfoParagraph type="error">{response.error.reason}</InfoParagraph> :
      response?.token ? <InfoParagraph type="success">Login was successful!</InfoParagraph> :
        null}
    <StandardButton type="submit" disabled={loading} className="w-full mt-2">{loading ? 'Logging in...' : 'Login'}</StandardButton>
  </form>
}
