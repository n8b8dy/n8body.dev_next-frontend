'use client'

import type { FC } from 'react'
import { Fragment } from 'react'

import { Heading3 } from '@/components/text/Heading3'
import { StandardParagraph } from '@/components/text/StandardParagraph'
import { HorizontalDivider } from '@/components/layout/HorizontalDivider'

import type { SectionDTO } from '@/types/content'

export type HomeSectionProps = SectionDTO

export const HomeSection: FC<HomeSectionProps> = ({ heading, paragraphs }) => {
  return <Fragment>
    <Heading3>{heading}</Heading3>
    {paragraphs.map(paragraph => <StandardParagraph key={paragraph}>
      {paragraph}
    </StandardParagraph>)}
    <HorizontalDivider/>
  </Fragment>
}
