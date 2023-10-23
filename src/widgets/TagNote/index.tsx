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

import { Wrapper, Header, DotWrapper, HashIcon, DotIcon, Desc, Title, InfoIcon } from './styles'

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
        <DotWrapper color={tag.color as TColorName} noBg={tagLayout === TAG_LAYOUT.DOT}>
          {tagLayout === TAG_LAYOUT.HASH ? (
            <HashIcon color={tag.color as TColorName} />
          ) : (
            <DotIcon color={tag.color as TColorName} />
          )}
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
