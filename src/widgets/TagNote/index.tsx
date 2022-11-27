/*
 *
 * TagNote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'
import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, Header, TagDot, Title, PinIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNote:index')

type TProps = {
  testid?: string
}

const TagNote: FC<TProps> = ({ testid = 'tag-note' }) => {
  return (
    <Wrapper testid={testid}>
      <Header>
        <TagDot />
        <Title>Got a question?</Title>
        <SpaceGrow />
        <PinIcon />
      </Header>
      <p>
        You can ask for help from fellow community members here. And pay it
        forward to other members by sharing your own expertise if you can.
      </p>
    </Wrapper>
  )
}

export default memo(TagNote)
