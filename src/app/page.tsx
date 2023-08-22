import { Fragment } from 'react'
import clsx from 'clsx'
import { RiGithubFill } from 'react-icons/ri'
import { IoMail } from 'react-icons/io5'
import { RiTelegramFill } from 'react-icons/ri'

import { CustomErrorPage } from '@/components/page/CustomErrorPage'
import { ScrollDownButton } from '@/components/button/ScrollDownButton'
import { ToggleThemeButton } from '@/components/button/ToggleThemeButton'
import { Heading1 } from '@/components/text/Heading1'
import { Heading3 } from '@/components/text/Heading3'
import { HomeSection } from '@/components/text/HomeSection'
import { TypedText } from '@/components/text/TypedText'
import { DiscList } from '@/components/text/DiscList'
import { HorizontalDivider } from '@/components/layout/HorizontalDivider'
import { MessageForm } from '@/components/form/MessageForm'
import { ComfortaaFont } from '@/app/fonts'

import type { SectionsResponse } from '@/types/content'

const descriptions = [
  'a front-end developer',
  '*searching a job*',
  '*probably coding rn*',
  'a front-end developer',
]

export const revalidate = 3600

const links = [
  { icon: <RiGithubFill title="Github"/>, href: 'https://github.com/n8b8dy' },
  { icon: <IoMail title="Email"/>, href: 'mailto:contact@n8body.dev' },
  { icon: <RiTelegramFill title="Telegram"/>, href: 'https://t.me/n8body' },
]

async function getData(): Promise<SectionsResponse> {
  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/content/home`, {
    next: {
      revalidate: 3600,
    },
  })
  return await response.json()
}

export default async function Home() {
  const { error, sections } = await getData()

  if (error) return <CustomErrorPage error={{
    name: 'Error',
    status: error.status,
    reason: error.reason,
  }}/>

  return <Fragment>
    <div className="h-screen flex flex-col gap-1 justify-between items-center py-6">
      <ToggleThemeButton/>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
          {links.map(({ icon, href }) => (
            <a key={href} href={href} className={clsx(
              'text-3xl',
              'opacity-75 hover:opacity-80',
              'dark:opacity-50 dark:hover:opacity-75',
              'hover:animate-pulse',
            )}>{icon}</a>
          ))}
        </div>
        <Heading1>n8body</Heading1>
        <TypedText values={descriptions} component="h2" className={clsx(
          ComfortaaFont.className,
          'mt-1',
          'empty:h-7 xl:empty:h-8',
          'relative',

          'text-xl xl:text-2xl',
          'text-center',
          'opacity-75',
          'dark:opacity-50',

          'data-[state=done]:after:hidden',
          'after:absolute',
          'after:inline-block',
          'after:text-[""]',
          'after:w-0.5 after:h-5 xl:after:h-[26px]',
          'after:ml-[1.5px]',
          'after:top-[3px] xl:after:top-[2.5px]',
          'after:bg-black dark:after:bg-white',

          'data-[state=typing]:after:animate-none',
          'data-[state=erasing]:after:animate-none',
          'after:animate-blink',
        )}/>
      </div>
      <ScrollDownButton href="#content"/>
    </div>
    <div id="content" className="container max-w-4xl mx-auto my-8">
      {sections?.map(section => <HomeSection key={section.id} {...section}/>)}

      <Heading3>Other projects</Heading3>
      <DiscList>
        <li>
          manga.ovh - <i>the best</i> website for reading manga
        </li>
        <li>n8body’s helper - my personal telegram bot</li>
        <li>...and some more are being developed right now</li>
      </DiscList>
      <HorizontalDivider/>

      <Heading3>Contact Me</Heading3>
      <MessageForm/>
    </div>
  </Fragment>
}
