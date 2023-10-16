/* eslint-disable jsx-a11y/accessible-emoji */
/*
 *
 * TagNote
 *
 */

import { FC, memo } from 'react'

import Markdown from 'markdown-to-jsx'
import type { TColorName, TTag } from '@/spec'

import { buildLog } from '@/logger'
import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, Header, Desc, Title, InfoIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNote:index')

type TProps = {
  testid?: string
  tag: TTag
}

const TagNote: FC<TProps> = ({ testid = 'tag-note', tag }) => {
  if (!tag.slug) return null

  return (
    <Wrapper testid={testid}>
      <Header>
        <Title color={tag.color as TColorName}>{tag.title}</Title>
        <SpaceGrow />
        <InfoIcon />
      </Header>
      <Desc>
        <Markdown>{tag.desc || ''}</Markdown>
      </Desc>
    </Wrapper>
  )
}

export default memo(TagNote)
