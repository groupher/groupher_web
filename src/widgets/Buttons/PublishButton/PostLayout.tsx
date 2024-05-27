/*
 *
 * PublishButton
 *
 */

import { memo, type FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

// import Button from './Button'
import { Wrapper, Title, EditIcon } from '../styles/publish_button/post_layout'

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
