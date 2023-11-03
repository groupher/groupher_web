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
import TagNode from '@/widgets/TagNode'

import { Wrapper, Header, BgWrapper, Title, Desc, InfoIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNote:index')

type TProps = {
  testid?: string
  tag: TTag
}

const TagNote: FC<TProps> = ({ testid = 'tag-note', tag }) => {
  if (!tag.desc) return null

  return (
    <Wrapper testid={testid}>
      <Header>
        <BgWrapper $color={tag.color as TColorName}>
          <TagNode
            color={tag.color}
            dotSize={8}
            hashSize={12}
            dotLeft={5}
            hashLeft={2}
            hashRight={8}
            opacity={0.8}
            boldHash
          />
          <Title color={tag.color as TColorName}>{tag.title}</Title>
        </BgWrapper>
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
