/* eslint-disable jsx-a11y/accessible-emoji */
/*
 *
 * TagNote
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import Markdown from 'markdown-to-jsx'
import type { TColorName } from '@/spec'

import { buildLog } from '@/logger'

import useActiveTag from '@/hooks/useActiveTag'
import { SpaceGrow } from '@/widgets/Common'
import TagNode from '@/widgets/TagNode'

import { Wrapper, Header, BgWrapper, Title, Desc, InfoIcon } from './styles'

const _log = buildLog('c:TagNote:index')

const TagNote: FC = () => {
  const tag = useActiveTag()

  if (!tag?.desc) return null

  return (
    <Wrapper $testid="tag-note">
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

export default observer(TagNote)
