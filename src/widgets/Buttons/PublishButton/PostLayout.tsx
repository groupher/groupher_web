/*
 *
 * PublishButton
 *
 */

import { memo, FC, Fragment } from 'react'

import { buildLog } from '@/logger'
import { SpaceGrow } from '@/widgets/Common'

// import Button from './Button'
import { Wrapper, Title, EditIcon } from '../styles/publish_button/post_layout'

/* eslint-disable-next-line */
const log = buildLog('w:PublishButton:index')

type TProps = {
  text: string
}

const PostLayout: FC<TProps> = ({ text }) => {
  return (
    <Wrapper>
      <Title>{text}</Title>
      <SpaceGrow />
      <EditIcon />
    </Wrapper>
  )
}

export default memo(PostLayout)
