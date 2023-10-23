/* eslint-disable jsx-a11y/accessible-emoji */
/*
 *
 * TagNote
 *
 */

import { FC, memo } from 'react'

import Markdown from 'markdown-to-jsx'
import type { TColorName, TTag } from '@/spec'

import useTagLayout from '@/hooks/useTagLayout'
import { TAG_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/logger'

import { SpaceGrow } from '@/widgets/Common'
import TagNode from '@/widgets/TagNode'

import { Wrapper, Header, DotWrapper, Desc, Title, InfoIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNote:index')

type TProps = {
  testid?: string
  tag: TTag
}

const TagNote: FC<TProps> = ({ testid = 'tag-note', tag }) => {
  const tagLayout = useTagLayout()

  if (!tag.desc) return null

  return (
    <Wrapper testid={testid}>
      <Header>
        <DotWrapper color={tag.color as TColorName} round={tagLayout === TAG_LAYOUT.DOT}>
          <TagNode
            color={tag.color}
            dotSize={8}
            hashSize={12}
            dotLeft={5}
            hashLeft={2}
            hashRight={3}
            opacity={0.8}
          />
        </DotWrapper>
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
