/*
 *
 * PublishButton
 *
 */

import { memo, type FC } from 'react'

// import Button from './Button'
import { Wrapper, Title, EditIcon } from '../styles/publish_button/post_layout'

type TProps = {
  text: string
}

const PostLayout: FC<TProps> = ({ text }) => {
  return (
    <Wrapper>
      <Title>{text}</Title>
      <div className="grow" />
      <EditIcon />
    </Wrapper>
  )
}

export default memo(PostLayout)
