import { FC } from 'react'

import type { TUser } from '@/spec'

import ImgFallback from '@/widgets/ImgFallback'

import {
  Avatar,
  Wrapper,
  RightPart,
  Nicname,
  Bar,
} from '../../../styles/articles_intro_tabs/discuss_tab/discuss_demo/comment_item'

type TProps = {
  user?: TUser
  opacity?: number
  width?: number
  index?: number
}

const CommentItem: FC<TProps> = ({ user, opacity = 1, index = 0, width = 30 }) => {
  return (
    <Wrapper opacity={opacity}>
      <Avatar src={user.avatar} fallback={<ImgFallback size={24} user={user} />} />
      <RightPart>
        <Nicname>{user.nickname}</Nicname>
        {index === 1 ? (
          <Bar top={5} height={4} width={width + 150} bottom={1} />
        ) : (
          <Bar top={5} height={4} width={width + 120} bottom={1} />
        )}
        <Bar top={5} height={4} width={width + 80 - index * 15} />
      </RightPart>
    </Wrapper>
  )
}

export default CommentItem
