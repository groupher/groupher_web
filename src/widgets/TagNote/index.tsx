/* eslint-disable jsx-a11y/accessible-emoji */
/*
 *
 * TagNote
 *
 */

import { FC, memo } from 'react'

import type { TTag } from '@/spec'

import { buildLog } from '@/utils/logger'
import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, Header, Desc, Title, InfoIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNote:index')

type TProps = {
  testid?: string
  tag: TTag
}

const TagNote: FC<TProps> = ({ testid = 'tag-note', tag }) => {
  if (!tag.raw) return null

  return (
    <Wrapper testid={testid}>
      <Header>
        <Title color={tag.color}>{tag.title}</Title>
        <SpaceGrow />
        <InfoIcon />
      </Header>
      <Desc>
        本标签下收集使用过程中的截图或者主题，欢迎分享到这个标签下，开发团队会定期像参与讨论者发送福利，欢迎参与
        🙏
      </Desc>
    </Wrapper>
  )
}

export default memo(TagNote)
