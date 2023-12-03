import { FC } from 'react'

import {
  Avatar,
  Wrapper,
  RightPart,
  Bar,
} from '../../../styles/articles_intro_tabs/discuss_feat/discuss_demo/comment_item'

type TProps = {
  opacity?: number
  width?: number
  index?: number
}

const COMEMNTS = [
  {
    name: 'xy',
    color: '#bb9ac4',
    bg: '#fbf6fb',
  },
  {
    name: 'lm',
    color: '#5660B8',
    bg: '#F7F8FF',
  },
  {
    name: 'bl',
    color: '#BF9B46',
    bg: '#FEFBF4',
  },
]

const CommentItem: FC<TProps> = ({ opacity = 1, index = 0, width = 30 }) => {
  const comment = COMEMNTS[index]

  return (
    <Wrapper opacity={opacity}>
      <Avatar color={comment.color} bg={comment.bg}>
        {comment.name}
      </Avatar>
      <RightPart>
        <Bar top={2} height={6} width={width} bottom={3} opacity={index === 2 ? 0.2 : 0.4} />
        {index === 1 ? (
          <Bar top={5} height={4} width={width + 150} bottom={1} opacity={0.2} />
        ) : (
          <Bar
            top={5}
            height={4}
            width={width + 120}
            bottom={1}
            opacity={index === 2 ? 0.15 : 0.2}
          />
        )}
        <Bar
          top={5}
          height={4}
          width={width + 80 - index * 15}
          opacity={index === 2 ? 0.1 : 0.15}
        />
      </RightPart>
    </Wrapper>
  )
}

export default CommentItem
